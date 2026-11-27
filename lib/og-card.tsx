import { ImageResponse } from 'next/og';
import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import type { Highlight } from './share-highlights';

// The share card Facebook, Messenger and X show for calculators, guides, tables and holiday pages.
// With a highlight it becomes a "key facts" card: title and up to 3 facts on the left, the headline
// number in a green panel on the right. Without one it shows the title and a short description.

export const OG_SIZE = { width: 1200, height: 630 };

const fontDir = join(process.cwd(), 'node_modules/@fontsource');
const serif = readFile(join(fontDir, 'newsreader/files/newsreader-latin-600-normal.woff'));
// Noto Sans (latin + latin-ext) has the peso sign (₱), which the site's Geist subset lacks.
const sans500 = readFile(join(fontDir, 'noto-sans/files/noto-sans-latin-500-normal.woff'));
const sans700 = readFile(join(fontDir, 'noto-sans/files/noto-sans-latin-700-normal.woff'));
const sansExt500 = readFile(join(fontDir, 'noto-sans/files/noto-sans-latin-ext-500-normal.woff'));
const sansExt700 = readFile(join(fontDir, 'noto-sans/files/noto-sans-latin-ext-700-normal.woff'));

export async function ogFonts() {
  return [
    { name: 'Newsreader', data: await serif, style: 'normal' as const, weight: 600 as const },
    { name: 'Noto', data: await sans500, style: 'normal' as const, weight: 500 as const },
    { name: 'Noto', data: await sans700, style: 'normal' as const, weight: 700 as const },
    { name: 'NotoExt', data: await sansExt500, style: 'normal' as const, weight: 500 as const },
    { name: 'NotoExt', data: await sansExt700, style: 'normal' as const, weight: 700 as const },
  ];
}

export const SANS = 'Noto, NotoExt';
export const COLORS = { PAPER: '#faf7f0', INK: '#1d2230', MUTED: '#5c6070', GREEN: '#1f7a52', GREEN_TINT: '#d9efe4', GOLD: '#e7b93f' };
const { PAPER, INK, MUTED, GREEN, GREEN_TINT } = COLORS;

function Check() {
  return (
    <svg width="34" height="34" viewBox="0 0 24 24" style={{ flexShrink: 0, marginTop: 2 }}>
      <circle cx="12" cy="12" r="12" fill={GREEN} />
      <path d="M6.5 12.5l3.5 3.5 7.5-8" stroke="#ffffff" strokeWidth="2.6" fill="none" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export async function ogCard({
  kicker,
  title,
  subtitle,
  fil,
  highlight,
}: {
  kicker: string;
  title: string;
  subtitle?: string;
  fil: boolean;
  highlight?: Highlight;
}) {
  const facts = highlight?.facts.slice(0, 3) ?? [];
  const big = highlight?.big;
  // Narrower title column when the number panel is shown.
  const titleSize = big ? (title.length > 70 ? 44 : title.length > 45 ? 52 : 60) : title.length > 90 ? 56 : title.length > 60 ? 66 : 78;
  const sub = subtitle && subtitle.length > 140 ? `${subtitle.slice(0, 137).trimEnd()}…` : subtitle;
  const valueSize = big ? (big.value.length > 8 ? 70 : big.value.length > 5 ? 92 : 116) : 0;

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          background: PAPER,
          padding: '48px 64px 40px',
          fontFamily: SANS,
          fontWeight: 500,
          color: INK,
          position: 'relative',
        }}
      >
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 12, background: GREEN, display: 'flex' }} />
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', fontFamily: 'Newsreader', fontSize: 44, fontWeight: 600, letterSpacing: '-0.01em' }}>
            Ayuda<span style={{ color: GREEN }}>Watch</span>
          </div>
          <div style={{ display: 'flex', background: GREEN_TINT, color: GREEN, borderRadius: 999, padding: '10px 26px', fontSize: 24, fontWeight: 700, letterSpacing: '0.06em' }}>
            {kicker}
          </div>
        </div>

        <div style={{ display: 'flex', flex: 1, alignItems: 'center', gap: 44, marginTop: 8 }}>
          <div style={{ display: 'flex', flex: 1, flexDirection: 'column', justifyContent: 'center' }}>
            <div style={{ display: 'flex', fontFamily: 'Newsreader', fontSize: titleSize, fontWeight: 600, lineHeight: 1.08, letterSpacing: '-0.015em' }}>
              {title}
            </div>
            {facts.length > 0 ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 14, marginTop: 28 }}>
                {facts.map((f) => (
                  <div key={f} style={{ display: 'flex', alignItems: 'flex-start', gap: 14, fontSize: 28, fontWeight: 700, lineHeight: 1.25 }}>
                    <Check />
                    <div style={{ display: 'flex' }}>{f}</div>
                  </div>
                ))}
              </div>
            ) : (
              sub && <div style={{ display: 'flex', marginTop: 22, fontSize: 30, lineHeight: 1.35, color: MUTED }}>{sub}</div>
            )}
          </div>

          {big && (
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                width: 380,
                height: 380,
                flexShrink: 0,
                background: GREEN,
                color: '#ffffff',
                borderRadius: 32,
                padding: '36px 34px',
              }}
            >
              <div style={{ display: 'flex', fontSize: valueSize, fontWeight: 700, lineHeight: 1, letterSpacing: '-0.02em' }}>{big.value}</div>
              <div style={{ display: 'flex', marginTop: 20, fontSize: 28, lineHeight: 1.3, color: '#d9efe4' }}>{big.label}</div>
            </div>
          )}
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 22, color: MUTED }}>
          <div style={{ display: 'flex' }}>ayudawatch.com</div>
          <div style={{ display: 'flex' }}>{fil ? 'May link sa opisyal na source · Hindi website ng gobyerno' : 'Linked to official sources · Not a government website'}</div>
        </div>
      </div>
    ),
    { ...OG_SIZE, fonts: await ogFonts() },
  );
}
