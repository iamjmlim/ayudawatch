// Renders the short videos in scripts.mjs: one 1080×1920 PNG per slide (also usable as a
// TikTok / Facebook photo carousel), then an MP4 with fades between slides.
//
//   node scripts/videos/render.mjs              -> all videos
//   node scripts/videos/render.mjs sss-maternity -> one video
//
// Output: content/videos/<slug>/slide-N.png, <slug>.mp4 and caption.txt (git-ignored).

import { createElement as h } from 'react';
import { ImageResponse } from 'next/dist/compiled/@vercel/og/index.node.js';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { execFileSync } from 'node:child_process';
import { join } from 'node:path';
import ffmpeg from 'ffmpeg-static';
import { VIDEOS } from './scripts.mjs';

const W = 1080;
const H = 1920;
const FADE = 0.4; // seconds of crossfade between slides
const OUT = join(process.cwd(), 'content', 'videos');

const PAPER = '#faf7f0';
const INK = '#1d2230';
const MUTED = '#5c6070';
const GREEN = '#1f7a52';
const GREEN_TINT = '#d9efe4';
const GOLD = '#e7b93f';

const font = (p) => readFile(join(process.cwd(), 'node_modules/@fontsource', p));
const fonts = [
  { name: 'Newsreader', data: await font('newsreader/files/newsreader-latin-600-normal.woff'), weight: 600, style: 'normal' },
  // Body text uses Windows' Segoe UI: unlike the site's Geist subset it has the peso sign (₱)
  // and spaces render evenly. Newsreader stays for titles; its missing ₱ falls back to Segoe UI.
  { name: 'Geist', data: await readFile('C:/Windows/Fonts/seguisb.ttf'), weight: 500, style: 'normal' },
  { name: 'Geist', data: await readFile('C:/Windows/Fonts/segoeuib.ttf'), weight: 700, style: 'normal' },
];

const div = (style, ...children) => h('div', { style: { display: 'flex', ...style } }, ...children);

function frame(slide, index, total, video) {
  const dots = div(
    { gap: 14 },
    ...Array.from({ length: total }, (_, i) => div({ width: i === index ? 56 : 18, height: 18, borderRadius: 9, background: i === index ? GREEN : '#d6d2c6' })),
  );
  return div(
    { width: W, height: H, flexDirection: 'column', background: PAPER, color: INK, fontFamily: 'Geist', fontWeight: 500, padding: '120px 88px 110px', position: 'relative' },
    div({ position: 'absolute', top: 0, left: 0, right: 0, height: 18, background: GREEN }),
    div(
      { justifyContent: 'space-between', alignItems: 'center' },
      div({ fontFamily: 'Newsreader', fontWeight: 600, fontSize: 64, letterSpacing: '-0.01em' }, 'Ayuda', h('span', { style: { color: GREEN } }, 'Watch')),
      dots,
    ),
    div({ flex: 1, flexDirection: 'column', justifyContent: 'center' }, body(slide, video)),
    div({ fontSize: 32, color: MUTED }, 'ayudawatch.com'),
  );
}

function body(s, video) {
  const title = (text, size = 76) => div({ fontFamily: 'Newsreader', fontWeight: 600, fontSize: size, lineHeight: 1.08, letterSpacing: '-0.015em' }, text);
  if (s.kind === 'hook') {
    return div(
      { flexDirection: 'column', gap: 44 },
      div({ alignSelf: 'flex-start', background: GREEN_TINT, color: GREEN, borderRadius: 999, padding: '16px 36px', fontSize: 38, fontWeight: 700, letterSpacing: '0.06em' }, s.kicker),
      title(s.title, 132),
      s.sub ? div({ alignSelf: 'flex-start', background: GOLD, color: INK, borderRadius: 16, padding: '18px 34px', fontSize: 52, fontWeight: 700 }, s.sub) : null,
    );
  }
  if (s.kind === 'big') {
    return div(
      { flexDirection: 'column', gap: 48 },
      div({ fontSize: 48, fontWeight: 700, color: GREEN, letterSpacing: '0.04em' }, s.title.toUpperCase()),
      div({ background: '#ffffff', border: `4px solid ${GREEN}`, borderRadius: 32, padding: '64px 56px' }, title(s.value, s.value.length > 30 ? 84 : 104)),
      s.sub ? div({ fontSize: 42, lineHeight: 1.4, color: MUTED }, s.sub) : null,
    );
  }
  if (s.kind === 'list') {
    return div(
      { flexDirection: 'column', gap: 40 },
      title(s.title, 96),
      div(
        { flexDirection: 'column', gap: 28 },
        ...s.items.map(([main, sub]) =>
          div(
            { flexDirection: 'column', gap: 10, background: '#ffffff', borderLeft: `14px solid ${GREEN}`, borderRadius: 20, padding: '32px 40px' },
            div({ fontSize: 50, fontWeight: 700, lineHeight: 1.2 }, main),
            sub ? div({ fontSize: 42, lineHeight: 1.3, color: GREEN, fontWeight: 700 }, sub) : null,
          ),
        ),
      ),
    );
  }
  // cta
  return div(
    { flexDirection: 'column', gap: 44, alignItems: 'flex-start' },
    title(s.title, 120),
    div({ fontSize: 52, color: MUTED }, s.sub),
    div({ background: GREEN, color: '#ffffff', borderRadius: 28, padding: '36px 48px', fontSize: 64, fontWeight: 700 }, 'ayudawatch.com'),
    div({ fontSize: 38, color: MUTED, lineHeight: 1.4 }, `Link: ${video.link}`),
  );
}

async function renderVideo(video) {
  const dir = join(OUT, video.slug);
  await mkdir(dir, { recursive: true });
  const files = [];
  for (const [i, slide] of video.slides.entries()) {
    const res = new ImageResponse(frame(slide, i, video.slides.length, video), { width: W, height: H, fonts });
    const file = join(dir, `slide-${i + 1}.png`);
    await writeFile(file, Buffer.from(await res.arrayBuffer()));
    files.push(file);
  }

  // Each slide is looped for its duration (+ fade overlap), then crossfaded into the next.
  const durs = video.slides.map((s, i) => (s.secs ?? 4) + (i < video.slides.length - 1 ? FADE : 0));
  const args = ['-y'];
  files.forEach((f, i) => args.push('-loop', '1', '-t', String(durs[i]), '-i', f));
  args.push('-f', 'lavfi', '-t', String(durs.reduce((a, b) => a + b, 0)), '-i', 'anullsrc=channel_layout=stereo:sample_rate=44100');
  const filters = [];
  files.forEach((_, i) => filters.push(`[${i}:v]scale=${W}:${H},setsar=1,format=yuv420p,fps=30[v${i}]`));
  let last = 'v0';
  let offset = 0;
  for (let i = 1; i < files.length; i++) {
    offset += durs[i - 1] - FADE;
    const out = i === files.length - 1 ? 'vout' : `x${i}`;
    filters.push(`[${last}][v${i}]xfade=transition=fade:duration=${FADE}:offset=${offset.toFixed(2)}[${out}]`);
    last = out;
  }
  const audio = files.length; // index of the silent audio input
  args.push('-filter_complex', filters.join(';'), '-map', '[vout]', '-map', `${audio}:a`, '-shortest');
  args.push('-c:v', 'libx264', '-preset', 'medium', '-crf', '20', '-pix_fmt', 'yuv420p', '-c:a', 'aac', '-b:a', '128k', '-movflags', '+faststart');
  const mp4 = join(dir, `${video.slug}.mp4`);
  args.push(mp4);
  execFileSync(ffmpeg, args, { stdio: ['ignore', 'ignore', 'pipe'] });
  await writeFile(join(dir, 'caption.txt'), `${video.caption}\n`);
  console.log(`✓ ${video.slug}: ${files.length} slides, ${durs.reduce((a, b) => a + b, 0) - FADE * (files.length - 1)}s → ${mp4}`);
}

const only = process.argv[2];
for (const v of VIDEOS.filter((v) => !only || v.slug === only)) await renderVideo(v);
