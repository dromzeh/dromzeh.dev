import { defineCollection, defineContentConfig, z } from "@nuxt/content";

export default defineContentConfig({
  collections: {
    posts: defineCollection({
      type: "page",
      source: "posts/**",
      schema: z.object({
        title: z.string(),
        summary: z.string(),
        order: z.number().default(999),
        visibility: z.string().default("published"),
      }),
    }),
  },
});
