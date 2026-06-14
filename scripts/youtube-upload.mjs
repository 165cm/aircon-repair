// YouTube Data API v3 で動画を1本アップロードする(無料クォータ: 1本=1600単位 / 日10000)。
// data/youtube-meta.json の該当slugから title/description/tags を適用する。
// 必須env: YT_CLIENT_ID, YT_CLIENT_SECRET, YT_REFRESH_TOKEN, ARTICLE_SLUG, VIDEO_PATH
// 任意env: PRIVACY (private|unlisted|public, 既定unlisted)
import { readFile } from "node:fs/promises";

const { YT_CLIENT_ID, YT_CLIENT_SECRET, YT_REFRESH_TOKEN, ARTICLE_SLUG, VIDEO_PATH } = process.env;
const PRIVACY = process.env.PRIVACY ?? "unlisted";

for (const [k, v] of Object.entries({ YT_CLIENT_ID, YT_CLIENT_SECRET, YT_REFRESH_TOKEN, ARTICLE_SLUG, VIDEO_PATH })) {
  if (!v) {
    console.error(`必須の環境変数が未設定: ${k}`);
    process.exit(1);
  }
}

const ROOT = new URL("../", import.meta.url);
const meta = JSON.parse(await readFile(new URL("data/youtube-meta.json", ROOT), "utf-8"));
const item = meta.find((m) => m.articleSlug === ARTICLE_SLUG);
if (!item) {
  console.error(`youtube-meta.json に articleSlug=${ARTICLE_SLUG} が見つからない`);
  process.exit(1);
}

// 1) refresh token -> access token
const tokenRes = await fetch("https://oauth2.googleapis.com/token", {
  method: "POST",
  headers: { "Content-Type": "application/x-www-form-urlencoded" },
  body: new URLSearchParams({
    client_id: YT_CLIENT_ID,
    client_secret: YT_CLIENT_SECRET,
    refresh_token: YT_REFRESH_TOKEN,
    grant_type: "refresh_token"
  })
});
if (!tokenRes.ok) {
  console.error("アクセストークン取得失敗:", tokenRes.status, await tokenRes.text());
  process.exit(1);
}
const accessToken = (await tokenRes.json()).access_token;

// 2) resumable upload を開始(メタデータ送信)
const body = {
  snippet: { title: item.title, description: item.description, tags: item.tags, categoryId: "26" },
  status: { privacyStatus: PRIVACY, selfDeclaredMadeForKids: false }
};
const initRes = await fetch(
  "https://www.googleapis.com/upload/youtube/v3/videos?uploadType=resumable&part=snippet,status",
  {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json; charset=UTF-8",
      "X-Upload-Content-Type": "video/*"
    },
    body: JSON.stringify(body)
  }
);
if (!initRes.ok) {
  console.error("アップロード開始失敗:", initRes.status, await initRes.text());
  process.exit(1);
}
const uploadUrl = initRes.headers.get("location");
if (!uploadUrl) {
  console.error("resumable upload URL(Location)が取得できない");
  process.exit(1);
}

// 3) 動画本体をアップロード
const videoBytes = await readFile(new URL(VIDEO_PATH, "file:///"));
const upRes = await fetch(uploadUrl, {
  method: "PUT",
  headers: { "Content-Type": "video/*" },
  body: videoBytes
});
if (!upRes.ok) {
  console.error("動画アップロード失敗:", upRes.status, await upRes.text());
  process.exit(1);
}
const result = await upRes.json();
console.log(`アップロード成功: https://youtu.be/${result.id} (${PRIVACY})`);
console.log(`タイトル: ${item.title}`);
