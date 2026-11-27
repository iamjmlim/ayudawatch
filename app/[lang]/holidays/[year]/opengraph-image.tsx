import { HOLIDAYS_BY_YEAR, longWeekends } from '@/lib/holiday-pay';
import { OG_SIZE, ogCard } from '@/lib/og-card';

export const alt = 'Philippine holidays and long weekends';
export const size = OG_SIZE;
export const contentType = 'image/png';

export default async function Image({ params }: { params: Promise<{ lang: string; year: string }> }) {
  const { lang, year } = await params;
  const fil = lang === 'fil';
  const runs = HOLIDAYS_BY_YEAR[year] ? longWeekends(year) : [];
  const day = (iso: string) => new Intl.DateTimeFormat(fil ? 'fil-PH' : 'en-PH', { timeZone: 'UTC', month: 'short', day: 'numeric' }).format(new Date(`${iso}T00:00:00Z`));
  // The three longest breaks, in calendar order.
  const top = [...runs]
    .sort((a, b) => b.days - a.days || a.start.localeCompare(b.start))
    .slice(0, 3)
    .sort((a, b) => a.start.localeCompare(b.start));
  const facts = top.map((r) => `${day(r.start)} – ${day(r.end)} · ${r.days} ${fil ? 'araw' : 'days'}`);

  return ogCard({
    kicker: fil ? 'MGA HOLIDAY' : 'HOLIDAYS',
    title: fil ? `Mga holiday sa Pilipinas ${year} at mga long weekend` : `Philippine holidays ${year} and long weekends`,
    fil,
    highlight: runs.length
      ? { big: { value: String(runs.length), label: fil ? `long weekend sa ${year}` : `long weekends in ${year}` }, facts }
      : undefined,
  });
}
