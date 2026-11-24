'use client';

import { useId, useState } from 'react';
import { separationPay, type SeparationReason } from '@/lib/labor';
import type { Locale } from '@/lib/i18n';
import { Field, Result, inputClass, peso, toNumber } from './calc-ui';

const REASONS: SeparationReason[] = ['redundancy', 'retrenchment', 'closure', 'disease', 'closure-losses', 'resigned'];

const T = {
  en: {
    reason: 'Why did your job end?',
    reasons: {
      redundancy: 'Redundancy or replaced by machines (labor-saving devices)',
      retrenchment: 'Retrenchment to prevent losses',
      closure: 'Company closed, but not because of serious losses',
      disease: 'Ended because of an illness (with a medical finding)',
      'closure-losses': 'Company closed because of serious business losses',
      resigned: 'I resigned, or was dismissed for a just cause',
    } satisfies Record<SeparationReason, string>,
    pay: 'Monthly pay',
    payHint: 'Your latest monthly salary.',
    years: 'Years of service',
    months: 'Extra months',
    monthsHint: '6 months or more counts as one whole year.',
    result: 'Your minimum separation pay',
    sub: (y: number, per: string, byYears: string) => `${y} year(s) credited × ${per} = ${byYears}, or 1 month’s pay, whichever is higher.`,
    perFull: '1 month’s pay',
    perHalf: '½ month’s pay',
    none: 'The Labor Code does not require separation pay for this reason.',
    noneHint: {
      'closure-losses': 'If the company closed because of serious business losses, separation pay is not required by law. Your contract, company policy or union agreement may still give it.',
      resigned: 'Separation pay is not required when you resign or are dismissed for a just cause, unless your contract, company policy or union agreement gives it. You still get your unpaid salary and your pro-rated 13th month pay.',
    } as Record<string, string>,
    empty: 'Enter your monthly pay and years of service.',
  },
  fil: {
    reason: 'Bakit natapos ang trabaho mo?',
    reasons: {
      redundancy: 'Redundancy o pinalitan ng makina (labor-saving devices)',
      retrenchment: 'Retrenchment para maiwasan ang pagkalugi',
      closure: 'Nagsara ang kompanya, pero hindi dahil sa malaking pagkalugi',
      disease: 'Natapos dahil sa sakit (may medical finding)',
      'closure-losses': 'Nagsara ang kompanya dahil sa malaking pagkalugi',
      resigned: 'Nag-resign ako, o natanggal dahil sa just cause',
    } satisfies Record<SeparationReason, string>,
    pay: 'Buwanang sahod',
    payHint: 'Ang pinakahuling buwanang sahod mo.',
    years: 'Taon ng serbisyo',
    months: 'Dagdag na buwan',
    monthsHint: 'Ang 6 na buwan o higit pa ay binibilang na isang buong taon.',
    result: 'Pinakamababang separation pay mo',
    sub: (y: number, per: string, byYears: string) => `${y} taon na binilang × ${per} = ${byYears}, o 1 buwang sahod, alinman ang mas mataas.`,
    perFull: '1 buwang sahod',
    perHalf: '½ buwang sahod',
    none: 'Hindi hinihingi ng Labor Code ang separation pay sa dahilang ito.',
    noneHint: {
      'closure-losses': 'Kung nagsara ang kompanya dahil sa malaking pagkalugi, hindi hinihingi ng batas ang separation pay. Puwede pa rin itong ibigay ng kontrata, patakaran ng kompanya o union agreement.',
      resigned: 'Hindi hinihingi ang separation pay kapag nag-resign ka o natanggal dahil sa just cause, maliban kung ibinibigay ito ng kontrata, patakaran ng kompanya o union agreement. Makukuha mo pa rin ang hindi pa nababayarang sahod at pro-rated na 13th month pay mo.',
    } as Record<string, string>,
    empty: 'Ilagay ang buwanang sahod at taon ng serbisyo mo.',
  },
};

export function SeparationPayCalculator({ locale }: { locale: Locale }) {
  const t = T[locale];
  const id = useId();
  const [reason, setReason] = useState<SeparationReason>('redundancy');
  const [pay, setPay] = useState('');
  const [years, setYears] = useState('');
  const [months, setMonths] = useState('');

  const p = toNumber(pay);
  const y = toNumber(years);
  const m = months.trim() === '' ? 0 : toNumber(months);
  const res = p > 0 && y >= 0 && m >= 0 && m < 12 ? separationPay(p, y, m, reason) : null;

  return (
    <div className="grid grid-cols-[minmax(0,1fr)] gap-6">
      <Field id={`${id}-r`} label={t.reason}>
        <select id={`${id}-r`} className={inputClass} value={reason} onChange={(e) => setReason(e.target.value as SeparationReason)}>
          {REASONS.map((x) => (
            <option key={x} value={x}>
              {t.reasons[x]}
            </option>
          ))}
        </select>
      </Field>
      <div className="grid gap-5 sm:grid-cols-3">
        <Field id={`${id}-p`} label={t.pay} hint={t.payHint}>
          <input id={`${id}-p`} inputMode="decimal" placeholder="₱" className={inputClass} value={pay} onChange={(e) => setPay(e.target.value)} />
        </Field>
        <Field id={`${id}-y`} label={t.years}>
          <input id={`${id}-y`} inputMode="numeric" className={inputClass} value={years} onChange={(e) => setYears(e.target.value)} />
        </Field>
        <Field id={`${id}-m`} label={t.months} hint={t.monthsHint}>
          <input id={`${id}-m`} inputMode="numeric" placeholder="0" className={inputClass} value={months} onChange={(e) => setMonths(e.target.value)} />
        </Field>
      </div>

      {!res ? (
        <p className="text-sm text-muted-foreground">{t.empty}</p>
      ) : res.entitled ? (
        <Result label={t.result} value={peso(res.total)} sub={<p>{t.sub(res.credited, res.perYear === 1 ? t.perFull : t.perHalf, peso(res.byYears))}</p>} />
      ) : (
        <Result label={t.result} value={peso(0)} sub={<p>{t.none} {t.noneHint[reason]}</p>} />
      )}
    </div>
  );
}
