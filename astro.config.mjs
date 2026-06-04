import { defineConfig } from "astro/config";

const SITE_URL = "https://aircon-hokenshitsu.com";
const BASE = "/";

function rehypeBaseUrl() {
  if (BASE === "/") {
    return () => {};
  }

  function walk(node) {
    if (node.tagName === "img" && typeof node.properties?.src === "string") {
      const src = node.properties.src;
      if (src.startsWith("/") && !src.startsWith(`${BASE}/`) && !src.startsWith("//")) {
        node.properties.src = `${BASE}${src}`;
      }
    }
    if (node.children) node.children.forEach(walk);
  }
  return (tree) => walk(tree);
}

export default defineConfig({
  site: SITE_URL,
  base: BASE,
  output: "static",
  markdown: {
    rehypePlugins: [rehypeBaseUrl]
  }
});
