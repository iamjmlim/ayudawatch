import { PAGIBIG_MAX_FUND_SALARY, PHILHEALTH_CEILING, PHILHEALTH_FLOOR, philhealthPremium } from '@/lib/contributions';
import type { Locale } from '@/lib/i18n';

const peso = (n: number) => `₱${n.toLocaleString('en-PH', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
const th = 'px-3 py-2 font-medium';
const td = 'px-3 py-1.5';

// PhilHealth Circular 2019-0009 schedule, exactly as published.
const PH_SCHEDULE = [
  { year: '2019', rate: '2.75%', ceiling: 50_000, min: 275, max: 1_375 },
  { year: '2020', rate: '3.00%', ceiling: 60_000, min: 300, max: 1_800 },
  { year: '2021', rate: '3.50%', ceiling: 70_000, min: 350, max: 2_450 },
  { year: '2022', rate: '4.00%', ceiling: 80_000, min: 400, max: 3_200 },
  { year: '2023', rate: '4.50%*', ceiling: 90_000, min: 450, max: 4_050 },
  { year: '2024–2025', rate: '5.00%', ceiling: 100_000, min: 500, max: 5_000 },
];

export function PhilhealthTables({ locale }: { locale: Locale }) {
  const fil = locale === 'fil';
  const examples = [10_000, 15_000, 20_000, 25_000, 30_000, 40_000, 50_000, 75_000, 100_000];
  return (
    <div className="grid grid-cols-[minmax(0,1fr)] gap-8">
      <section>
        <h2 className="font-serif text-2xl font-semibold">{fil ? 'Kasalukuyang rate: 5%' : 'Current rate: 5%'}</h2>
        <p className="mt-2 leading-relaxed">
          {fil
            ? `Buwanang premium = 5% ng buwanang basic salary. Kung ${peso(PHILHEALTH_FLOOR)} pababa ang sahod, ${peso(500)} ang premium; kung ${peso(PHILHEALTH_CEILING)} pataas, ${peso(5_000)}.`
            : `Monthly premium = 5% of your monthly basic salary. Salaries of ${peso(PHILHEALTH_FLOOR)} or less pay ${peso(500)}; salaries of ${peso(PHILHEALTH_CEILING)} or more pay ${peso(5_000)}.`}
        </p>
        <div className="mt-4 overflow-x-auto rounded-lg border border-border">
          <table className="w-full min-w-[20rem] text-right text-sm tabular-nums">
            <thead className="bg-paper text-xs text-muted-foreground">
              <tr>
                <th scope="col" className={`${th} text-left`}>{fil ? 'Buwanang basic salary' : 'Monthly basic salary'}</th>
                <th scope="col" className={th}>{fil ? 'Kabuuang buwanang premium' : 'Total monthly premium'}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {examples.map((s) => (
                <tr key={s}>
                  <td className={`${td} text-left`}>{s === PHILHEALTH_FLOOR ? `${peso(s)} ${fil ? 'pababa' : 'or less'}` : s === PHILHEALTH_CEILING ? `${peso(s)} ${fil ? 'pataas' : 'or more'}` : peso(s)}</td>
                  <td className={td}>{peso(philhealthPremium(s))}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-2 text-sm text-muted-foreground">
          {fil
            ? 'Ipinapakita ng opisyal na table ang kabuuang premium. Para sa paghahati ng employer at empleyado, sundin ang abiso ng PhilHealth o ng employer mo.'
            : 'The official table shows the total premium. For how it is shared between employer and employee, follow PhilHealth’s or your employer’s guidance.'}
        </p>
      </section>

      <section>
        <h2 className="font-serif text-2xl font-semibold">{fil ? 'Opisyal na schedule mula 2019' : 'Official schedule since 2019'}</h2>
        <div className="mt-4 overflow-x-auto rounded-lg border border-border">
          <table className="w-full min-w-[30rem] text-right text-sm tabular-nums">
            <thead className="bg-paper text-xs text-muted-foreground">
              <tr>
                <th scope="col" className={`${th} text-left`}>{fil ? 'Taon' : 'Year'}</th>
                <th scope="col" className={th}>{fil ? 'Rate' : 'Rate'}</th>
                <th scope="col" className={th}>{fil ? 'Salary ceiling' : 'Salary ceiling'}</th>
                <th scope="col" className={th}>{fil ? 'Buwanang premium' : 'Monthly premium'}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {PH_SCHEDULE.map((r) => (
                <tr key={r.year}>
                  <td className={`${td} text-left`}>{r.year}</td>
                  <td className={td}>{r.rate}</td>
                  <td className={td}>{peso(r.ceiling)}</td>
                  <td className={td}>{`${peso(r.min)} – ${peso(r.max)}`}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-2 text-sm text-muted-foreground">
          {fil
            ? '*Ayon sa PhilHealth, nanatili sa 4% ang rate para sa 2023 dahil sa pagsuspinde ng pagtaas na iniutos ng Pangulo. Ang floor ay ₱10,000 sa lahat ng taon.'
            : '*PhilHealth notes the rate stayed at 4% for 2023 because the President ordered the increase suspended. The salary floor is ₱10,000 in every year.'}
        </p>
      </section>
    </div>
  );
}

export function PagibigTable({ locale }: { locale: Locale }) {
  const fil = locale === 'fil';
  const rows = fil
    ? [
        ['Empleyado (sahod na ₱10,000 pataas)', '₱200', '₱200', '₱400'],
        ['Empleyado (sahod na mababa sa ₱10,000)', '2% ng sahod', '2% ng sahod', '4% ng sahod'],
        ['OFW', '₱200', 'May Philippine employer (hal. seafarer): ₱200', '₱200–₱400'],
        ['Self-employed', '₱400', '–', '₱400'],
      ]
    : [
        ['Employee (salary ₱10,000 or more)', '₱200', '₱200', '₱400'],
        ['Employee (salary below ₱10,000)', '2% of salary', '2% of salary', '4% of salary'],
        ['OFW', '₱200', 'With a Philippine employer (e.g. seafarers): ₱200', '₱200–₱400'],
        ['Self-employed', '₱400', '–', '₱400'],
      ];
  return (
    <div className="grid grid-cols-[minmax(0,1fr)] gap-4">
      <div className="overflow-x-auto rounded-lg border border-border">
        <table className="w-full min-w-[32rem] text-sm">
          <thead className="bg-paper text-xs text-muted-foreground">
            <tr>
              <th scope="col" className={`${th} text-left`}>{fil ? 'Miyembro' : 'Member'}</th>
              <th scope="col" className={`${th} text-right`}>{fil ? 'Hulog ng miyembro' : 'Member pays'}</th>
              <th scope="col" className={`${th} text-right`}>{fil ? 'Hulog ng employer' : 'Employer pays'}</th>
              <th scope="col" className={`${th} text-right`}>{fil ? 'Kabuuang ipon' : 'Total saved'}</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {rows.map((r) => (
              <tr key={r[0]}>
                <td className={`${td} text-left`}>{r[0]}</td>
                <td className={`${td} text-right`}>{r[1]}</td>
                <td className={`${td} text-right`}>{r[2]}</td>
                <td className={`${td} text-right`}>{r[3]}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <ul className="list-disc space-y-2 pl-5 text-sm leading-relaxed text-muted-foreground marker:text-primary">
        {(fil
          ? [
              `Ang hulog ay 2% ng Maximum Fund Salary na ₱${PAGIBIG_MAX_FUND_SALARY.toLocaleString()} (2% × ₱10,000 = ₱200). Kung mababa sa ₱10,000 ang kinita sa buwan, 2% ng aktuwal na kinita ang hulog ng miyembro at ng employer.`,
              'Ang lahat ng hulog ay ipon mo na may taunang dibidendo, at puwede kang maghulog ng higit sa minimum.',
              'Ang dividend rate ng Regular Savings: 2025 6.62%, 2024 6.60%, 2023 6.55%, 2022 6.53%, 2021 5.50%.',
            ]
          : [
              `Savings are 2% of the Maximum Fund Salary of ₱${PAGIBIG_MAX_FUND_SALARY.toLocaleString()} (2% × ₱10,000 = ₱200). If you earn less than ₱10,000 in a month, you and your employer each pay 2% of what you actually earned.`,
              'Everything you pay is your own savings and earns yearly dividends, and you can always save more than the minimum.',
              'Regular Savings dividend rates: 2025 6.62%, 2024 6.60%, 2023 6.55%, 2022 6.53%, 2021 5.50%.',
            ]
        ).map((x) => (
          <li key={x}>{x}</li>
        ))}
      </ul>
    </div>
  );
}
