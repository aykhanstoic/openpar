/**
 * English copy — the source of truth for the translation shape.
 *
 * `Dict` is derived from this object, and `az.ts` is typed as `Dict`, so a
 * key added here that is missing there is a build error rather than a page
 * that silently falls back to English. Do not add `as const`: it would force
 * the Azerbaijani file to repeat the English string literals.
 *
 * Only interface labels live here (menu, buttons, statuses, footer). The
 * wording of each page lives in src/data/pages/<page>.json, in both
 * languages, so members can edit it in /admin. See src/lib/page-text.ts.
 */
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
  site: {
    name: "EYP Azerbaijan",
    tagline: "European Youth Parliament in Azerbaijan",
    description:
      "EYP Azerbaijan is the National Committee of the European Youth Parliament in Azerbaijan — a youth-run, non-partisan network running debate sessions for 14 to 28 year olds.",
  },

  nav: {
    home: "Home",
    about: "About Us",
    whatIsEyp: "What is EYP?",
    participate: "Get Involved",
    sessions: "Sessions",
    news: "News",
    alumni: "Alumni",
    partners: "Partners",
    contact: "Contact",
    privacy: "Privacy",
    legal: "Legal notice",
    menu: "Menu",
    close: "Close",
    skipToContent: "Skip to content",
    switchLang: "Azərbaycanca",
  },

  common: {
    readMore: "Read more",
    seeAll: "See all",
    apply: "Apply",
    applyMembersPlatform: "Apply on the Members Platform",
    applyGoogleForm: "Apply via form",
    applicationsClosed: "Applications closed",
    noneYet: "Nothing here yet.",
    backTo: "Back to",
    deadline: "Deadline",
    venue: "Venue",
    theme: "Theme",
    dates: "Dates",
    email: "Email",
    photoPlaceholder: "Photo — session photography goes here",
  },

  status: {
    announced: "Announced",
    "call-open": "Applications open",
    "call-closed": "Applications closed",
    completed: "Completed",
  },

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

  /* ---------------------------------------------------------------- footer */
  footer: {
    about:
      "The National Committee of the European Youth Parliament in Azerbaijan. Non-partisan, youth-run, and organised entirely by volunteers.",
    orgTitle: "Organisation",
    involvedTitle: "Get involved",
    networkTitle: "Network",
    legalTitle: "Legal",
    newsletterTitle: "Catch the next call",
    newsletterBody:
      "Calls open and close quickly. The mailing list is the only place every one of them is announced.",
    newsletterPlaceholder: "your@email.com",
    newsletterButton: "Subscribe",
    newsletterConsent: "I agree to receive emails from EYP Azerbaijan and have read the privacy policy.",
    newsletterDoubleOptIn:
      "You will receive a confirmation email. Your address is only added once you click the link in it.",
    newsletterDisabled: "Not connected to a mailing provider yet.",
    eypInternational: "EYP International",
    schwarzkopf: "Schwarzkopf Foundation",
    membersPlatform: "Members Platform",
    rights: "All rights reserved.",
    builtBy: "Built and maintained by volunteers.",
  },
};

export type Dict = typeof en;
