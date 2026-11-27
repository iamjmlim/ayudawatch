import { getGuide } from '@/lib/guides';
import { OG_SIZE, ogCard } from '@/lib/og-card';
import { GUIDE_HIGHLIGHTS } from '@/lib/share-highlights';

export const alt = 'AyudaWatch guide';
export const size = OG_SIZE;
export const contentType = 'image/png';

export default async function Image({ params }: { params: Promise<{ lang: string; slug: string }> }) {
  const { lang, slug } = await params;
  const fil = lang === 'fil';
  const text = getGuide(slug)?.[fil ? 'fil' : 'en'];
  return ogCard({ kicker: fil ? 'GABAY' : 'GUIDE', title: text?.title ?? 'AyudaWatch', subtitle: text?.description, fil, highlight: GUIDE_HIGHLIGHTS[slug]?.[fil ? 'fil' : 'en'] });
}
