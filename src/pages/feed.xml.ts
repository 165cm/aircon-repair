import { getCollection } from "astro:content";
import { affiliate } from "@data/affiliate";
import { getCanonicalArticles } from "@data/internalLinks";
import { articleThumbnail } from "@utils/articles";
import { absoluteUrl } from "@utils/paths";

function escapeXml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export async function GET() {
  const articles = getCanonicalArticles(await getCollection("articles")).sort((a, b) => {
    const aDate = (a.data.updatedDate ?? a.data.pubDate).valueOf();
    const bDate = (b.data.updatedDate ?? b.data.pubDate).valueOf();
    return bDate - aDate;
  });

  const lastBuildDate = new Date().toUTCString();
  const items = articles
    .map((article) => {
      const link = absoluteUrl(`/articles/${article.slug}/`);
      const image = absoluteUrl(articleThumbnail(article));
      const pubDate = (article.data.updatedDate ?? article.data.pubDate).toUTCString();
      return `<item><title>${escapeXml(article.data.title)}</title><link>${link}</link><guid isPermaLink="true">${link}</guid><pubDate>${pubDate}</pubDate><description>${escapeXml(article.data.description)}</description><enclosure url="${image}" type="image/webp"/></item>`;
    })
    .join("");

  const xml = `<?xml version="1.0" encoding="UTF-8"?><rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom"><channel><title>${escapeXml(affiliate.siteName)}</title><link>${absoluteUrl("/")}</link><atom:link href="${absoluteUrl("/feed.xml")}" rel="self" type="application/rss+xml"/><description>${escapeXml("エアコンの症状別トラブル対処・掃除予防・買い替え判断ガイド")}</description><language>ja</language><lastBuildDate>${lastBuildDate}</lastBuildDate>${items}</channel></rss>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml"
    }
  });
}
