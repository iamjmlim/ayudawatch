import type { CategorySlug } from './i18n.ts';
import { HOLIDAY_PAY_CHECKED_ON, HOLIDAY_PAY_SOURCES, HOLIDAYS_2027_SOURCES } from './holiday-pay.ts';
import { TAX_CHECKED_ON, TAX_SOURCES } from './tax.ts';
import { LABOR_CHECKED_ON, LABOR_CODE_SOURCE } from './labor.ts';

// Benefit calculators. Every formula comes from the official page in `sources`
// (read on `checkedOn`); the calculator components only do that arithmetic.

export type CalculatorText = {
  title: string;
  description: string;
  intro: string;
};

export type Calculator = {
  slug:
    | 'thirteenth-month'
    | 'holiday-pay'
    | 'take-home-pay'
    | 'overtime-pay'
    | 'separation-pay'
    | 'retirement-pay'
    | 'contributions'
    | 'sss-pension'
    | 'sss-maternity'
    | 'sss-sickness'
    | 'pagibig-mp2';
  category: CategorySlug;
  checkedOn: string;
  guideSlug?: string; // the matching guide, if there is one
  sources: { name: string; url: string }[];
  en: CalculatorText;
  fil: CalculatorText;
};

const CALCULATOR_LIST: Calculator[] = [
  {
    slug: 'thirteenth-month',
    category: 'trabaho',
    checkedOn: '2026-11-25',
    guideSlug: 'thirteenth-month-pay',
    sources: [
      {
        name: 'DOLE Revised Guidelines on the 13th Month Pay Law (PD 851), full text',
        url: 'https://www.chanrobles.com/revised13thmonthpayguidelines.htm',
      },
      {
        name: 'Daily Tribune: DOLE Labor Advisory No. 21, Series of 2026',
        url: 'https://tribune.net.ph/2026/11/10/dole-issues-13th-month-pay-rules',
      },
    ],
    en: {
      title: '13th month pay calculator 2026',
      description: 'Compute your 13th month pay: 1/12 of your total basic pay this year, including pro-rated pay if you resigned or were hired this year.',
      intro:
        'Enter your monthly basic pay and the months you worked this year, or your total basic pay. The law sets the minimum at 1/12 of your total basic salary for the year, due by December 24.',
    },
    fil: {
      title: '13th month pay calculator 2026',
      description: 'Kuwentahin ang 13th month pay mo: 1/12 ng kabuuang basic pay mo ngayong taon, kasama ang pro-rated kung nag-resign ka o bagong pasok ngayong taon.',
      intro:
        'Ilagay ang buwanang basic pay mo at ang mga buwang nagtrabaho ka ngayong taon, o ang kabuuang basic pay mo. Itinakda ng batas ang minimum na 1/12 ng kabuuang basic salary sa loob ng taon, na dapat ibigay hanggang Disyembre 24.',
    },
  },
  {
    slug: 'holiday-pay',
    category: 'holiday',
    checkedOn: HOLIDAY_PAY_CHECKED_ON,
    guideSlug: 'holiday-pay',
    sources: [...HOLIDAY_PAY_SOURCES, ...HOLIDAYS_2027_SOURCES],
    en: {
      title: 'Holiday pay calculator 2026–2027',
      description: 'Compute your pay for working (or not working) on a 2026 regular holiday or special day, including rest days and overtime, using DOLE’s official rates.',
      intro:
        'Pick the holiday, enter your basic daily wage, and say whether you worked. The calculator uses DOLE’s 2026 rules: 200% on regular holidays, 130% on special days, with higher rates on rest days and for overtime.',
    },
    fil: {
      title: 'Holiday pay calculator 2026–2027',
      description:
        'Kuwentahin ang sahod mo sa pagtatrabaho (o hindi pagtatrabaho) sa regular holiday o special day sa 2026, kasama ang rest day at overtime, gamit ang opisyal na rate ng DOLE.',
      intro:
        'Piliin ang holiday, ilagay ang arawang basic na sahod mo, at sabihin kung nagtrabaho ka. Ginagamit ng calculator ang mga patakaran ng DOLE para sa 2026: 200% sa regular holiday, 130% sa special day, at mas mataas sa rest day at overtime.',
    },
  },
  {
    slug: 'contributions',
    category: 'sss-gsis',
    checkedOn: '2026-11-24',
    sources: [
      {
        name: 'SSS: Contribution Table',
        url: 'https://www.sss.gov.ph/sss-contribution-table/',
      },
      {
        name: 'PhilHealth: Premium Contribution Table',
        url: 'https://www.philhealth.gov.ph/partners/employers/ContributionTable_v2.pdf',
      },
      {
        name: 'Pag-IBIG Fund: Regular Savings',
        url: 'https://www.pagibigfund.gov.ph/Membership_RegularSavings.html',
      },
    ],
    en: {
      title: 'SSS, PhilHealth and Pag-IBIG contribution calculator 2026',
      description: 'Enter your monthly salary to see your SSS, PhilHealth and Pag-IBIG contributions and your employer’s share, using the official tables.',
      intro:
        'Enter your monthly salary and membership type. The calculator uses the official SSS schedule (effective January 2025), PhilHealth’s 5% premium and Pag-IBIG’s ₱10,000 maximum fund salary.',
    },
    fil: {
      title: 'SSS, PhilHealth at Pag-IBIG contribution calculator 2026',
      description: 'Ilagay ang buwanang sahod mo para makita ang hulog mo sa SSS, PhilHealth at Pag-IBIG at ang hati ng employer, gamit ang mga opisyal na table.',
      intro:
        'Ilagay ang buwanang sahod at uri ng membership mo. Ginagamit ng calculator ang opisyal na SSS schedule (epektibo Enero 2025), ang 5% premium ng PhilHealth at ang ₱10,000 maximum fund salary ng Pag-IBIG.',
    },
  },
  {
    slug: 'sss-pension',
    category: 'sss-gsis',
    checkedOn: '2026-11-25',
    guideSlug: 'sss-retirement-benefit',
    sources: [
      {
        name: 'SSS: Retirement Benefit',
        url: 'https://www.sss.gov.ph/retirement-benefit/',
      },
      {
        name: 'Department of Finance: SSS 2026 pension increase (June 2, 2026)',
        url: 'https://www.dof.gov.ph/sss-begins-early-june-rollout-of-2026-pension-hike-citing-need-for-early-relief-for-pensioners/',
      },
    ],
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
    sources: [
      {
        name: 'SSS: Maternity Benefit',
        url: 'https://www.sss.gov.ph/maternity-benefit/',
      },
    ],
    en: {
      title: 'SSS maternity benefit calculator',
      description: 'Estimate your SSS maternity benefit for 105, 120 or 60 days using the official SSS computation.',
      intro: 'Pick the month of your delivery (or expected delivery), see which 12 months SSS looks at, then enter your 6 highest monthly salary credits from those months.',
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
    sources: [
      {
        name: 'SSS: Sickness Benefit',
        url: 'https://www.sss.gov.ph/sickness-benefit/',
      },
    ],
    en: {
      title: 'SSS sickness benefit calculator',
      description: 'Estimate your SSS sickness benefit (90% of your average daily salary credit) using the official SSS computation.',
      intro: 'Pick the month you got sick, see which 12 months SSS looks at, then enter your 6 highest monthly salary credits from those months and the number of days.',
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
    sources: [
      {
        name: 'Pag-IBIG Fund: MP2 Savings',
        url: 'https://www.pagibigfund.gov.ph/member_savings_mp2.html',
      },
    ],
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
  {
    slug: 'take-home-pay',
    category: 'trabaho',
    checkedOn: TAX_CHECKED_ON,
    sources: TAX_SOURCES,
    en: {
      title: 'Take-home pay and income tax calculator 2026',
      description: 'Compute your monthly net pay after SSS, PhilHealth, Pag-IBIG and withholding tax, using the TRAIN law tax table and the official 2026 contribution rates.',
      intro:
        'Enter your monthly basic pay and any allowances. The calculator deducts your share of SSS, PhilHealth and Pag-IBIG, then the income tax from the TRAIN law table in force since 2023.',
    },
    fil: {
      title: 'Take-home pay at income tax calculator 2026',
      description:
        'Kuwentahin ang buwanang net pay mo pagkatapos ng SSS, PhilHealth, Pag-IBIG at withholding tax, gamit ang tax table ng TRAIN law at ang opisyal na contribution rate sa 2026.',
      intro:
        'Ilagay ang buwanang basic pay mo at anumang allowance. Ibabawas ng calculator ang bahagi mo sa SSS, PhilHealth at Pag-IBIG, at ang income tax mula sa tax table ng TRAIN law na umiiral mula 2023.',
    },
  },
  {
    slug: 'overtime-pay',
    category: 'trabaho',
    checkedOn: LABOR_CHECKED_ON,
    sources: [LABOR_CODE_SOURCE],
    en: {
      title: 'Overtime and night differential calculator',
      description: 'Compute your overtime pay (+25%, or +30% on a rest day) and night shift differential (+10% from 10 PM to 6 AM) under the Labor Code.',
      intro:
        'Enter your daily wage and the hours you worked. Under the Labor Code, overtime is paid at least 25% more per hour (30% more on top of the rest-day rate), and each hour from 10 PM to 6 AM earns at least 10% more.',
    },
    fil: {
      title: 'Overtime at night differential calculator',
      description: 'Kuwentahin ang overtime pay (+25%, o +30% sa rest day) at night shift differential (+10% mula 10 PM hanggang 6 AM) ayon sa Labor Code.',
      intro:
        'Ilagay ang arawang sahod mo at ang oras na nagtrabaho ka. Sa Labor Code, hindi bababa sa 25% ang dagdag kada oras ng overtime (30% dagdag sa rest-day rate), at hindi bababa sa 10% ang dagdag sa bawat oras mula 10 PM hanggang 6 AM.',
    },
  },
  {
    slug: 'separation-pay',
    category: 'trabaho',
    checkedOn: LABOR_CHECKED_ON,
    guideSlug: 'separation-pay',
    sources: [LABOR_CODE_SOURCE],
    en: {
      title: 'Separation pay calculator',
      description: 'Compute the minimum separation pay under the Labor Code for redundancy, retrenchment, closure or illness: 1 month or ½ month per year of service.',
      intro: 'Pick why your job ended, then enter your monthly pay and years of service. The Labor Code sets the minimum; your contract or company policy may give more.',
    },
    fil: {
      title: 'Separation pay calculator',
      description: 'Kuwentahin ang pinakamababang separation pay sa Labor Code para sa redundancy, retrenchment, pagsasara o sakit: 1 buwan o ½ buwan kada taon ng serbisyo.',
      intro:
        'Piliin kung bakit natapos ang trabaho mo, saka ilagay ang buwanang sahod at taon ng serbisyo. Ang Labor Code ang nagtatakda ng pinakamababa; puwedeng higit pa ang ibigay ng kontrata o patakaran ng kompanya.',
    },
  },
  {
    slug: 'retirement-pay',
    category: 'trabaho',
    checkedOn: LABOR_CHECKED_ON,
    guideSlug: 'retirement-pay',
    sources: [LABOR_CODE_SOURCE],
    en: {
      title: 'Retirement pay calculator (RA 7641)',
      description: 'Compute the retirement pay your employer owes under the Labor Code and RA 7641: 22.5 days’ pay for every year of service, from age 60.',
      intro:
        'Enter your daily rate, age and years of service. The law gives at least ½ month salary (22.5 days’ pay) for every year of service to employees aged 60 to 65 with at least 5 years of service.',
    },
    fil: {
      title: 'Retirement pay calculator (RA 7641)',
      description: 'Kuwentahin ang retirement pay na dapat ibigay ng employer ayon sa Labor Code at RA 7641: 22.5 araw na sahod kada taon ng serbisyo, mula edad 60.',
      intro:
        'Ilagay ang daily rate, edad at taon ng serbisyo mo. Nagbibigay ang batas ng hindi bababa sa ½ buwang sahod (22.5 araw na sahod) kada taon ng serbisyo sa mga empleyadong edad 60 hanggang 65 na may hindi bababa sa 5 taon ng serbisyo.',
    },
  },
];

// Display order: most-searched first, by Google Trends and autocomplete for the Philippines
// (checked 2026-11-24). Seasonal calculators lead while their season lasts:
// 13th month pay and holiday pay through December. Revisit with real usage data later.
const DEMAND_ORDER: Calculator['slug'][] = [
  'thirteenth-month', // seasonal: biggest spike every December
  'holiday-pay', // seasonal: December holidays
  'take-home-pay', // 'salary calculator philippines' / 'tax calculator philippines' are searched all year
  'pagibig-mp2', // highest year-round search interest of the topics checked
  'contributions', // 'sss contribution table 2026' is the top SSS search
  'sss-pension', // 'sss pension calculator' is the top suggestion for 'sss pension'
  'sss-maternity',
  'sss-sickness',
  'overtime-pay',
  'separation-pay',
  'retirement-pay',
];

export const CALCULATORS: Calculator[] = [...CALCULATOR_LIST].sort((a, b) => DEMAND_ORDER.indexOf(a.slug) - DEMAND_ORDER.indexOf(b.slug));

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

export type Mp2Year = {
  year: number;
  deposits: number;
  dividend: number;
  balance: number;
};

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
    years.push({
      year: y,
      deposits: m * 12 + (y === 1 ? Math.max(lumpSum, 0) : 0),
      dividend,
      balance,
    });
  }
  const totalDividends = years.reduce((s, y) => s + y.dividend, 0);
  return { years, principal, totalDividends, atMaturity: balance, paidOut };
}

/** Retirement pension increases already granted under the SSS Pension Reform Program (10% each, compounded). */
export const PENSION_REFORM_FACTOR = 1.1 * 1.1;

/** SSS monthly pension: the highest of the three official formulas. */
export function sssPension(amsc: number, cys: number) {
  const a = Math.min(Math.max(amsc, 0), MSC_CAP);
  const formula1 = 300 + 0.2 * a + 0.02 * a * Math.max(cys - 10, 0);
  const formula2 = 0.4 * a;
  const minimum = cys >= 20 ? 2_400 : cys >= 10 ? 1_200 : 0;
  const monthly = Math.max(formula1, formula2, minimum);
  // SSS Pension Reform Program: +10% for retirement pensions in Sept 2025 and June 2026 (compounded).
  const withReform = monthly * PENSION_REFORM_FACTOR;
  return {
    formula1,
    formula2,
    minimum,
    monthly,
    withAdditional: monthly + 1_000,
    withReform,
    withReformAndAdditional: withReform + 1_000,
  };
}
