'use client';

import { useId, useState } from 'react';
import { MSC_CAP, sssPension } from '@/lib/calculators';
import type { Locale } from '@/lib/i18n';
import { Field, Result, inputClass, peso, toNumber } from './calc-ui';

const T = {
  en: {
    amsc: 'Average monthly salary credit (AMSC)',
    amscHint: `Your average monthly salary credit from your SSS records. SSS computes regular-program benefits on salary credits up to ${peso(MSC_CAP)}.`,
    cys: 'Credited years of service (CYS)',
    cysHint: 'The number of years with contributions in your SSS record.',
    result: 'Estimated monthly pension',
    plus: (n: string) => `${n} including the additional ₱1,000 that SSS has paid all retirement pensioners since January 1, 2017.`,
    how: 'How it was computed',
    f1: '₱300 + 20% of AMSC + 2% of AMSC for each year beyond 10',
    f2: '40% of AMSC',
    min: 'Minimum pension (₱1,200 with 10+ years, ₱2,400 with 20+ years)',
    highest: 'SSS pays the highest of these.',
    lumpSum:
      'A monthly pension needs at least 120 monthly contributions before the semester of retirement. With fewer, SSS pays a lump sum of your total contributions plus interest instead.',
    empty: 'Enter both numbers to see an estimate.',
  },
  fil: {
    amsc: 'Average monthly salary credit (AMSC)',
    amscHint: `Ang average monthly salary credit mo mula sa record mo sa SSS. Kinukuwenta ng SSS ang mga benepisyo sa regular program batay sa salary credit na hanggang ${peso(MSC_CAP)}.`,
    cys: 'Credited years of service (CYS)',
    cysHint: 'Ang bilang ng taon na may kontribusyon sa record mo sa SSS.',
    result: 'Tantiyang buwanang pension',
    plus: (n: string) => `${n} kasama ang dagdag na ₱1,000 na ibinibigay ng SSS sa lahat ng retirement pensioner mula Enero 1, 2017.`,
    how: 'Paano ito kinuwenta',
    f1: '₱300 + 20% ng AMSC + 2% ng AMSC sa bawat taon na lampas sa 10',
    f2: '40% ng AMSC',
    min: 'Minimum na pension (₱1,200 kung 10+ taon, ₱2,400 kung 20+ taon)',
    highest: 'Ang pinakamataas sa mga ito ang ibinabayad ng SSS.',
    lumpSum:
      'Para sa buwanang pension, kailangan ng hindi bababa sa 120 buwanang kontribusyon bago ang semester ng pagreretiro. Kung kulang, lump sum ng kabuuang kontribusyon at interes ang ibabayad ng SSS.',
    empty: 'Ilagay ang dalawang numero para makita ang tantiya.',
  },
} satisfies Record<Locale, Record<string, unknown>>;

export function SssPensionCalculator({ locale }: { locale: Locale }) {
  const t = T[locale];
  const id = useId();
  const [amsc, setAmsc] = useState('');
  const [cys, setCys] = useState('');
  const a = toNumber(amsc);
  const y = toNumber(cys);
  const ready = a > 0 && y >= 0 && Number.isFinite(a) && Number.isFinite(y);
  const r = ready ? sssPension(a, y) : null;

  return (
    <div className="grid gap-6">
      <div className="grid gap-5 sm:grid-cols-2">
        <Field id={`${id}-amsc`} label={t.amsc} hint={t.amscHint}>
          <input id={`${id}-amsc`} inputMode="decimal" className={inputClass} placeholder="₱" value={amsc} onChange={(e) => setAmsc(e.target.value)} />
        </Field>
        <Field id={`${id}-cys`} label={t.cys} hint={t.cysHint}>
          <input id={`${id}-cys`} inputMode="numeric" className={inputClass} value={cys} onChange={(e) => setCys(e.target.value)} />
        </Field>
      </div>

      {!r ? (
        <p className="text-sm text-muted-foreground">{t.empty}</p>
      ) : y < 10 ? (
        <Result label={t.result} value="—" sub={<p>{t.lumpSum}</p>} />
      ) : (
        <>
          <Result label={t.result} value={peso(r.monthly)} sub={<p>{t.plus(peso(r.withAdditional))}</p>} />
          <section className="text-sm">
            <h2 className="font-semibold">{t.how}</h2>
            <ul className="mt-2 divide-y divide-border rounded-lg border border-border">
              {[
                [t.f1, r.formula1],
                [t.f2, r.formula2],
                [t.min, r.minimum],
              ].map(([label, value]) => (
                <li key={label as string} className="flex items-baseline justify-between gap-4 px-4 py-2.5">
                  <span className="text-muted-foreground">{label}</span>
                  <span className={`tabular-nums ${value === r.monthly ? 'font-semibold text-foreground' : ''}`}>{peso(value as number)}</span>
                </li>
              ))}
            </ul>
            <p className="mt-2 text-muted-foreground">{t.highest}</p>
            <p className="mt-2 text-muted-foreground">{t.lumpSum}</p>
          </section>
        </>
      )}
    </div>
  );
}
