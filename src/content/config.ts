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
    teacher: z
      .enum(["netsugashi-reitaro", "tomuro-mamoru", "kazetooshi-kiyoshi", "mizumichi-nukeru", "kaikae-shinji", "genba-minoru"])
      .optional(),
    lessonGoal: z.string().optional(),
    quickAnswer: z.array(z.string()).default([]),
    boardImage: z.string().optional(),
    boardAlt: z.string().optional(),
    relatedArticles: z.array(z.string()).default([]),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional()
  })
});

export const collections = { articles };
