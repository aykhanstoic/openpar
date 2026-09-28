import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// `z.string().url()` accepts `javascript:` and `data:` — both parse as valid
// URLs. Session frontmatter is board-authored and lands straight in an href,
// so restrict it to real web schemes at build time.
const webUrl = z
  .string()
  .url()
  .refine((value) => /^https?:$/.test(new URL(value).protocol), {
    message: 'must be an http(s) URL',
  });

// Normal sessions link out to the Members Platform for delegate
// applications. Outreach sessions can't take applications through the
// Members Platform, so those use a linked Google Form instead. The
// `outreach` flag decides which label/link the sessions page renders;
// `applyUrl` is left empty until a call is actually open.
const sessions = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/sessions' }),
  schema: z.object({
    // Frontmatter is authored in English; the `*Az` variants are optional so
    // adding a session stays one file. A missing one falls back to English
    // (see localizeSession) rather than rendering an empty heading.
    title: z.string(),
    titleAz: z.string().optional(),
    theme: z.string(),
    themeAz: z.string().optional(),
    venue: z.string(),
    venueAz: z.string().optional(),
    startDate: z.coerce.date(),
    endDate: z.coerce.date(),
    status: z.enum(['announced', 'call-open', 'call-closed', 'completed']),
    outreach: z.boolean().default(false),
    applyUrl: webUrl.optional(),
    // Shown in the hero meta line ("… · apply by 18 Oct").
    applyDeadline: z.coerce.date().optional(),
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
