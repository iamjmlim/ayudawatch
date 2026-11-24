// Separation pay, retirement pay, overtime and night shift differential for private-sector employees,
// from the Labor Code (PD 442, as amended), full text on LawPhil (read 2026-11-25). LawPhil keeps the
// old article numbers; the 2015 renumbering made Arts. 283, 284 and 287 into Arts. 298, 299 and 302.

export const LABOR_CHECKED_ON = '2026-11-25';
export const LABOR_CODE_SOURCE = { name: 'Labor Code of the Philippines (PD 442, as amended), full text on LawPhil', url: 'https://lawphil.net/statutes/presdecs/pd1974/pd_442_1974.html' };

const r2 = (n: number) => Math.round(n * 100) / 100;

/** Years of service for separation and retirement pay: a fraction of at least 6 months counts as a whole year. */
export function creditedYears(years: number, months: number): number {
  const y = Math.max(Math.floor(years), 0);
  return y + (months >= 6 ? 1 : 0);
}

// ---------- Separation pay (Arts. 283–284, now 298–299) ----------

export type SeparationReason = 'redundancy' | 'retrenchment' | 'closure' | 'disease' | 'closure-losses' | 'resigned';

/** Months of pay per year of service, or null if the Labor Code gives no separation pay. */
const PER_YEAR: Record<SeparationReason, number | null> = {
  redundancy: 1, // labor-saving devices or redundancy: 1 month per year
  retrenchment: 0.5, // retrenchment to prevent losses: 1/2 month per year
  closure: 0.5, // closure not due to serious business losses: 1/2 month per year
  disease: 0.5, // disease: 1/2 month per year
  'closure-losses': null, // closure due to serious business losses: none required
  resigned: null, // resignation or dismissal for just cause: none required by law
};

export function separationPay(monthlyPay: number, years: number, months: number, reason: SeparationReason) {
  const perYear = PER_YEAR[reason];
  const credited = creditedYears(years, months);
  if (perYear === null) return { entitled: false as const, credited, perYear: 0, byYears: 0, total: 0 };
  const byYears = monthlyPay * perYear * credited;
  // "at least one (1) month pay … or … per year of service, whichever is higher"
  return { entitled: true as const, credited, perYear, byYears: r2(byYears), total: r2(Math.max(monthlyPay, byYears)) };
}

// ---------- Retirement pay (Art. 287, now 302, as amended by RA 7641) ----------

/** 1/2 month salary = 15 days + 1/12 of the 13th month pay (2.5 days) + 5 days of service incentive leave. */
export const RETIREMENT_DAYS_PER_YEAR = 15 + 30 / 12 + 5;

export function retirementPay(dailyRate: number, age: number, years: number, months: number) {
  const credited = creditedYears(years, months);
  const serviceOk = years + months / 12 >= 5;
  const ageOk = age >= 60 && age <= 65;
  return {
    credited,
    eligible: serviceOk && ageOk,
    serviceOk,
    ageOk,
    perYear: r2(dailyRate * RETIREMENT_DAYS_PER_YEAR),
    total: r2(dailyRate * RETIREMENT_DAYS_PER_YEAR * credited),
  };
}

// ---------- Overtime and night shift differential (Arts. 86, 87, 93) ----------

export function overtimePay({ dailyRate, hours, nightHours, restDay }: { dailyRate: number; hours: number; nightHours: number; restDay: boolean }) {
  const hourly = dailyRate / 8;
  const regularHours = Math.min(Math.max(hours, 0), 8);
  const overtimeHours = Math.max(hours - 8, 0);
  const dayRate = restDay ? 1.3 : 1; // Art. 93: at least 30% more on the scheduled rest day
  const otRate = restDay ? 1.3 * 1.3 : 1.25; // Art. 87: +25%, or the rest-day rate +30%
  const regular = hourly * regularHours * dayRate;
  const overtime = hourly * overtimeHours * otRate;
  // Art. 86: at least 10% of the regular wage for each hour worked from 10 PM to 6 AM.
  const night = hourly * 0.1 * Math.min(Math.max(nightHours, 0), Math.max(hours, 0), 8 + overtimeHours);
  return {
    hourly: r2(hourly),
    regularHours,
    overtimeHours,
    regular: r2(regular),
    overtime: r2(overtime),
    night: r2(night),
    otHourly: r2(hourly * otRate),
    total: r2(regular + overtime + night),
  };
}
