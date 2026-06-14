// SNS用の投稿コピー(X手動投稿用)と動画メタ(YouTube用)を記事フロントマターから生成する。
// 使い方:
//   node scripts/generate-social.mjs            ... data/x-posts.json と data/youtube-meta.json を生成
//   node scripts/generate-social.mjs --dry-run  ... 生成内容を標準出力するだけ(書き込みなし)
//   node scripts/generate-social.mjs --check     ... 検証のみ(280字超/画像欠落/重複/URL不正で非ゼロ終了)
//   node scripts/generate-social.mjs --seed=1    ... バリアントの並び順だけ決定的にシャッフル(本文は不変)
//
// 注: このスクリプトはAstro外で動くため astro:content / @data 等のエイリアスを使えない。
//     定数(サイトURL・ハッシュタグ・CTA)はここに複製している。出典: src/data/affiliate.ts
import { readFile, writeFile, mkdir, readdir, access } from "node:fs/promises";
import { createHash } from "node:crypto";

const ROOT = new URL("../", import.meta.url);
const ARTICLES_DIR = new URL("src/content/articles/", ROOT);
const PUBLIC_DIR = new URL("public/", ROOT);
const DATA_DIR = new URL("data/", ROOT);

// --- 定数(src/data/affiliate.ts と同期) ---
const SITE_URL = "https://aircon-hokenshitsu.com";
const SITE_NAME = "エアコン保健室";

const HASHTAGS = {
  symptom: ["#エアコン", "#エアコン修理", "#猛暑対策"],
  cleaning: ["#エアコン掃除", "#エアコン", "#エアコンクリーニング"],
  buying: ["#エアコン", "#エアコン買い替え", "#エアコン選び"],
  "energy-saving": ["#エアコン", "#電気代", "#節電"],
  basics: ["#エアコン", "#エアコンの仕組み"],
  career: ["#エアコン", "#求人", "#エアコンクリーニング"]
};
const tagsFor = (category) => HASHTAGS[category] ?? ["#エアコン"];

// --- CLI ---
const args = process.argv.slice(2);
const isDryRun = args.includes("--dry-run") || args.includes("--print");
const isCheck = args.includes("--check");
const seed = Number((args.find((a) => a.startsWith("--seed=")) ?? "--seed=0").split("=")[1]) || 0;

// --- ユーティリティ ---
function mulberry32(a) {
  return function () {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
function seededShuffle(arr, s) {
  const rng = mulberry32(s);
  const out = arr.slice();
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [out[i], out[j]] = [out[j], out[i]];
  }
  return out;
}
// Xの加重文字数の近似: URL=23, 非ASCII=2, ASCII=1
function weightedLen(text) {
  const urls = text.match(/https?:\/\/\S+/g) ?? [];
  let stripped = text;
  for (const u of urls) stripped = stripped.replace(u, "");
  let len = urls.length * 23;
  for (const ch of stripped) len += ch.codePointAt(0) < 128 ? 1 : 2;
  return len;
}
function sha1(text) {
  return createHash("sha1").update(text).digest("hex").slice(0, 12);
}
function escapeForJson(s) {
  return s;
}

// 上限280に収まるよう、bulletsを末尾から削り、なお溢れればhookを切り詰める
function fitPost(hook, bullets, cta, url, tags) {
  const tail = [cta, url, tags.join(" ")].filter(Boolean).join("\n");
  let bs = bullets.slice();
  const compose = (h, b) => [[h, b.length ? b.join("\n") : ""].filter(Boolean).join("\n"), tail].join("\n");
  let text = compose(hook, bs);
  while (weightedLen(text) > 280 && bs.length) {
    bs.pop();
    text = compose(hook, bs);
  }
  if (weightedLen(text) > 280) {
    let h = hook;
    while (weightedLen(compose(h + "…", [])) > 280 && h.length > 8) h = h.slice(0, -1);
    text = compose(h + "…", []);
  }
  return text;
}

// --- フロントマター簡易パーサ ---
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

// --- diagnosis.ts から safeChecks/stopSigns を抽出(任意のリッチ化) ---
async function loadDiagnosisMap() {
  const map = {};
  try {
    const src = await readFile(new URL("src/data/diagnosis.ts", ROOT), "utf-8");
    const chunks = src.split(/id:\s*"/).slice(1);
    const extract = (text, key) => {
      const m = text.match(new RegExp(`${key}\\s*:\\s*\\[([\\s\\S]*?)\\]`));
      return m ? [...m[1].matchAll(/"([^"]*)"/g)].map((x) => x[1]) : [];
    };
    for (const chunk of chunks) {
      const safeChecks = extract(chunk, "safeChecks");
      const stopSigns = extract(chunk, "stopSigns");
      const slugs = extract(chunk, "articleSlugs");
      if (slugs[0]) map[slugs[0]] = { safeChecks, stopSigns };
    }
  } catch {
    /* diagnosis読込失敗時はdescriptionにフォールバック */
  }
  return map;
}

// --- 記事読込 ---
async function loadArticles() {
  const files = (await readdir(ARTICLES_DIR)).filter((f) => f.endsWith(".md"));
  const articles = [];
  for (const file of files) {
    const slug = file.replace(/\.md$/, "");
    // canonical判定: src/data/internalLinks.ts isCanonicalArticle と同等(-2 / " 2.md" を除外)
    if (slug.endsWith("-2") || file.endsWith(" 2.md")) continue;
    const raw = await readFile(new URL(file, ARTICLES_DIR), "utf-8");
    const fm = parseFrontmatter(raw);
    if (!fm || !fm.title) continue;
    articles.push({ slug, ...fm });
  }
  articles.sort((a, b) => String(a.slug).localeCompare(String(b.slug)));
  return articles;
}

// --- 投稿バリアント生成 ---
function buildXPosts(article, diag) {
  const url = `${SITE_URL}/articles/${article.slug}/`;
  const tags = tagsFor(article.category);
  const qa = Array.isArray(article.quickAnswer) ? article.quickAnswer : [];
  const symptoms = Array.isArray(article.symptoms) ? article.symptoms : [];
  const d = diag[article.slug] ?? {};
  const posts = [];
  const push = (variant, text) =>
    posts.push({
      id: `${article.slug}__${variant}`,
      articleSlug: article.slug,
      variant,
      text,
      imagePath: article.boardImage ?? "",
      imageUrl: article.boardImage ? `${SITE_URL}${article.boardImage}` : "",
      hash: sha1(text)
    });

  // 1. quick-answer
  if (qa.length) {
    const hook = qa[0];
    const bullets = qa.slice(1).map((b) => `・${b}`);
    push("quick-answer", fitPost(hook, bullets, "→詳しい安全手順はこちら", url, tags));
  }
  // 2. safe-check (diagnosisのsafeChecksがあれば数値リスト、なければdescription)
  if (d.safeChecks && d.safeChecks.length) {
    const hook = `${article.title}｜まず確認すること`;
    const bullets = d.safeChecks.map((s, i) => `${i + 1}. ${s}`);
    push("safe-check", fitPost(hook, bullets, "→続きと相談の目安はこちら", url, tags));
  } else if (article.description) {
    push("safe-check", fitPost(article.title, [article.description], "→記事で確認", url, tags));
  }
  // 3. question-hook
  {
    const topic = symptoms[0] ?? article.title;
    const hook = `「${topic}」で困っていませんか？`;
    const bullets = [qa[0] ?? article.description].filter(Boolean);
    push("question-hook", fitPost(hook, bullets, "→原因と対処を整理しました", url, tags));
  }
  // 4. risk-warning (risk:high か stopSigns があるときだけ)
  if (article.risk === "high" || (d.stopSigns && d.stopSigns.length)) {
    const hook = `⚠️${article.title}`;
    const bullets = [d.stopSigns?.[0] ?? qa[0] ?? article.description, "迷ったら使用を止めて確認を。"].filter(Boolean);
    push("risk-warning", fitPost(hook, bullets, "→危険サインの見分け方", url, tags));
  }
  return posts;
}

function buildYoutubeMeta(article) {
  const url = `${SITE_URL}/articles/${article.slug}/`;
  const tags = tagsFor(article.category);
  const qa = Array.isArray(article.quickAnswer) ? article.quickAnswer : [];
  const symptoms = Array.isArray(article.symptoms) ? article.symptoms : [];
  let title = `${article.title}｜${SITE_NAME}`;
  if ([...title].length > 70) title = `${[...article.title].slice(0, 60).join("")}｜${SITE_NAME}`;
  const description = [
    qa.length ? qa.map((q) => `・${q}`).join("\n") : article.description,
    "",
    "▼記事で詳しく（安全手順・チェックリスト）",
    url,
    "",
    "※当サイト/チャンネルには広告・アフィリエイトリンクを含みます。",
    tags.join(" ")
  ].join("\n");
  const ytTags = [...new Set([...symptoms, ...tags.map((t) => t.replace(/^#/, ""))])];
  return {
    articleSlug: article.slug,
    title,
    description,
    tags: ytTags,
    thumbnailHint: article.boardImage ?? ""
  };
}

// --- メイン ---
const diag = await loadDiagnosisMap();
const articles = await loadArticles();

let xPosts = articles.flatMap((a) => buildXPosts(a, diag));
xPosts = seededShuffle(xPosts, seed);
const youtubeMeta = articles.map((a) => buildYoutubeMeta(a));

// --- 検証 ---
async function fileExists(relPath) {
  try {
    await access(new URL(relPath.replace(/^\//, ""), PUBLIC_DIR));
    return true;
  } catch {
    return false;
  }
}
const errors = [];
const seenHash = new Set();
for (const p of xPosts) {
  const wl = weightedLen(p.text);
  if (wl > 280) errors.push(`[${p.id}] 加重文字数 ${wl} > 280`);
  if (!/^https:\/\/aircon-hokenshitsu\.com\/articles\//.test(p.text.match(/https?:\/\/\S+/)?.[0] ?? "")) {
    errors.push(`[${p.id}] 記事URLが不正/欠落`);
  }
  if (p.imagePath && !(await fileExists(p.imagePath))) errors.push(`[${p.id}] 画像が見つからない: ${p.imagePath}`);
  if (seenHash.has(p.hash)) errors.push(`[${p.id}] 本文ハッシュ重複`);
  seenHash.add(p.hash);
}

console.log(`記事数: ${articles.length} / X投稿バリアント: ${xPosts.length} / YouTubeメタ: ${youtubeMeta.length} / seed=${seed}`);
if (errors.length) {
  console.error(`検証エラー ${errors.length}件:`);
  for (const e of errors) console.error("  - " + e);
} else {
  console.log("検証OK（全件280字以内・画像存在・URL有効・重複なし）");
}

if (isCheck) {
  process.exit(errors.length ? 1 : 0);
}

if (isDryRun) {
  console.log("\n--- X posts (dry-run) ---");
  for (const p of xPosts.slice(0, 6)) console.log(`\n[${p.id}] (${weightedLen(p.text)})\n${p.text}`);
  console.log(`\n...(全${xPosts.length}件)`);
  process.exit(errors.length ? 1 : 0);
}

await mkdir(DATA_DIR, { recursive: true });
await writeFile(new URL("x-posts.json", DATA_DIR), JSON.stringify(xPosts, null, 2) + "\n", "utf-8");
await writeFile(new URL("youtube-meta.json", DATA_DIR), JSON.stringify(youtubeMeta, null, 2) + "\n", "utf-8");

// post-state.json は存在しなければ初期化(既存は上書きしない)
try {
  await access(new URL("post-state.json", DATA_DIR));
} catch {
  await writeFile(
    new URL("post-state.json", DATA_DIR),
    JSON.stringify({ posted: [], cursor: 0, lastRunAt: null }, null, 2) + "\n",
    "utf-8"
  );
}

console.log(`\n書き込み: data/x-posts.json, data/youtube-meta.json${errors.length ? "（※検証エラーあり）" : ""}`);
process.exit(errors.length ? 1 : 0);
