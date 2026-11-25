// Posts newly published stories to the AyudaWatch Facebook Page, and removes
// posts whose story was later unpublished (corrections).
//
//   npm run facebook              -> post / remove for real
//   npm run facebook -- --dry-run -> print what it would post, touch nothing
//   npm run facebook -- --dry-run --guide -> preview the next weekly guide post
//
// Once a week (FB_GUIDE_DAY, default 1 = Monday, from FB_GUIDE_HOUR = 9 AM PHT)
// it posts one evergreen guide instead of a story, rotating through all guides.
//
// Settings (env):
//   FB_PAGE_ID, FB_PAGE_TOKEN   required; without them this step does nothing
//   SITE_URL                    public site address used in links
//   FB_DAILY_LIMIT=12           max posts per day (Philippine time)
//   FB_MIN_GAP_MINUTES=60       minimum time between posts
//   FB_LANG=fil                 post language (fil | en)

import { check, getDb } from './lib/db.ts';
import { firstSentences } from '../lib/excerpt.ts';
import { GUIDES } from '../lib/guides/index.ts';
import { CALCULATORS } from '../lib/calculators.ts';

const DRY_RUN = process.argv.includes('--dry-run');
const PAGE_ID = process.env.FB_PAGE_ID;
const TOKEN = process.env.FB_PAGE_TOKEN;
const SITE_URL = (process.env.SITE_URL || 'https://ayudawatch.com').replace(/\/$/, '');
const DAILY_LIMIT = Number(process.env.FB_DAILY_LIMIT ?? 12);
const MIN_GAP_MINUTES = Number(process.env.FB_MIN_GAP_MINUTES ?? 60);
const LANG = process.env.FB_LANG === 'en' ? 'en' : 'fil';
const FRESH_HOURS = 6; // only post stories published in the last 6 hours
const GUIDE_DAY = Number(process.env.FB_GUIDE_DAY ?? 1); // weekday for the weekly guide post, 0 = Sunday (Philippine time)
const GUIDE_HOUR = Number(process.env.FB_GUIDE_HOUR ?? 9); // earliest hour for it, Philippine time
const FORCE_GUIDE = process.argv.includes('--guide'); // with --dry-run: preview the next guide post now
const GRAPH = 'https://graph.facebook.com';

const db = getDb();

class FacebookError extends Error {
  readonly code: number | null;
  constructor(message: string, code: number | null) {
    super(message);
    this.code = code;
  }
  // 190 = token expired/invalid, 10/200-299 = missing permission: needs your attention.
  get needsAttention() {
    return this.code === 190 || this.code === 10 || (this.code !== null && this.code >= 200 && this.code < 300);
  }
}

async function graph(method: 'POST' | 'DELETE', path: string, params: Record<string, string>) {
  const body = new URLSearchParams({ ...params, access_token: TOKEN! });
  const res = await fetch(`${GRAPH}/${path}`, { method, body, signal: AbortSignal.timeout(30_000) });
  const data = (await res.json().catch(() => ({}))) as { id?: string; success?: boolean; error?: { message: string; code: number } };
  if (!res.ok || data.error) {
    throw new FacebookError(`Facebook ${res.status}: ${data.error?.message ?? 'unknown error'}`, data.error?.code ?? null);
  }
  return data;
}

function philippineDayStart(): string {
  const now = new Date();
  const ph = new Date(now.getTime() + 8 * 3_600_000);
  ph.setUTCHours(0, 0, 0, 0);
  return new Date(ph.getTime() - 8 * 3_600_000).toISOString();
}

type Row = {
  id: string;
  slug: string;
  importance: number;
  published_at: string;
  summaries: { lang: string; headline: string; summary: string }[];
  articles: { removed_at: string | null; sources: { name: string } | null }[];
};

function postText(row: Row): { message: string; link: string } | null {
  const s = row.summaries.find((x) => x.lang === LANG) ?? row.summaries.find((x) => x.lang === 'en');
  if (!s) return null;
  const outlets = [...new Set(row.articles.filter((a) => !a.removed_at).map((a) => a.sources?.name).filter(Boolean))];
  const n = outlets.length;
  const reported = LANG === 'fil' ? `Iniulat ng ${n} outlet: ${outlets.join(', ')}` : `Reported by ${n} outlets: ${outlets.join(', ')}`;
  const cta = LANG === 'fil' ? 'Basahin ang buod at ang mga orihinal na ulat:' : 'Read the summary and the original reports:';
  const link = `${SITE_URL}/${s.lang}/story/${row.slug}`;
  return { message: `${s.headline}\n\n${firstSentences(s.summary, 1)}\n\n${reported}\n\n${cta} ${link}`, link };
}

async function removeUnpublished(stats: { removed: number }) {
  const rows = check(
    await db
      .from('stories')
      .select('id, fb_post_id')
      .eq('status', 'unpublished')
      .not('fb_post_id', 'is', null)
      .is('fb_removed_at', null)
      .limit(10),
    'load unpublished posts',
  ) as { id: string; fb_post_id: string }[];
  for (const r of rows) {
    console.log(`✗ removing Facebook post ${r.fb_post_id} (story unpublished)`);
    if (DRY_RUN) continue;
    try {
      await graph('DELETE', r.fb_post_id, {});
    } catch (err) {
      // Already deleted by hand (code 100) is fine; anything else is re-thrown.
      if (!(err instanceof FacebookError && err.code === 100)) throw err;
    }
    check(await db.from('stories').update({ fb_removed_at: new Date().toISOString() }).eq('id', r.id), 'mark removed');
    stats.removed++;
  }
}

// ---------- weekly evergreen post ----------
// Once a week (default Monday from 9 AM Philippine time) one guide or calculator is
// posted instead of a news story. The rotation alternates guide, calculator, guide…
// and the last item posted is remembered in settings.fb_guide_state.

type GuideState = { last_key?: string; last_slug?: string; last_posted_at?: string; last_post_id?: string };

type Evergreen = { key: string; message: string; link: string };

function guideItem(guide: (typeof GUIDES)[number]): Evergreen {
  const { message, link } = guideText(guide);
  return { key: `guide:${guide.slug}`, message, link };
}

function calculatorItem(calc: (typeof CALCULATORS)[number]): Evergreen {
  const t = calc[LANG];
  const link = `${SITE_URL}/${LANG}/calculators/${calc.slug}`;
  const lines =
    LANG === 'fil'
      ? [`CALCULATOR: ${t.title}`, t.description, `Subukan nang libre: ${link}`, 'Tantiya lamang ito. Hindi ito website ng gobyerno; laging kumpirmahin sa opisyal na ahensya.']
      : [`CALCULATOR: ${t.title}`, t.description, `Try it free: ${link}`, 'Estimates only. Not a government website; always confirm with the official agency.'];
  return { key: `calc:${calc.slug}`, message: lines.join('\n\n'), link };
}

/** The "Philippine holidays <year>" page with its long weekends. */
function holidaysItem(year: string): Evergreen {
  const link = `${SITE_URL}/${LANG}/holidays/${year}`;
  const lines =
    LANG === 'fil'
      ? [
          `MGA HOLIDAY SA ${year}: kumpletong listahan at mga long weekend`,
          `Lahat ng regular holiday at special non-working day sa ${year} mula sa opisyal na proklamasyon, kasama ang mga long weekend na puwedeng planuhin at ang holiday pay rates.`,
          `Tingnan dito: ${link}`,
          'Hindi ito website ng gobyerno. Laging kumpirmahin sa opisyal na ahensya.',
        ]
      : [
          `PHILIPPINE HOLIDAYS ${year}: complete list and long weekends`,
          `Every ${year} regular holiday and special non-working day from the official proclamation, with the long weekends you can plan around and the holiday pay rates.`,
          `See the list: ${link}`,
          'Not a government website. Always confirm with the official agency.',
        ];
  return { key: `page:holidays-${year}`, message: lines.join('\n\n'), link };
}

/** Guides and calculators interleaved: G1, C1, G2, C2, … then the remaining guides.
 *  The holidays page follows the holiday pay calculator. */
function rotation(): Evergreen[] {
  const items: Evergreen[] = [];
  for (let i = 0; i < Math.max(GUIDES.length, CALCULATORS.length); i++) {
    if (GUIDES[i]) items.push(guideItem(GUIDES[i]));
    if (CALCULATORS[i]) items.push(calculatorItem(CALCULATORS[i]));
    if (CALCULATORS[i]?.slug === 'holiday-pay') items.push(holidaysItem('2027'));
  }
  return items;
}

// ---------- one-time seasonal posts ----------
// Extra evergreen posts on set dates (Philippine time), on top of the weekly one.
// Each is posted once; posted keys are remembered in settings.fb_special_state.
const SPECIAL_POSTS: { key: string; date: string; hour: number; item: () => Evergreen | undefined }[] = [
  {
    // 13th month pay is due by December 24; searches peak in late November.
    key: 'special:2026-11-27:thirteenth-month',
    date: '2026-11-27',
    hour: 11,
    item: () => {
      const calc = CALCULATORS.find((c) => c.slug === 'thirteenth-month');
      return calc && calculatorItem(calc);
    },
  },
];

type SpecialState = { posted?: string[]; last_posted_at?: string; last_post_id?: string };

async function getSpecialState(): Promise<SpecialState> {
  const row = check(
    await db.from('settings').select('value').eq('key', 'fb_special_state').maybeSingle(),
    'read special post state',
  ) as { value: SpecialState } | null;
  return row?.value ?? {};
}

/** The special post due now (its date, from its hour, Philippine time) that was not posted yet. */
function dueSpecial(state: SpecialState) {
  const ph = new Date(Date.now() + 8 * 3_600_000);
  const today = ph.toISOString().slice(0, 10);
  return SPECIAL_POSTS.find((s) => s.date === today && ph.getUTCHours() >= s.hour && !(state.posted ?? []).includes(s.key));
}

function nextItem(state: GuideState): Evergreen {
  const items = rotation();
  const lastKey = state.last_key ?? (state.last_slug ? `guide:${state.last_slug}` : undefined);
  const i = items.findIndex((it) => it.key === lastKey);
  return items[(i + 1) % items.length]; // i = -1 (none yet) starts at the first item
}

async function getGuideState(): Promise<GuideState> {
  const row = check(
    await db.from('settings').select('value').eq('key', 'fb_guide_state').maybeSingle(),
    'read guide state',
  ) as { value: GuideState } | null;
  return row?.value ?? {};
}

function guideIsDue(state: GuideState): boolean {
  if (FORCE_GUIDE) return true;
  const ph = new Date(Date.now() + 8 * 3_600_000);
  if (ph.getUTCDay() !== GUIDE_DAY || ph.getUTCHours() < GUIDE_HOUR) return false;
  const last = state.last_posted_at ? Date.parse(state.last_posted_at) : 0;
  return Date.now() - last > 6 * 24 * 3_600_000; // at most once a week
}

function guideText(guide: (typeof GUIDES)[number]): { message: string; link: string } {
  const t = guide[LANG];
  const link = `${SITE_URL}/${LANG}/guides/${guide.slug}`;
  const lines =
    LANG === 'fil'
      ? [`GABAY: ${t.title}`, t.description, `Basahin ang buong gabay: ${link}`, 'Hindi ito website ng gobyerno. Laging kumpirmahin sa opisyal na ahensya.']
      : [`GUIDE: ${t.title}`, t.description, `Read the full guide: ${link}`, 'Not a government website. Always confirm with the official agency.'];
  return { message: lines.join('\n\n'), link };
}

async function main() {
  if ((!PAGE_ID || !TOKEN) && !DRY_RUN) {
    console.log('Facebook not configured (FB_PAGE_ID / FB_PAGE_TOKEN missing). Skipping.');
    return;
  }
  const settings = check(
    await db.from('settings').select('value').eq('key', 'publishing_enabled').maybeSingle(),
    'read settings',
  ) as { value: unknown } | null;
  if (settings && settings.value === false) {
    console.log('Publishing is paused (kill switch). Not posting.');
    return;
  }

  const stats = { posted: 0, removed: 0, postedToday: 0, reason: '' };
  await removeUnpublished(stats);

  // Daily cap and minimum gap between posts.
  const today = check(
    await db.from('stories').select('fb_posted_at').gte('fb_posted_at', philippineDayStart()).order('fb_posted_at', { ascending: false }),
    'count today posts',
  ) as { fb_posted_at: string }[];
  const last = check(
    await db.from('stories').select('fb_posted_at').not('fb_posted_at', 'is', null).order('fb_posted_at', { ascending: false }).limit(1),
    'last post',
  ) as { fb_posted_at: string }[];
  // Guide and special posts count toward the same daily cap and gap as news posts.
  const guideState = await getGuideState();
  const specialState = await getSpecialState();
  const guideAt = guideState.last_posted_at ?? null;
  const specialAt = specialState.last_posted_at ?? null;
  const dayStart = philippineDayStart();
  const postedToday = today.length + (guideAt && guideAt >= dayStart ? 1 : 0) + (specialAt && specialAt >= dayStart ? 1 : 0);
  stats.postedToday = postedToday;
  const lastAt = [last[0]?.fb_posted_at, guideAt, specialAt].filter(Boolean).map((d) => Date.parse(d!));
  const minutesSinceLast = lastAt.length ? (Date.now() - Math.max(...lastAt)) / 60_000 : Infinity;

  if (postedToday >= DAILY_LIMIT) stats.reason = `daily limit reached (${postedToday}/${DAILY_LIMIT})`;
  else if (minutesSinceLast < MIN_GAP_MINUTES) stats.reason = `last post ${Math.round(minutesSinceLast)} min ago (gap ${MIN_GAP_MINUTES})`;

  const special = stats.reason ? undefined : dueSpecial(specialState);
  const specialPost = special?.item();
  if (special && specialPost) {
    console.log(`✓ SPECIAL POST (${special.key}):\n${specialPost.message.replace(/^/gm, '   ')}\n`);
    if (!DRY_RUN) {
      const res = await graph('POST', `${PAGE_ID}/feed`, { message: specialPost.message, link: specialPost.link });
      const value = { posted: [...(specialState.posted ?? []), special.key], last_posted_at: new Date().toISOString(), last_post_id: res.id };
      check(await db.from('settings').upsert({ key: 'fb_special_state', value }), 'save special post state');
      console.log(`   posted: ${res.id}`);
    }
    stats.posted++;
    stats.reason = 'special post posted';
  }

  if (!stats.reason && GUIDES.length + CALCULATORS.length > 0 && guideIsDue(guideState)) {
    const post = nextItem(guideState);
    console.log(`✓ WEEKLY POST (${post.key}):\n${post.message.replace(/^/gm, '   ')}\n`);
    if (!DRY_RUN) {
      const res = await graph('POST', `${PAGE_ID}/feed`, { message: post.message, link: post.link });
      const value: GuideState = { last_key: post.key, last_posted_at: new Date().toISOString(), last_post_id: res.id };
      check(await db.from('settings').upsert({ key: 'fb_guide_state', value }), 'save guide state');
      console.log(`   posted: ${res.id}`);
    }
    stats.posted++;
    stats.reason = 'weekly guide or calculator posted';
  }

  if (!stats.reason) {
    const since = new Date(Date.now() - FRESH_HOURS * 3_600_000).toISOString();
    const candidates = check(
      await db
        .from('stories')
        .select('id, slug, importance, published_at, summaries(lang, headline, summary), articles(removed_at, sources(name))')
        .eq('status', 'published')
        .is('fb_post_id', null)
        .gte('published_at', since)
        .order('importance', { ascending: false })
        .limit(10),
      'load stories to post',
    ) as unknown as Row[];

    // Best-sourced first, same rule as the site's Top stories.
    const ranked = candidates
      .map((r) => ({ r, outlets: new Set(r.articles.filter((a) => !a.removed_at).map((a) => a.sources?.name)).size }))
      .sort((a, b) => b.outlets - a.outlets || b.r.published_at.localeCompare(a.r.published_at));

    const pick = ranked[0]?.r;
    const post = pick ? postText(pick) : null;
    if (!pick || !post) {
      stats.reason = 'no new stories to post';
    } else {
      console.log(`✓ POST (${ranked[0].outlets} outlets):\n${post.message.replace(/^/gm, '   ')}\n`);
      if (!DRY_RUN) {
        const res = await graph('POST', `${PAGE_ID}/feed`, { message: post.message, link: post.link });
        check(
          await db.from('stories').update({ fb_post_id: res.id, fb_posted_at: new Date().toISOString() }).eq('id', pick.id),
          'save post id',
        );
        console.log(`   posted: ${res.id}`);
      }
      stats.posted++;
    }
  }
  console.log(`${DRY_RUN ? 'DRY RUN. ' : ''}Done:`, stats);
}

main().catch((err) => {
  console.error(err instanceof Error ? err.message : err);
  // Token or permission problems need you; anything else is retried next run.
  process.exitCode = err instanceof FacebookError && !err.needsAttention ? 0 : 1;
});
