'use client';

import Link from 'next/link';
import { useId, useState } from 'react';
import { overtimePay } from '@/lib/labor';
import type { Locale } from '@/lib/i18n';
import { Field, Result, inputClass, peso, toNumber } from './calc-ui';

const T = {
  en: {
    rate: 'Your basic daily wage',
    rateHint: 'Your basic pay for one regular 8-hour workday.',
    hours: 'Total hours worked that day',
    hoursHint: 'Hours beyond 8 are overtime.',
    night: 'Hours worked between 10 PM and 6 AM',
    nightHint: 'Each of these hours earns a night differential. Enter 0 if none.',
    rest: 'This day is my scheduled rest day',
    result: 'Your estimated pay for that day',
    regular: (h: number) => `Regular hours (${h} h)`,
    overtime: (h: number, rate: string) => `Overtime (${h} h at ${rate}/h)`,
    nightLine: 'Night differential (10%)',
    total: 'Total',
    holiday: 'Working on a holiday? Use the holiday pay calculator',
    empty: 'Enter your daily wage and hours worked.',
  },
  fil: {
    rate: 'Arawang basic na sahod mo',
    rateHint: 'Ang basic pay mo para sa isang regular na 8-oras na araw ng trabaho.',
    hours: 'Kabuuang oras na nagtrabaho sa araw na iyon',
    hoursHint: 'Overtime ang lampas sa 8 oras.',
    night: 'Oras na nagtrabaho mula 10 PM hanggang 6 AM',
    nightHint: 'May night differential ang bawat oras na ito. Ilagay ang 0 kung wala.',
    rest: 'Rest day ko ang araw na ito',
    result: 'Tantiyang sahod mo sa araw na iyon',
    regular: (h: number) => `Regular na oras (${h} oras)`,
    overtime: (h: number, rate: string) => `Overtime (${h} oras sa ${rate}/oras)`,
    nightLine: 'Night differential (10%)',
    total: 'Kabuuan',
    holiday: 'Nagtrabaho sa holiday? Gamitin ang holiday pay calculator',
    empty: 'Ilagay ang arawang sahod at oras ng trabaho mo.',
  },
};

export function OvertimePayCalculator({ locale }: { locale: Locale }) {
  const t = T[locale];
  const id = useId();
  const [rate, setRate] = useState('');
  const [hours, setHours] = useState('10');
  const [night, setNight] = useState('0');
  const [rest, setRest] = useState(false);

  const d = toNumber(rate);
  const h = toNumber(hours);
  const n = night.trim() === '' ? 0 : toNumber(night);
  const res = d > 0 && h > 0 && h <= 24 && n >= 0 ? overtimePay({ dailyRate: d, hours: h, nightHours: n, restDay: rest }) : null;

  return (
    <div className="grid grid-cols-[minmax(0,1fr)] gap-6">
      <div className="grid gap-5 sm:grid-cols-2">
        <Field id={`${id}-d`} label={t.rate} hint={t.rateHint}>
          <input id={`${id}-d`} inputMode="decimal" placeholder="₱" className={inputClass} value={rate} onChange={(e) => setRate(e.target.value)} />
        </Field>
        <Field id={`${id}-h`} label={t.hours} hint={t.hoursHint}>
          <input id={`${id}-h`} inputMode="decimal" className={inputClass} value={hours} onChange={(e) => setHours(e.target.value)} />
        </Field>
        <Field id={`${id}-n`} label={t.night} hint={t.nightHint}>
          <input id={`${id}-n`} inputMode="decimal" className={inputClass} value={night} onChange={(e) => setNight(e.target.value)} />
        </Field>
        <label className="flex min-h-11 cursor-pointer items-center gap-3 self-start rounded-lg border border-border px-4 py-2.5 has-[:checked]:border-primary sm:mt-6">
          <input type="checkbox" className="size-4 accent-[var(--primary)]" checked={rest} onChange={(e) => setRest(e.target.checked)} />
          <span>{t.rest}</span>
        </label>
      </div>

      {!res ? (
        <p className="text-sm text-muted-foreground">{t.empty}</p>
      ) : (
        <Result
          label={t.result}
          value={peso(res.total)}
          sub={
            <dl className="grid gap-1">
              {(
                [
                  [t.regular(res.regularHours), res.regular],
                  ...(res.overtimeHours > 0 ? [[t.overtime(res.overtimeHours, peso(res.otHourly)), res.overtime] as const] : []),
                  ...(res.night > 0 ? [[t.nightLine, res.night] as const] : []),
                ] as const
              ).map(([label, v]) => (
                <div key={label} className="flex justify-between gap-4">
                  <dt>{label}</dt>
                  <dd className="tabular-nums">{peso(v)}</dd>
                </div>
              ))}
            </dl>
          }
        />
      )}
      <Link href={`/${locale}/calculators/holiday-pay`} className="font-medium text-primary underline decoration-primary/40 underline-offset-4 hover:decoration-primary">
        {t.holiday} →
      </Link>
    </div>
  );
}
