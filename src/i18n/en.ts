/**
 * English copy — the source of truth for the translation shape.
 *
 * `Dict` is derived from this object, and `az.ts` is typed as `Dict`, so a
 * key added here that is missing there is a build error rather than a page
 * that silently falls back to English. Do not add `as const`: it would force
 * the Azerbaijani file to repeat the English string literals.
 *
 * All wording lives in src/data/pages/<page>.json, in both languages, so
 * members can edit it in /admin; site.json holds the menu, footer and labels
 * used on every page. See src/lib/page-text.ts.
 */
import sitePage from "../data/pages/site.json";
import homePage from "../data/pages/home.json";
import whatIsEypPage from "../data/pages/what-is-eyp.json";
import aboutPage from "../data/pages/about.json";
import boardsPage from "../data/pages/boards.json";
import participatePage from "../data/pages/participate.json";
import sessionsPage from "../data/pages/sessions.json";
import newsPage from "../data/pages/news.json";
import alumniPage from "../data/pages/alumni.json";
import partnersPage from "../data/pages/partners.json";
import contactPage from "../data/pages/contact.json";
import privacyPage from "../data/pages/privacy.json";
import legalPage from "../data/pages/legal.json";

export const en = {
  /* Menu, footer and labels used on every page: /admin → "Menu, footer and labels". */
  ...sitePage.en,

  home: homePage.en,
  whatIsEyp: whatIsEypPage.en,
  about: aboutPage.en,
  boards: boardsPage.en,
  participate: participatePage.en,
  sessions: sessionsPage.en,
  news: newsPage.en,
  alumni: alumniPage.en,
  partners: partnersPage.en,
  contact: contactPage.en,
  privacy: privacyPage.en,
  legal: legalPage.en,
};

export type Dict = typeof en;
