// Google Search Console (GSC) の検索パフォーマンスを取得して data/gsc/ に保存する。
// 使い方:
//   node scripts/fetch-gsc.mjs              ... data/gsc/queries.json と pages.json を生成
//   node scripts/fetch-gsc.mjs --days=28    ... 取得期間を指定(既定28日)
//   node scripts/fetch-gsc.mjs --dry-run    ... 取得結果を標準出力するだけ(書き込みなし)
//
// 認証: サービスアカウント方式。googleapis等の依存は足さず、node:crypto で JWT(RS256) を自作し
//       token エンドポイントで access token に交換する(scripts/youtube-upload.mjs と同じ流儀)。
// 必須env:
//   GSC_SITE_URL              ... 例 "sc-domain:aircon-hokenshitsu.com" または "https://aircon-hokenshitsu.com/"
//   GSC_SERVICE_ACCOUNT_JSON  ... サービスアカウント鍵JSONの「中身の文字列」、または鍵JSONファイルのパス
// 注: サービスアカウントは GSC プロパティ側で当該SAのメールをユーザー追加しないと 403 になる。
import { readFile, writeFile, mkdir, stat } from "node:fs/promises";
import { createSign } from "node:crypto";

const ROOT = new URL("../", import.meta.url);
const GSC_DIR = new URL("data/gsc/", ROOT);
const SCOPE = "https://www.googleapis.com/auth/webmasters.readonly";

// --- CLI ---
const args = process.argv.slice(2);
const isDryRun = args.includes("--dry-run") || args.includes("--print");
const days = Number((args.find((a) => a.startsWith("--days=")) ?? "--days=28").split("=")[1]) || 28;
const rowLimit = Number((args.find((a) => a.startsWith("--rows=")) ?? "--rows=1000").split("=")[1]) || 1000;

function fail(msg) {
  console.error(msg);
  process.exit(1);
}

// --- サービスアカウント鍵の読込(中身 or ファイルパスの両対応) ---
async function loadServiceAccount() {
  const raw = process.env.GSC_SERVICE_ACCOUNT_JSON;
  if (!raw) fail("必須の環境変数が未設定: GSC_SERVICE_ACCOUNT_JSON(鍵JSONの中身、または鍵ファイルのパス)");
  let text = raw.trim();
  if (!text.startsWith("{")) {
    // ファイルパスとして解釈
    try {
      await stat(text);
      text = await readFile(text, "utf-8");
    } catch {
      fail(`GSC_SERVICE_ACCOUNT_JSON はJSONでもなく、ファイルとしても読めない: ${raw.slice(0, 40)}...`);
    }
  }
  let sa;
  try {
    sa = JSON.parse(text);
  } catch {
    fail("GSC_SERVICE_ACCOUNT_JSON のJSONパースに失敗");
  }
  if (!sa.client_email || !sa.private_key) fail("鍵JSONに client_email / private_key がない");
  return sa;
}

// --- JWT(RS256) を自作して access token に交換 ---
function base64url(input) {
  return Buffer.from(input).toString("base64").replace(/=/g, "").replace(/\+/g, "-").replace(/\//g, "_");
}

async function getAccessToken(sa) {
  const tokenUri = sa.token_uri || "https://oauth2.googleapis.com/token";
  const now = Math.floor(Date.now() / 1000);
  const header = base64url(JSON.stringify({ alg: "RS256", typ: "JWT" }));
  const claims = base64url(
    JSON.stringify({ iss: sa.client_email, scope: SCOPE, aud: tokenUri, iat: now, exp: now + 3600 })
  );
  const signingInput = `${header}.${claims}`;
  const signature = createSign("RSA-SHA256").update(signingInput).sign(sa.private_key);
  const assertion = `${signingInput}.${base64url(signature)}`;

  const res = await fetch(tokenUri, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer",
      assertion
    })
  });
  if (!res.ok) fail(`アクセストークン取得失敗: ${res.status} ${await res.text()}`);
  return (await res.json()).access_token;
}

// --- Search Analytics クエリ ---
function ymd(d) {
  return d.toISOString().slice(0, 10);
}

async function querySearchAnalytics(accessToken, siteUrl, dimensions, startDate, endDate) {
  const endpoint = `https://www.googleapis.com/webmasters/v3/sites/${encodeURIComponent(siteUrl)}/searchAnalytics/query`;
  const res = await fetch(endpoint, {
    method: "POST",
    headers: { Authorization: `Bearer ${accessToken}`, "Content-Type": "application/json" },
    body: JSON.stringify({ startDate, endDate, dimensions, rowLimit, dataState: "all" })
  });
  if (!res.ok) {
    const body = await res.text();
    if (res.status === 403) {
      fail(
        `GSC API 403: サービスアカウント(${sa.client_email})が GSC プロパティ「${siteUrl}」に追加されていない可能性。` +
          `Search Console の設定→ユーザーと権限 でSAのメールを追加してください。\n${body}`
      );
    }
    fail(`GSC API エラー: ${res.status} ${body}`);
  }
  return (await res.json()).rows ?? [];
}

// --- メイン ---
const siteUrl = process.env.GSC_SITE_URL;
if (!siteUrl) fail('必須の環境変数が未設定: GSC_SITE_URL(例 "sc-domain:aircon-hokenshitsu.com")');

const sa = await loadServiceAccount();
const accessToken = await getAccessToken(sa);

const end = new Date();
end.setUTCDate(end.getUTCDate() - 2); // GSCは直近2日が未確定なので余裕を持たせる
const start = new Date(end);
start.setUTCDate(start.getUTCDate() - (days - 1));
const startDate = ymd(start);
const endDate = ymd(end);

const queryRows = await querySearchAnalytics(accessToken, siteUrl, ["query"], startDate, endDate);
const pageRows = await querySearchAnalytics(accessToken, siteUrl, ["page", "query"], startDate, endDate);

const round = (n, p = 4) => Math.round(n * 10 ** p) / 10 ** p;
const queries = queryRows
  .map((r) => ({
    query: r.keys[0],
    clicks: r.clicks ?? 0,
    impressions: r.impressions ?? 0,
    ctr: round(r.ctr ?? 0),
    position: round(r.position ?? 0, 2)
  }))
  .sort((a, b) => b.impressions - a.impressions);

const pages = pageRows
  .map((r) => ({
    page: r.keys[0],
    query: r.keys[1],
    clicks: r.clicks ?? 0,
    impressions: r.impressions ?? 0,
    ctr: round(r.ctr ?? 0),
    position: round(r.position ?? 0, 2)
  }))
  .sort((a, b) => b.impressions - a.impressions);

const meta = { siteUrl, startDate, endDate, fetchedAt: new Date().toISOString() };

if (isDryRun) {
  console.log(`# GSC ${meta.startDate}〜${meta.endDate} (${meta.siteUrl})`);
  console.log(`クエリ数: ${queries.length} / ページ×クエリ行: ${pages.length}`);
  console.log("\n上位クエリ(impressions順):");
  for (const q of queries.slice(0, 20)) {
    console.log(`  ${q.impressions}imp ${q.clicks}clk ctr${(q.ctr * 100).toFixed(1)}% pos${q.position}  ${q.query}`);
  }
  process.exit(0);
}

await mkdir(GSC_DIR, { recursive: true });
await writeFile(new URL("queries.json", GSC_DIR), JSON.stringify({ meta, rows: queries }, null, 2) + "\n");
await writeFile(new URL("pages.json", GSC_DIR), JSON.stringify({ meta, rows: pages }, null, 2) + "\n");
console.log(`保存しました: data/gsc/queries.json (${queries.length}件) / data/gsc/pages.json (${pages.length}件)`);
console.log(`期間: ${meta.startDate}〜${meta.endDate}`);
