// ビルド済みHTMLを検査。アフィリエイトの購入ガイドを販売商品として出力しない。
import assert from "node:assert/strict";
import { readdir, readFile } from "node:fs/promises";

const dist = new URL("../dist/", import.meta.url);
const forbiddenTypes = new Set(["Product", "ProductGroup", "Offer", "AggregateOffer"]);
let htmlCount = 0;
let guideCount = 0;

function collectNodes(value, nodes = []) {
  if (Array.isArray(value)) {
    value.forEach((item) => collectNodes(item, nodes));
  } else if (value && typeof value === "object") {
    nodes.push(value);
    Object.values(value).forEach((item) => collectNodes(item, nodes));
  }
  return nodes;
}

async function checkDirectory(directory, prefix = "") {
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const path = `${prefix}${entry.name}`;
    const url = new URL(entry.name, directory);
    if (entry.isDirectory()) {
      await checkDirectory(new URL(`${entry.name}/`, directory), `${path}/`);
      continue;
    }
    if (!entry.name.endsWith(".html")) continue;
    htmlCount++;
    const html = await readFile(url, "utf8");
    const blocks = [...html.matchAll(/<script\b[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi)];
    const nodes = blocks.flatMap((match) => {
      try {
        return collectNodes(JSON.parse(match[1]));
      } catch (error) {
        throw new Error(`${path}: invalid JSON-LD`, { cause: error });
      }
    });
    const hasType = (node, type) => [node["@type"]].flat().includes(type);
    for (const node of nodes) {
      for (const type of [node["@type"]].flat()) {
        const shortType = typeof type === "string" ? type.replace(/^https?:\/\/schema\.org\//, "") : type;
        assert(!forbiddenTypes.has(shortType), `${path}: unexpected merchant/product type ${type}`);
      }
    }
    if (!/^products\/[^/]+\/index\.html$/.test(path)) continue;
    guideCount++;
    const page = nodes.find((node) => hasType(node, "WebPage"));
    assert(page, `${path}: missing WebPage`);
    const canonical = html.match(/<link\b[^>]*rel="canonical"[^>]*href="([^"]+)"/)?.[1];
    assert(canonical, `${path}: missing canonical`);
    assert.equal(page.url, canonical, `${path}: WebPage URL must match canonical`);
    assert.equal(page["@id"], canonical, `${path}: WebPage ID must match canonical`);
    assert(page.name && page.description, `${path}: missing page metadata`);
    assert.equal(page.inLanguage, "ja", `${path}: missing language`);
    assert(nodes.some((node) => hasType(node, "FAQPage")), `${path}: missing FAQPage`);
    assert(nodes.some((node) => hasType(node, "BreadcrumbList")), `${path}: missing BreadcrumbList`);
  }
}

await checkDirectory(dist);
assert(guideCount > 0, "No product guides found. Run npm run build first.");
console.log(`Structured data OK: ${htmlCount} HTML pages, ${guideCount} product guides; no Product/Offer markup.`);
