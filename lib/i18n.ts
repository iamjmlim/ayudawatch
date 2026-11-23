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
  'babala',
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
    babala: 'Scam alerts',
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
  noStoriesCta: 'See today’s top stories',
  moreIn: (section: string) => `More in ${section}`,
  backHome: 'Back to top stories',
  sectionDescription: (section: string) =>
    `${section}: the latest Philippine government benefits and aid updates, in English and Filipino, each linked to the official source. Not a government website.`,
  switchLanguage: 'Filipino',
  switchLanguageLabel: 'Basahin sa Filipino',
  about: 'How it works',
  corrections: 'Corrections',
  reportError: 'Spotted an error?',
  reportErrorCta: 'Tell us',
  correctionsHow: 'See how corrections work',
  officialSources: 'Official sources',
  guides: 'Guides',
  guidesTitle: 'Guides to government benefits',
  guidesIntro:
    'Step-by-step guides to common benefits and services, written from the official agency pages and checked on the date shown. Rules change, so always confirm on the official page before you apply.',
  guidesIn: (section: string) => `Guides: ${section}`,
  guideChecked: (date: string) => `Checked against the official page on ${date}`,
  guideSource: 'Official source',
  guideNotice:
    'AyudaWatch is not a government website and does not process applications. This guide is based only on the official page above; if anything differs, the official page is correct.',
  calculators: 'Calculators',
  calculatorsTitle: 'Benefit calculators',
  calculatorsIntro:
    'Estimate your SSS benefits with the formulas on the official SSS pages. Results are estimates: the amount SSS approves is final.',
  calcNotice:
    'This is an estimate, not an official SSS computation. It uses only the formula on the official page linked below and the numbers you enter. AyudaWatch does not save what you type.',
  calcGuide: 'Read the full guide',
  calcCta: 'Estimate your benefit',
  checker: 'Which benefits?',
  checkerTitle: 'Which benefits can I get?',
  checkerIntro:
    'Tick what applies to you to see the guides and calculators that may help. This only points you to information; the agency decides who qualifies.',
  checkerResults: 'Guides and calculators that may help',
  checkerNone: 'Tick at least one item to see guides.',
  suspensions: 'Walang pasok',
  suspensionsTitle: 'Class and work suspensions',
  suspensionsIntro:
    'Class and work suspension announcements from the last 36 hours, from official sources and news reports. Always confirm with your LGU, school or DepEd before staying home.',
  suspensionsNone: 'No class or work suspension announcements in the last 36 hours.',
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
    babala: 'Babala sa scam',
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
  sectionDescription: (section: string) =>
    `${section}: mga pinakabagong update sa benepisyo at ayuda ng gobyerno, sa Filipino at English, may link sa opisyal na source. Hindi ito website ng gobyerno.`,
  switchLanguage: 'English',
  switchLanguageLabel: 'Read in English',
  about: 'Paano ito gumagana',
  corrections: 'Mga pagtatama',
  reportError: 'May nakitang mali?',
  reportErrorCta: 'Ipaalam sa amin',
  correctionsHow: 'Alamin kung paano kami nagtatama',
  officialSources: 'Opisyal na source',
  guides: 'Mga gabay',
  guidesTitle: 'Mga gabay sa benepisyo ng gobyerno',
  guidesIntro:
    'Mga hakbang-hakbang na gabay sa mga karaniwang benepisyo at serbisyo, isinulat mula sa opisyal na pahina ng ahensya at sinuri sa petsang nakalagay. Nagbabago ang mga patakaran, kaya laging kumpirmahin sa opisyal na pahina bago mag-apply.',
  guidesIn: (section: string) => `Mga gabay: ${section}`,
  guideChecked: (date: string) => `Sinuri laban sa opisyal na pahina noong ${date}`,
  guideSource: 'Opisyal na source',
  guideNotice:
    'Ang AyudaWatch ay hindi website ng gobyerno at hindi nagpoproseso ng aplikasyon. Batay lamang ang gabay na ito sa opisyal na pahina sa itaas; kung may pagkakaiba, ang opisyal na pahina ang tama.',
  calculators: 'Mga calculator',
  calculatorsTitle: 'Mga benefit calculator',
  calculatorsIntro:
    'Tantiyahin ang mga benepisyo mo sa SSS gamit ang mga formula sa opisyal na pahina ng SSS. Tantiya lamang ang resulta: ang halagang aaprubahan ng SSS ang pinal.',
  calcNotice:
    'Tantiya lamang ito, hindi opisyal na kuwenta ng SSS. Ang formula lang sa opisyal na pahinang naka-link sa ibaba at ang mga numerong inilagay mo ang ginagamit nito. Hindi sine-save ng AyudaWatch ang tina-type mo.',
  calcGuide: 'Basahin ang buong gabay',
  calcCta: 'Tantiyahin ang benepisyo mo',
  checker: 'Aling benepisyo?',
  checkerTitle: 'Anong benepisyo ang puwede sa akin?',
  checkerIntro:
    'Lagyan ng tsek ang mga tugma sa iyo para makita ang mga gabay at calculator na makakatulong. Itinuturo lang nito ang impormasyon; ang ahensya ang magpapasya kung sino ang qualified.',
  checkerResults: 'Mga gabay at calculator na makakatulong',
  checkerNone: 'Lagyan ng tsek ang kahit isa para makita ang mga gabay.',
  suspensions: 'Walang pasok',
  suspensionsTitle: 'Walang pasok: suspensyon ng klase at trabaho',
  suspensionsIntro:
    'Mga anunsyo ng suspensyon ng klase at trabaho sa nakaraang 36 na oras, mula sa opisyal na source at mga ulat ng balita. Laging kumpirmahin sa LGU, paaralan o DepEd bago hindi pumasok.',
  suspensionsNone: 'Walang anunsyo ng suspensyon ng klase o trabaho sa nakaraang 36 na oras.',
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

// Short intros for sections that need context (most sections have none).
export const CATEGORY_INTROS: Record<Locale, Partial<Record<CategorySlug, string>>> = {
  en: {
    holiday: 'Announcements of regular and special non-working days, from official proclamations and news reports. The official proclamation is final.',
    babala: 'Official warnings about scams, fake pages, fake text messages and fixers that use government benefits or agencies. Agencies never ask for payment or passwords through personal messages.',
  },
  fil: {
    holiday: 'Mga anunsyo ng regular at special non-working day, mula sa opisyal na proklamasyon at mga ulat ng balita. Ang opisyal na proklamasyon ang pinal.',
    babala: 'Mga opisyal na babala tungkol sa scam, pekeng page, pekeng text at fixer na gumagamit ng benepisyo o ahensya ng gobyerno. Hindi humihingi ng bayad o password ang mga ahensya sa personal na mensahe.',
  },
};
