import type { Dict } from "./en";
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
  site: {
    name: "EYP Azerbaijan",
    tagline: "Azərbaycanda Avropa Gənclər Parlamenti",
    description:
      "EYP Azerbaijan — Avropa Gənclər Parlamentinin Azərbaycandakı Milli Komitəsidir. 14–28 yaş arası gənclər üçün debat sessiyaları keçirən, gənclər tərəfindən idarə olunan bitərəf təşkilat.",
  },

  nav: {
    home: "Ana səhifə",
    about: "Haqqımızda",
    whatIsEyp: "EYP nədir?",
    participate: "Necə qoşulmaq olar",
    sessions: "Sessiyalar",
    news: "Xəbərlər",
    alumni: "Məzunlar",
    partners: "Tərəfdaşlar",
    contact: "Əlaqə",
    privacy: "Məxfilik",
    legal: "Hüquqi bildiriş",
    menu: "Menyu",
    close: "Bağla",
    skipToContent: "Əsas məzmuna keç",
    switchLang: "English",
  },

  common: {
    readMore: "Ətraflı",
    seeAll: "Hamısına bax",
    apply: "Müraciət et",
    applyMembersPlatform: "Members Platform vasitəsilə müraciət et",
    applyGoogleForm: "Forma ilə müraciət et",
    applicationsClosed: "Müraciətlər bağlanıb",
    noneYet: "Hələ heç nə yoxdur.",
    backTo: "Geri",
    deadline: "Son tarix",
    venue: "Məkan",
    theme: "Mövzu",
    dates: "Tarixlər",
    email: "E-poçt",
    placeholderNotice: "Nümunə mətn",
    photoPlaceholder: "Foto — bura sessiya fotoları qoyulacaq",
  },

  status: {
    announced: "Elan olunub",
    "call-open": "Müraciətlər açıqdır",
    "call-closed": "Müraciətlər bağlanıb",
    completed: "Başa çatıb",
  },

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

  /* ---------------------------------------------------------------- footer */
  footer: {
    about:
      "Avropa Gənclər Parlamentinin Azərbaycandakı Milli Komitəsi. Bitərəf, gənclər tərəfindən idarə olunan və tamamilə könüllülərlə təşkil edilən təşkilat.",
    orgTitle: "Təşkilat",
    involvedTitle: "Qoşul",
    networkTitle: "Şəbəkə",
    legalTitle: "Hüquqi",
    newsletterTitle: "Növbəti çağırışı qaçırmayın",
    newsletterBody:
      "Çağırışlar tez açılır və tez bağlanır. Poçt siyahısı onların hamısının elan olunduğu yeganə yerdir.",
    newsletterPlaceholder: "siz@epoct.com",
    newsletterButton: "Abunə ol",
    newsletterConsent:
      "EYP Azerbaijan-dan e-poçt almağa razıyam və məxfilik siyasəti ilə tanış olmuşam.",
    newsletterDoubleOptIn:
      "Sizə təsdiq məktubu göndəriləcək. Ünvanınız yalnız oradakı linkə kliklədikdən sonra əlavə olunur.",
    newsletterDisabled: "Hələ poçt xidmətinə qoşulmayıb.",
    eypInternational: "EYP International",
    schwarzkopf: "Schwarzkopf Fondu",
    membersPlatform: "Members Platform",
    rights: "Bütün hüquqlar qorunur.",
    builtBy: "Könüllülər tərəfindən qurulub və dəstəklənir.",
  },
};
