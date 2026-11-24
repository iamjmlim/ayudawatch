'use client';

import { useId, useState } from 'react';
import type { Locale } from '@/lib/i18n';
import { Field, Result, inputClass, peso, toNumber } from './calc-ui';

// 13th month pay = 1/12 of the total basic salary earned in the calendar year (PD 851, DOLE Revised Guidelines).
type Mode = 'monthly' | 'total';

const T = {
  en: {
    mode: 'How do you want to compute it?',
    monthly: 'Same monthly basic pay this year',
    total: 'I know my total basic pay this year',
    pay: 'Monthly basic pay',
    months: 'Months worked this year (January to December)',
    monthsHint: 'Use a decimal for part of a month, e.g. 7.5. If you resigned or were hired this year, count only the months you worked.',
    totalLabel: 'Total basic pay earned from January to December',
    totalHint: 'Add up only your basic pay. If your pay changed during the year, this mode is more accurate.',
    basicNote:
      'Basic pay does not include overtime, premium pay, night differential, holiday pay, cost-of-living allowance (COLA) or cash for unused leave, unless your company treats them as part of basic pay.',
    result: 'Your estimated 13th month pay',
    sub: (total: string) => `1/12 of ${total} in basic pay. This is the legal minimum; your company may give more.`,
    empty: 'Enter your pay to see your 13th month pay.',
    tooMany: 'A calendar year has at most 12 months.',
  },
  fil: {
    mode: 'Paano mo gustong kuwentahin?',
    monthly: 'Pareho ang buwanang basic pay ngayong taon',
    total: 'Alam ko ang kabuuang basic pay ko ngayong taon',
    pay: 'Buwanang basic pay',
    months: 'Bilang ng buwang nagtrabaho ngayong taon (Enero hanggang Disyembre)',
    monthsHint: 'Gumamit ng decimal para sa bahagi ng buwan, hal. 7.5. Kung nag-resign ka o bagong pasok ngayong taon, bilangin lang ang mga buwang nagtrabaho ka.',
    totalLabel: 'Kabuuang basic pay mula Enero hanggang Disyembre',
    totalHint: 'Isama lang ang basic pay mo. Kung nagbago ang sahod mo sa loob ng taon, mas tama ang paraang ito.',
    basicNote:
      'Hindi kasama sa basic pay ang overtime, premium pay, night differential, holiday pay, cost-of-living allowance (COLA) o cash para sa hindi nagamit na leave, maliban kung itinuturing ito ng kompanya mo na bahagi ng basic pay.',
    result: 'Tantiyang 13th month pay mo',
    sub: (total: string) => `1/12 ng ${total} na basic pay. Ito ang pinakamababang itinakda ng batas; puwedeng higit pa ang ibigay ng kompanya mo.`,
    empty: 'Ilagay ang sahod mo para makita ang 13th month pay mo.',
    tooMany: 'Hanggang 12 buwan lang ang isang taon.',
  },
};

export function ThirteenthMonthCalculator({ locale }: { locale: Locale }) {
  const t = T[locale];
  const id = useId();
  const [mode, setMode] = useState<Mode>('monthly');
  const [pay, setPay] = useState('');
  const [months, setMonths] = useState('12');
  const [total, setTotal] = useState('');

  const m = toNumber(months);
  const monthsOk = !(m > 12);
  const basicTotal = mode === 'monthly' ? toNumber(pay) * Math.min(m, 12) : toNumber(total);
  const ready = Number.isFinite(basicTotal) && basicTotal > 0 && (mode === 'total' || (m > 0 && monthsOk));

  return (
    <div className="grid grid-cols-[minmax(0,1fr)] gap-6">
      <fieldset className="grid gap-2">
        <legend className="text-sm font-semibold">{t.mode}</legend>
        {(['monthly', 'total'] as const).map((opt) => (
          <label key={opt} className="flex min-h-11 cursor-pointer items-center gap-3 rounded-lg border border-border px-4 py-2.5 has-[:checked]:border-primary">
            <input type="radio" name={`${id}-mode`} className="size-4 accent-[var(--primary)]" checked={mode === opt} onChange={() => setMode(opt)} />
            <span>{t[opt]}</span>
          </label>
        ))}
      </fieldset>

      {mode === 'monthly' ? (
        <div className="grid gap-5 sm:grid-cols-2">
          <Field id={`${id}-p`} label={t.pay}>
            <input id={`${id}-p`} inputMode="decimal" placeholder="₱" className={inputClass} value={pay} onChange={(e) => setPay(e.target.value)} />
          </Field>
          <Field id={`${id}-m`} label={t.months} hint={monthsOk ? t.monthsHint : t.tooMany}>
            <input id={`${id}-m`} inputMode="decimal" className={inputClass} value={months} onChange={(e) => setMonths(e.target.value)} aria-invalid={!monthsOk} />
          </Field>
        </div>
      ) : (
        <Field id={`${id}-t`} label={t.totalLabel} hint={t.totalHint}>
          <input id={`${id}-t`} inputMode="decimal" placeholder="₱" className={inputClass} value={total} onChange={(e) => setTotal(e.target.value)} />
        </Field>
      )}

      <p className="text-sm leading-relaxed text-muted-foreground">{t.basicNote}</p>

      {!ready ? (
        <p className="text-sm text-muted-foreground">{t.empty}</p>
      ) : (
        <Result label={t.result} value={peso(basicTotal / 12)} sub={<p>{t.sub(peso(basicTotal))}</p>} />
      )}
    </div>
  );
}
