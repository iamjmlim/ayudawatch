import { ImageResponse } from 'next/og';
import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import { getDictionary, isLocale } from '@/lib/i18n';

// Default share card for every page without its own (home, sections, guides,
// calculators…). Story pages keep their own card with the headline.

export const alt = 'AyudaWatch: Benefits and aid news, made clear';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

const fontDir = join(process.cwd(), 'node_modules/@fontsource');
const serif = readFile(join(fontDir, 'newsreader/files/newsreader-latin-600-normal.woff'));
const sans = readFile(join(fontDir, 'geist-sans/files/geist-sans-latin-600-normal.woff'));

const PAPER = '#faf7f0';
const INK = '#1d2230';
const MUTED = '#5c6070';
const GREEN = '#1f7a52';

export default async function Image({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const fil = lang === 'fil';
  const t = getDictionary(isLocale(lang) ? lang : 'en');
  const topics = 'SSS · PhilHealth · Pag-IBIG · DSWD · DepEd · OFW · Holidays';

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          background: PAPER,
          padding: '64px 88px',
          fontFamily: 'Geist',
          color: INK,
          position: 'relative',
        }}
      >
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 12, background: GREEN, display: 'flex' }} />
        <div style={{ display: 'flex', fontFamily: 'Newsreader', fontSize: 130, fontWeight: 600, letterSpacing: '-0.02em', lineHeight: 1 }}>
          Ayuda<span style={{ color: GREEN }}>Watch</span>
        </div>
        <div style={{ display: 'flex', marginTop: 20, fontFamily: 'Newsreader', fontSize: 54, fontWeight: 600 }}>{t.tagline}</div>
        <div style={{ display: 'flex', marginTop: 22, fontSize: 30, color: MUTED }}>{topics}</div>
        <div style={{ display: 'flex', marginTop: 34, alignItems: 'center', gap: 22 }}>
          <div style={{ display: 'flex', background: '#d9efe4', color: GREEN, borderRadius: 999, padding: '12px 28px', fontSize: 28 }}>
            {fil ? 'May link sa opisyal na source' : 'Linked to official sources'}
          </div>
          <div style={{ display: 'flex', fontSize: 26, color: MUTED }}>{fil ? 'Hindi website ng gobyerno' : 'Not a government website'}</div>
        </div>
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
