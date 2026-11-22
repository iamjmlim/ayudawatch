// Posts newly published stories to the AyudaWatch Facebook Page, and removes
// posts whose story was later unpublished (corrections).
//
//   npm run facebook              -> post / remove for real
//   npm run facebook -- --dry-run -> print what it would post, touch nothing
//
// Settings (env):
//   FB_PAGE_ID, FB_PAGE_TOKEN   required; without them this step does nothing
//   SITE_URL                    public site address used in links
//   FB_DAILY_LIMIT=12           max posts per day (Philippine time)
//   FB_MIN_GAP_MINUTES=60       minimum time between posts
//   FB_LANG=fil                 post language (fil | en)

import { check, getDb } from './lib/db.ts';
import { firstSentences } from '../lib/excerpt.ts';

const DRY_RUN = process.argv.includes('--dry-run');
const PAGE_ID = process.env.FB_PAGE_ID;
const TOKEN = process.env.FB_PAGE_TOKEN;
const SITE_URL = (process.env.SITE_URL || 'https://ayudawatch.vercel.app').replace(/\/$/, '');
const DAILY_LIMIT = Number(process.env.FB_DAILY_LIMIT ?? 12);
const MIN_GAP_MINUTES = Number(process.env.FB_MIN_GAP_MINUTES ?? 60);
const LANG = process.env.FB_LANG === 'en' ? 'en' : 'fil';
const FRESH_HOURS = 6; // only post stories published in the last 6 hours
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
  stats.postedToday = today.length;
  const last = check(
    await db.from('stories').select('fb_posted_at').not('fb_posted_at', 'is', null).order('fb_posted_at', { ascending: false }).limit(1),
    'last post',
  ) as { fb_posted_at: string }[];
  const minutesSinceLast = last[0] ? (Date.now() - Date.parse(last[0].fb_posted_at)) / 60_000 : Infinity;

  if (today.length >= DAILY_LIMIT) stats.reason = `daily limit reached (${today.length}/${DAILY_LIMIT})`;
  else if (minutesSinceLast < MIN_GAP_MINUTES) stats.reason = `last post ${Math.round(minutesSinceLast)} min ago (gap ${MIN_GAP_MINUTES})`;

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
