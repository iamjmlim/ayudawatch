// Holiday pay for private-sector employees in 2026, from DOLE Labor Advisory No. 12, Series of 2025
// ("Payment of wages for the regular holidays, special (non-working) days, and special (working) day
// for the year 2026", text as published by Grant Thornton Philippines), and the 2026 holiday dates in
// Proclamation No. 1006, s. 2025 (full text on LawPhil). Read 2026-11-25.

export type DayType = 'regular' | 'special' | 'special-working';

export const HOLIDAY_PAY_SOURCES = [
  { name: 'Proclamation No. 1006, s. 2025: 2026 holidays (full text, LawPhil)', url: 'https://lawphil.net/executive/proc/proc2025/proc_1006_2025.html' },
  {
    name: 'DOLE Labor Advisory No. 12, s. 2025: 2026 holiday pay rules (text via Grant Thornton)',
    url: 'https://www.grantthornton.com.ph/technical-alerts/outsourcing-alert/2025/dole-labor-advisory-no-12-25/',
  },
];
export const HOLIDAY_PAY_CHECKED_ON = '2026-11-25';

/** 2026 holidays from Proclamation No. 1006 (Eid'l Fitr and Eid'l Adha are proclaimed separately). */
export const HOLIDAYS_2026: { date: string; type: DayType; en: string; fil: string }[] = [
  { date: '2026-01-01', type: 'regular', en: 'New Year’s Day', fil: 'Bagong Taon' },
  { date: '2026-02-17', type: 'special', en: 'Chinese New Year', fil: 'Chinese New Year' },
  { date: '2026-02-25', type: 'special-working', en: 'EDSA People Power Revolution Anniversary', fil: 'Anibersaryo ng EDSA People Power' },
  { date: '2026-04-02', type: 'regular', en: 'Maundy Thursday', fil: 'Huwebes Santo' },
  { date: '2026-04-03', type: 'regular', en: 'Good Friday', fil: 'Biyernes Santo' },
  { date: '2026-04-04', type: 'special', en: 'Black Saturday', fil: 'Sabado de Gloria' },
  { date: '2026-04-09', type: 'regular', en: 'Araw ng Kagitingan', fil: 'Araw ng Kagitingan' },
  { date: '2026-05-01', type: 'regular', en: 'Labor Day', fil: 'Araw ng Paggawa' },
  { date: '2026-06-12', type: 'regular', en: 'Independence Day', fil: 'Araw ng Kalayaan' },
  { date: '2026-08-21', type: 'special', en: 'Ninoy Aquino Day', fil: 'Araw ni Ninoy Aquino' },
  { date: '2026-08-31', type: 'regular', en: 'National Heroes Day', fil: 'Araw ng mga Bayani' },
  { date: '2026-11-01', type: 'special', en: 'All Saints’ Day', fil: 'Araw ng mga Santo' },
  { date: '2026-11-02', type: 'special', en: 'All Souls’ Day', fil: 'Araw ng mga Kaluluwa' },
  { date: '2026-11-30', type: 'regular', en: 'Bonifacio Day', fil: 'Araw ni Bonifacio' },
  { date: '2026-12-08', type: 'special', en: 'Feast of the Immaculate Conception', fil: 'Kapistahan ng Immaculada Concepcion' },
  { date: '2026-12-24', type: 'special', en: 'Christmas Eve', fil: 'Bisperas ng Pasko' },
  { date: '2026-12-25', type: 'regular', en: 'Christmas Day', fil: 'Araw ng Pasko' },
  { date: '2026-12-30', type: 'regular', en: 'Rizal Day', fil: 'Araw ni Rizal' },
  { date: '2026-12-31', type: 'special', en: 'Last Day of the Year', fil: 'Huling Araw ng Taon' },
];

export type HolidayPayInput = { dailyRate: number; type: DayType; worked: boolean; hours: number; restDay: boolean };

export type HolidayPayResult = {
  regularPart: number; // pay for up to 8 hours (or the day's pay if not worked)
  overtimePart: number; // pay for hours beyond 8
  total: number;
  multiplier: number; // rate for the first 8 hours, e.g. 2 for 200%
  overtimeMultiplier: number; // rate per overtime hour relative to the hourly rate
  noWorkNoPay: boolean;
};

export function holidayPay({ dailyRate, type, worked, hours, restDay }: HolidayPayInput): HolidayPayResult {
  const hourly = dailyRate / 8;
  const round = (n: number) => Math.round(n * 100) / 100;

  if (!worked) {
    // Regular holiday: 100% (if present or on paid leave the workday before). Special days: no work, no pay.
    const pay = type === 'regular' ? dailyRate : 0;
    return { regularPart: round(pay), overtimePart: 0, total: round(pay), multiplier: type === 'regular' ? 1 : 0, overtimeMultiplier: 0, noWorkNoPay: type !== 'regular' };
  }

  let multiplier: number;
  let overtimeMultiplier: number;
  if (type === 'regular') {
    multiplier = restDay ? 2 * 1.3 : 2;
    overtimeMultiplier = restDay ? 2 * 1.3 * 1.3 : 2 * 1.3;
  } else if (type === 'special') {
    multiplier = restDay ? 1.5 : 1.3;
    overtimeMultiplier = restDay ? 1.5 * 1.3 : 1.3 * 1.3;
  } else {
    // Special (working) day: an ordinary working day. The advisory does not cover rest-day work for it.
    multiplier = 1;
    overtimeMultiplier = 1.25;
  }

  const firstHours = Math.min(Math.max(hours, 0), 8);
  const overtimeHours = Math.max(hours - 8, 0);
  const regularPart = hourly * firstHours * multiplier;
  const overtimePart = hourly * overtimeHours * overtimeMultiplier;
  return { regularPart: round(regularPart), overtimePart: round(overtimePart), total: round(regularPart + overtimePart), multiplier, overtimeMultiplier, noWorkNoPay: false };
}
