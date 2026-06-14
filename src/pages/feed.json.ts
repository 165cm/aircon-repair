import { getCollection } from "astro:content";
import { affiliate } from "@data/affiliate";
import { getCanonicalArticles } from "@data/internalLinks";
import { articleThumbnail } from "@utils/articles";
import { absoluteUrl } from "@utils/paths";

export async function GET() {
  const articles = getCanonicalArticles(await getCollection("articles")).sort((a, b) => {
    const aDate = (a.data.updatedDate ?? a.data.pubDate).valueOf();
    const bDate = (b.data.updatedDate ?? b.data.pubDate).valueOf();
    return bDate - aDate;
  });

  const feed = {
    version: "https://jsonfeed.org/version/1.1",
    title: affiliate.siteName,
    home_page_url: absoluteUrl("/"),
    feed_url: absoluteUrl("/feed.json"),
    language: "ja",
    items: articles.map((article) => ({
      id: absoluteUrl(`/articles/${article.slug}/`),
      url: absoluteUrl(`/articles/${article.slug}/`),
      title: article.data.title,
      summary: article.data.description,
      image: absoluteUrl(articleThumbnail(article)),
      date_published: article.data.pubDate.toISOString(),
      date_modified: (article.data.updatedDate ?? article.data.pubDate).toISOString(),
      tags: article.data.symptoms
    }))
  };

  return new Response(JSON.stringify(feed), {
    headers: {
      "Content-Type": "application/feed+json"
    }
  });
}
