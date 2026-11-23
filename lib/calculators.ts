import type { CategorySlug } from './i18n.ts';

// Benefit calculators. Every formula comes from the official page in `sources`
// (read on `checkedOn`); the calculator components only do that arithmetic.

export type CalculatorText = { title: string; description: string; intro: string };

export type Calculator = {
  slug: 'sss-pension' | 'sss-maternity' | 'sss-sickness';
  category: CategorySlug;
  checkedOn: string;
  guideSlug: string; // the matching guide
  sources: { name: string; url: string }[];
  en: CalculatorText;
  fil: CalculatorText;
};

export const CALCULATORS: Calculator[] = [
  {
    slug: 'sss-pension',
    category: 'sss-gsis',
    checkedOn: '2026-11-24',
    guideSlug: 'sss-retirement-benefit',
    sources: [{ name: 'SSS: Retirement Benefit', url: 'https://www.sss.gov.ph/retirement-benefit/' }],
    en: {
      title: 'SSS pension calculator',
      description: 'Estimate your SSS monthly retirement pension using the official SSS formula.',
      intro:
        'Enter your average monthly salary credit and your credited years of service. The calculator applies the three formulas on the official SSS page and shows the highest, which is what SSS pays.',
    },
    fil: {
      title: 'SSS pension calculator',
      description: 'Tantiyahin ang buwanang SSS retirement pension mo gamit ang opisyal na formula ng SSS.',
      intro:
        'Ilagay ang average monthly salary credit at credited years of service mo. Gagamitin ng calculator ang tatlong formula sa opisyal na pahina ng SSS at ipapakita ang pinakamataas, na siyang ibinabayad ng SSS.',
    },
  },
  {
    slug: 'sss-maternity',
    category: 'sss-gsis',
    checkedOn: '2026-11-24',
    guideSlug: 'sss-maternity-benefit',
    sources: [{ name: 'SSS: Maternity Benefit', url: 'https://www.sss.gov.ph/maternity-benefit/' }],
    en: {
      title: 'SSS maternity benefit calculator',
      description: 'Estimate your SSS maternity benefit for 105, 120 or 60 days using the official SSS computation.',
      intro:
        'Pick the month of your delivery (or expected delivery), see which 12 months SSS looks at, then enter your 6 highest monthly salary credits from those months.',
    },
    fil: {
      title: 'SSS maternity benefit calculator',
      description: 'Tantiyahin ang SSS maternity benefit mo para sa 105, 120 o 60 araw gamit ang opisyal na kuwenta ng SSS.',
      intro:
        'Piliin ang buwan ng panganganak mo (o inaasahang panganganak), tingnan kung aling 12 buwan ang tinitingnan ng SSS, at ilagay ang 6 na pinakamataas na monthly salary credit mo sa mga buwang iyon.',
    },
  },
  {
    slug: 'sss-sickness',
    category: 'sss-gsis',
    checkedOn: '2026-11-24',
    guideSlug: 'sss-sickness-benefit',
    sources: [{ name: 'SSS: Sickness Benefit', url: 'https://www.sss.gov.ph/sickness-benefit/' }],
    en: {
      title: 'SSS sickness benefit calculator',
      description: 'Estimate your SSS sickness benefit (90% of your average daily salary credit) using the official SSS computation.',
      intro:
        'Pick the month you got sick, see which 12 months SSS looks at, then enter your 6 highest monthly salary credits from those months and the number of days.',
    },
    fil: {
      title: 'SSS sickness benefit calculator',
      description: 'Tantiyahin ang SSS sickness benefit mo (90% ng average daily salary credit) gamit ang opisyal na kuwenta ng SSS.',
      intro:
        'Piliin ang buwan ng pagkakasakit mo, tingnan kung aling 12 buwan ang tinitingnan ng SSS, at ilagay ang 6 na pinakamataas na monthly salary credit mo sa mga buwang iyon at ang bilang ng araw.',
    },
  },
];

export function getCalculator(slug: string): Calculator | undefined {
  return CALCULATORS.find((c) => c.slug === slug);
}

// ---------- shared SSS arithmetic (from the official pages) ----------

/** Regular-program benefits are computed on monthly salary credits up to ₱20,000. */
export const MSC_CAP = 20_000;

/** The 12 months SSS looks at: count back 12 months from the month before the semester of contingency. */
export function salaryCreditWindow(month: number, year: number): { start: Date; end: Date } {
  const quarterStart = year * 12 + Math.floor((month - 1) / 3) * 3; // first month of the contingency's quarter
  const semesterStart = quarterStart - 3; // the semester = this quarter and the one before
  const end = semesterStart - 1;
  const start = end - 11;
  const toDate = (abs: number) => new Date(Date.UTC(Math.floor(abs / 12), abs % 12, 1));
  return { start: toDate(start), end: toDate(end) };
}

/** Average daily salary credit: the 6 highest MSCs (each capped) added together, divided by 180. */
export function averageDailySalaryCredit(credits: number[]): number {
  const top6 = credits
    .filter((n) => Number.isFinite(n) && n > 0)
    .map((n) => Math.min(n, MSC_CAP))
    .sort((a, b) => b - a)
    .slice(0, 6);
  return top6.reduce((s, n) => s + n, 0) / 180;
}

/** SSS monthly pension: the highest of the three official formulas. */
export function sssPension(amsc: number, cys: number) {
  const a = Math.min(Math.max(amsc, 0), MSC_CAP);
  const formula1 = 300 + 0.2 * a + 0.02 * a * Math.max(cys - 10, 0);
  const formula2 = 0.4 * a;
  const minimum = cys >= 20 ? 2_400 : cys >= 10 ? 1_200 : 0;
  const monthly = Math.max(formula1, formula2, minimum);
  return { formula1, formula2, minimum, monthly, withAdditional: monthly + 1_000 };
}
