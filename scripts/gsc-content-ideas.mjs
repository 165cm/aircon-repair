// GSC データ(data/gsc/queries.json, pages.json)と既存記事を突き合わせ、
// 「コンテンツ機会」を決定的に(LLM不使用で)優先度付けして data/gsc-content-ideas.json に出力する。
// 使い方:
//   node scripts/gsc-content-ideas.mjs           ... data/gsc-content-ideas.json を生成
//   node scripts/gsc-content-ideas.mjs --print    ... 結果を標準出力するだけ(書き込みなし)
//   node scripts/gsc-content-ideas.mjs --check     ... 機会が0件なら非ゼロ終了(CI検証用)
//
// 分類:
//   new     ... どの記事のtitle/symptomsにも語が当たらない高impressionクエリ → 新規記事候補
//   rewrite ... 既存記事に対応するが CTR低 or position低(おおむね5〜30位) → リライト候補
import { readFile, readdir, writeFile } from "node:fs/promises";

const ROOT = new URL("../", import.meta.url);
const ARTICLES_DIR = new URL("src/content/articles/", ROOT);
const GSC_DIR = new URL("data/gsc/", ROOT);
const OUT = new URL("data/gsc-content-ideas.json", ROOT);
const SITE_URL = "https://aircon-hokenshitsu.com";

const args = process.argv.slice(2);
const isPrint = args.includes("--print") || args.includes("--dry-run");
const isCheck = args.includes("--check");

// しきい値(運用しながら調整可能)
const MIN_IMPRESSIONS = Number((args.find((a) => a.startsWith("--min-imp=")) ?? "--min-imp=20").split("=")[1]) || 20;

function fail(msg) {
  console.error(msg);
  process.exit(1);
}

// --- frontmatter パース(scripts/generate-social.mjs と同じ簡易版) ---
function parseFrontmatter(raw) {
  const m = raw.match(/^---\n([\s\S]*?)\n---/);
  if (!m) return null;
  const lines = m[1].split("\n");
  const data = {};
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    let mm;
    if ((mm = line.match(/^(\w+):\s*"(.*)"\s*$/))) {
      data[mm[1]] = mm[2];
    } else if ((mm = line.match(/^(\w+):\s*\[(.*)\]\s*$/))) {
      data[mm[1]] = [...mm[2].matchAll(/"([^"]*)"/g)].map((x) => x[1]);
    } else if ((mm = line.match(/^(\w+):\s*$/))) {
      const key = mm[1];
      const arr = [];
      let j = i + 1;
      while (j < lines.length && /^\s+-\s*/.test(lines[j])) {
        const im = lines[j].match(/^\s+-\s*"(.*)"\s*$/) ?? lines[j].match(/^\s+-\s*(.*)$/);
        if (im) arr.push(im[1].replace(/^"|"$/g, ""));
        j++;
      }
      if (arr.length) {
        data[key] = arr;
        i = j - 1;
      } else {
        data[key] = "";
      }
    } else if ((mm = line.match(/^(\w+):\s*(.+?)\s*$/))) {
      data[mm[1]] = mm[2];
    }
  }
  return data;
}

async function loadArticles() {
  const files = (await readdir(ARTICLES_DIR)).filter((f) => f.endsWith(".md"));
  const articles = [];
  for (const file of files) {
    const slug = file.replace(/\.md$/, "");
    if (slug.endsWith("-2") || file.endsWith(" 2.md")) continue; // canonicalのみ
    const raw = await readFile(new URL(file, ARTICLES_DIR), "utf-8");
    const fm = parseFrontmatter(raw);
    if (!fm || !fm.title) continue;
    const symptoms = Array.isArray(fm.symptoms) ? fm.symptoms : [];
    // 記事を表す語の集合(title + description + symptoms)を正規化して保持
    const haystack = [fm.title, fm.description, ...symptoms].join(" ");
    articles.push({ slug, title: fm.title, category: fm.category, symptoms, haystack });
  }
  articles.sort((a, b) => a.slug.localeCompare(b.slug)); // 同点時の決定性のため
  return articles;
}

async function loadJson(url) {
  try {
    return JSON.parse(await readFile(url, "utf-8"));
  } catch {
    return null;
  }
}

// クエリ→既存記事のマッチ判定。スコア最大の記事を返す。
// "冷えない" のように複数記事が持つ症状タグでも、主症状(先頭)やタイトル一致を優遇して最適な1本を選ぶ。
function matchArticle(query, articles) {
  const q = query.replace(/\s+/g, "");
  let best = null;
  let bestScore = 0;
  for (const a of articles) {
    let score = 0;
    if (a.title && (q.includes(a.title) || a.title.includes(q))) score += 20; // タイトル双方向一致は強い
    a.symptoms.forEach((s, idx) => {
      if (s && (q.includes(s) || s.includes(q))) {
        score += s.length + (idx === 0 ? 3 : 0); // 長い症状語ほど具体的 / 先頭=主症状を優遇
      }
    });
    if (score > bestScore) {
      bestScore = score;
      best = a;
    }
  }
  return bestScore > 0 ? best : null;
}

// クエリ内容からカテゴリのヒントを推定
function suggestCategory(query) {
  const q = query;
  if (/(掃除|クリーニング|洗浄|カビ|フィルター)/.test(q)) return "cleaning";
  if (/(買い替え|買い換え|選び方|おすすめ|何畳|畳|価格|安い)/.test(q)) return "buying";
  if (/(電気代|節電|省エネ|つけっぱなし)/.test(q)) return "energy-saving";
  if (/(仕組み|構造|とは|意味)/.test(q)) return "basics";
  if (/(求人|資格|転職|年収|仕事)/.test(q)) return "career";
  return "symptom";
}

const queriesData = await loadJson(new URL("queries.json", GSC_DIR));
if (!queriesData) {
  fail("data/gsc/queries.json が見つからない。先に `node scripts/fetch-gsc.mjs` を実行してください。");
}
const articles = await loadArticles();

const ideas = [];
for (const row of queriesData.rows) {
  if (row.impressions < MIN_IMPRESSIONS) continue;
  const matched = matchArticle(row.query, articles);
  if (!matched) {
    // 未カバー → 新規記事候補。score = impressions に「クリックされていない度」を加味
    const score = Math.round(row.impressions * (1 - row.ctr) * 1.5);
    ideas.push({
      type: "new",
      query: row.query,
      impressions: row.impressions,
      clicks: row.clicks,
      ctr: row.ctr,
      position: row.position,
      suggestedCategory: suggestCategory(row.query),
      score
    });
  } else if (row.position > 4 && row.position <= 30) {
    // 既存だが順位が伸び悩み → リライト候補
    const score = Math.round(row.impressions * (1 - row.ctr));
    ideas.push({
      type: "rewrite",
      query: row.query,
      impressions: row.impressions,
      clicks: row.clicks,
      ctr: row.ctr,
      position: row.position,
      matchedSlug: matched.slug,
      matchedUrl: `${SITE_URL}/articles/${matched.slug}/`,
      suggestedCategory: matched.category ?? suggestCategory(row.query),
      score
    });
  }
}

ideas.sort((a, b) => b.score - a.score);

const out = {
  meta: {
    ...(queriesData.meta ?? {}),
    generatedAt: new Date().toISOString(),
    minImpressions: MIN_IMPRESSIONS,
    articleCount: articles.length,
    ideaCount: ideas.length
  },
  ideas
};

if (isCheck) {
  if (ideas.length === 0) fail("コンテンツ機会が0件。GSCデータかしきい値(--min-imp)を確認してください。");
  console.log(`OK: ${ideas.length}件のコンテンツ機会を検出`);
  process.exit(0);
}

if (isPrint) {
  console.log(`# コンテンツ機会 ${ideas.length}件 (期間 ${out.meta.startDate ?? "?"}〜${out.meta.endDate ?? "?"})`);
  for (const idea of ideas.slice(0, 25)) {
    const tag = idea.type === "new" ? "[新規]" : `[改善 ${idea.matchedSlug}]`;
    console.log(
      `  score${idea.score} ${tag} ${idea.impressions}imp pos${idea.position} (${idea.suggestedCategory}) ${idea.query}`
    );
  }
  process.exit(0);
}

await writeFile(OUT, JSON.stringify(out, null, 2) + "\n");
console.log(`保存しました: data/gsc-content-ideas.json (${ideas.length}件)`);
const news = ideas.filter((i) => i.type === "new").length;
console.log(`  新規記事候補: ${news}件 / リライト候補: ${ideas.length - news}件`);
