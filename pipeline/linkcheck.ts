// Checks that the source articles behind recently published stories are still up.
// If an outlet takes an article down (HTTP 404 or 410), it no longer counts as a
// source and the story is flagged for a re-check by the summarize step.
//
//   npm run linkcheck

import { check, getDb } from './lib/db.ts';

const MAX_PER_RUN = 40;
const WINDOW_HOURS = 72; // only stories published in the last 3 days
const RECHECK_AFTER_HOURS = 3; // don't re-check the same link more often than this
const USER_AGENT = 'Mozilla/5.0 (compatible; AyudaWatch/0.1; link checker)';

type Row = { id: string; url: string; story_id: string; checked_at: string | null };

async function linkStatus(url: string): Promise<number | null> {
  try {
    const res = await fetch(url, {
      method: 'GET',
      headers: { 'User-Agent': USER_AGENT, Accept: 'text/html' },
      redirect: 'follow',
      signal: AbortSignal.timeout(15_000),
    });
    await res.body?.cancel(); // we only need the status
    return res.status;
  } catch {
    return null; // network trouble: say nothing, try again later
  }
}

async function main() {
  const db = getDb();
  const now = new Date();
  const since = new Date(now.getTime() - WINDOW_HOURS * 3_600_000).toISOString();
  const staleBefore = new Date(now.getTime() - RECHECK_AFTER_HOURS * 3_600_000).toISOString();

  const rows = check(
    await db
      .from('articles')
      .select('id, url, story_id, checked_at, stories!inner(status, published_at)')
      .eq('stories.status', 'published')
      .gte('stories.published_at', since)
      .is('removed_at', null)
      .or(`checked_at.is.null,checked_at.lt.${staleBefore}`)
      .order('checked_at', { ascending: true, nullsFirst: true })
      .limit(MAX_PER_RUN),
    'load articles to check',
  ) as unknown as Row[];

  const stats = { checked: 0, removed: 0, unreachable: 0 };
  const flagged = new Set<string>();

  for (const r of rows) {
    const status = await linkStatus(r.url);
    stats.checked++;
    if (status === 404 || status === 410) {
      stats.removed++;
      flagged.add(r.story_id);
      console.log(`✗ removed by outlet (${status}): ${r.url}`);
      check(
        await db.from('articles').update({ removed_at: now.toISOString(), checked_at: now.toISOString() }).eq('id', r.id),
        'mark removed',
      );
    } else {
      // 2xx, redirects, and also 403/5xx (bot blocking or outages) are not proof of removal.
      if (status === null || status >= 400) stats.unreachable++;
      check(await db.from('articles').update({ checked_at: now.toISOString() }).eq('id', r.id), 'mark checked');
    }
  }

  if (flagged.size) {
    check(await db.from('stories').update({ recheck: true }).in('id', [...flagged]), 'flag stories');
  }
  console.log('Done:', { ...stats, storiesFlagged: flagged.size });
}

main().catch((err) => {
  console.error(err);
  process.exitCode = 1;
});
