# Developer Notes

このリポジトリで作業する人向けの運用メモです。一般読者・サイト関係者向けの概要は [README.md](./README.md) を参照してください。

## 公開方式

- 本番URLは `https://165cm.github.io/aircon-repair/` です。
- Astro設定は `astro.config.mjs` で `site: "https://165cm.github.io"`、`base: "/aircon-repair"`、`output: "static"` になっています。
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

- 内部リンクや画像パスは原則 `src/utils/paths.ts` の `sitePath()` を使い、`/aircon-repair` の base path を二重付与・付け忘れしないようにします。
- 絶対URLが必要な canonical、OG、構造化データなどは `absoluteUrl()` を使います。
- Markdown本文内で内部リンクを直書きする場合は、公開URLに合わせて `/aircon-repair/...` から始めます。
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
- CSS内の `/aircon-repair/images/...` 参照について、Viteが「build timeに解決しないがruntimeで解決する」と警告する場合があります。画像が `public/images/` と生成後の `dist/images/` に存在するかを確認してください。
- 変更後は少なくとも対象ページ、ホーム、診断、商品導線、畳数導線の主要CTAが崩れていないか確認します。
- 外部リンクの `rel` と `target`、`data-cvr-action` の付与漏れも確認対象です。

## Gitでの注意

- 既存の未追跡ファイルが残っている場合があります。作業に関係ないものは削除・整形しないでください。
- `docs/` は生成物として削除済みです。再作成された場合もコミットしないでください。
- 公開確認はGitHub Actionsの `Deploy to GitHub Pages` workflow と、実際の公開URLで行います。
