// Daily email digest: the day's top benefits and aid updates,
// sent once a day through Buttondown after 7:00 AM Philippine time.
// Runs inside the every-30-minutes pipeline and remembers the last send date.
//
//   npm run digest                -> send if due
//   npm run digest -- --dry-run   -> print the email, send nothing
//   npm run digest -- --draft     -> create it as a Buttondown draft (for testing)
//
// Settings (env):
//   BUTTONDOWN_API_KEY      required; without it this step does nothing
//   SITE_URL                public site address used in links
//   DIGEST_HOUR=7           earliest send hour, Philippine time
//   DIGEST_STORIES=5        stories per email
//   DIGEST_SEND_STATUS=about_to_send   Buttondown status that sends immediately

import { check, getDb } from './lib/db.ts';
import { firstSentences } from '../lib/excerpt.ts';

const DRY_RUN = process.argv.includes('--dry-run');
const DRAFT = process.argv.includes('--draft');
const API_KEY = process.env.BUTTONDOWN_API_KEY;
const SITE_URL = (process.env.SITE_URL || 'https://ayudawatch.vercel.app').replace(/\/$/, '');
const DIGEST_HOUR = Number(process.env.DIGEST_HOUR ?? 7);
const STORY_COUNT = Number(process.env.DIGEST_STORIES ?? 5);
const SEND_STATUS = process.env.DIGEST_SEND_STATUS || 'about_to_send';
const MIN_STORIES = Number(process.env.DIGEST_MIN_STORIES ?? 2); // benefits news is slower than general news

const db = getDb();

function philippineNow() {
  const ph = new Date(Date.now() + 8 * 3_600_000);
  return { date: ph.toISOString().slice(0, 10), hour: ph.getUTCHours() };
}

function filDate(isoDay: string): string {
  return new Intl.DateTimeFormat('fil-PH', {
    timeZone: 'UTC',
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  }).format(new Date(`${isoDay}T00:00:00Z`));
}

type Row = {
  slug: string;
  published_at: string;
  summaries: { lang: string; headline: string; summary: string }[];
  articles: { removed_at: string | null; sources: { name: string } | null }[];
};

async function getSetting(key: string): Promise<unknown> {
  const row = check(await db.from('settings').select('value').eq('key', key).maybeSingle(), `read ${key}`) as {
    value: unknown;
  } | null;
  return row?.value ?? null;
}

async function main() {
  if (!API_KEY && !DRY_RUN) {
    console.log('Digest not configured (BUTTONDOWN_API_KEY missing). Skipping.');
    return;
  }
  if ((await getSetting('publishing_enabled')) === false) {
    console.log('Publishing is paused (kill switch). No digest.');
    return;
  }

  const { date, hour } = philippineNow();
  const lastSent = await getSetting('digest_last_sent');
  if (!DRY_RUN && !DRAFT) {
    if (hour < DIGEST_HOUR) return console.log(`Digest waits until ${DIGEST_HOUR}:00 PHT (now ${hour}:00).`);
    if (lastSent === date) return console.log(`Digest already sent today (${date}).`);
  }

  // Top stories of the last 24 hours: most outlets first, then newest.
  const since = new Date(Date.now() - 24 * 3_600_000).toISOString();
  const rows = check(
    await db
      .from('stories')
      .select('slug, published_at, summaries(lang, headline, summary), articles(removed_at, sources(name))')
      .eq('status', 'published')
      .gte('published_at', since)
      .limit(60),
    'load stories',
  ) as unknown as Row[];

  const ranked = rows
    .map((r) => ({
      r,
      outlets: [...new Set(r.articles.filter((a) => !a.removed_at).map((a) => a.sources?.name).filter(Boolean))] as string[],
    }))
    .filter((x) => x.r.summaries.some((s) => s.lang === 'fil'))
    .sort((a, b) => b.outlets.length - a.outlets.length || b.r.published_at.localeCompare(a.r.published_at))
    .slice(0, STORY_COUNT);

  if (ranked.length < MIN_STORIES) {
    console.log(`Only ${ranked.length} stories in the last 24h; skipping today's digest.`);
    return;
  }

  // Filipino first, with the English headline underneath for bilingual readers.
  const items = ranked.map(({ r, outlets }, i) => {
    const fil = r.summaries.find((s) => s.lang === 'fil')!;
    const en = r.summaries.find((s) => s.lang === 'en');
    return [
      `## ${i + 1}. ${fil.headline}`,
      en ? `*${en.headline}*` : '',
      '',
      firstSentences(fil.summary, 2),
      '',
      `Iniulat ng ${outlets.length} outlet: ${outlets.join(', ')} · [Basahin ang buod](${SITE_URL}/fil/story/${r.slug}) · [Read in English](${SITE_URL}/en/story/${r.slug})`,
    ]
      .filter((line, idx) => idx !== 1 || line)
      .join('\n');
  });

  const subject = `AyudaWatch: ${ranked[0].r.summaries.find((s) => s.lang === 'fil')!.headline}`;
  const body = [
    // Tells Buttondown this body is Markdown; without it the editor shows raw ## and [links](…).
    '<!-- buttondown-editor-mode: plaintext -->',
    '',
    `Magandang umaga! Narito ang ${ranked.length} pinakamahalagang update sa ayuda at benepisyo ngayong ${filDate(date)}. Paalala: hindi kami ahensya ng gobyerno; laging kumpirmahin sa opisyal na website ng ahensya.`,
    '',
    items.join('\n\n---\n\n'),
    '',
    '---',
    '',
    `Isinulat ng AI ang mga buod na ito mula sa mga ulat ng mga news outlet, at may link sa bawat orihinal. [Paano ito gumagana](${SITE_URL}/fil/about) · [Mga gabay](${SITE_URL}/fil/guides) · [Buong update sa AyudaWatch](${SITE_URL}/fil)`,
  ].join('\n');

  console.log(`Subject: ${subject}\n\n${body}\n`);
  if (DRY_RUN) return console.log('DRY RUN: nothing sent.');

  const res = await fetch('https://api.buttondown.com/v1/emails', {
    method: 'POST',
    headers: {
      Authorization: `Token ${API_KEY}`,
      'Content-Type': 'application/json',
      // Buttondown's one-time confirmation that this API key may send emails (drafts don't need it).
      ...(DRAFT ? {} : { 'X-Buttondown-Live-Dangerously': 'true' }),
    },
    body: JSON.stringify({ subject, body, status: DRAFT ? 'draft' : SEND_STATUS }),
    signal: AbortSignal.timeout(30_000),
  });
  const text = await res.text();
  if (!res.ok) {
    console.error(`Buttondown ${res.status}: ${text.slice(0, 500)}`);
    process.exitCode = 1; // a failed send needs attention (key, plan, or API change)
    return;
  }
  const data = JSON.parse(text) as { id?: string; status?: string };
  console.log(`Buttondown accepted: id=${data.id} status=${data.status}`);
  if (!DRAFT) {
    check(await db.from('settings').upsert({ key: 'digest_last_sent', value: date }), 'record send');
  }
}

main().catch((err) => {
  console.error(err);
  process.exitCode = 1;
});
