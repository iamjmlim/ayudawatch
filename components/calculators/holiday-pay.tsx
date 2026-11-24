'use client';

import { useId, useState } from 'react';
import { HOLIDAYS_2026, holidayPay, type DayType } from '@/lib/holiday-pay';
import type { Locale } from '@/lib/i18n';
import { Field, Result, inputClass, peso, toNumber } from './calc-ui';

const T = {
  en: {
    day: 'Holiday',
    rate: 'Your basic daily wage',
    rateHint: 'Your basic pay for one regular 8-hour workday.',
    worked: 'Did you work that day?',
    yes: 'Yes, I worked',
    no: 'No, I did not work',
    hours: 'Hours worked',
    hoursHint: 'Hours beyond 8 are overtime.',
    rest: 'This holiday is also my scheduled rest day',
    restNA: 'DOLE’s advisory has no separate rule for working on a special working day that is your rest day.',
    types: { regular: 'Regular holiday', special: 'Special (non-working) day', 'special-working': 'Special (working) day' } satisfies Record<DayType, string>,
    result: 'Your estimated pay for that day',
    breakdown: (base: string, pct: string, ot: string) => `First 8 hours: ${base} (${pct} of your wage)${ot}`,
    otLine: (ot: string, h: number) => ` · Overtime (${h} h): ${ot}`,
    regularNotWorked:
      'For a regular holiday you did not work, you get 100% of your daily wage if you reported to work or were on paid leave on the workday just before the holiday.',
    noWorkNoPay: '“No work, no pay” applies on special days, unless your company policy, practice or union agreement gives pay for that day.',
    empty: 'Enter your daily wage to see your holiday pay.',
  },
  fil: {
    day: 'Holiday',
    rate: 'Arawang basic na sahod mo',
    rateHint: 'Ang basic pay mo para sa isang regular na 8-oras na araw ng trabaho.',
    worked: 'Nagtrabaho ka ba sa araw na iyon?',
    yes: 'Oo, nagtrabaho ako',
    no: 'Hindi ako nagtrabaho',
    hours: 'Oras na nagtrabaho',
    hoursHint: 'Overtime ang lampas sa 8 oras.',
    rest: 'Rest day ko rin ang holiday na ito',
    restNA: 'Walang hiwalay na patakaran ang advisory ng DOLE para sa pagtatrabaho sa special working day na rest day mo.',
    types: { regular: 'Regular holiday', special: 'Special (non-working) day', 'special-working': 'Special (working) day' } satisfies Record<DayType, string>,
    result: 'Tantiyang sahod mo sa araw na iyon',
    breakdown: (base: string, pct: string, ot: string) => `Unang 8 oras: ${base} (${pct} ng sahod mo)${ot}`,
    otLine: (ot: string, h: number) => ` · Overtime (${h} oras): ${ot}`,
    regularNotWorked:
      'Para sa regular holiday na hindi ka nagtrabaho, makakatanggap ka ng 100% ng arawang sahod kung pumasok ka o naka-paid leave sa araw ng trabaho bago ang holiday.',
    noWorkNoPay: '“No work, no pay” ang patakaran sa special days, maliban kung may patakaran, kaugalian o union agreement ang kompanya mo na nagbibigay ng bayad sa araw na iyon.',
    empty: 'Ilagay ang arawang sahod mo para makita ang holiday pay mo.',
  },
};

const fmtDate = (iso: string, locale: Locale) =>
  new Intl.DateTimeFormat(locale === 'fil' ? 'fil-PH' : 'en-PH', { month: 'long', day: 'numeric', timeZone: 'UTC' }).format(new Date(`${iso}T00:00:00Z`));

export function HolidayPayCalculator({ locale }: { locale: Locale }) {
  const t = T[locale];
  const id = useId();
  const [date, setDate] = useState('2026-12-25');
  const [rate, setRate] = useState('');
  const [worked, setWorked] = useState(true);
  const [hours, setHours] = useState('8');
  const [restDay, setRestDay] = useState(false);

  const day = HOLIDAYS_2026.find((h) => h.date === date)!;
  const r = toNumber(rate);
  const h = toNumber(hours);
  const ready = r > 0 && (!worked || h > 0);
  const res = ready ? holidayPay({ dailyRate: r, type: day.type, worked, hours: h, restDay: restDay && day.type !== 'special-working' }) : null;

  return (
    <div className="grid grid-cols-[minmax(0,1fr)] gap-6">
      <div className="grid gap-5 sm:grid-cols-2">
        <Field id={`${id}-d`} label={t.day} hint={t.types[day.type]}>
          <select id={`${id}-d`} className={inputClass} value={date} onChange={(e) => setDate(e.target.value)}>
            {HOLIDAYS_2026.map((x) => (
              <option key={x.date} value={x.date}>
                {fmtDate(x.date, locale)} – {x[locale]}
              </option>
            ))}
          </select>
        </Field>
        <Field id={`${id}-r`} label={t.rate} hint={t.rateHint}>
          <input id={`${id}-r`} inputMode="decimal" placeholder="₱" className={inputClass} value={rate} onChange={(e) => setRate(e.target.value)} />
        </Field>
      </div>

      <fieldset className="grid gap-2">
        <legend className="text-sm font-semibold">{t.worked}</legend>
        {([true, false] as const).map((v) => (
          <label key={String(v)} className="flex min-h-11 cursor-pointer items-center gap-3 rounded-lg border border-border px-4 py-2.5 has-[:checked]:border-primary">
            <input type="radio" name={`${id}-w`} className="size-4 accent-[var(--primary)]" checked={worked === v} onChange={() => setWorked(v)} />
            <span>{v ? t.yes : t.no}</span>
          </label>
        ))}
      </fieldset>

      {worked && (
        <div className="grid gap-5 sm:grid-cols-2">
          <Field id={`${id}-h`} label={t.hours} hint={t.hoursHint}>
            <input id={`${id}-h`} inputMode="decimal" className={inputClass} value={hours} onChange={(e) => setHours(e.target.value)} />
          </Field>
          <div className="grid min-w-0 content-start gap-1.5">
            <label className="flex min-h-11 cursor-pointer items-center gap-3 rounded-lg border border-border px-4 py-2.5 has-[:checked]:border-primary sm:mt-6">
              <input
                type="checkbox"
                className="size-4 accent-[var(--primary)]"
                checked={restDay && day.type !== 'special-working'}
                disabled={day.type === 'special-working'}
                onChange={(e) => setRestDay(e.target.checked)}
              />
              <span>{t.rest}</span>
            </label>
            {day.type === 'special-working' && <p className="text-xs text-muted-foreground">{t.restNA}</p>}
          </div>
        </div>
      )}

      {!res ? (
        <p className="text-sm text-muted-foreground">{t.empty}</p>
      ) : (
        <Result
          label={t.result}
          value={peso(res.total)}
          sub={
            worked ? (
              <p>
                {t.breakdown(peso(res.regularPart), `${Math.round(res.multiplier * 100)}%`, res.overtimePart > 0 ? t.otLine(peso(res.overtimePart), Math.max(h - 8, 0)) : '')}
              </p>
            ) : (
              <p>{day.type === 'regular' ? t.regularNotWorked : t.noWorkNoPay}</p>
            )
          }
        />
      )}
    </div>
  );
}
