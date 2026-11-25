import { ImageResponse } from 'next/og';
import { readFile } from 'node:fs/promises';
import { join } from 'node:path';

// The share card Facebook, Messenger and X show for calculators, guides, tables and holiday pages:
// a kicker ("CALCULATOR", "GUIDE"…), the page title in the site's serif, and a short line under it.

export const OG_SIZE = { width: 1200, height: 630 };

const fontDir = join(process.cwd(), 'node_modules/@fontsource');
const serif = readFile(join(fontDir, 'newsreader/files/newsreader-latin-600-normal.woff'));
const sans = readFile(join(fontDir, 'geist-sans/files/geist-sans-latin-600-normal.woff'));

const PAPER = '#faf7f0';
const INK = '#1d2230';
const MUTED = '#5c6070';
const GREEN = '#1f7a52';
const GREEN_TINT = '#d9efe4';

export async function ogCard({ kicker, title, subtitle, fil }: { kicker: string; title: string; subtitle?: string; fil: boolean }) {
  // Long titles get a smaller size so they never overflow the card.
  const titleSize = title.length > 90 ? 56 : title.length > 60 ? 66 : 78;
  const sub = subtitle && subtitle.length > 140 ? `${subtitle.slice(0, 137).trimEnd()}…` : subtitle;

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          background: PAPER,
          padding: '56px 80px 48px',
          fontFamily: 'Geist',
          color: INK,
          position: 'relative',
        }}
      >
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 12, background: GREEN, display: 'flex' }} />
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', fontFamily: 'Newsreader', fontSize: 44, fontWeight: 600, letterSpacing: '-0.01em' }}>
            Ayuda<span style={{ color: GREEN }}>Watch</span>
          </div>
          <div style={{ display: 'flex', background: GREEN_TINT, color: GREEN, borderRadius: 999, padding: '10px 26px', fontSize: 26, letterSpacing: '0.06em' }}>
            {kicker}
          </div>
        </div>
        <div style={{ display: 'flex', flex: 1, flexDirection: 'column', justifyContent: 'center' }}>
          <div style={{ display: 'flex', fontFamily: 'Newsreader', fontSize: titleSize, fontWeight: 600, lineHeight: 1.08, letterSpacing: '-0.015em' }}>
            {title}
          </div>
          {sub && <div style={{ display: 'flex', marginTop: 22, fontSize: 30, lineHeight: 1.35, color: MUTED }}>{sub}</div>}
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 24, color: MUTED }}>
          <div style={{ display: 'flex' }}>ayudawatch.com</div>
          <div style={{ display: 'flex' }}>{fil ? 'May link sa opisyal na source · Hindi website ng gobyerno' : 'Linked to official sources · Not a government website'}</div>
        </div>
      </div>
    ),
    {
      ...OG_SIZE,
      fonts: [
        { name: 'Newsreader', data: await serif, style: 'normal', weight: 600 },
        { name: 'Geist', data: await sans, style: 'normal', weight: 600 },
      ],
    },
  );
}
