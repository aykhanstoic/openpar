export const languages = {
  en: 'English',
  az: 'Azərbaycan',
} as const;

export type Locale = keyof typeof languages;

export const defaultLocale: Locale = 'en';

export const navItems: { key: string; path: string }[] = [
  { key: 'nav.home', path: '' },
  { key: 'nav.sessions', path: 'sessions' },
  { key: 'nav.participate', path: 'participate' },
  { key: 'nav.about', path: 'about' },
  { key: 'nav.news', path: 'news' },
  { key: 'nav.partners', path: 'partners' },
  { key: 'nav.contact', path: 'contact' },
];

export const ui = {
  en: {
    'nav.home': 'Home',
    'nav.sessions': 'Sessions',
    'nav.participate': 'How to Participate',
    'nav.about': 'About Us',
    'nav.news': 'News',
    'nav.partners': 'Partners',
    'nav.contact': 'Contact',
    'site.name': 'EYP Azerbaijan',
    'footer.copyright': 'EYP Azerbaijan. All rights reserved.',
    'footer.partners': 'Partner logos will go here.',
    'apply.membersPlatform': 'Apply on the Members Platform',
    'apply.googleForm': 'Apply via Google Form',
  },
  az: {
    'nav.home': 'Ana səhifə',
    'nav.sessions': 'Sessiyalar',
    'nav.participate': 'Necə qoşulmaq olar',
    'nav.about': 'Haqqımızda',
    'nav.news': 'Xəbərlər',
    'nav.partners': 'Tərəfdaşlar',
    'nav.contact': 'Əlaqə',
    'site.name': 'EYP Azerbaijan',
    'footer.copyright': 'EYP Azerbaijan. Bütün hüquqlar qorunur.',
    'footer.partners': 'Tərəfdaş loqoları burada olacaq.',
    'apply.membersPlatform': 'Members Platform vasitəsilə müraciət et',
    'apply.googleForm': 'Google Form ilə müraciət et',
  },
} as const;

export type UIKey = keyof (typeof ui)['en'];

export function useTranslations(locale: Locale) {
  return function t(key: UIKey): string {
    return ui[locale][key] ?? ui[defaultLocale][key];
  };
}
