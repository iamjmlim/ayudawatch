import { getTable } from '@/lib/tables';
import { OG_SIZE, ogCard } from '@/lib/og-card';

export const alt = 'AyudaWatch contribution table';
export const size = OG_SIZE;
export const contentType = 'image/png';

export default async function Image({ params }: { params: Promise<{ lang: string; slug: string }> }) {
  const { lang, slug } = await params;
  const fil = lang === 'fil';
  const text = getTable(slug)?.[fil ? 'fil' : 'en'];
  return ogCard({ kicker: fil ? 'TALAAN' : 'TABLE', title: text?.title ?? 'AyudaWatch', fil });
}
