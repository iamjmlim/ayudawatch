import { ImageResponse } from 'next/og';
import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import { getDictionary, isLocale } from '@/lib/i18n';
import { getStory } from '@/lib/news';

// The card Facebook, Messenger and X show when a story link is shared.
// Same newsprint world as the site: serif headline, gold outlet-count pill.

export const alt = 'AyudaWatch';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

const fontDir = join(process.cwd(), 'node_modules/@fontsource');
const serif = readFile(join(fontDir, 'newsreader/files/newsreader-latin-600-normal.woff'));
const sans = readFile(join(fontDir, 'geist-sans/files/geist-sans-latin-600-normal.woff'));

const PAPER = '#faf7f0';
const INK = '#1d2230';
const MUTED = '#5c6070';
const BLUE = '#1f7a52'; // AyudaWatch green (kept the name: it's the accent color)
const GOLD = '#e7b93f';

export default async function Image({ params }: { params: Promise<{ lang: string; slug: string }> }) {
  const { lang, slug } = await params;
  const locale = isLocale(lang) ? lang : 'en';
  const t = getDictionary(locale);
  const story = await getStory(slug, locale);

  const headline = story?.headline ?? t.tagline;
  const outlets = story?.sources.map((s) => s.outlet) ?? [];
  const count = outlets.length;
  // Long headlines get a smaller size so they never overflow the card.
  const headlineSize = headline.length > 110 ? 54 : headline.length > 70 ? 64 : 76;

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          background: PAPER,
          padding: '64px 72px',
          fontFamily: 'Geist',
          color: INK,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 20 }}>
          <div style={{ display: 'flex', fontFamily: 'Newsreader', fontSize: 52, fontWeight: 600 }}>
            Ayuda<span style={{ color: BLUE }}>Watch</span>
          </div>
          <div style={{ fontSize: 26, color: MUTED }}>{t.tagline}</div>
        </div>

        <div
          style={{
            display: 'flex',
            fontFamily: 'Newsreader',
            fontSize: headlineSize,
            fontWeight: 600,
            lineHeight: 1.12,
            letterSpacing: '-0.01em',
          }}
        >
          {headline}
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 22 }}>
          {count > 0 && (
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 14,
                background: '#f5e3b0',
                borderRadius: 999,
                padding: '12px 26px',
                fontSize: 28,
                fontWeight: 600,
              }}
            >
              <div style={{ display: 'flex', gap: 5 }}>
                {Array.from({ length: Math.min(count, 6) }, (_, i) => (
                  <div key={i} style={{ width: 6, height: 26, borderRadius: 3, background: '#7a5a12' }} />
                ))}
              </div>
              {t.reportedByCount(count)}
            </div>
          )}
          <div style={{ display: 'flex', fontSize: 24, color: MUTED, flexShrink: 1 }}>
            {outlets.slice(0, 4).join(' · ')}
            {outlets.length > 4 ? ' …' : ''}
          </div>
        </div>
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 10, background: GOLD, display: 'flex' }} />
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: 'Newsreader', data: await serif, style: 'normal', weight: 600 },
        { name: 'Geist', data: await sans, style: 'normal', weight: 600 },
      ],
    },
  );
}
