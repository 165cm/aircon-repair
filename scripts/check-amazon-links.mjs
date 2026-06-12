// 商品データのASIN・参考価格の鮮度チェック補助スクリプト。
// 使い方:
//   node scripts/check-amazon-links.mjs          ... ASIN一覧と確認用URLを表示
//   node scripts/check-amazon-links.mjs --fetch  ... 各ASINページへHEADリクエストして死活確認(要ネットワーク)
// 価格改定・型番の年次切り替えを見直したら、src/data/products.ts の priceCheckedAt も更新する。
import { readFile } from "node:fs/promises";

const source = await readFile(new URL("../src/data/products.ts", import.meta.url), "utf-8");

const checkedAt = source.match(/priceCheckedAt = "([^"]+)"/)?.[1] ?? "(未設定)";
const asinEntries = [...source.matchAll(/amazonAsin: "([A-Z0-9]{10})"/g)].map((match) => match[1]);
const uniqueAsins = [...new Set(asinEntries)];
const searchKeywords = [...new Set([...source.matchAll(/amazonKeyword: "([^"]+)"/g)].map((match) => match[1]))];

console.log(`価格・ASIN最終確認日: ${checkedAt}`);
console.log(`ASIN数: ${uniqueAsins.length}（重複参照含め ${asinEntries.length} 箇所） / 検索キーワード数: ${searchKeywords.length}`);
console.log("");

if (process.argv.includes("--fetch")) {
  for (const asin of uniqueAsins) {
    const url = `https://www.amazon.co.jp/dp/${asin}`;
    try {
      const response = await fetch(url, { method: "HEAD", redirect: "manual" });
      const mark = response.status < 400 ? "OK " : "NG ";
      console.log(`${mark} ${response.status} ${url}`);
    } catch (error) {
      console.log(`ERR --- ${url} (${error.message})`);
    }
  }
} else {
  console.log("確認用URL（ブラウザで開いて在庫・価格・型番の年次を確認）:");
  for (const asin of uniqueAsins) {
    console.log(`  https://www.amazon.co.jp/dp/${asin}`);
  }
}
