'use client';

import { useEffect, useId, useState } from 'react';
import { MSC_CAP, averageDailySalaryCredit, salaryCreditWindow } from '@/lib/calculators';
import type { Locale } from '@/lib/i18n';
import { Field, Result, inputClass, peso, toNumber } from './calc-ui';

// Maternity and sickness benefits use the same SSS computation:
// 6 highest MSCs in the 12 months before the semester of contingency, divided by 180.
// Maternity pays 100% of that daily amount for 105/120/60 days; sickness pays 90% for the approved days.

type Mode = 'maternity' | 'sickness';

const T = {
  en: {
    month: { maternity: 'Month of delivery (or expected delivery)', sickness: 'Month you got sick' },
    year: 'Year',
    window: (from: string, to: string) => `SSS looks at your monthly salary credits from ${from} to ${to}.`,
    windowHint:
      'This is the 12 months before the “semester of contingency” (the quarter of the event and the quarter before it). Contributions in or after that semester do not count.',
    credits: 'Your 6 highest monthly salary credits in those 12 months',
    creditsHint: `Enter up to 6 amounts from your SSS contributions record. Each is counted up to ${peso(MSC_CAP)}. You need at least 3 months of contributions in this period to qualify.`,
    credit: (n: number) => `Salary credit ${n}`,
    days: { maternity: 'Your case', sickness: 'Number of sick days approved' },
    daysHint: {
      maternity: '',
      sickness: 'You must be confined for at least 4 days. SSS pays up to 120 days in a calendar year.',
    },
    cases: [
      [105, 'Live childbirth, normal or caesarean (105 days)'],
      [120, 'Solo parent, live childbirth (120 days)'],
      [60, 'Miscarriage or ETP, including stillbirth (60 days)'],
    ] as [number, string][],
    daily: { maternity: 'Daily maternity allowance', sickness: 'Daily sickness allowance' },
    total: { maternity: 'Estimated maternity benefit', sickness: 'Estimated sickness benefit' },
    sub: (daily: string, days: number) => `${daily} a day × ${days} days`,
    adsc: (adsc: string) => `Average daily salary credit: ${adsc} (your 6 highest salary credits ÷ 180).`,
    pct: { maternity: 'The maternity allowance is 100% of it.', sickness: 'The sickness allowance is 90% of it.' },
    empty: 'Enter at least one salary credit to see an estimate.',
    employed:
      'Employed members also get a salary differential from their employer for maternity leave, except in some small or distressed businesses. This calculator shows the SSS benefit only.',
  },
  fil: {
    month: { maternity: 'Buwan ng panganganak (o inaasahang panganganak)', sickness: 'Buwan ng pagkakasakit' },
    year: 'Taon',
    window: (from: string, to: string) => `Tinitingnan ng SSS ang monthly salary credit mo mula ${from} hanggang ${to}.`,
    windowHint:
      'Ito ang 12 buwan bago ang “semester of contingency” (ang quarter ng pangyayari at ang quarter bago nito). Hindi binibilang ang mga kontribusyon sa loob o pagkatapos ng semester na iyon.',
    credits: 'Ang 6 na pinakamataas na monthly salary credit mo sa 12 buwang iyon',
    creditsHint: `Maglagay ng hanggang 6 na halaga mula sa record ng kontribusyon mo sa SSS. Bawat isa ay binibilang hanggang ${peso(MSC_CAP)}. Kailangan ng hindi bababa sa 3 buwang kontribusyon sa panahong ito para maging qualified.`,
    credit: (n: number) => `Salary credit ${n}`,
    days: { maternity: 'Ang kaso mo', sickness: 'Bilang ng araw ng pagkakasakit na naaprubahan' },
    daysHint: {
      maternity: '',
      sickness: 'Dapat naka-confine ka nang hindi bababa sa 4 na araw. Hanggang 120 araw kada taon ang binabayaran ng SSS.',
    },
    cases: [
      [105, 'Live childbirth, normal o caesarean (105 araw)'],
      [120, 'Solo parent, live childbirth (120 araw)'],
      [60, 'Pagkakunan o ETP, kasama ang stillbirth (60 araw)'],
    ] as [number, string][],
    daily: { maternity: 'Arawang maternity allowance', sickness: 'Arawang sickness allowance' },
    total: { maternity: 'Tantiyang maternity benefit', sickness: 'Tantiyang sickness benefit' },
    sub: (daily: string, days: number) => `${daily} kada araw × ${days} araw`,
    adsc: (adsc: string) => `Average daily salary credit: ${adsc} (6 na pinakamataas na salary credit ÷ 180).`,
    pct: { maternity: 'Ang maternity allowance ay 100% nito.', sickness: 'Ang sickness allowance ay 90% nito.' },
    empty: 'Maglagay ng kahit isang salary credit para makita ang tantiya.',
    employed:
      'Ang mga employed ay may salary differential din mula sa employer para sa maternity leave, maliban sa ilang maliit o distressed na negosyo. Ang benepisyo lang ng SSS ang ipinapakita ng calculator na ito.',
  },
};

export function SssDailyBenefitCalculator({ locale, mode }: { locale: Locale; mode: Mode }) {
  const t = T[locale];
  const id = useId();
  // Default to this month, set in the browser (the server prerenders without a clock).
  const [month, setMonth] = useState(1);
  const [year, setYear] = useState(2026);
  const [thisYear, setThisYear] = useState(2026);
  useEffect(() => {
    const now = new Date();
    setMonth(now.getMonth() + 1);
    setYear(now.getFullYear());
    setThisYear(now.getFullYear());
  }, []);
  const [credits, setCredits] = useState<string[]>(['', '', '', '', '', '']);
  const [days, setDays] = useState(mode === 'maternity' ? '105' : '');

  const monthFmt = new Intl.DateTimeFormat(locale === 'fil' ? 'fil-PH' : 'en-PH', { month: 'long', year: 'numeric', timeZone: 'UTC' });
  const monthName = new Intl.DateTimeFormat(locale === 'fil' ? 'fil-PH' : 'en-PH', { month: 'long', timeZone: 'UTC' });
  const w = salaryCreditWindow(month, year);

  const adsc = averageDailySalaryCredit(credits.map(toNumber));
  const dailyAllowance = mode === 'maternity' ? adsc : adsc * 0.9;
  const d = toNumber(days);
  const ready = adsc > 0 && d > 0;
  const years = [thisYear - 2, thisYear - 1, thisYear, thisYear + 1];

  return (
    <div className="grid gap-6">
      <div className="grid gap-5 sm:grid-cols-2">
        <Field id={`${id}-m`} label={t.month[mode]}>
          <select id={`${id}-m`} className={inputClass} value={month} onChange={(e) => setMonth(Number(e.target.value))}>
            {Array.from({ length: 12 }, (_, i) => (
              <option key={i} value={i + 1}>
                {monthName.format(new Date(Date.UTC(2000, i, 1)))}
              </option>
            ))}
          </select>
        </Field>
        <Field id={`${id}-y`} label={t.year}>
          <select id={`${id}-y`} className={inputClass} value={year} onChange={(e) => setYear(Number(e.target.value))}>
            {years.map((y) => (
              <option key={y} value={y}>
                {y}
              </option>
            ))}
          </select>
        </Field>
      </div>

      <div className="rounded-lg bg-paper px-5 py-4">
        <p className="font-semibold">{t.window(monthFmt.format(w.start), monthFmt.format(w.end))}</p>
        <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{t.windowHint}</p>
      </div>

      <fieldset className="grid gap-2">
        <legend className="text-sm font-semibold">{t.credits}</legend>
        <p className="text-xs leading-relaxed text-muted-foreground">{t.creditsHint}</p>
        <div className="mt-1 grid grid-cols-2 gap-3 sm:grid-cols-3">
          {credits.map((c, i) => (
            <input
              key={i}
              aria-label={t.credit(i + 1)}
              inputMode="decimal"
              placeholder="₱"
              className={inputClass}
              value={c}
              onChange={(e) => setCredits((prev) => prev.map((v, j) => (j === i ? e.target.value : v)))}
            />
          ))}
        </div>
      </fieldset>

      {mode === 'maternity' ? (
        <Field id={`${id}-d`} label={t.days.maternity}>
          <select id={`${id}-d`} className={inputClass} value={days} onChange={(e) => setDays(e.target.value)}>
            {t.cases.map(([n, label]) => (
              <option key={n} value={n}>
                {label}
              </option>
            ))}
          </select>
        </Field>
      ) : (
        <Field id={`${id}-d`} label={t.days.sickness} hint={t.daysHint.sickness}>
          <input id={`${id}-d`} inputMode="numeric" className={inputClass} value={days} onChange={(e) => setDays(e.target.value)} />
        </Field>
      )}

      {!ready ? (
        <p className="text-sm text-muted-foreground">{t.empty}</p>
      ) : (
        <Result
          label={t.total[mode]}
          value={peso(dailyAllowance * d)}
          sub={
            <>
              <p>{t.sub(peso(dailyAllowance), d)}</p>
              <p>
                {t.adsc(peso(adsc))} {t.pct[mode]}
              </p>
              {mode === 'maternity' && <p className="mt-2">{t.employed}</p>}
            </>
          }
        />
      )}
    </div>
  );
}
