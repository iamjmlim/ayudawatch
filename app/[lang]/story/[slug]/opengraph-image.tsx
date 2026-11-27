import { ImageResponse } from 'next/og';
import { getDictionary, isLocale } from '@/lib/i18n';
import { getStory } from '@/lib/news';
import { firstSentences } from '@/lib/excerpt';
import { COLORS, SANS, ogFonts } from '@/lib/og-card';

// The card Facebook, Messenger and X show when a story link is shared: the section as a label,
// the headline, the story's first sentence, and how many outlets reported it.

export const alt = 'AyudaWatch';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

const { PAPER, INK, MUTED, GREEN, GREEN_TINT, GOLD } = COLORS;

export default async function Image({ params }: { params: Promise<{ lang: string; slug: string }> }) {
  const { lang, slug } = await params;
  const locale = isLocale(lang) ? lang : 'en';
  const t = getDictionary(locale);
  const story = await getStory(slug, locale);

  const headline = story?.headline ?? t.tagline;
  const outlets = story?.sources.map((s) => s.outlet) ?? [];
  const count = outlets.length;
  const section = story?.category ? t.categories[story.category] : null;
  // The first sentence of the summary, shortened to fit two lines.
  let lead = story ? firstSentences(story.summary, 1) : '';
  if (lead.length > 150) lead = `${lead.slice(0, 147).trimEnd()}…`;
  // Long headlines get a smaller size so they never overflow the card.
  const headlineSize = headline.length > 100 ? 50 : headline.length > 70 ? 58 : 68;

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          background: PAPER,
          padding: '48px 64px 44px',
          fontFamily: SANS,
          fontWeight: 500,
          color: INK,
          position: 'relative',
        }}
      >
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 12, background: GOLD, display: 'flex' }} />
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', fontFamily: 'Newsreader', fontSize: 44, fontWeight: 600 }}>
            Ayuda<span style={{ color: GREEN }}>Watch</span>
          </div>
          {section && (
            <div style={{ display: 'flex', background: GREEN_TINT, color: GREEN, borderRadius: 999, padding: '10px 26px', fontSize: 24, fontWeight: 700, letterSpacing: '0.06em' }}>
              {section.toUpperCase()}
            </div>
          )}
        </div>

        <div style={{ display: 'flex', flex: 1, flexDirection: 'column', justifyContent: 'center' }}>
          <div style={{ display: 'flex', fontFamily: 'Newsreader', fontSize: headlineSize, fontWeight: 600, lineHeight: 1.1, letterSpacing: '-0.01em' }}>
            {headline}
          </div>
          {lead && (
            <div style={{ display: 'flex', marginTop: 22, paddingLeft: 22, borderLeft: `6px solid ${GREEN}`, fontSize: 28, lineHeight: 1.4, color: MUTED }}>
              {lead}
            </div>
          )}
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 22 }}>
          {count > 0 && (
            <div style={{ display: 'flex', alignItems: 'center', gap: 14, background: '#f5e3b0', borderRadius: 999, padding: '10px 24px', fontSize: 26, fontWeight: 700 }}>
              <div style={{ display: 'flex', gap: 5 }}>
                {Array.from({ length: Math.min(count, 6) }, (_, i) => (
                  <div key={i} style={{ width: 6, height: 24, borderRadius: 3, background: '#7a5a12' }} />
                ))}
              </div>
              {t.reportedByCount(count)}
            </div>
          )}
          <div style={{ display: 'flex', fontSize: 22, color: MUTED, flexShrink: 1 }}>
            {outlets.slice(0, 3).join(' · ')}
            {outlets.length > 3 ? ' …' : ''}
          </div>
        </div>
      </div>
    ),
    { ...size, fonts: await ogFonts() },
  );
}
