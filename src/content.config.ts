import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

// A single minimal collection so CloudCannon has an openable page to launch
// the Visual Editor from. The page content is irrelevant — it just hosts the
// test buttons.
const pages = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/pages" }),
  schema: z.object({ title: z.string() }),
});

export const collections = { pages };
