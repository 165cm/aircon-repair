import { getCollection } from "astro:content";
import { affiliate } from "@data/affiliate";
import { getCanonicalArticles } from "@data/internalLinks";
import { productCategories } from "@data/products";
import { absoluteUrl } from "@utils/paths";

export async function GET() {
  const articles = getCanonicalArticles(await getCollection("articles"));
  const staticPaths = [
    "/",
    "/diagnosis/",
    "/by-size/",
    "/basics/",
    "/cleaning-prevention/",
    "/products/",
    "/jobs/",
    "/disclaimer/",
    "/articles/",
    "/about/"
  ];
  const articlePaths = articles.map((article) => `/articles/${article.slug}/`);
  const productPaths = productCategories.map((product) => `/products/${product.id}/`);
  const urls = [...staticPaths, ...articlePaths, ...productPaths]
    .map((path) => `<url><loc>${absoluteUrl(path)}</loc></url>`)
    .join("");

  return new Response(`<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls}</urlset>`, {
    headers: {
      "Content-Type": "application/xml"
    }
  });
}
