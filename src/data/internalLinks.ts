import type { CollectionEntry } from "astro:content";
import { productCategories, productsByIds, productsForSymptom, type ProductCategory } from "./products";

type ArticleEntry = CollectionEntry<"articles">;

export type ArticleRecommendationRole = "deep-dive" | "safe-check" | "decision";
export type ProductRecommendationRole = "measure" | "action" | "safety" | "comfort" | "replacement";

export type ArticleRecommendation = {
  article: ArticleEntry;
  role: ArticleRecommendationRole;
};

export type ProductRecommendation = {
  product: ProductCategory;
  role: ProductRecommendationRole;
};

type ArticlePlan = {
  articles?: Array<[string, ArticleRecommendationRole]>;
  products?: Array<[string, ProductRecommendationRole]>;
};

const roleByIndex: ArticleRecommendationRole[] = ["deep-dive", "safe-check", "decision"];

const articlePlans: Record<string, ArticlePlan> = {
  "not-cooling": {
    articles: [["filter-cleaning", "deep-dive"], ["outdoor-unit-check", "safe-check"], ["call-contractor", "decision"]],
    products: [["thermo-hygrometer", "measure"], ["filter-brush", "action"]]
  },
  "water-leak": {
    articles: [["drain-hose", "deep-dive"], ["cleaning-spray-risk", "safe-check"], ["call-contractor", "decision"]],
    products: [["drain-pump", "action"], ["drain-insect-cap", "safety"]]
  },
  "strange-noise": {
    articles: [["call-contractor", "decision"], ["outdoor-unit-check", "safe-check"], ["not-cooling", "deep-dive"]],
    products: [["outdoor-vibration-pad", "safety"]]
  },
  "electric-bill-high": {
    articles: [["filter-cleaning", "deep-dive"], ["outdoor-unit-check", "safe-check"], ["aircon-history", "decision"]],
    products: [["thermo-hygrometer", "measure"], ["circulator", "comfort"]]
  },
  "how-aircon-works": {
    articles: [["not-cooling", "deep-dive"], ["water-leak", "safe-check"], ["electric-bill-high", "decision"]],
    products: [["thermo-hygrometer", "measure"], ["filter-brush", "action"]]
  },
  "filter-cleaning": {
    articles: [["smell-odor", "deep-dive"], ["cleaning-spray-risk", "safe-check"], ["not-cooling", "decision"]],
    products: [["filter-brush", "action"], ["aircon-cleaning-cover", "safety"]]
  },
  "outdoor-unit-check": {
    articles: [["not-cooling", "deep-dive"], ["electric-bill-high", "safe-check"], ["aircon-history", "decision"]],
    products: [["outdoor-cover", "action"], ["outdoor-vibration-pad", "safety"]]
  },
  "drain-hose": {
    articles: [["water-leak", "deep-dive"], ["cleaning-spray-risk", "safe-check"], ["call-contractor", "decision"]],
    products: [["drain-pump", "action"], ["drain-insect-cap", "safety"]]
  },
  "smell-odor": {
    articles: [["filter-cleaning", "deep-dive"], ["cleaning-spray-risk", "safe-check"], ["call-contractor", "decision"]],
    products: [["filter-brush", "action"], ["sharp-air-purifier", "comfort"]]
  },
  "remote-not-working": {
    articles: [["call-contractor", "decision"], ["not-cooling", "deep-dive"], ["how-aircon-works", "safe-check"]],
    products: [["remote-battery", "action"]]
  },
  "heating-not-working": {
    articles: [["not-cooling", "deep-dive"], ["outdoor-unit-check", "safe-check"], ["call-contractor", "decision"]],
    products: [["thermo-hygrometer", "measure"], ["circulator", "comfort"]]
  },
  "call-contractor": {
    articles: [["not-cooling", "deep-dive"], ["water-leak", "safe-check"], ["installation-cost", "decision"]],
    products: []
  },
  "aircon-6jou-choose": {
    articles: [["aircon-8jou-choose", "deep-dive"], ["installation-cost", "safe-check"], ["aircon-history", "decision"]],
    products: [["aircon-6tatami", "replacement"], ["thermo-hygrometer", "measure"]]
  },
  "aircon-8jou-choose": {
    articles: [["aircon-6jou-choose", "deep-dive"], ["aircon-10jou-choose", "safe-check"], ["installation-cost", "decision"]],
    products: [["aircon-8tatami", "replacement"], ["circulator", "comfort"]]
  },
  "aircon-10jou-choose": {
    articles: [["aircon-8jou-choose", "deep-dive"], ["aircon-14jou-choose", "safe-check"], ["installation-cost", "decision"]],
    products: [["aircon-10tatami", "replacement"], ["circulator", "comfort"]]
  },
  "aircon-14jou-choose": {
    articles: [["aircon-10jou-choose", "deep-dive"], ["aircon-18jou-choose", "safe-check"], ["installation-cost", "decision"]],
    products: [["aircon-14tatami", "replacement"], ["circulator", "comfort"]]
  },
  "aircon-18jou-choose": {
    articles: [["aircon-14jou-choose", "deep-dive"], ["installation-cost", "safe-check"], ["call-contractor", "decision"]],
    products: [["aircon-18tatami", "replacement"], ["circulator", "comfort"]]
  },
  "installation-cost": {
    articles: [["aircon-6jou-choose", "deep-dive"], ["aircon-10jou-choose", "safe-check"], ["aircon-14jou-choose", "decision"]],
    products: [["aircon-6tatami", "replacement"], ["aircon-10tatami", "replacement"]]
  },
  "aircon-maker-compare": {
    articles: [["installation-cost", "safe-check"], ["aircon-10jou-choose", "deep-dive"], ["cleaning-spray-risk", "decision"]],
    products: [["aircon-10tatami", "replacement"], ["aircon-14tatami", "replacement"]]
  },
  "aircon-history": {
    articles: [["electric-bill-high", "deep-dive"], ["installation-cost", "safe-check"], ["aircon-10jou-choose", "decision"]],
    products: [["aircon-10tatami", "replacement"], ["aircon-14tatami", "replacement"]]
  },
  "cleaning-spray-risk": {
    articles: [["filter-cleaning", "deep-dive"], ["smell-odor", "safe-check"], ["call-contractor", "decision"]],
    products: [["aircon-cleaning-cover", "safety"], ["filter-brush", "action"]]
  },
  "hvac-career-start": {
    articles: [["cleaning-staff-career", "deep-dive"], ["call-contractor", "safe-check"], ["installation-cost", "decision"]],
    products: []
  },
  "cleaning-staff-career": {
    articles: [["hvac-career-start", "deep-dive"], ["filter-cleaning", "safe-check"], ["cleaning-spray-risk", "decision"]],
    products: []
  }
};

const productArticlePlans: Record<string, string[]> = {
  "thermo-hygrometer": ["not-cooling", "electric-bill-high", "how-aircon-works"],
  "filter-brush": ["filter-cleaning", "not-cooling", "smell-odor"],
  "drain-pump": ["water-leak", "drain-hose", "call-contractor"],
  "drain-insect-cap": ["water-leak", "drain-hose", "cleaning-spray-risk"],
  "outdoor-cover": ["outdoor-unit-check", "not-cooling", "electric-bill-high"],
  "outdoor-vibration-pad": ["strange-noise", "outdoor-unit-check", "call-contractor"],
  circulator: ["electric-bill-high", "not-cooling", "aircon-10jou-choose"],
  "remote-battery": ["remote-not-working", "call-contractor", "how-aircon-works"],
  "aircon-cleaning-cover": ["cleaning-spray-risk", "filter-cleaning", "smell-odor"],
  "sharp-air-purifier": ["smell-odor", "filter-cleaning", "cleaning-spray-risk"],
  "corona-dehumidifier": ["electric-bill-high", "smell-odor", "not-cooling"],
  "aircon-6tatami": ["aircon-6jou-choose", "installation-cost", "aircon-maker-compare"],
  "daikin-e-6tatami-s225ates": ["aircon-6jou-choose", "installation-cost", "aircon-maker-compare"],
  "mitsubishi-gv-6tatami-msz-gv2225": ["aircon-6jou-choose", "installation-cost", "aircon-maker-compare"],
  "aircon-8tatami": ["aircon-8jou-choose", "installation-cost", "aircon-maker-compare"],
  "aircon-10tatami": ["aircon-10jou-choose", "installation-cost", "aircon-maker-compare"],
  "daikin-e-10tatami-s285ates": ["aircon-10jou-choose", "installation-cost", "aircon-maker-compare"],
  "mitsubishi-gv-10tatami-msz-gv2825": ["aircon-10jou-choose", "installation-cost", "aircon-maker-compare"],
  "aircon-14tatami": ["aircon-14jou-choose", "installation-cost", "aircon-maker-compare"],
  "daikin-e-14tatami-s405atep": ["aircon-14jou-choose", "installation-cost", "aircon-maker-compare"],
  "aircon-18tatami": ["aircon-18jou-choose", "installation-cost", "aircon-maker-compare"]
};

const productRelatedPlans: Record<string, string[]> = {
  "thermo-hygrometer": ["filter-brush", "circulator", "outdoor-cover"],
  "filter-brush": ["aircon-cleaning-cover", "sharp-air-purifier", "thermo-hygrometer"],
  "aircon-cleaning-cover": ["filter-brush", "sharp-air-purifier", "thermo-hygrometer"],
  "sharp-air-purifier": ["filter-brush", "aircon-cleaning-cover", "corona-dehumidifier"],
  "corona-dehumidifier": ["sharp-air-purifier", "thermo-hygrometer", "circulator"],
  "drain-pump": ["drain-insect-cap", "thermo-hygrometer"],
  "drain-insect-cap": ["drain-pump", "outdoor-cover"],
  "outdoor-cover": ["outdoor-vibration-pad", "thermo-hygrometer", "circulator"],
  "outdoor-vibration-pad": ["outdoor-cover", "thermo-hygrometer", "circulator"],
  circulator: ["thermo-hygrometer", "outdoor-cover", "aircon-10tatami"],
  "remote-battery": ["thermo-hygrometer", "filter-brush"],
  "aircon-6tatami": ["aircon-8tatami", "aircon-10tatami", "thermo-hygrometer"],
  "daikin-e-6tatami-s225ates": ["mitsubishi-gv-6tatami-msz-gv2225", "aircon-6tatami", "thermo-hygrometer"],
  "mitsubishi-gv-6tatami-msz-gv2225": ["daikin-e-6tatami-s225ates", "aircon-6tatami", "thermo-hygrometer"],
  "aircon-8tatami": ["aircon-6tatami", "aircon-10tatami", "circulator"],
  "aircon-10tatami": ["aircon-8tatami", "aircon-14tatami", "circulator"],
  "daikin-e-10tatami-s285ates": ["mitsubishi-gv-10tatami-msz-gv2825", "aircon-10tatami", "circulator"],
  "mitsubishi-gv-10tatami-msz-gv2825": ["daikin-e-10tatami-s285ates", "aircon-10tatami", "circulator"],
  "aircon-14tatami": ["aircon-10tatami", "aircon-18tatami", "circulator"],
  "daikin-e-14tatami-s405atep": ["aircon-14tatami", "aircon-18tatami", "circulator"],
  "aircon-18tatami": ["aircon-14tatami", "daikin-e-14tatami-s405atep", "circulator"]
};

export function isCanonicalArticle(article: ArticleEntry) {
  return !article.id.endsWith(" 2.md") && !article.slug.endsWith("-2");
}

export function getCanonicalArticles(articles: ArticleEntry[]) {
  return articles.filter(isCanonicalArticle);
}

export function getArticleRecommendations(slug: string, article: ArticleEntry, allArticles: ArticleEntry[]) {
  const articles = getCanonicalArticles(allArticles).filter((entry) => entry.slug !== slug);
  const bySlug = new Map(articles.map((entry) => [entry.slug, entry]));
  const plan = articlePlans[slug]?.articles;
  const manual = plan
    ? plan
        .map(([targetSlug, role]) => {
          const target = bySlug.get(targetSlug);
          return target ? { article: target, role } : null;
        })
        .filter((entry): entry is ArticleRecommendation => Boolean(entry))
    : [];

  if (manual.length > 0) {
    return manual.slice(0, 3);
  }

  const frontmatter = article.data.relatedArticles
    .map((targetSlug, index) => {
      const target = bySlug.get(targetSlug);
      return target ? { article: target, role: roleByIndex[index] ?? "decision" } : null;
    })
    .filter((entry): entry is ArticleRecommendation => Boolean(entry));

  if (frontmatter.length > 0) {
    return frontmatter.slice(0, 3);
  }

  return articles
    .map((candidate) => ({
      article: candidate,
      role: autoArticleRole(article, candidate),
      score: articleScore(article, candidate)
    }))
    .filter((candidate) => candidate.score > 0)
    .sort((a, b) => b.score - a.score || b.article.data.pubDate.valueOf() - a.article.data.pubDate.valueOf())
    .slice(0, 3)
    .map(({ article: target, role }) => ({ article: target, role }));
}

export function getProductRecommendations(slug: string, article: ArticleEntry) {
  const plan = articlePlans[slug]?.products;
  if (plan) {
    return plan
      .map(([productId, role]) => {
        const product = productCategories.find((candidate) => candidate.id === productId);
        return product ? { product, role } : null;
      })
      .filter((entry): entry is ProductRecommendation => Boolean(entry))
      .slice(0, 2);
  }

  const frontmatterProducts = productsByIds(article.data.products);
  const symptomProducts = article.data.symptoms.flatMap(productsForSymptom);
  const allowReplacement = article.data.category === "buying";
  const limit = article.data.risk === "high" ? 1 : 2;
  const candidates = [...frontmatterProducts, ...symptomProducts]
    .filter((product) => allowReplacement || product.type !== "replacement")
    .filter((product, index, list) => list.findIndex((candidate) => candidate.id === product.id) === index)
    .sort((a, b) => productScore(article, b) - productScore(article, a));

  return candidates.slice(0, limit).map((product) => ({
    product,
    role: autoProductRole(product)
  }));
}

export function getProductRelatedArticles(product: ProductCategory, allArticles: ArticleEntry[]) {
  const articles = getCanonicalArticles(allArticles);
  const bySlug = new Map(articles.map((article) => [article.slug, article]));
  const manual = productArticlePlans[product.id]
    ?.map((slug) => bySlug.get(slug))
    .filter((article): article is ArticleEntry => Boolean(article));

  if (manual && manual.length > 0) {
    return manual.slice(0, 3);
  }

  return articles
    .filter((article) => article.data.products.includes(product.id) || article.data.symptoms.some((symptom) => product.symptoms.includes(symptom)))
    .sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf())
    .slice(0, 3);
}

export function getRelatedProductsForProduct(product: ProductCategory) {
  const manual = productRelatedPlans[product.id]
    ?.map((id) => productCategories.find((candidate) => candidate.id === id))
    .filter((candidate): candidate is ProductCategory => Boolean(candidate));

  if (manual && manual.length > 0) {
    return manual.slice(0, 3);
  }

  return productCategories
    .filter((candidate) => candidate.id !== product.id && candidate.symptoms.some((symptom) => product.symptoms.includes(symptom)))
    .sort((a, b) => relatedProductScore(product, b) - relatedProductScore(product, a))
    .slice(0, 3);
}

function articleScore(source: ArticleEntry, candidate: ArticleEntry) {
  const symptomScore = candidate.data.symptoms.filter((symptom) => source.data.symptoms.includes(symptom)).length * 3;
  const categoryScore = candidate.data.category === source.data.category ? 2 : 0;
  const decisionScore = candidate.data.recommendedCta === "contractor" || candidate.data.category === "buying" ? 1 : 0;
  return symptomScore + categoryScore + decisionScore;
}

function autoArticleRole(source: ArticleEntry, candidate: ArticleEntry): ArticleRecommendationRole {
  if (candidate.data.recommendedCta === "contractor" || candidate.data.category === "buying") {
    return "decision";
  }

  if (candidate.data.category === "cleaning" || candidate.data.risk === "low") {
    return "safe-check";
  }

  return source.data.category === candidate.data.category ? "deep-dive" : "decision";
}

function productScore(article: ArticleEntry, product: ProductCategory) {
  const symptomScore = product.symptoms.filter((symptom) => article.data.symptoms.includes(symptom)).length * 3;
  const frontmatterScore = article.data.products.includes(product.id) ? 5 : 0;
  const measureScore = product.id === "thermo-hygrometer" ? 2 : 0;
  const replacementPenalty = article.data.category === "buying" || product.type !== "replacement" ? 0 : -10;
  return symptomScore + frontmatterScore + measureScore + replacementPenalty;
}

function autoProductRole(product: ProductCategory): ProductRecommendationRole {
  if (product.type === "replacement") {
    return "replacement";
  }

  if (product.id === "thermo-hygrometer") {
    return "measure";
  }

  if (product.category === "circulator" || product.category === "air-purifier" || product.category === "dehumidifier") {
    return "comfort";
  }

  if (product.category === "drain" || product.category === "outdoor") {
    return "safety";
  }

  return "action";
}

function relatedProductScore(source: ProductCategory, candidate: ProductCategory) {
  const symptomScore = candidate.symptoms.filter((symptom) => source.symptoms.includes(symptom)).length * 3;
  const categoryScore = candidate.category === source.category ? 2 : 0;
  const typeScore = candidate.type === source.type ? 1 : 0;
  return symptomScore + categoryScore + typeScore;
}
