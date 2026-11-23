// Renders the Facebook Page profile picture and cover photo in the site's
// dark green style. Run: node brand/make-page-images.ts  (writes PNGs next to this file)

import { ImageResponse } from 'next/dist/compiled/@vercel/og/index.node.js'; // next/og's Node build
import { readFile, writeFile } from 'node:fs/promises';
import { join } from 'node:path';

const root = process.cwd();
const fonts = join(root, 'node_modules/@fontsource');
const serif = await readFile(join(fonts, 'newsreader/files/newsreader-latin-600-normal.woff'));
const sans = await readFile(join(fonts, 'geist-sans/files/geist-sans-latin-500-normal.woff'));
const sansBold = await readFile(join(fonts, 'geist-sans/files/geist-sans-latin-600-normal.woff'));

const PAPER = '#141c19'; // deep green-black background
const INK = '#eef1ec';
const MUTED = '#a9b3ad';
const GREEN = '#5fd3a0'; // the site's dark-mode green accent
const GREEN_SOFT = '#1f3a2f';

type El = { type: string; props: Record<string, unknown> };
const h = (type: string, style: Record<string, unknown>, ...children: (El | string)[]): El => ({
  type,
  props: { style: { display: 'flex', ...style }, children: children.length === 1 ? children[0] : children },
});

const fontOptions = [
  { name: 'Newsreader', data: serif, style: 'normal' as const, weight: 600 as const },
  { name: 'Geist', data: sans, style: 'normal' as const, weight: 500 as const },
  { name: 'Geist', data: sansBold, style: 'normal' as const, weight: 600 as const },
];

async function render(el: El, width: number, height: number, file: string) {
  const res = new ImageResponse(el as never, { width, height, fonts: fontOptions });
  await writeFile(join(root, 'brand', file), Buffer.from(await res.arrayBuffer()));
  console.log(`wrote brand/${file} (${width}x${height})`);
}

const serifText = (size: number, color: string, text: string) =>
  h('div', { fontFamily: 'Newsreader', fontSize: size, fontWeight: 600, color, letterSpacing: '-0.02em', lineHeight: 1 }, text);

const pill = (label: string, scale = 1) =>
  h(
    'div',
    {
      alignItems: 'center',
      gap: 14 * scale,
      background: GREEN_SOFT,
      borderRadius: 999,
      padding: `${12 * scale}px ${26 * scale}px`,
      fontFamily: 'Geist',
      fontWeight: 600,
      fontSize: 28 * scale,
      color: INK,
    },
    h('div', { width: 14 * scale, height: 14 * scale, borderRadius: 999, background: GREEN }),
    label,
  );

// Profile picture: cropped to a circle and shown as small as 40px, so the
// wordmark is stacked on two lines, large and centred.
const profile = h(
  'div',
  { width: '100%', height: '100%', background: PAPER, alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: 18 },
  serifText(230, INK, 'Ayuda'),
  serifText(230, GREEN, 'Watch'),
);

// Cover photo: 1640x624; important content stays in the centre (phones crop the sides).
const cover = h(
  'div',
  { width: '100%', height: '100%', background: PAPER, flexDirection: 'column', alignItems: 'center', justifyContent: 'center', position: 'relative' },
  h('div', { position: 'absolute', top: 0, left: 0, right: 0, height: 14, background: GREEN }),
  h(
    'div',
    { flexDirection: 'column', alignItems: 'center', gap: 22 },
    h('div', {}, serifText(140, INK, 'Ayuda'), serifText(140, GREEN, 'Watch')),
    h('div', { fontFamily: 'Newsreader', fontSize: 52, fontWeight: 600, color: INK }, 'Balita sa ayuda at benepisyo, malinaw.'),
    h('div', { fontFamily: 'Geist', fontWeight: 500, fontSize: 30, color: MUTED }, 'SSS · PhilHealth · Pag-IBIG · DSWD · DepEd · OFW · Holidays'),
    h(
      'div',
      { marginTop: 14, alignItems: 'center', gap: 22 },
      pill('May link sa opisyal na source', 0.95),
      h('div', { fontFamily: 'Geist', fontWeight: 500, fontSize: 27, color: MUTED }, 'Hindi website ng gobyerno'),
    ),
  ),
);

await render(profile, 1080, 1080, 'facebook-profile.png');
await render(cover, 1640, 624, 'facebook-cover.png');
