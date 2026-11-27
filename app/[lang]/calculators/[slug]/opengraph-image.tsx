import { getCalculator } from '@/lib/calculators';
import { OG_SIZE, ogCard } from '@/lib/og-card';
import { CALCULATOR_HIGHLIGHTS } from '@/lib/share-highlights';

export const alt = 'AyudaWatch calculator';
export const size = OG_SIZE;
export const contentType = 'image/png';

export default async function Image({ params }: { params: Promise<{ lang: string; slug: string }> }) {
  const { lang, slug } = await params;
  const fil = lang === 'fil';
  const calc = getCalculator(slug);
  const text = calc?.[fil ? 'fil' : 'en'];
  return ogCard({ kicker: fil ? 'LIBRENG CALCULATOR' : 'FREE CALCULATOR', title: text?.title ?? 'AyudaWatch', subtitle: text?.description, fil, highlight: CALCULATOR_HIGHLIGHTS[slug]?.[fil ? 'fil' : 'en'] });
}
