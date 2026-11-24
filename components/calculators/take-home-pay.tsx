'use client';

import { useId, useState } from 'react';
import { takeHome } from '@/lib/tax';
import type { Locale } from '@/lib/i18n';
import { Field, Result, inputClass, peso, toNumber } from './calc-ui';

const T = {
  en: {
    basic: 'Monthly basic pay',
    basicHint: 'Before any deductions.',
    taxable: 'Other taxable pay per month (optional)',
    taxableHint: 'Taxable allowances, regular overtime, commissions. Leave blank if none.',
    nonTaxable: 'Non-taxable allowances per month (optional)',
    nonTaxableHint: 'De minimis benefits such as rice, uniform or medical allowances within BIR limits.',
    mwe: 'I am a minimum wage earner',
    mweHint: 'Your minimum wage and holiday pay are tax-free. Any other taxable pay you enter is still taxed.',
    result: 'Your estimated monthly take-home pay',
    perCutoff: (s: string) => `About ${s} per cutoff if you are paid twice a month.`,
    breakdown: 'Breakdown per month',
    gross: 'Gross taxable pay',
    sss: 'SSS (employee share)',
    philhealth: 'PhilHealth (employee share)',
    pagibig: 'Pag-IBIG (employee share)',
    tax: 'Withholding tax',
    nonTax: 'Non-taxable allowances',
    net: 'Take-home pay',
    note: 'An estimate: your payslip can differ because of loans, absences, other deductions or your employer’s payroll method. 13th month pay and other bonuses up to ₱90,000 a year are tax-free and are not included here.',
    empty: 'Enter your monthly basic pay to see your take-home pay.',
  },
  fil: {
    basic: 'Buwanang basic pay',
    basicHint: 'Bago ang anumang kaltas.',
    taxable: 'Iba pang taxable na sahod kada buwan (opsiyonal)',
    taxableHint: 'Taxable na allowance, regular na overtime, komisyon. Iwanang blangko kung wala.',
    nonTaxable: 'Non-taxable na allowance kada buwan (opsiyonal)',
    nonTaxableHint: 'De minimis na benepisyo gaya ng rice, uniform o medical allowance na pasok sa limitasyon ng BIR.',
    mwe: 'Minimum wage earner ako',
    mweHint: 'Walang buwis ang minimum wage at holiday pay mo. Bubuwisan pa rin ang iba pang taxable na sahod na ilalagay mo.',
    result: 'Tantiyang buwanang take-home pay mo',
    perCutoff: (s: string) => `Mga ${s} kada cutoff kung dalawang beses kang sinasahuran kada buwan.`,
    breakdown: 'Detalye kada buwan',
    gross: 'Gross na taxable na sahod',
    sss: 'SSS (bahagi ng empleyado)',
    philhealth: 'PhilHealth (bahagi ng empleyado)',
    pagibig: 'Pag-IBIG (bahagi ng empleyado)',
    tax: 'Withholding tax',
    nonTax: 'Non-taxable na allowance',
    net: 'Take-home pay',
    note: 'Tantiya lang ito: puwedeng iba ang nasa payslip mo dahil sa loan, absent, iba pang kaltas o paraan ng payroll ng employer mo. Walang buwis ang 13th month pay at iba pang bonus hanggang ₱90,000 kada taon, at hindi ito kasama rito.',
    empty: 'Ilagay ang buwanang basic pay mo para makita ang take-home pay mo.',
  },
};

export function TakeHomePayCalculator({ locale }: { locale: Locale }) {
  const t = T[locale];
  const id = useId();
  const [basic, setBasic] = useState('');
  const [taxable, setTaxable] = useState('');
  const [nonTaxable, setNonTaxable] = useState('');
  const [mwe, setMwe] = useState(false);

  const b = toNumber(basic);
  const opt = (s: string) => (s.trim() === '' ? 0 : Math.max(toNumber(s) || 0, 0));
  const res = b > 0 ? takeHome({ basic: b, taxableAllowances: opt(taxable), nonTaxable: opt(nonTaxable), minimumWage: mwe }) : null;

  const rows = res
    ? ([
        [t.gross, res.compensation, ''],
        [t.sss, -res.sss, ''],
        [t.philhealth, -res.philhealth, ''],
        [t.pagibig, -res.pagibig, ''],
        [t.tax, -res.tax, ''],
        ...(opt(nonTaxable) > 0 ? [[t.nonTax, opt(nonTaxable), ''] as const] : []),
        [t.net, res.net, 'font-semibold text-foreground'],
      ] as const)
    : [];

  return (
    <div className="grid grid-cols-[minmax(0,1fr)] gap-6">
      <div className="grid gap-5 sm:grid-cols-2">
        <Field id={`${id}-b`} label={t.basic} hint={t.basicHint}>
          <input id={`${id}-b`} inputMode="decimal" placeholder="₱" className={inputClass} value={basic} onChange={(e) => setBasic(e.target.value)} />
        </Field>
        <Field id={`${id}-t`} label={t.taxable} hint={t.taxableHint}>
          <input id={`${id}-t`} inputMode="decimal" placeholder="₱" className={inputClass} value={taxable} onChange={(e) => setTaxable(e.target.value)} />
        </Field>
        <Field id={`${id}-n`} label={t.nonTaxable} hint={t.nonTaxableHint}>
          <input id={`${id}-n`} inputMode="decimal" placeholder="₱" className={inputClass} value={nonTaxable} onChange={(e) => setNonTaxable(e.target.value)} />
        </Field>
        <div className="grid min-w-0 content-start gap-1.5">
          <label className="flex min-h-11 cursor-pointer items-center gap-3 rounded-lg border border-border px-4 py-2.5 has-[:checked]:border-primary sm:mt-6">
            <input type="checkbox" className="size-4 accent-[var(--primary)]" checked={mwe} onChange={(e) => setMwe(e.target.checked)} />
            <span>{t.mwe}</span>
          </label>
          <p className="text-xs leading-relaxed text-muted-foreground">{t.mweHint}</p>
        </div>
      </div>

      {!res ? (
        <p className="text-sm text-muted-foreground">{t.empty}</p>
      ) : (
        <>
          <Result label={t.result} value={peso(res.net)} sub={<p>{t.perCutoff(peso(res.semiMonthly))}</p>} />
          <section>
            <h3 className="text-sm font-semibold">{t.breakdown}</h3>
            <dl className="mt-2 divide-y divide-border rounded-lg border border-border text-sm">
              {rows.map(([label, amount, cls]) => (
                <div key={label} className={`flex justify-between gap-4 px-4 py-2.5 ${cls}`}>
                  <dt className={cls ? '' : 'text-muted-foreground'}>{label}</dt>
                  <dd className="tabular-nums">{amount < 0 ? `− ${peso(-amount)}` : peso(amount)}</dd>
                </div>
              ))}
            </dl>
          </section>
          <p className="text-xs leading-relaxed text-muted-foreground">{t.note}</p>
        </>
      )}
    </div>
  );
}
