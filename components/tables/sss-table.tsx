'use client';

import { useState } from 'react';
import { SSS_MEMBER_TYPES, sssTableRows, type SssMemberType } from '@/lib/contributions';
import type { Locale } from '@/lib/i18n';

const fmt = (n: number) => n.toLocaleString('en-PH', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

const T = {
  en: {
    type: 'Membership type',
    types: {
      employed: 'Employed (employer and employee)',
      kasambahay: 'Kasambahay (household employer and kasambahay)',
      'self-employed': 'Self-employed',
      voluntary: 'Voluntary member or non-working spouse',
      ofw: 'Land-based OFW',
    } satisfies Record<SssMemberType, string>,
    range: 'Monthly compensation',
    msc: 'Salary credit (MSC)',
    mpf: 'of which MPF',
    er: 'Employer',
    ee: 'Employee',
    member: 'Member pays',
    total: 'Total',
    below: (n: string) => `Below ${n}`,
    over: (n: string) => `${n} and over`,
    notes: {
      employed: 'Employer pays 10% plus the EC fee (₱10 below a ₱15,000 MSC, ₱30 from ₱15,000); the employee pays 5%.',
      kasambahay: 'If the kasambahay earns below ₱5,000 a month, the household employer pays the whole contribution. From ₱5,000, it is shared like regular employment.',
      'self-employed': 'Self-employed members pay the full 15% plus the EC fee.',
      voluntary: 'Voluntary members and non-working spouses pay the full 15%. There is no EC fee.',
      ofw: 'Land-based OFWs pay the full 15%, with a minimum MSC of ₱8,000. There is no EC fee.',
    } satisfies Record<SssMemberType, string>,
    mpfNote: 'Salary credit above ₱20,000 goes to your MPF (WISP) savings account; regular SSS benefits are computed on up to ₱20,000.',
  },
  fil: {
    type: 'Uri ng membership',
    types: {
      employed: 'Employed (employer at empleyado)',
      kasambahay: 'Kasambahay (household employer at kasambahay)',
      'self-employed': 'Self-employed',
      voluntary: 'Voluntary member o non-working spouse',
      ofw: 'Land-based OFW',
    } satisfies Record<SssMemberType, string>,
    range: 'Buwanang kita',
    msc: 'Salary credit (MSC)',
    mpf: 'kasama ang MPF',
    er: 'Employer',
    ee: 'Empleyado',
    member: 'Hulog ng miyembro',
    total: 'Kabuuan',
    below: (n: string) => `Mababa sa ${n}`,
    over: (n: string) => `${n} pataas`,
    notes: {
      employed: 'Ang employer ang magbabayad ng 10% at EC fee (₱10 kung mababa sa ₱15,000 ang MSC, ₱30 mula ₱15,000); ang empleyado ay 5%.',
      kasambahay: 'Kung mababa sa ₱5,000 ang buwanang sahod ng kasambahay, ang household employer ang magbabayad ng buong hulog. Mula ₱5,000, hati sila gaya ng regular na empleyado.',
      'self-employed': 'Ang self-employed ang magbabayad ng buong 15% at EC fee.',
      voluntary: 'Ang voluntary member at non-working spouse ang magbabayad ng buong 15%. Walang EC fee.',
      ofw: 'Ang land-based OFW ang magbabayad ng buong 15%, na may minimum na MSC na ₱8,000. Walang EC fee.',
    } satisfies Record<SssMemberType, string>,
    mpfNote: 'Ang salary credit na lampas ₱20,000 ay napupunta sa MPF (WISP) savings account mo; ang regular na benepisyo ng SSS ay kinukuwenta hanggang ₱20,000.',
  },
};

export function SssContributionTable({ locale }: { locale: Locale }) {
  const t = T[locale];
  const [type, setType] = useState<SssMemberType>('employed');
  const rows = sssTableRows(type);
  const split = type === 'employed' || type === 'kasambahay';

  return (
    <div className="grid grid-cols-[minmax(0,1fr)] gap-4">
      <label className="grid min-w-0 gap-1.5">
        <span className="text-sm font-semibold">{t.type}</span>
        <select
          className="h-11 w-full min-w-0 rounded-lg border border-input bg-transparent px-3 text-base outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 dark:bg-input/30"
          value={type}
          onChange={(e) => setType(e.target.value as SssMemberType)}
        >
          {SSS_MEMBER_TYPES.map((m) => (
            <option key={m} value={m}>
              {t.types[m]}
            </option>
          ))}
        </select>
      </label>
      <p className="text-sm leading-relaxed text-muted-foreground">
        {t.notes[type]} {t.mpfNote}
      </p>
      <div className="overflow-x-auto rounded-lg border border-border">
        <table className="w-full min-w-[36rem] text-right text-sm tabular-nums">
          <caption className="sr-only">{t.types[type]}</caption>
          <thead className="bg-paper text-xs text-muted-foreground">
            <tr>
              <th scope="col" className="px-3 py-2 text-left font-medium">{t.range}</th>
              <th scope="col" className="px-3 py-2 font-medium">{t.msc}</th>
              {split ? (
                <>
                  <th scope="col" className="px-3 py-2 font-medium">{t.er}</th>
                  <th scope="col" className="px-3 py-2 font-medium">{t.ee}</th>
                </>
              ) : (
                <th scope="col" className="px-3 py-2 font-medium">{t.member}</th>
              )}
              <th scope="col" className="px-3 py-2 font-medium">{t.total}</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {rows.map((r, i) => (
              <tr key={i}>
                <td className="px-3 py-1.5 text-left whitespace-nowrap">
                  {r.from === null ? t.below(fmt((r.to ?? 0) + 0.01)) : r.to === null ? t.over(fmt(r.from)) : `${fmt(r.from)} – ${fmt(r.to)}`}
                </td>
                <td className="px-3 py-1.5">
                  {fmt(r.result.msc)}
                  {r.result.mpfMsc > 0 && <span className="block text-xs text-muted-foreground">{t.mpf} {fmt(r.result.mpfMsc)}</span>}
                </td>
                {split ? (
                  <>
                    <td className="px-3 py-1.5">{fmt(r.result.employer)}</td>
                    <td className="px-3 py-1.5">{fmt(r.result.member)}</td>
                  </>
                ) : (
                  <td className="px-3 py-1.5">{fmt(r.result.member)}</td>
                )}
                <td className="px-3 py-1.5 font-semibold">{fmt(r.result.total)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
