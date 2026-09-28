export const languages = {
  en: 'English',
  az: 'Azərbaycan',
} as const;

export type Locale = keyof typeof languages;

export const defaultLocale: Locale = 'en';

export const navItems: { key: UIKey; path: string }[] = [
  { key: 'nav.home', path: '' },
  { key: 'nav.sessions', path: 'sessions' },
  { key: 'nav.participate', path: 'participate' },
  { key: 'nav.about', path: 'about' },
  { key: 'nav.news', path: 'news' },
  { key: 'nav.partners', path: 'partners' },
  { key: 'nav.contact', path: 'contact' },
];

const en = {
  'nav.home': 'Home',
  'nav.sessions': 'Sessions',
  'nav.participate': 'How to Participate',
  'nav.about': 'About Us',
  'nav.news': 'News',
  'nav.partners': 'Partners',
  'nav.contact': 'Contact',
  'nav.menu': 'Menu',
  'nav.closeMenu': 'Close menu',
  'nav.openMenu': 'Open menu',
  'nav.language': 'Switch to Azerbaijani',
  'nav.join': 'Join',

  'site.name': 'EYP Azərbaycan',
  'site.tagline': 'European Youth Parliament',
  'site.description':
    'EYP Azərbaycan — the National Committee of the European Youth Parliament. Sessions, debate and public speaking for students in Azerbaijan.',

  'a11y.skip': 'Skip to content',

  // Hero — session-forward
  'hero.deadline': 'apply by',
  'hero.cta.apply': 'Apply now',
  'hero.cta.signup': 'Sign up',
  'hero.cta.how': 'How it works',

  // Hero — organisation fallback (no open call)
  'hero.fallback.chip': 'Active since 2011',
  'hero.fallback.title': 'Europe, argued out loud.',
  'hero.fallback.lead':
    'We bring students together to debate the issues shaping the continent — on a real stage, in front of people who listen.',
  'hero.fallback.meta': 'No session call is open right now. The next one opens soon.',

  // What is EYP
  'about.eyebrow': 'What is EYP?',
  'about.title': 'School, but the fun part.',
  'about.lead':
    'A weekend where you argue European policy with a hundred other students, write a resolution, and defend it from a podium. No grades, no textbook — just your own argument, tested in public.',
  'about.pillar1.title': 'Raising awareness',
  'about.pillar1.body': 'European issues, argued by you — not read from a textbook.',
  'about.pillar2.title': 'Skill development',
  'about.pillar2.body': 'Public speaking, writing, teamwork — skills that outlast any exam.',
  'about.pillar3.title': 'Forum for expression',
  'about.pillar3.body': 'A stage for your opinion, with people who actually listen.',

  // Upcoming sessions
  'sessions.eyebrow': 'What is coming',
  'sessions.title': 'Upcoming sessions',
  'sessions.kind.national': 'National selection',
  'sessions.kind.outreach': 'Open to all',
  'sessions.outreachNote': 'First time? No membership needed — just sign up.',
  'sessions.cta.members': 'Apply on the Members Platform',
  'sessions.cta.form': 'Sign up — 2 minutes',
  'sessions.cta.all': 'All sessions',
  'sessions.empty.title': 'No open calls right now.',
  'sessions.empty.body':
    'Session calls go out a few times a year. Get them by email, or catch them on Instagram.',
  'sessions.empty.cta': 'Follow on Instagram',

  'status.call-open': 'Applications open',
  'status.announced': 'Announced',
  'status.call-closed': 'Applications closed',
  'status.completed': 'Completed',

  // Footer
  'footer.line': 'Once a year, Europe fits in one room.',
  'footer.newsletter.title': 'Session calls, in your inbox.',
  'footer.newsletter.placeholder': 'Email for session calls',
  'footer.newsletter.label': 'Email address',
  'footer.newsletter.button': 'Subscribe',
  'footer.newsletter.soon': 'Sign-up opens soon — follow us on Instagram meanwhile.',
  'footer.col.explore': 'Explore',
  'footer.col.organisation': 'Organisation',
  'footer.privacy': 'Privacy',
  'footer.copyright': 'EYP Azərbaycan. All rights reserved.',
  'footer.partners': 'Partner logos will go here.',

  'apply.membersPlatform': 'Apply on the Members Platform',
  'apply.googleForm': 'Apply via Google Form',
} as const;

export type UIKey = keyof typeof en;

const az: Record<UIKey, string> = {
  'nav.home': 'Ana səhifə',
  'nav.sessions': 'Sessiyalar',
  'nav.participate': 'Necə qoşulmaq olar',
  'nav.about': 'Haqqımızda',
  'nav.news': 'Xəbərlər',
  'nav.partners': 'Tərəfdaşlar',
  'nav.contact': 'Əlaqə',
  'nav.menu': 'Menyu',
  'nav.closeMenu': 'Menyunu bağla',
  'nav.openMenu': 'Menyunu aç',
  'nav.language': 'İngilis dilinə keç',
  'nav.join': 'Qoşul',

  'site.name': 'EYP Azərbaycan',
  'site.tagline': 'Avropa Gənclər Parlamenti',
  'site.description':
    'EYP Azərbaycan — Avropa Gənclər Parlamentinin Milli Komitəsi. Azərbaycanlı tələbələr üçün sessiyalar, debat və natiqlik.',

  'a11y.skip': 'Əsas məzmuna keç',

  'hero.deadline': 'son müraciət',
  'hero.cta.apply': 'İndi müraciət et',
  'hero.cta.signup': 'Qeydiyyatdan keç',
  'hero.cta.how': 'Necə işləyir',

  'hero.fallback.chip': '2011-ci ildən fəaliyyətdə',
  'hero.fallback.title': 'Avropa, ucadan müzakirə olunur.',
  'hero.fallback.lead':
    'Tələbələri bir araya gətiririk ki, qitəni formalaşdıran məsələləri müzakirə etsinlər — əsl səhnədə, həqiqətən dinləyən insanların qarşısında.',
  'hero.fallback.meta': 'Hazırda açıq müraciət yoxdur. Növbəti tezliklə elan olunacaq.',

  'about.eyebrow': 'EYP nədir?',
  'about.title': 'Məktəb, amma maraqlı hissəsi.',
  'about.lead':
    'Bir həftəsonu: yüz tələbə ilə birlikdə Avropa siyasətini müzakirə edir, qətnamə yazır və onu tribunadan müdafiə edirsən. Qiymət yoxdur, dərslik yoxdur — yalnız sənin arqumentin, ictimai sınaqda.',
  'about.pillar1.title': 'Maarifləndirmə',
  'about.pillar1.body': 'Avropa məsələləri — dərslikdən oxunmur, sənin tərəfindən müzakirə olunur.',
  'about.pillar2.title': 'Bacarıqların inkişafı',
  'about.pillar2.body': 'Natiqlik, yazı, komanda işi — hər imtahandan uzunömürlü bacarıqlar.',
  'about.pillar3.title': 'Fikir meydanı',
  'about.pillar3.body': 'Fikrin üçün səhnə — həqiqətən dinləyən insanlarla.',

  'sessions.eyebrow': 'Yaxınlaşan',
  'sessions.title': 'Qarşıdakı sessiyalar',
  'sessions.kind.national': 'Milli seçim',
  'sessions.kind.outreach': 'Hamı üçün açıq',
  'sessions.outreachNote': 'İlk dəfədir? Üzvlük tələb olunmur — sadəcə qeydiyyatdan keç.',
  'sessions.cta.members': 'Members Platform-da müraciət et',
  'sessions.cta.form': 'Qeydiyyat — 2 dəqiqə',
  'sessions.cta.all': 'Bütün sessiyalar',
  'sessions.empty.title': 'Hazırda açıq müraciət yoxdur.',
  'sessions.empty.body':
    'Sessiya elanları ildə bir neçə dəfə paylaşılır. E-poçtla al və ya Instagram-da izlə.',
  'sessions.empty.cta': 'Instagram-da izlə',

  'status.call-open': 'Müraciətlər açıqdır',
  'status.announced': 'Elan olunub',
  'status.call-closed': 'Müraciətlər bağlanıb',
  'status.completed': 'Tamamlanıb',

  'footer.line': 'İldə bir dəfə Avropa bir otağa sığır.',
  'footer.newsletter.title': 'Sessiya elanları poçtuna gəlsin.',
  'footer.newsletter.placeholder': 'Sessiya elanları üçün e-poçt',
  'footer.newsletter.label': 'E-poçt ünvanı',
  'footer.newsletter.button': 'Abunə ol',
  'footer.newsletter.soon': 'Abunəlik tezliklə açılır — hələlik Instagram-da izləyin.',
  'footer.col.explore': 'Kəşf et',
  'footer.col.organisation': 'Təşkilat',
  'footer.privacy': 'Məxfilik',
  'footer.copyright': 'EYP Azərbaycan. Bütün hüquqlar qorunur.',
  'footer.partners': 'Tərəfdaş loqoları burada olacaq.',

  'apply.membersPlatform': 'Members Platform vasitəsilə müraciət et',
  'apply.googleForm': 'Google Form ilə müraciət et',
};

export const ui = { en, az } as const;

/* Build-time guard: t() silently falls back to English on a missing AZ key,
   which ships an untranslated string instead of failing. Astro does not
   typecheck during `astro build`, so assert at runtime too. */
{
  const enKeys = Object.keys(en);
  const azKeys = Object.keys(az);
  const missing = enKeys.filter((k) => !(k in az));
  const extra = azKeys.filter((k) => !(k in en));
  const empty = enKeys.filter((k) => !az[k as UIKey]?.trim());
  if (missing.length || extra.length || empty.length) {
    throw new Error(
      `i18n key mismatch — missing in az: [${missing.join(', ')}]; ` +
        `not in en: [${extra.join(', ')}]; empty: [${empty.join(', ')}]`,
    );
  }
}

export function useTranslations(locale: Locale) {
  return function t(key: UIKey): string {
    return ui[locale][key] ?? ui[defaultLocale][key];
  };
}
