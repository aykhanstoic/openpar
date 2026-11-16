import type { Dict } from "./en";
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

/**
 * Azerbaijani copy.
 *
 * Typed as `Dict`, so this file will not compile if a key present in `en.ts`
 * is missing here. That is deliberate — it stops the Azerbaijani side of the
 * site quietly rotting behind the English one.
 *
 * NEEDS NATIVE REVIEW before launch. The translation is complete and
 * idiomatic, but EYP-specific vocabulary (Ümumi Yığıncaq, qətnamə, komanda
 * qurma) should be checked against the terminology the committee already
 * uses with schools, so the website and the participant packs agree.
 */
export const az: Dict = {
  /* Menu, footer and labels used on every page: /admin → "Menu, footer and labels". */
  ...sitePage.az,

  home: homePage.az,
  whatIsEyp: whatIsEypPage.az,
  about: aboutPage.az,
  boards: boardsPage.az,
  participate: participatePage.az,
  sessions: sessionsPage.az,
  news: newsPage.az,
  alumni: alumniPage.az,
  partners: partnersPage.az,
  contact: contactPage.az,
  privacy: privacyPage.az,
  legal: legalPage.az,
};
