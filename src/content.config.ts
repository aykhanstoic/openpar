import { defineCollection, reference, z } from "astro:content";
import { glob } from "astro/loaders";

/**
 * Content collections are the "dashboard" from the plan: board members add a
 * markdown file, and the site picks it up. No CMS to license, no database to
 * hand over between boards. If a future board wants a visual editor, any
 * git-backed CMS (Decap, Sveltia, TinaCMS) can be pointed at these folders
 * without changing the schemas below.
 */

/* --------------------------------------------------------------- sessions */
/**
 * Normal sessions take delegate applications through the network-wide
 * Members Platform. Outreach sessions cannot — the platform has no route for
 * them — so those link to a Google Form instead. `outreach` picks which
 * label and link the session card renders; `applyUrl` stays empty until a
 * call is actually open.
 */
const sessions = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/sessions" }),
  schema: ({ image }) =>
    z
      .object({
        title: z.string(),
        theme: z.string(),
        /** One or two sentences for the card. Falls back to `theme`. */
        summary: z.string().optional(),
        venue: z.string(),
        city: z.string().optional(),
        startDate: z.coerce.date(),
        endDate: z.coerce.date(),
        status: z.enum(["announced", "call-open", "call-closed", "completed"]),
        /** Application deadline. Only meaningful while status is call-open. */
        applyDeadline: z.coerce.date().optional(),
        outreach: z.boolean().default(false),
        applyUrl: z.string().url().optional(),
        /** Published resolutions booklet, for completed sessions. */
        resolutionsUrl: z.string().url().optional(),
        cover: image().optional(),
        lang: z.enum(["en", "az", "both"]).default("both"),
        draft: z.boolean().default(false),
      })
      .refine((d) => d.endDate >= d.startDate, {
        message: "endDate must not be before startDate",
        path: ["endDate"],
      })
      .refine((d) => d.status !== "call-open" || Boolean(d.applyUrl), {
        message: "A session with status 'call-open' needs an applyUrl",
        path: ["applyUrl"],
      }),
});

/* ------------------------------------------------------------------- news */
const news = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/news" }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      date: z.coerce.date(),
      /** Posts may exist in one language only; the news page says so. */
      lang: z.enum(["en", "az"]),
      excerpt: z.string().optional(),
      /** News is "highly correlated with sessions" (plan §3). */
      session: reference("sessions").optional(),
      tags: z.array(z.string()).default([]),
      cover: image().optional(),
      draft: z.boolean().default(false),
    }),
});

/* ------------------------------------------------------------------ board */
const board = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/board" }),
  schema: ({ image }) =>
    z.object({
      name: z.string(),
      role: z.string(),
      roleAz: z.string().optional(),
      body: z.enum(["executive", "supervisory"]),
      order: z.number(),
      /** Role-based addresses only — never a volunteer's personal address. */
      email: z.string().email().optional(),
      photo: image().optional(),
      term: z.string().optional(),
    }),
});

/* --------------------------------------------------------------- partners */
const partners = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/partners" }),
  schema: ({ image }) =>
    z.object({
      name: z.string(),
      url: z.string().url().optional(),
      logo: image().optional(),
      tier: z.enum(["principal", "supporting", "in-kind"]).default("supporting"),
      order: z.number().default(50),
    }),
});

export const collections = { sessions, news, board, partners };
