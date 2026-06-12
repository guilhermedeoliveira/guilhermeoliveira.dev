import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

const common = {
  title: z.string(),
  summary: z.string(),
  date: z.coerce.date(),
  updated: z.coerce.date().optional(),
  tags: z.array(z.string()).default([]),
  draft: z.boolean().default(false),
};

const projects = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/projects" }),
  schema: z.object({
    ...common,
    role: z.string(),
    status: z
      .enum(["live", "active", "archived", "concept", "prototype"])
      .default("active"),
    featured: z.boolean().default(false),
    stack: z.array(z.string()).default([]),
    github: z.url().optional(),
    website: z.url().optional(),
    stars: z.number().optional(),
    order: z.number().default(99),
    outcome: z.string().optional(),
    links: z
      .array(
        z.object({
          label: z.string(),
          url: z.url(),
        }),
      )
      .default([]),
  }),
});

const notes = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/notes" }),
  schema: z.object({
    ...common,
    category: z.string(),
  }),
});

const ideas = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/ideas" }),
  schema: z.object({
    ...common,
    status: z
      .enum(["seed", "exploring", "validated", "shipped"])
      .default("seed"),
  }),
});

export const collections = { projects, notes, ideas };
