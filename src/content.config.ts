import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// Normal sessions link out to the Members Platform for delegate
// applications. Outreach sessions can't take applications through the
// Members Platform, so those use a linked Google Form instead. The
// `outreach` flag decides which label/link the sessions page renders;
// `applyUrl` is left empty until a call is actually open.
const sessions = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/sessions' }),
  schema: z.object({
    title: z.string(),
    theme: z.string(),
    venue: z.string(),
    startDate: z.coerce.date(),
    endDate: z.coerce.date(),
    status: z.enum(['announced', 'call-open', 'call-closed', 'completed']),
    outreach: z.boolean().default(false),
    applyUrl: z.string().url().optional(),
  }),
});

const news = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/news' }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    lang: z.enum(['en', 'az']),
    excerpt: z.string().optional(),
  }),
});

const board = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/board' }),
  schema: z.object({
    name: z.string(),
    role: z.string(),
    body: z.enum(['executive', 'supervisory']),
    order: z.number(),
  }),
});

export const collections = { sessions, news, board };
