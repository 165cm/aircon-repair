---
name: gsc-content
description: Google Search Console のデータを読み取り、検索需要に基づいて新規記事ドラフトの作成や既存記事のリライトを行う。「サーチコンソール」「GSC」「検索needs/クエリから記事」「アクセスを伸ばす記事」「コンテンツを増やす」といった依頼で使う。エアコン保健室(aircon-hokenshitsu.com)専用。
---

# GSC 連動コンテンツ拡充スキル

Google Search Console の検索パフォーマンス(クエリ・表示回数・CTR・掲載順位)から
「需要はあるのに記事が無い/順位が伸びていない」テーマを見つけ、安全方針と文体を守った
記事ドラフトを作って **PR としてレビューに回す**ためのスキル。自動公開はしない。

## 前提・制約(必ず守る)

1. **安全方針** (`.github/AGENTS.md`):
   - 読者に案内してよい自力対応は **フィルター・外装・室外機まわり・ドレンホース先端の確認のみ**。
   - 内部洗浄・電気配線・冷媒・分解修理・200Vまわりは **必ず専門業者へ誘導**する。
   - 危険サイン(焦げ臭い・強い異音・水漏れ拡大・ブレーカー落下・室外機過熱)は使用停止と相談導線を優先。
   - 商品は「修理の代替」ではなく、安全な補助/確認/買い替え比較の補助として扱う。
2. **文体・トンマナ** (`DESIGN_TONE.md`): 保健室の先生口調。最初に売らない。不安を受け止めてから説明。
3. **スキーマ準拠** (`src/content/config.ts`): フロントマターは Zod スキーマに完全準拠。違反すると `npm run build` が落ちる。

## 手順

### 1. データを用意する

GSC の鍵(環境変数 `GSC_SERVICE_ACCOUNT_JSON`, `GSC_SITE_URL`)があれば取得する:

```bash
node scripts/fetch-gsc.mjs          # data/gsc/queries.json, pages.json を更新
node scripts/gsc-content-ideas.mjs  # data/gsc-content-ideas.json を生成
```

鍵が無い/取得に失敗する場合は、リポジトリにコミット済みの `data/gsc/*.json`
(週次ワークフロー `gsc-fetch.yml` が更新)をそのまま使い、`gsc-content-ideas.mjs` だけ実行する。
どちらも無ければユーザーに鍵設定を案内して中断する。

### 2. テーマを1つ選ぶ

`data/gsc-content-ideas.json` を読み、`score` 上位から選ぶ。ユーザー指定のテーマがあればそれを優先。
- `type: "new"` → 新規記事を作る。
- `type: "rewrite"` → `matchedSlug` の既存記事を改善する。

選んだら、なぜそれを選んだか(クエリ・impressions・position)を一言ユーザーに伝える。

### 3-A. 新規記事を作る場合

`src/content/articles/<slug>.md` を作成。slug は英数ハイフンの URL セーフな短い語。

フロントマターは `src/content/articles/not-cooling.md` を手本にし、スキーマに従う:
- `category`: `symptom | basics | cleaning | career | buying | energy-saving` から選ぶ(ideas の `suggestedCategory` が目安)。
- `risk`: `low | medium | high`。内部/電気/冷媒に触れざるを得ない話題は `high` 寄り。
- `recommendedCta`: `products | contractor | jobs | learn`。
- `teacher`(任意): `netsugashi-reitaro | tomuro-mamoru | kazetooshi-kiyoshi | mizumichi-nukeru | kaikae-shinji | genba-minoru` のいずれか。テーマに合うものを `src/data/teachers.ts` で確認して選ぶ。
- `symptoms` / `relatedArticles` / `products`: **既存の値/ID/slug のみ**参照する。
  - `products` の ID は `src/data/products.ts`、`relatedArticles` の slug は `src/content/articles/` の実在ファイルで確認。存在しない値を書くとビルドが落ちる。
- `boardImage` は対応画像が `public/images/articles/` に無ければ省略してよい(任意項目)。
- `pubDate` は本日の日付。

本文の構成(既存記事に倣う):
1. 導入(不安を受け止める一文)
2. 安全に確認できる順序(設定→外側→… の番号付き手順)
3. 🚫 触らない場所(内部/配線/冷媒/室外機内部)
4. 危険サインと、業者相談 or 買い替え検討への導線
本文中の内部リンクは相対パスでなく記事/ページの正規URL方針に従う(`src/utils/paths.ts` の `sitePath()` 前提)。

### 3-B. 既存記事をリライトする場合

`src/content/articles/<matchedSlug>.md` を編集する。
- 対象クエリの意図(検索語)に答える見出し・段落を追記/改善する。
- `quickAnswer` や `description` を、対象クエリで検索した人が知りたい結論に寄せる。
- フロントマターの `updatedDate` を本日の日付に設定(無ければ追加)。
- 既存の安全方針・文体・構成は崩さない。

### 4. 検証する

```bash
npm run build
```

スキーマ違反(不正な enum、存在しない relatedArticles slug など)があればここで落ちる。必ず通す。
ビルド後、主要 CTA・外部リンクの `rel`/`target`・`data-cvr-action` が崩れていないかも意識する(`.github/AGENTS.md`)。

### 5. PR を作る

作業ブランチ(既定 `claude/search-console-auto-content-3i0m0n`)にコミットして push し、PR を作成する。
PR 本文には必ず以下を書く:
- 対象クエリと GSC 指標(impressions / CTR / position)
- 新規 or リライトの別と対象 slug
- 想定読者と、その人が解決したいこと
- 安全方針を守っていること(危険作業は業者誘導にしている旨)

**マージはしない。** 人間のレビューを待つ。マージされると `deploy.yml` が GitHub Pages へ公開する。

## 注意

- 鍵 JSON・アクセストークンは絶対にコミットしない。`data/gsc/` の集計データのみコミット対象。
- 1回の実行で扱う記事は原則1本。まとめて大量生成しない(レビュー負荷と品質のため)。
