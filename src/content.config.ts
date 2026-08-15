import { defineCollection, reference, z } from 'astro:content';
import { glob } from 'astro/loaders';

const dinners = defineCollection({
  loader: glob({ pattern: '**/*.yaml', base: './src/content/dinners' }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    theme: z.string().optional(),
    description: z.string().optional(),
    photo: z.string().optional(),
  }),
});

const recipes = defineCollection({
  loader: glob({ pattern: '**/*.yaml', base: './src/content/recipes' }),
  schema: z.object({
    title: z.string(),
    dinner: reference('dinners').optional(),
    description: z.string().optional(),
    image: z.string().optional(),
    servings: z.union([z.string(), z.number()]).optional(),
    prepTime: z.string().optional(),
    cookTime: z.string().optional(),
    difficulty: z.enum(['easy', 'medium', 'hard']).optional(),
    tags: z.array(z.string()).default([]),
    ingredients: z.array(z.string()).default([]),
    steps: z.array(z.string()).default([]),
    notes: z.string().optional(),
  }),
});

export const collections = { dinners, recipes };
