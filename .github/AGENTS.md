# AGENTS.md — エアコン修理高等学校

**Tier**: T0 | **Category**: work
**Tagline**: 症状から次の一手を選ぶエアコントラブル対処ガイド

中央運用マニュアル: https://github.com/165cm/portfolio/blob/main/docs/standards/README.md

## このリポジトリについて

Astro 製静的サイト。GitHub Actions で GitHub Pages (`https://165cm.github.io/aircon-repair/`) へデプロイ。エアコンの不調に関する情報を読者に提供し、安全な判断と次の行動を促す。

## 安全方針（変更禁止）

- 読者に案内してよい自力対応: フィルター、外装、室外機まわり、ドレンホース先端の確認のみ
- 内部洗浄・電気配線・冷媒・分解修理・200Vまわりは必ず専門業者へ誘導する
- 危険サイン（焦げ臭い・強い異音・水漏れ拡大・ブレーカー落下・室外機過熱）では使用停止と相談導線を優先する
- 商品紹介は「修理の代替」ではなく、安全な補助用品・確認用品・買い替え比較の補助として扱う

## 広告・アフィリエイト制約

- 全ページで広告・Amazonアソシエイト表記を維持する
- Amazonリンクは `AmazonLink.astro` と `src/data/affiliate.ts` の `amazonSearchUrl()` 経由で生成する
- 外部リンクは `target="_blank"` と `rel="sponsored nofollow noopener"` を維持する

## ビルド・パス制約

- 内部リンク・画像パスは `src/utils/paths.ts` の `sitePath()` を使う（`/aircon-repair` の base path 二重付与・付け忘れ防止）
- canonical・OG・構造化データなどの絶対URLは `absoluteUrl()` を使う
- `dist/` と `docs/` は生成物。git 管理しない・コミットしない
- GitHub Pages の Source は「GitHub Actions」に統一する（`/docs` 公開に戻さない）

## CVR 計測制約

- 主要 CTA には `data-cvr-action` 属性を付与する
- 計測種別は `safe`・`products`・`contractor`・`replacement` に揃える

## 開発フロー

```bash
npm run build   # dist/ を生成して確認
```

変更後はホーム・診断・商品・畳数の各導線で主要 CTA が崩れていないか確認する。
外部リンクの `rel`・`target` と `data-cvr-action` の付与漏れも確認する。

詳細は [Developer.md](../Developer.md) を参照。
