// Income tax on compensation and take-home pay.
//  - Tax table "effective January 1, 2023 and onwards": NIRC Sec. 24(A)(2) as amended by RA 10963 (TRAIN),
//    full text on LawPhil (read 2026-11-25).
//  - 13th month pay and other benefits up to ₱90,000 are excluded from gross income (Sec. 32(B)(7)(e), same law).
//  - GSIS, SSS, Medicare (PhilHealth) and Pag-IBIG contributions and union dues are excluded
//    (NIRC Sec. 32(B)(7)(f), RA 8424 on LawPhil).
//  - Minimum wage earners are exempt from income tax on their minimum wage (Sec. 24(A)(2), RA 10963).
import { pagibigContribution, philhealthPremium, sssContribution, SOURCES as CONTRIBUTION_SOURCES } from './contributions.ts';

export const TAX_CHECKED_ON = '2026-11-25';
export const TAX_SOURCES = [
  { name: 'RA 10963 (TRAIN law): income tax table from 2023 (full text, LawPhil)', url: 'https://lawphil.net/statutes/repacts/ra2017/ra_10963_2017.html' },
  { name: 'RA 8424 (Tax Code), Sec. 32(B)(7)(f): contributions excluded from income (LawPhil)', url: 'https://lawphil.net/statutes/repacts/ra1997/ra_8424_1997.html' },
  CONTRIBUTION_SOURCES.sss,
  CONTRIBUTION_SOURCES.philhealth,
  CONTRIBUTION_SOURCES.pagibig,
];

/** [over, base tax, rate on the excess] for the 2023-onward schedule. */
export const TAX_BRACKETS: [number, number, number][] = [
  [8_000_000, 2_202_500, 0.35],
  [2_000_000, 402_500, 0.3],
  [800_000, 102_500, 0.25],
  [400_000, 22_500, 0.2],
  [250_000, 0, 0.15],
];
export const THIRTEENTH_MONTH_EXEMPTION = 90_000;

/** Annual income tax on taxable compensation income. */
export function annualIncomeTax(taxable: number): number {
  for (const [over, base, rate] of TAX_BRACKETS) if (taxable > over) return Math.round((base + (taxable - over) * rate) * 100) / 100;
  return 0;
}

export type TakeHomeInput = {
  basic: number; // monthly basic pay
  taxableAllowances: number; // other monthly taxable pay (allowances, regular overtime…)
  nonTaxable: number; // de minimis and other non-taxable monthly benefits
  minimumWage: boolean;
};

export function takeHome({ basic, taxableAllowances, nonTaxable, minimumWage }: TakeHomeInput) {
  const r = (n: number) => Math.round(n * 100) / 100;
  const compensation = basic + taxableAllowances;
  const sss = sssContribution(compensation, 'employed').member;
  const philhealth = r(philhealthPremium(basic) / 2);
  const pagibig = pagibigContribution(compensation, 'employed').member;
  const contributions = r(sss + philhealth + pagibig);
  const taxableMonthly = Math.max(compensation - contributions, 0);
  // Minimum wage earners: the minimum wage itself is exempt; any other taxable pay stays taxable.
  const taxBaseMonthly = minimumWage ? Math.max(taxableAllowances, 0) : taxableMonthly;
  const tax = r(annualIncomeTax(taxBaseMonthly * 12) / 12);
  const net = r(compensation + nonTaxable - contributions - tax);
  return { compensation, sss, philhealth, pagibig, contributions, taxableMonthly: r(taxableMonthly), tax, net, semiMonthly: r(net / 2) };
}
