// UI text in English and Filipino. Story text comes from the database.

export const LOCALES = ['en', 'fil'] as const;
export type Locale = (typeof LOCALES)[number];

export function isLocale(value: string): value is Locale {
  return (LOCALES as readonly string[]).includes(value);
}

export const CATEGORY_SLUGS = [
  'ayuda',
  'sss-gsis',
  'philhealth',
  'pabahay',
  'eskwela',
  'trabaho',
  'ofw',
  'dokumento',
  'buwis',
  'holiday',
  'presyo',
] as const;
export type CategorySlug = (typeof CATEGORY_SLUGS)[number];

export function isCategory(value: string): value is CategorySlug {
  return (CATEGORY_SLUGS as readonly string[]).includes(value);
}

const en = {
  siteName: 'AyudaWatch',
  tagline: 'Benefits and aid news, made clear.',
  description:
    'Independent updates on Philippine government benefits, aid, IDs, school and work announcements, and holidays, in English and Filipino, with links to official sources. Not a government website.',
  notGov: 'Not a government website. Always confirm with the official agency.',
  topStories: 'Top stories',
  navTop: 'Top stories',
  navLabel: 'Sections',
  skipToContent: 'Skip to stories',
  lastUpdated: 'Last updated',
  categories: {
    ayuda: 'Aid & subsidies',
    'sss-gsis': 'SSS & GSIS',
    philhealth: 'PhilHealth',
    pabahay: 'Pag-IBIG & housing',
    eskwela: 'School',
    trabaho: 'Work & wages',
    ofw: 'OFWs',
    dokumento: 'IDs & documents',
    buwis: 'Taxes',
    holiday: 'Holidays',
    presyo: 'Prices & fares',
  } satisfies Record<CategorySlug, string>,
  whyItMatters: 'What it means for you',
  reportedBy: 'Reported by',
  outlets: (n: number) => (n === 1 ? '1 outlet' : `${n} outlets`),
  reportedByCount: (n: number) => (n === 1 ? 'Reported by 1 outlet' : `Reported by ${n} outlets`),
  readOriginals: 'Read the original reports',
  aiShort: 'AI-written summary, checked against the sources',
  aiNotice:
    'This summary was written by AI from the reports listed above. Names and numbers are checked against those reports, but read the originals for full details.',
  published: 'Published',
  updated: 'Updated',
  noStories: 'No stories in this section in the last few days. We only publish stories reported by at least two outlets, so some sections stay quiet.',
  noStoriesCta: 'See todayâs top stories',
  moreIn: (section: string) => `More in ${section}`,
  backHome: 'Back to top stories',
  switchLanguage: 'Filipino',
  switchLanguageLabel: 'Basahin sa Filipino',
  about: 'How it works',
  corrections: 'Corrections',
  reportError: 'Spotted an error?',
  reportErrorCta: 'Tell us',
  correctionsHow: 'See how corrections work',
  officialSources: 'Official sources',
  digestTitle: 'Benefit updates, every morning',
  digestBody: 'The day’s most important benefits and aid updates in your inbox at 7 AM Philippine time, in Filipino and English.',
  digestEmail: 'Your email',
  digestButton: 'Subscribe',
  digestNote: 'Free. One email a day. Unsubscribe anytime.',
  opensNewTab: '(opens in a new tab)',
  footerNote:
    'AyudaWatch is an independent site, not affiliated with any government agency. We summarize official announcements and news reports and link to every source. We never ask for personal information or payments, and we do not process applications.',
  notFoundTitle: 'Story not found',
  notFoundBody: 'It may have been removed or the link is wrong.',
} as const;

type Dictionary = {
  [K in keyof typeof en]: (typeof en)[K] extends (...args: infer A) => infer R
    ? (...args: A) => R
    : (typeof en)[K] extends Record<string, string>
      ? Record<keyof (typeof en)[K], string>
      : string;
};

const fil: Dictionary = {
  siteName: 'AyudaWatch',
  tagline: 'Balita sa ayuda at benepisyo, malinaw.',
  description:
    'Malayang update sa mga benepisyo at ayuda ng gobyerno, mga ID at dokumento, anunsyo sa eskwela at trabaho, at holiday, sa Filipino at Ingles, may link sa opisyal na source. Hindi ito website ng gobyerno.',
  notGov: 'Hindi ito website ng gobyerno. Laging kumpirmahin sa opisyal na ahensya.',
  topStories: 'Ulo ng balita',
  navTop: 'Ulo ng balita',
  navLabel: 'Mga seksyon',
  skipToContent: 'Lumaktaw sa mga balita',
  lastUpdated: 'Huling update',
  categories: {
    ayuda: 'Ayuda at subsidiya',
    'sss-gsis': 'SSS at GSIS',
    philhealth: 'PhilHealth',
    pabahay: 'Pag-IBIG at pabahay',
    eskwela: 'Eskwela',
    trabaho: 'Trabaho at sahod',
    ofw: 'OFW',
    dokumento: 'ID at dokumento',
    buwis: 'Buwis',
    holiday: 'Holiday',
    presyo: 'Presyo at pamasahe',
  },
  whyItMatters: 'Para sa iyo',
  reportedBy: 'Iniulat ng',
  outlets: (n: number) => `${n} outlet`,
  reportedByCount: (n: number) => `Iniulat ng ${n} outlet`,
  readOriginals: 'Basahin ang orihinal na mga ulat',
  aiShort: 'Buod na isinulat ng AI, sinuri laban sa mga source',
  aiNotice:
    'Isinulat ng AI ang buod na ito mula sa mga ulat na nakalista sa itaas. Sinusuri ang mga pangalan at numero laban sa mga ulat na iyon, pero basahin ang orihinal para sa buong detalye.',
  published: 'Inilathala',
  updated: 'In-update',
  noStories: 'Walang balita sa seksyong ito nitong mga nakaraang araw. Naglalathala lang kami ng balitang iniulat ng hindi bababa sa dalawang outlet, kaya may mga seksyong tahimik.',
  noStoriesCta: 'Tingnan ang ulo ng balita',
  moreIn: (section: string) => `Iba pa sa ${section}`,
  backHome: 'Bumalik sa ulo ng balita',
  switchLanguage: 'English',
  switchLanguageLabel: 'Read in English',
  about: 'Paano ito gumagana',
  corrections: 'Mga pagtatama',
  reportError: 'May nakitang mali?',
  reportErrorCta: 'Ipaalam sa amin',
  correctionsHow: 'Alamin kung paano kami nagtatama',
  officialSources: 'Opisyal na source',
  digestTitle: 'Update sa benepisyo, tuwing umaga',
  digestBody: 'Ang pinakamahalagang update sa ayuda at benepisyo sa iyong inbox, 7 AM oras sa Pilipinas, sa Filipino at English.',
  digestEmail: 'Iyong email',
  digestButton: 'Mag-subscribe',
  digestNote: 'Libre. Isang email araw-araw. Puwedeng mag-unsubscribe anumang oras.',
  opensNewTab: '(magbubukas sa bagong tab)',
  footerNote:
    'Ang AyudaWatch ay malayang website at hindi konektado sa anumang ahensya ng gobyerno. Binubuod namin ang mga opisyal na anunsyo at ulat ng balita at may link sa bawat source. Hindi kami humihingi ng personal na impormasyon o bayad, at hindi kami nagpoproseso ng aplikasyon.',
  notFoundTitle: 'Hindi makita ang balita',
  notFoundBody: 'Maaaring inalis na ito o mali ang link.',
};

const DICTIONARIES: Record<Locale, Dictionary> = { en: en as Dictionary, fil };

export function getDictionary(locale: Locale): Dictionary {
  return DICTIONARIES[locale];
}

export function otherLocale(locale: Locale): Locale {
  return locale === 'en' ? 'fil' : 'en';
}

// Dates are always shown in Philippine time, whoever is reading.
export function formatDateTime(iso: string, locale: Locale): string {
  return (
    new Intl.DateTimeFormat(locale === 'fil' ? 'fil-PH' : 'en-PH', {
      timeZone: 'Asia/Manila',
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
    }).format(new Date(iso)) + ' PHT'
  );
}

export function formatTime(iso: string, locale: Locale): string {
  return (
    new Intl.DateTimeFormat(locale === 'fil' ? 'fil-PH' : 'en-PH', {
      timeZone: 'Asia/Manila',
      hour: 'numeric',
      minute: '2-digit',
    }).format(new Date(iso)) + ' PHT'
  );
}

export function formatDate(iso: string, locale: Locale): string {
  return new Intl.DateTimeFormat(locale === 'fil' ? 'fil-PH' : 'en-PH', {
    timeZone: 'Asia/Manila',
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  }).format(new Date(iso));
}
