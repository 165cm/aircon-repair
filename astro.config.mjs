import { defineConfig } from "astro/config";

const BASE = "/aircon-repair";

function rehypeBaseUrl() {
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
  site: "https://165cm.github.io",
  base: BASE,
  output: "static",
  markdown: {
    rehypePlugins: [rehypeBaseUrl]
  }
});
