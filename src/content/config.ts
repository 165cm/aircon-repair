import { defineCollection, z } from "astro:content";

const articles = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    description: z.string(),
    category: z.enum(["symptom", "basics", "cleaning", "career", "buying", "energy-saving"]),
    symptoms: z.array(z.string()).default([]),
    products: z.array(z.string()).default([]),
    difficulty: z.enum(["beginner", "intermediate"]).default("beginner"),
    risk: z.enum(["low", "medium", "high"]),
    recommendedCta: z.enum(["products", "contractor", "jobs", "learn"]),
    pubDate: z.coerce.date()
  })
});

export const collections = { articles };
