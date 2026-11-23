import type { CategorySlug } from './i18n.ts';

// Benefit calculators. Every formula comes from the official page in `sources`
// (read on `checkedOn`); the calculator components only do that arithmetic.

export type CalculatorText = { title: string; description: string; intro: string };

export type Calculator = {
  slug: 'contributions' | 'sss-pension' | 'sss-maternity' | 'sss-sickness' | 'pagibig-mp2';
  category: CategorySlug;
  checkedOn: string;
  guideSlug?: string; // the matching guide, if there is one
  sources: { name: string; url: string }[];
  en: CalculatorText;
  fil: CalculatorText;
};

export const CALCULATORS: Calculator[] = [
  {
    slug: 'contributions',
    category: 'sss-gsis',
    checkedOn: '2026-11-24',
    sources: [
      { name: 'SSS: Contribution Table', url: 'https://www.sss.gov.ph/sss-contribution-table/' },
      { name: 'PhilHealth: Premium Contribution Table', url: 'https://www.philhealth.gov.ph/partners/employers/ContributionTable_v2.pdf' },
      { name: 'Pag-IBIG Fund: Regular Savings', url: 'https://www.pagibigfund.gov.ph/Membership_RegularSavings.html' },
    ],
    en: {
      title: 'SSS, PhilHealth and Pag-IBIG contribution calculator 2026',
      description: 'Enter your monthly salary to see your SSS, PhilHealth and Pag-IBIG contributions and your employer’s share, using the official tables.',
      intro: 'Enter your monthly salary and membership type. The calculator uses the official SSS schedule (effective January 2025), PhilHealth’s 5% premium and Pag-IBIG’s ₱10,000 maximum fund salary.',
    },
    fil: {
      title: 'SSS, PhilHealth at Pag-IBIG contribution calculator 2026',
      description: 'Ilagay ang buwanang sahod mo para makita ang hulog mo sa SSS, PhilHealth at Pag-IBIG at ang hati ng employer, gamit ang mga opisyal na table.',
      intro: 'Ilagay ang buwanang sahod at uri ng membership mo. Ginagamit ng calculator ang opisyal na SSS schedule (epektibo Enero 2025), ang 5% premium ng PhilHealth at ang ₱10,000 maximum fund salary ng Pag-IBIG.',
    },
  },
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
  {
    slug: 'pagibig-mp2',
    category: 'pabahay',
    checkedOn: '2026-11-24',
    guideSlug: 'pagibig-mp2',
    sources: [{ name: 'Pag-IBIG Fund: MP2 Savings', url: 'https://www.pagibigfund.gov.ph/member_savings_mp2.html' }],
    en: {
      title: 'Pag-IBIG MP2 calculator',
      description: 'Estimate your Pag-IBIG MP2 savings and dividends after 5 years, using the official MP2 return rates.',
      intro:
        'Enter a one-time amount, a monthly amount, or both, and pick a dividend rate. Pag-IBIG has no official MP2 calculator, so this is an estimate based on the official return rates.',
    },
    fil: {
      title: 'Pag-IBIG MP2 calculator',
      description: 'Tantiyahin ang ipon at dibidendo mo sa Pag-IBIG MP2 pagkatapos ng 5 taon, gamit ang opisyal na MP2 return rate.',
      intro:
        'Maglagay ng isang bagsakang halaga, buwanang halaga, o pareho, at pumili ng dividend rate. Walang opisyal na MP2 calculator ang Pag-IBIG, kaya tantiya ito batay sa opisyal na return rate.',
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

// ---------- Pag-IBIG MP2 ----------

/** Official MP2 return rates (pagibigfund.gov.ph/member_savings_mp2.html, read 2026-11-24). */
export const MP2_RATES: { year: number; rate: number }[] = [
  { year: 2025, rate: 7.12 },
  { year: 2024, rate: 7.1 },
  { year: 2023, rate: 7.05 },
  { year: 2022, rate: 7.03 },
  { year: 2021, rate: 6.0 },
];
export const MP2_MIN_REMITTANCE = 500;

export type Mp2Year = { year: number; deposits: number; dividend: number; balance: number };

/**
 * Simple 5-year MP2 projection. Assumptions (Pag-IBIG does not publish its exact method):
 * the one-time amount is deposited at the start; each monthly deposit is made at the start of
 * its month and earns dividends for the months left in that year; dividends are credited once
 * a year at the same rate every year. "compounded" adds them to the balance; "annual" pays them out.
 */
export function mp2Projection(lumpSum: number, monthly: number, ratePct: number, payout: 'compounded' | 'annual') {
  const r = ratePct / 100;
  let balance = Math.max(lumpSum, 0);
  let principal = balance;
  let paidOut = 0;
  const years: Mp2Year[] = [];
  for (let y = 1; y <= 5; y++) {
    const m = Math.max(monthly, 0);
    // A deposit made at the start of month k earns (13 - k) / 12 of a year: 12/12 + 11/12 + … + 1/12 = 6.5 months' worth.
    const dividend = balance * r + m * r * (78 / 12);
    principal += m * 12;
    balance += m * 12;
    if (payout === 'compounded') balance += dividend;
    else paidOut += dividend;
    years.push({ year: y, deposits: m * 12 + (y === 1 ? Math.max(lumpSum, 0) : 0), dividend, balance });
  }
  const totalDividends = years.reduce((s, y) => s + y.dividend, 0);
  return { years, principal, totalDividends, atMaturity: balance, paidOut };
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
