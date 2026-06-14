// data/x-posts.json から「次に出す1件」を選び、コピペ用に出力して状態を更新する。
// X APIの無料枠は廃止され、URL付き投稿は有料($0.20/件)のため、本スクリプトは
// 投稿そのものは行わず「人が手動でコピペする」前提のエクスポートに徹する(=完全無料)。
//
// 環境変数 POST_DRIVER:
//   manual-export (既定) ... data/outbox/<date>.md と GitHub Step Summary に出力し、状態を更新
//   dry-run            ... 選定結果を表示するだけ。書き込み・状態更新なし
import { readFile, writeFile, mkdir, appendFile } from "node:fs/promises";

const ROOT = new URL("../", import.meta.url);
const DATA_DIR = new URL("data/", ROOT);
const driver = process.env.POST_DRIVER ?? "manual-export";

const posts = JSON.parse(await readFile(new URL("x-posts.json", DATA_DIR), "utf-8"));
let state;
try {
  state = JSON.parse(await readFile(new URL("post-state.json", DATA_DIR), "utf-8"));
} catch {
  state = { posted: [], cursor: 0, lastRunAt: null };
}

const postedIds = new Set(state.posted.map((p) => p.id));
const lastArticle = state.posted.at(-1)?.articleSlug ?? null;

// 未投稿を配列順(seedシャッフル済み)で探索。直前と同じ記事は後回しにして分散。
let candidates = posts.filter((p) => !postedIds.has(p.id));
if (candidates.length === 0) {
  // 全消化したら再循環(履歴をリセット)
  state.posted = [];
  candidates = posts.slice();
}
const next = candidates.find((p) => p.articleSlug !== lastArticle) ?? candidates[0];

console.log(`driver=${driver} / 残り未投稿=${candidates.length} / 選定=${next.id}`);
console.log("\n----- コピペ用 -----\n" + next.text + "\n--------------------");
console.log(`画像(任意で添付): ${next.imageUrl || "(なし)"}`);

if (driver === "dry-run") {
  console.log("\n[dry-run] 状態は更新しません。");
  process.exit(0);
}

// manual-export: outbox と Step Summary に書き出し、状態を更新
const today = new Date().toISOString().slice(0, 10);
await mkdir(new URL("outbox/", DATA_DIR), { recursive: true });
const block = `\n## ${today} — ${next.id}\n\n\`\`\`\n${next.text}\n\`\`\`\n\n画像: ${next.imageUrl || "(なし)"}\n`;
await appendFile(new URL(`outbox/${today}.md`, DATA_DIR), block, "utf-8");

if (process.env.GITHUB_STEP_SUMMARY) {
  await appendFile(
    process.env.GITHUB_STEP_SUMMARY,
    `### 今日のX投稿（コピペして手動投稿）\n\n\`\`\`\n${next.text}\n\`\`\`\n\n画像URL: ${next.imageUrl || "(なし)"}\n`,
    "utf-8"
  );
}

state.posted.push({ id: next.id, articleSlug: next.articleSlug, postedAt: new Date().toISOString() });
state.cursor = (state.cursor ?? 0) + 1;
state.lastRunAt = new Date().toISOString();
await writeFile(new URL("post-state.json", DATA_DIR), JSON.stringify(state, null, 2) + "\n", "utf-8");

console.log(`\n書き出し: data/outbox/${today}.md / 状態更新: data/post-state.json`);
