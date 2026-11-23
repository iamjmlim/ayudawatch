// Monthly SSS, PhilHealth and Pag-IBIG contributions, from the official schedules:
//  - SSS Circulars 2024-006 to 2024-010, schedule effective January 2025, shown as current on
//    https://www.sss.gov.ph/sss-contribution-table/ (read 2026-11-24)
//  - PhilHealth premium schedule per Circular 2019-0009, "2024 to 2025: 5%", from
//    https://www.philhealth.gov.ph/partners/employers/ContributionTable_v2.pdf (read 2026-11-24)
//  - Pag-IBIG monthly savings since February 2024, from
//    https://www.pagibigfund.gov.ph/Membership_RegularSavings.html (read 2026-11-24)

export const CONTRIBUTIONS_CHECKED_ON = '2026-11-24';

export const SOURCES = {
  sss: { name: 'SSS: Contribution Table (effective January 2025)', url: 'https://www.sss.gov.ph/sss-contribution-table/' },
  philhealth: { name: 'PhilHealth: Premium Contribution Table', url: 'https://www.philhealth.gov.ph/partners/employers/ContributionTable_v2.pdf' },
  pagibig: { name: 'Pag-IBIG Fund: Regular Savings', url: 'https://www.pagibigfund.gov.ph/Membership_RegularSavings.html' },
};

// ---------- SSS ----------

export type SssMemberType = 'employed' | 'kasambahay' | 'self-employed' | 'voluntary' | 'ofw';
export const SSS_MEMBER_TYPES: SssMemberType[] = ['employed', 'kasambahay', 'self-employed', 'voluntary', 'ofw'];

const MIN_MSC: Record<SssMemberType, number> = {
  employed: 5_000,
  kasambahay: 1_000,
  'self-employed': 5_000,
  voluntary: 5_000,
  ofw: 8_000,
};
const MAX_MSC = 35_000;
const REGULAR_SS_CAP = 20_000; // MSC above this goes to the MPF (WISP) account
const HAS_EC: Record<SssMemberType, boolean> = { employed: true, kasambahay: true, 'self-employed': true, voluntary: false, ofw: false };

export type SssResult = {
  msc: number;
  regularSsMsc: number;
  mpfMsc: number;
  ec: number;
  employer: number; // employer or household employer share (incl. EC)
  member: number; // employee / kasambahay / member share
  total: number;
};

/** Monthly salary credit: compensation brackets are ₱500 wide, centered on the MSC (e.g. 5,250–5,749.99 → 5,500). */
export function sssMsc(compensation: number, type: SssMemberType): number {
  const rounded = Math.floor((Math.max(compensation, 0) + 250) / 500) * 500;
  return Math.min(Math.max(rounded, MIN_MSC[type]), MAX_MSC);
}

export function sssContribution(compensation: number, type: SssMemberType): SssResult {
  const msc = sssMsc(compensation, type);
  const regularSsMsc = Math.min(msc, REGULAR_SS_CAP);
  const mpfMsc = Math.max(msc - REGULAR_SS_CAP, 0);
  const ec = HAS_EC[type] ? (msc < 15_000 ? 10 : 30) : 0;
  const fifteen = 0.15 * (regularSsMsc + mpfMsc);

  let employer = 0;
  let member = 0;
  if (type === 'employed' || (type === 'kasambahay' && compensation >= 5_000)) {
    employer = 0.1 * (regularSsMsc + mpfMsc) + ec;
    member = 0.05 * (regularSsMsc + mpfMsc);
  } else if (type === 'kasambahay') {
    employer = fifteen + ec; // below ₱5,000 the household employer pays everything
  } else {
    member = fifteen + ec; // self-employed (with EC), voluntary and OFW (no EC) pay the full 15%
  }
  const r = (n: number) => Math.round(n * 100) / 100;
  return { msc, regularSsMsc, mpfMsc, ec, employer: r(employer), member: r(member), total: r(employer + member) };
}

/** Every row of the official SSS table for a member type: [from, to] compensation and the contribution. */
export function sssTableRows(type: SssMemberType) {
  const rows: { from: number | null; to: number | null; result: SssResult }[] = [];
  const min = MIN_MSC[type];
  // First row: "Below" the first bracket boundary.
  rows.push({ from: null, to: min + 249.99, result: sssContribution(min, type) });
  for (let msc = min + 500; msc <= MAX_MSC; msc += 500) {
    const from = msc - 250;
    const to = msc === MAX_MSC ? null : msc + 249.99;
    // Kasambahay: the ₱5,000 MSC row splits at a ₱5,000 wage (household employer pays all below it).
    if (type === 'kasambahay' && msc === 5_000) {
      rows.push({ from, to: 4_999.99, result: sssContribution(4_999.99, type) });
      rows.push({ from: 5_000, to, result: sssContribution(5_000, type) });
      continue;
    }
    rows.push({ from, to, result: sssContribution(from, type) });
  }
  return rows;
}

// ---------- PhilHealth ----------

export const PHILHEALTH_RATE = 0.05;
export const PHILHEALTH_FLOOR = 10_000;
export const PHILHEALTH_CEILING = 100_000;

/** Total monthly premium: 5% of the monthly basic salary, with a ₱10,000 floor and ₱100,000 ceiling. */
export function philhealthPremium(monthlyBasicSalary: number): number {
  const base = Math.min(Math.max(monthlyBasicSalary, PHILHEALTH_FLOOR), PHILHEALTH_CEILING);
  return Math.round(base * PHILHEALTH_RATE * 100) / 100;
}

// ---------- Pag-IBIG ----------

export type PagibigMemberType = 'employed' | 'self-employed' | 'ofw';
export const PAGIBIG_MAX_FUND_SALARY = 10_000;

/** Minimum required monthly savings. Members may always save more. */
export function pagibigContribution(monthlyCompensation: number, type: PagibigMemberType) {
  if (type === 'employed') {
    const base = Math.min(Math.max(monthlyCompensation, 0), PAGIBIG_MAX_FUND_SALARY);
    const share = Math.round(base * 0.02 * 100) / 100;
    return { member: share, employer: share, total: share * 2 };
  }
  if (type === 'ofw') return { member: 200, employer: 0, total: 200 };
  return { member: 400, employer: 0, total: 400 };
}
