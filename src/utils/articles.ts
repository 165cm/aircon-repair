import type { CollectionEntry } from "astro:content";

export const articleThumbnail = (article: CollectionEntry<"articles">) => {
  if (article.data.boardImage) {
    return article.data.boardImage;
  }

  return article.body.match(/!\[[^\]]*\]\(([^)]+)\)/)?.[1] ?? "/images/articles/basics-safe-check-zones.webp";
};
