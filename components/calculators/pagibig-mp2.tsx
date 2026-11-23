'use client';

import { useId, useState } from 'react';
import { MP2_MIN_REMITTANCE, MP2_RATES, mp2Projection } from '@/lib/calculators';
import type { Locale } from '@/lib/i18n';
import { Field, Result, inputClass, peso, toNumber } from './calc-ui';

const T = {
  en: {
    lump: 'One-time amount (optional)',
    monthly: 'Monthly amount (optional)',
    minHint: `Pag-IBIG’s minimum is ${peso(MP2_MIN_REMITTANCE)} per remittance.`,
    belowMin: `Each remittance must be at least ${peso(MP2_MIN_REMITTANCE)}.`,
    rate: 'Dividend rate per year',
    rateHint: 'Future rates are not known. Pick a past official rate or type your own.',
    rateLabel: (y: number, r: number) => `${y} official rate: ${r.toFixed(2)}%`,
    custom: 'Custom rate (%)',
    payout: 'Dividend payout',
    compounded: 'Compounded (paid with everything after 5 years)',
    annual: 'Annual payout (paid to your bank every year)',
    resultCompounded: 'Estimated amount at maturity (after 5 years)',
    resultAnnual: 'Estimated total dividends paid to you over 5 years',
    sub: (principal: string, div: string) => `Your savings: ${principal} · Dividends: ${div}`,
    subAnnual: (principal: string) => `Your savings of ${principal} are returned at maturity.`,
    table: 'Year by year',
    year: 'Year',
    deposits: 'Deposits',
    dividend: 'Dividend',
    balance: 'Balance',
    assumptions:
      'How this estimate works: the one-time amount starts earning right away; each monthly deposit earns for the months left in its year; dividends are credited once a year at the same rate each year. Pag-IBIG computes actual dividends on your real savings record, so your amount will differ.',
    empty: 'Enter an amount to see an estimate.',
  },
  fil: {
    lump: 'Isang bagsakang halaga (opsyonal)',
    monthly: 'Buwanang halaga (opsyonal)',
    minHint: `Ang minimum ng Pag-IBIG ay ${peso(MP2_MIN_REMITTANCE)} bawat hulog.`,
    belowMin: `Dapat hindi bababa sa ${peso(MP2_MIN_REMITTANCE)} ang bawat hulog.`,
    rate: 'Dividend rate kada taon',
    rateHint: 'Hindi pa alam ang mga susunod na rate. Pumili ng nakaraang opisyal na rate o mag-type ng sarili mo.',
    rateLabel: (y: number, r: number) => `Opisyal na rate ng ${y}: ${r.toFixed(2)}%`,
    custom: 'Sariling rate (%)',
    payout: 'Pagkuha ng dibidendo',
    compounded: 'Compounded (kukunin kasama ng lahat pagkatapos ng 5 taon)',
    annual: 'Annual payout (ipinapadala sa bangko mo taon-taon)',
    resultCompounded: 'Tantiyang halaga sa maturity (pagkatapos ng 5 taon)',
    resultAnnual: 'Tantiyang kabuuang dibidendong matatanggap mo sa loob ng 5 taon',
    sub: (principal: string, div: string) => `Ipon mo: ${principal} · Dibidendo: ${div}`,
    subAnnual: (principal: string) => `Ibabalik ang ipon mong ${principal} sa maturity.`,
    table: 'Kada taon',
    year: 'Taon',
    deposits: 'Hulog',
    dividend: 'Dibidendo',
    balance: 'Balanse',
    assumptions:
      'Paano ginawa ang tantiyang ito: kumikita agad ang bagsakang halaga; ang bawat buwanang hulog ay kumikita sa natitirang buwan ng taon nito; isang beses kada taon ang pag-credit ng dibidendo sa parehong rate bawat taon. Kinukuwenta ng Pag-IBIG ang aktuwal na dibidendo batay sa totoong record ng ipon mo, kaya iba ang magiging halaga mo.',
    empty: 'Maglagay ng halaga para makita ang tantiya.',
  },
};

export function PagibigMp2Calculator({ locale }: { locale: Locale }) {
  const t = T[locale];
  const id = useId();
  const [lump, setLump] = useState('');
  const [monthly, setMonthly] = useState('');
  const [rateChoice, setRateChoice] = useState(String(MP2_RATES[0].rate));
  const [customRate, setCustomRate] = useState('');
  const [payout, setPayout] = useState<'compounded' | 'annual'>('compounded');

  const l = toNumber(lump);
  const m = toNumber(monthly);
  const rate = rateChoice === 'custom' ? toNumber(customRate) : Number(rateChoice);
  const lumpOk = Number.isNaN(l) || l === 0 || l >= MP2_MIN_REMITTANCE;
  const monthlyOk = Number.isNaN(m) || m === 0 || m >= MP2_MIN_REMITTANCE;
  const ready = ((l > 0) || (m > 0)) && rate > 0 && Number.isFinite(rate);
  const p = ready ? mp2Projection(l > 0 ? l : 0, m > 0 ? m : 0, rate, payout) : null;

  return (
    <div className="grid grid-cols-[minmax(0,1fr)] gap-6">
      <div className="grid gap-5 sm:grid-cols-2">
        <Field id={`${id}-l`} label={t.lump} hint={!lumpOk ? t.belowMin : t.minHint}>
          <input id={`${id}-l`} inputMode="decimal" placeholder="₱" className={inputClass} value={lump} onChange={(e) => setLump(e.target.value)} aria-invalid={!lumpOk} />
        </Field>
        <Field id={`${id}-m`} label={t.monthly} hint={!monthlyOk ? t.belowMin : undefined}>
          <input id={`${id}-m`} inputMode="decimal" placeholder="₱" className={inputClass} value={monthly} onChange={(e) => setMonthly(e.target.value)} aria-invalid={!monthlyOk} />
        </Field>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field id={`${id}-r`} label={t.rate} hint={t.rateHint}>
          <select id={`${id}-r`} className={inputClass} value={rateChoice} onChange={(e) => setRateChoice(e.target.value)}>
            {MP2_RATES.map((r) => (
              <option key={r.year} value={String(r.rate)}>
                {t.rateLabel(r.year, r.rate)}
              </option>
            ))}
            <option value="custom">{t.custom}</option>
          </select>
        </Field>
        {rateChoice === 'custom' && (
          <Field id={`${id}-c`} label={t.custom}>
            <input id={`${id}-c`} inputMode="decimal" placeholder="%" className={inputClass} value={customRate} onChange={(e) => setCustomRate(e.target.value)} />
          </Field>
        )}
      </div>

      <fieldset className="grid gap-2">
        <legend className="text-sm font-semibold">{t.payout}</legend>
        {(['compounded', 'annual'] as const).map((opt) => (
          <label key={opt} className="flex min-h-11 cursor-pointer items-center gap-3 rounded-lg border border-border px-4 py-2.5 has-[:checked]:border-primary">
            <input type="radio" name={`${id}-payout`} className="size-4 accent-[var(--primary)]" checked={payout === opt} onChange={() => setPayout(opt)} />
            <span>{t[opt]}</span>
          </label>
        ))}
      </fieldset>

      {!p ? (
        <p className="text-sm text-muted-foreground">{t.empty}</p>
      ) : (
        <>
          {payout === 'compounded' ? (
            <Result label={t.resultCompounded} value={peso(p.atMaturity)} sub={<p>{t.sub(peso(p.principal), peso(p.totalDividends))}</p>} />
          ) : (
            <Result label={t.resultAnnual} value={peso(p.paidOut)} sub={<p>{t.subAnnual(peso(p.principal))}</p>} />
          )}
          <section className="text-sm">
            <h2 className="font-semibold">{t.table}</h2>
            <div className="mt-2 overflow-x-auto rounded-lg border border-border">
              <table className="w-full min-w-[22rem] text-right tabular-nums">
                <thead className="text-xs text-muted-foreground">
                  <tr className="border-b border-border">
                    <th scope="col" className="px-3 py-2 text-left font-medium">{t.year}</th>
                    <th scope="col" className="px-3 py-2 font-medium">{t.deposits}</th>
                    <th scope="col" className="px-3 py-2 font-medium">{t.dividend}</th>
                    <th scope="col" className="px-3 py-2 font-medium">{t.balance}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {p.years.map((y) => (
                    <tr key={y.year}>
                      <td className="px-3 py-2 text-left">{y.year}</td>
                      <td className="px-3 py-2">{peso(y.deposits)}</td>
                      <td className="px-3 py-2">{peso(y.dividend)}</td>
                      <td className="px-3 py-2">{peso(y.balance)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="mt-3 leading-relaxed text-muted-foreground">{t.assumptions}</p>
          </section>
        </>
      )}
    </div>
  );
}
