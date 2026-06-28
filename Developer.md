# Developer Notes

このリポジトリで作業する人向けの運用メモです。一般読者・サイト関係者向けの概要は [README.md](./README.md) を参照してください。

## 公開方式

- 本番URLは `https://aircon-hokenshitsu.com/` です。
- Astro設定は `astro.config.mjs` で `site: "https://aircon-hokenshitsu.com"`、`base: "/"`、`output: "static"` になっています。
- GitHub Pages は `.github/workflows/deploy.yml` の GitHub Actions で公開します。
- Actions は `npm run build` で `dist/` を生成し、`actions/upload-pages-artifact@v3` の `path: dist` を `actions/deploy-pages@v4` でデプロイします。
- `docs/` は使いません。GitHub Pages の Source は「GitHub Actions」に統一し、ブランチの `/docs` 公開には戻さないでください。
- `dist/` と `docs/` は生成物としてgit管理しません。どちらも `.gitignore` の対象です。

## 実装の基本導線

1. ページやコンポーネントの編集は `src/` を主対象にします。
2. 画像などの静的アセットは `public/` に置きます。
3. `npm run build` で `dist/` を生成します。
4. 対象URLに対応する生成HTMLを `dist/` で確認します。
5. `docs/` を作成・同期しないでください。

## パスとリンク

- 内部リンクや画像パスは原則 `src/utils/paths.ts` の `sitePath()` を使い、独自ドメインのルート公開でもリンクが崩れないようにします。
- 絶対URLが必要な canonical、OG、構造化データなどは `absoluteUrl()` を使います。
- Markdown本文内で内部リンクを直書きする場合は、公開URLに合わせて `/...` から始めます。
- `#anchor` と外部URLは `sitePath()` がそのまま返す前提です。

## CVR計測

- 主KPIは「症状ごとの最適行動クリック」です。
- クリック計測は `data-cvr-action` と必要に応じて `data-action-kind` を付けます。
- `src/layouts/BaseLayout.astro` が `[data-cvr-action]` のクリックを拾い、`window.dataLayer` に `cvr_click` を push します。
- Amazonリンクは `src/components/AmazonLink.astro` でも専用の `amazon_click` を push します。
- 主要CTAの種別はおおむね `safe`、`products`、`contractor`、`replacement` に揃えます。

## 広告・外部リンク

- Amazonリンクは `AmazonLink.astro` を使い、`src/data/affiliate.ts` の `amazonSearchUrl()` 経由で生成します。
- 外部の広告・相談・商品リンクは `target="_blank"` と `rel="sponsored nofollow noopener"` を維持します。
- 全ページで広告・Amazonアソシエイト表記を維持します。
- AmazonアソシエイトID、業者紹介URL、求人ASP URLは `src/data/affiliate.ts` に集約されています。

## 安全方針

- 読者に案内してよい自力対応は、フィルター、外装、室外機まわり、ドレンホース先端の確認までです。
- 内部洗浄、電気配線、冷媒、分解修理、200Vまわりは専門業者・資格者へ誘導します。
- 焦げ臭い、異音が強い、水漏れが広がる、ブレーカーが落ちるなどの危険サインでは、使用停止と相談導線を優先します。
- 商品紹介は「修理の代替」ではなく、安全な補助用品、確認用品、買い替え比較の補助として扱います。

## 画像とアセット

- サイト内で使う画像は `public/images/` 配下に置きます。
- CVR改善で追加した主要画像は以下です。
  - `public/images/trust-hero-aircon-check.webp`
  - `public/images/safe-check-flow.webp`
  - `public/images/repair-or-replace.webp`
- 画像は人物なし、ブランドロゴなし、文字なし、危険な分解作業なしを基本にします。
- アイコンは新規ラスター画像を増やすより、CSSの疑似要素、inline SVG、既存UIで軽量に表現します。
- 記事の板書画像は `public/images/articles/*-board.webp` に置き、$imagegen で生成した黒板風ラスター画像を軽量化して使います。画像内の日本語は短いラベルに絞り、詳しい説明は本文・alt・figcaptionへ逃がします。
- 板書画像は「記事タイトルの答えに直結する概念」を1つだけ扱います。細かい情報を詰め込まず、矢印、確認順、触らない範囲を中心にします。
- 先生の立ち絵は `public/images/teachers/*.webp` に置きます。透過背景の軽量画像を使い、本文では役割説明より短いプロフィール文で親しみを出します。

## コンテンツ設計

- 初心者向け記事では「どこを見てよいか」と「どこから先は触らないか」を明確に分けます。
- 基礎知識ページはカード一覧だけにせず、読む順番が分かる目次型にします。
- 10〜15分で全体像をつかむ大項目と、深掘り用の記事群を分けて配置します。
- 記事ページは「固定挨拶 → 担当教師 → 1分結論 → 板書 → 安全注意 → 本文 → 次の一手CTA」の順を基本にします。
- 商品・業者・買い替えCTAは、読者が判断材料を得た後に出すことを基本にします。冒頭には結論と安全判断を優先します。
- 教師キャラは `src/data/teachers.ts` に集約します。記事frontmatterの `teacher` で担当を指定し、キャラは補助役として使います。本文の安全注意・費用判断ではふざけすぎず、口癖は短い補足に留めます。
- 主要教師は、熱逃 冷太郎（熱と仕組み）、止室 守（安全指導）、風通 清志（掃除と空気）、水道 ぬける（排水）、買替 進路（買い替え進路）、現場 実（仕事入門）です。

## ビルドと確認

- 通常は `npm run build` を使います。
- 環境によって `npm` が使えない場合は、利用可能な Node.js で `node node_modules/astro/astro.js build` を実行します。
- CSS内で画像を参照する場合は `/images/...` を使います。画像が `public/images/` と生成後の `dist/images/` に存在するかを確認してください。
- 変更後は少なくとも対象ページ、ホーム、診断、商品導線、畳数導線の主要CTAが崩れていないか確認します。
- 外部リンクの `rel` と `target`、`data-cvr-action` の付与漏れも確認対象です。

## GSC連動コンテンツ拡充

Google Search Console (GSC) の検索パフォーマンスを読み取り、検索需要に基づいて記事を増やす/改善する仕組みです。自動公開はせず、必ずPRレビューを挟みます。

### 構成

- `scripts/fetch-gsc.mjs` — GSC Search Analytics API からクエリ別/ページ別データを取得し `data/gsc/queries.json`・`data/gsc/pages.json` に保存します。サービスアカウント方式で、依存追加なし（`node:crypto` でJWT(RS256)を自作してトークン交換）。
- `scripts/gsc-content-ideas.mjs` — 上記データと既存記事(`src/content/articles/*.md`)を突き合わせ、「未カバーの高需要クエリ(新規候補)」「順位が伸びない既存記事(リライト候補)」を `data/gsc-content-ideas.json` に優先度順で出力します。
- `.claude/skills/gsc-content/SKILL.md` — Claude Code が上記データを基に記事ドラフトを書き、`npm run build` で検証し、PRを作るためのスキル。安全方針・文体・スキーマ準拠を明記しています。
- `.github/workflows/gsc-fetch.yml` — 週次でデータを更新し `data/` にコミットするワークフロー（記事執筆はしない）。
- npm scripts: `npm run gsc:fetch` / `npm run gsc:ideas` / `npm run check:gsc`。

### セットアップ

1. **GCPでサービスアカウント作成**: Google Cloud で「Search Console API」を有効化し、サービスアカウントを作成してJSON鍵をダウンロードします。
2. **GSC側でユーザー追加**: Search Console の対象プロパティ → 設定 → ユーザーと権限 で、上記サービスアカウントのメールアドレス（`xxx@xxx.iam.gserviceaccount.com`）を「制限付き」以上で追加します。**これをしないとAPIが403を返します。**
3. **シークレット登録**: GitHub の Secrets に以下を登録します。
   - `GSC_SERVICE_ACCOUNT_JSON`: 鍵JSONの中身（文字列）
   - `GSC_SITE_URL`: 例 `sc-domain:aircon-hokenshitsu.com`（ドメインプロパティ）または `https://aircon-hokenshitsu.com/`（URLプレフィックス）
4. **ローカル実行**: 上記2つを環境変数に設定して `npm run gsc:fetch`。`GSC_SERVICE_ACCOUNT_JSON` には鍵JSONファイルのパスも指定できます。

鍵JSON・アクセストークンは絶対にコミットしません（`.gitignore` で `*service-account*.json` 等を除外済み）。コミットするのは集計済みの `data/gsc/` と `data/gsc-content-ideas.json` のみです。

### 使い方（記事を増やす）

Claude Code セッションで `gsc-content` スキルを起動すると、データ取得 → テーマ選定 → ドラフト作成 → ビルド検証 → PR作成まで案内します。GSCの所有権確認メタタグが必要な場合は `src/data/affiliate.ts` の `googleSiteVerification` に設定します（値はコミット可否を運用方針に合わせて判断）。

## Gitでの注意

- 既存の未追跡ファイルが残っている場合があります。作業に関係ないものは削除・整形しないでください。
- `docs/` は生成物として削除済みです。再作成された場合もコミットしないでください。
- 公開確認はGitHub Actionsの `Deploy to GitHub Pages` workflow と、実際の公開URLで行います。
