'use client';

import { useId, useState } from 'react';
import { retirementPay } from '@/lib/labor';
import type { Locale } from '@/lib/i18n';
import { Field, Result, inputClass, peso, toNumber } from './calc-ui';

const T = {
  en: {
    rate: 'Your basic daily rate',
    rateHint: 'Your latest daily salary rate. If you are paid monthly, your HR can tell you the daily rate they use.',
    age: 'Age at retirement',
    years: 'Years of service with this employer',
    months: 'Extra months',
    monthsHint: '6 months or more counts as one whole year.',
    result: 'Your minimum retirement pay',
    sub: (y: number, per: string) => `${y} year(s) credited × ${per} (22.5 days’ pay per year).`,
    notAge: 'Under the law, retirement pay applies from age 60 up to 65 (the compulsory retirement age), unless your company’s retirement plan or union agreement says otherwise.',
    notService: 'You need at least 5 years of service with the same employer.',
    plan: 'If your company has a retirement plan or union agreement, you get what it provides, but not less than this amount.',
    empty: 'Enter your daily rate, age and years of service.',
  },
  fil: {
    rate: 'Arawang basic rate mo',
    rateHint: 'Ang pinakahuling arawang sahod mo. Kung buwanan ang sahod mo, masasabi ng HR ang daily rate na ginagamit nila.',
    age: 'Edad sa pagreretiro',
    years: 'Taon ng serbisyo sa employer na ito',
    months: 'Dagdag na buwan',
    monthsHint: 'Ang 6 na buwan o higit pa ay binibilang na isang buong taon.',
    result: 'Pinakamababang retirement pay mo',
    sub: (y: number, per: string) => `${y} taon na binilang × ${per} (22.5 araw na sahod kada taon).`,
    notAge: 'Sa batas, para sa edad 60 hanggang 65 (compulsory retirement age) ang retirement pay, maliban kung iba ang sinasabi ng retirement plan o union agreement ng kompanya mo.',
    notService: 'Kailangan ng hindi bababa sa 5 taon ng serbisyo sa iisang employer.',
    plan: 'Kung may retirement plan o union agreement ang kompanya mo, iyon ang matatanggap mo, pero hindi bababa sa halagang ito.',
    empty: 'Ilagay ang daily rate, edad at taon ng serbisyo mo.',
  },
};

export function RetirementPayCalculator({ locale }: { locale: Locale }) {
  const t = T[locale];
  const id = useId();
  const [rate, setRate] = useState('');
  const [age, setAge] = useState('60');
  const [years, setYears] = useState('');
  const [months, setMonths] = useState('');

  const d = toNumber(rate);
  const a = toNumber(age);
  const y = toNumber(years);
  const m = months.trim() === '' ? 0 : toNumber(months);
  const res = d > 0 && a > 0 && y >= 0 && m >= 0 && m < 12 ? retirementPay(d, a, y, m) : null;

  return (
    <div className="grid grid-cols-[minmax(0,1fr)] gap-6">
      <div className="grid gap-5 sm:grid-cols-2">
        <Field id={`${id}-d`} label={t.rate} hint={t.rateHint}>
          <input id={`${id}-d`} inputMode="decimal" placeholder="₱" className={inputClass} value={rate} onChange={(e) => setRate(e.target.value)} />
        </Field>
        <Field id={`${id}-a`} label={t.age}>
          <input id={`${id}-a`} inputMode="numeric" className={inputClass} value={age} onChange={(e) => setAge(e.target.value)} />
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
      ) : res.eligible ? (
        <Result label={t.result} value={peso(res.total)} sub={<p>{t.sub(res.credited, peso(res.perYear))} {t.plan}</p>} />
      ) : (
        <Result
          label={t.result}
          value={peso(0)}
          sub={
            <p>
              {!res.ageOk && t.notAge} {!res.serviceOk && t.notService}
            </p>
          }
        />
      )}
    </div>
  );
}
