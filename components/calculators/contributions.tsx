'use client';

import { useId, useState } from 'react';
import { SSS_MEMBER_TYPES, pagibigContribution, philhealthPremium, sssContribution, type SssMemberType } from '@/lib/contributions';
import type { Locale } from '@/lib/i18n';
import { Field, Result, inputClass, peso, toNumber } from './calc-ui';

const T = {
  en: {
    salary: 'Monthly salary (basic pay)',
    type: 'Membership type',
    types: {
      employed: 'Employed',
      kasambahay: 'Kasambahay',
      'self-employed': 'Self-employed',
      voluntary: 'Voluntary / non-working spouse',
      ofw: 'Land-based OFW',
    } satisfies Record<SssMemberType, string>,
    agency: 'Agency',
    you: 'You pay',
    employer: 'Employer pays',
    total: 'Total',
    sss: (msc: string) => `SSS (salary credit ${msc})`,
    philhealth: 'PhilHealth (total premium)',
    pagibig: 'Pag-IBIG (minimum)',
    result: 'Your monthly SSS and Pag-IBIG',
    resultSub: (ph: string) => `Plus PhilHealth: total premium of ${ph} a month for your salary. PhilHealth’s official table shows only the total, not each side’s share.`,
    notCovered: 'See the Pag-IBIG page for this membership type.',
    empty: 'Enter your monthly salary to see your contributions.',
  },
  fil: {
    salary: 'Buwanang sahod (basic pay)',
    type: 'Uri ng membership',
    types: {
      employed: 'Employed',
      kasambahay: 'Kasambahay',
      'self-employed': 'Self-employed',
      voluntary: 'Voluntary / non-working spouse',
      ofw: 'Land-based OFW',
    } satisfies Record<SssMemberType, string>,
    agency: 'Ahensya',
    you: 'Hulog mo',
    employer: 'Hulog ng employer',
    total: 'Kabuuan',
    sss: (msc: string) => `SSS (salary credit ${msc})`,
    philhealth: 'PhilHealth (kabuuang premium)',
    pagibig: 'Pag-IBIG (minimum)',
    result: 'Buwanang hulog mo sa SSS at Pag-IBIG',
    resultSub: (ph: string) => `Dagdag pa ang PhilHealth: kabuuang premium na ${ph} kada buwan para sa sahod mo. Kabuuan lang ang ipinapakita ng opisyal na table ng PhilHealth, hindi ang hati ng bawat panig.`,
    notCovered: 'Tingnan ang pahina ng Pag-IBIG para sa uri ng membership na ito.',
    empty: 'Ilagay ang buwanang sahod mo para makita ang mga hulog.',
  },
};

export function ContributionsCalculator({ locale }: { locale: Locale }) {
  const t = T[locale];
  const id = useId();
  const [salary, setSalary] = useState('');
  const [type, setType] = useState<SssMemberType>('employed');
  const s = toNumber(salary);
  const ready = s > 0;

  const sss = ready ? sssContribution(s, type) : null;
  const ph = ready ? philhealthPremium(s) : 0;
  const pagibigType = type === 'employed' ? 'employed' : type === 'self-employed' ? 'self-employed' : type === 'ofw' ? 'ofw' : null;
  const pi = ready && pagibigType ? pagibigContribution(s, pagibigType) : null;

  return (
    <div className="grid grid-cols-[minmax(0,1fr)] gap-6">
      <div className="grid gap-5 sm:grid-cols-2">
        <Field id={`${id}-s`} label={t.salary}>
          <input id={`${id}-s`} inputMode="decimal" placeholder="₱" className={inputClass} value={salary} onChange={(e) => setSalary(e.target.value)} />
        </Field>
        <Field id={`${id}-t`} label={t.type}>
          <select id={`${id}-t`} className={inputClass} value={type} onChange={(e) => setType(e.target.value as SssMemberType)}>
            {SSS_MEMBER_TYPES.map((m) => (
              <option key={m} value={m}>
                {t.types[m]}
              </option>
            ))}
          </select>
        </Field>
      </div>

      {!sss ? (
        <p className="text-sm text-muted-foreground">{t.empty}</p>
      ) : (
        <>
          <Result label={t.result} value={peso(sss.member + (pi?.member ?? 0))} sub={<p>{t.resultSub(peso(ph))}</p>} />
          <div className="overflow-x-auto rounded-lg border border-border">
            <table className="w-full min-w-[26rem] text-right text-sm tabular-nums">
              <thead className="bg-paper text-xs text-muted-foreground">
                <tr>
                  <th scope="col" className="px-3 py-2 text-left font-medium">{t.agency}</th>
                  <th scope="col" className="px-3 py-2 font-medium">{t.you}</th>
                  <th scope="col" className="px-3 py-2 font-medium">{t.employer}</th>
                  <th scope="col" className="px-3 py-2 font-medium">{t.total}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                <tr>
                  <td className="px-3 py-2 text-left">{t.sss(peso(sss.msc))}</td>
                  <td className="px-3 py-2">{peso(sss.member)}</td>
                  <td className="px-3 py-2">{peso(sss.employer)}</td>
                  <td className="px-3 py-2 font-semibold">{peso(sss.total)}</td>
                </tr>
                <tr>
                  <td className="px-3 py-2 text-left">{t.philhealth}</td>
                  <td className="px-3 py-2 text-muted-foreground">–</td>
                  <td className="px-3 py-2 text-muted-foreground">–</td>
                  <td className="px-3 py-2 font-semibold">{peso(ph)}</td>
                </tr>
                <tr>
                  <td className="px-3 py-2 text-left">{t.pagibig}</td>
                  {pi ? (
                    <>
                      <td className="px-3 py-2">{peso(pi.member)}</td>
                      <td className="px-3 py-2">{peso(pi.employer)}</td>
                      <td className="px-3 py-2 font-semibold">{peso(pi.total)}</td>
                    </>
                  ) : (
                    <td colSpan={3} className="px-3 py-2 text-muted-foreground">{t.notCovered}</td>
                  )}
                </tr>
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
}
