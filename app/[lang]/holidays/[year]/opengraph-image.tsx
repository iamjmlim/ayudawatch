import { HOLIDAYS_BY_YEAR, longWeekends } from '@/lib/holiday-pay';
import { OG_SIZE, ogCard } from '@/lib/og-card';

export const alt = 'Philippine holidays and long weekends';
export const size = OG_SIZE;
export const contentType = 'image/png';

export default async function Image({ params }: { params: Promise<{ lang: string; year: string }> }) {
  const { lang, year } = await params;
  const fil = lang === 'fil';
  const known = Boolean(HOLIDAYS_BY_YEAR[year]);
  const n = known ? longWeekends(year).length : 0;
  return ogCard({
    kicker: fil ? 'MGA HOLIDAY' : 'HOLIDAYS',
    title: fil ? `Mga holiday sa Pilipinas ${year} at mga long weekend` : `Philippine holidays ${year} and long weekends`,
    subtitle: known
      ? fil
        ? `${n} long weekend, kumpletong listahan mula sa opisyal na proklamasyon, at holiday pay rates.`
        : `${n} long weekends, the complete list from the official proclamation, and holiday pay rates.`
      : undefined,
    fil,
  });
}
