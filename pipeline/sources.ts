// Feed list. New entries are added to the database on the next run;
// after that, `active` and `tier` are managed in the database (admin page),
// so editing them here does not overwrite your changes.

export type SourceConfig = {
  slug: string;
  name: string;
  feedUrl: string;
  homepage: string;
  tier: 1 | 2; // 1 = wire/official, 2 = major national outlet
  language: 'en' | 'fil';
  // 'rss' (default) reads a feed; 'html' reads announcement links from a page.
  kind?: 'rss' | 'html';
  linkPattern?: string; // for 'html': which hrefs are announcements
};

// Checked 2026-11-19 and left out on purpose:
// - Philippine News Agency: no RSS feed, but its homepage list is read (see Official sources below)
// - ABS-CBN News, Manila Bulletin, PIA: block automated feed readers (HTTP 403).
//   We respect that instead of pretending to be a browser.

export const SOURCES: SourceConfig[] = [
  {
    slug: 'gma',
    name: 'GMA News',
    feedUrl: 'https://data.gmanetwork.com/gno/rss/news/feed.xml',
    homepage: 'https://www.gmanetwork.com/news/',
    tier: 2,
    language: 'en',
  },
  {
    slug: 'inquirer',
    name: 'Inquirer.net',
    feedUrl: 'https://newsinfo.inquirer.net/feed',
    homepage: 'https://newsinfo.inquirer.net',
    tier: 2,
    language: 'en',
  },
  {
    slug: 'philstar',
    name: 'Philstar',
    feedUrl: 'https://www.philstar.com/rss/headlines',
    homepage: 'https://www.philstar.com',
    tier: 2,
    language: 'en',
  },
  {
    slug: 'rappler',
    name: 'Rappler',
    feedUrl: 'https://www.rappler.com/feed/',
    homepage: 'https://www.rappler.com',
    tier: 2,
    language: 'en',
  },
  {
    slug: 'manilatimes',
    name: 'The Manila Times',
    feedUrl: 'https://www.manilatimes.net/news/feed',
    homepage: 'https://www.manilatimes.net',
    tier: 2,
    language: 'en',
  },
  {
    slug: 'bworld',
    name: 'BusinessWorld',
    feedUrl: 'https://www.bworldonline.com/feed/',
    homepage: 'https://www.bworldonline.com',
    tier: 2,
    language: 'en',
  },
];

// ---------------------------------------------------------------------------
// Section feeds of the outlets above (added 2026-11-23). Each uses the outlet's
// exact `name`, so a story counts that outlet once no matter how many of its
// feeds carry it.
const section = (
  slug: string,
  name: string,
  homepage: string,
  feedUrl: string,
): SourceConfig => ({ slug, name, feedUrl, homepage, tier: 2, language: 'en' });

const GMA = ['GMA News', 'https://www.gmanetwork.com/news/'] as const;
const INQ = ['Inquirer.net', 'https://newsinfo.inquirer.net'] as const;
const PHS = ['Philstar', 'https://www.philstar.com'] as const;
const MT = ['The Manila Times', 'https://www.manilatimes.net'] as const;
const RAP = ['Rappler', 'https://www.rappler.com'] as const;
const BW = ['BusinessWorld', 'https://www.bworldonline.com'] as const;

SOURCES.push(
  section('gma-sports', ...GMA, 'https://data.gmanetwork.com/gno/rss/sports/feed.xml'),
  section('gma-money', ...GMA, 'https://data.gmanetwork.com/gno/rss/money/feed.xml'),
  section('gma-showbiz', ...GMA, 'https://data.gmanetwork.com/gno/rss/showbiz/feed.xml'),
  section('gma-scitech', ...GMA, 'https://data.gmanetwork.com/gno/rss/scitech/feed.xml'),

  section('inquirer-sports', ...INQ, 'https://sports.inquirer.net/feed'),
  section('inquirer-business', ...INQ, 'https://business.inquirer.net/feed'),
  section('inquirer-globalnation', ...INQ, 'https://globalnation.inquirer.net/feed'),
  section('inquirer-entertainment', ...INQ, 'https://entertainment.inquirer.net/feed'),
  section('inquirer-technology', ...INQ, 'https://technology.inquirer.net/feed'),

  section('philstar-nation', ...PHS, 'https://www.philstar.com/rss/nation'),
  section('philstar-sports', ...PHS, 'https://www.philstar.com/rss/sports'),
  section('philstar-business', ...PHS, 'https://www.philstar.com/rss/business'),
  section('philstar-world', ...PHS, 'https://www.philstar.com/rss/world'),
  section('philstar-entertainment', ...PHS, 'https://www.philstar.com/rss/entertainment'),

  section('manilatimes-sports', ...MT, 'https://www.manilatimes.net/sports/feed'),
  section('manilatimes-business', ...MT, 'https://www.manilatimes.net/business/feed'),
  section('manilatimes-world', ...MT, 'https://www.manilatimes.net/world/feed'),
  section('manilatimes-regions', ...MT, 'https://www.manilatimes.net/regions/feed'),
  section('manilatimes-entertainment', ...MT, 'https://www.manilatimes.net/entertainment-lifestyle/feed'),

  section('rappler-sports', ...RAP, 'https://www.rappler.com/sports/feed/'),
  section('rappler-business', ...RAP, 'https://www.rappler.com/business/feed/'),
  section('rappler-world', ...RAP, 'https://www.rappler.com/world/feed/'),
  section('rappler-entertainment', ...RAP, 'https://www.rappler.com/entertainment/feed/'),
  section('rappler-mindanao', ...RAP, 'https://www.rappler.com/philippines/mindanao/feed/'),
  section('rappler-visayas', ...RAP, 'https://www.rappler.com/philippines/visayas/feed/'),

  section('bworld-sports', ...BW, 'https://www.bworldonline.com/sports/feed/'),
);

// New outlets (added 2026-11-23): regional and business coverage.
// Checked and left out: Spin.ph (404/403), BusinessMirror (403), Daily Tribune
// (empty feed), Interaksyon (stale), PNA and PAGASA (no feed).
// Manila Standard is left out: it serves GitHub's servers a non-RSS page.

SOURCES.push(
  { slug: 'sunstar', name: 'SunStar', feedUrl: 'https://www.sunstar.com.ph/feed', homepage: 'https://www.sunstar.com.ph', tier: 2, language: 'en' },
  { slug: 'mindanaotimes', name: 'Mindanao Times', feedUrl: 'https://mindanaotimes.com.ph/feed/', homepage: 'https://mindanaotimes.com.ph', tier: 2, language: 'en' },
  { slug: 'panaynews', name: 'Panay News', feedUrl: 'https://www.panaynews.net/feed/', homepage: 'https://www.panaynews.net', tier: 2, language: 'en' },
  { slug: 'bilyonaryo', name: 'Bilyonaryo', feedUrl: 'https://bilyonaryo.com/feed/', homepage: 'https://bilyonaryo.com', tier: 2, language: 'en' },
);

// Official sources (tier 1): a single official announcement may publish alone.
// Checked 2026-11-23. Blocked by bot challenges (not worked around): DOLE, DOH,
// LTO, DFA, PSA, CSC, CHED, PCO, NDRRMC. No readable list: SSS, DSWD, Pag-IBIG,
// BIR, DMW (covered through news reports and PNA instead).
SOURCES.push(
  {
    slug: 'deped',
    name: 'DepEd',
    feedUrl: 'https://www.deped.gov.ph/feed/',
    homepage: 'https://www.deped.gov.ph',
    tier: 1,
    language: 'en',
  },
  {
    slug: 'officialgazette',
    name: 'Official Gazette',
    feedUrl: 'https://www.officialgazette.gov.ph/feed/',
    homepage: 'https://www.officialgazette.gov.ph',
    tier: 1,
    language: 'en',
  },
  {
    slug: 'pna',
    name: 'Philippine News Agency',
    feedUrl: 'https://www.pna.gov.ph/',
    homepage: 'https://www.pna.gov.ph',
    tier: 1,
    language: 'en',
    kind: 'html',
    linkPattern: '^/article/[a-z0-9-]+$',
  },
  {
    slug: 'philhealth',
    name: 'PhilHealth',
    feedUrl: 'https://www.philhealth.gov.ph/news/',
    homepage: 'https://www.philhealth.gov.ph',
    tier: 1,
    language: 'en',
    kind: 'html',
    linkPattern: String.raw`^up/article/\d{4}/news_[a-z0-9]+\.php$`,
  },
);
