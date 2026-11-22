// Step 1+2 of the pipeline: read every active RSS feed, store new articles
// (skipping duplicates), then group articles about the same event into stories.
//
//   npm run ingest            -> reads feeds and writes to Supabase
//   npm run ingest -- --dry-run -> reads feeds and prints what it would store (no database needed)

import { SOURCES, type SourceConfig } from './sources.ts';
import { fetchFeed, fetchHtmlList, type FeedItem } from './lib/feeds.ts';
import { matchesTopic } from './lib/topics.ts';
import { CLUSTER_WINDOW_HOURS, importanceScore, isSameStory, similarity, titleTokens } from './lib/cluster.ts';
import { check, getDb } from './lib/db.ts';

const MAX_ITEM_AGE_HOURS = 48; // ignore older feed items
// Headline markers outlets use when they fix or pull a story (English and Filipino).
const CORRECTION_PATTERN = /\b(correction|corrected|clarification|retraction|retracted|erratum|pagtatama|itinama)\b/i;
const DRY_RUN = process.argv.includes('--dry-run');

type SourceRow = {
  id: string;
  slug: string;
  name: string;
  feed_url: string;
  tier: number;
  etag: string | null;
  last_modified: string | null;
};

type PoolArticle = {
  id: string;
  title: string;
  tokens: Set<string>;
  storyId: string | null;
  tier: number;
  sourceId: string;
  at: Date;
};

// Only articles about benefits, aid, IDs, school/work announcements and holidays.
function onTopic(item: FeedItem): boolean {
  return matchesTopic(`${item.title} ${item.snippet ?? ''} ${item.categories.join(' ')}`);
}

// Official sources post less often and stay relevant longer, so they get a
// 7-day window; news feeds keep the 48-hour window.
const OFFICIAL_MAX_AGE_HOURS = 7 * 24;
function isRecent(item: FeedItem, now: Date, tier = 2): boolean {
  if (!item.publishedAt) return true; // no date in feed: treat as new
  const maxAge = tier === 1 ? OFFICIAL_MAX_AGE_HOURS : MAX_ITEM_AGE_HOURS;
  return now.getTime() - item.publishedAt.getTime() <= maxAge * 3_600_000;
}

// Assigns each unclustered article to the most similar existing story, or a new one.
// Returns the story each article belongs to (new stories get ids from `newStoryId`).
function assignStories(
  pool: PoolArticle[],
  unclustered: PoolArticle[],
  newStoryId: () => string,
): Map<string, string> {
  const assigned = new Map<string, string>();
  const candidates = pool.filter((a) => a.storyId !== null);
  const sorted = [...unclustered].sort((a, b) => a.at.getTime() - b.at.getTime());

  for (const art of sorted) {
    let best: { storyId: string; jaccard: number } | null = null;
    for (const c of candidates) {
      if (Math.abs(c.at.getTime() - art.at.getTime()) > CLUSTER_WINDOW_HOURS * 3_600_000) continue;
      if (!isSameStory(art.tokens, c.tokens)) continue;
      const { jaccard } = similarity(art.tokens, c.tokens);
      if (!best || jaccard > best.jaccard) best = { storyId: c.storyId!, jaccard };
    }
    const storyId = best ? best.storyId : newStoryId();
    art.storyId = storyId;
    assigned.set(art.id, storyId);
    candidates.push(art);
  }
  return assigned;
}

async function fetchAll(sources: SourceConfig[] | SourceRow[]) {
  return Promise.all(
    sources.map(async (s) => {
      const feedUrl = 'feedUrl' in s ? s.feedUrl : s.feed_url;
      const cache = 'etag' in s ? { etag: s.etag, lastModified: s.last_modified } : {};
      // Some official sources are web pages, not feeds; their config lives in sources.ts.
      const config = SOURCES.find((c) => c.slug === s.slug);
      const result =
        config?.kind === 'html' && config.linkPattern
          ? await fetchHtmlList(feedUrl, config.linkPattern)
          : await fetchFeed(feedUrl, cache);
      return { source: s, result };
    }),
  );
}

async function dryRun() {
  const now = new Date();
  console.log(`DRY RUN: reading ${SOURCES.length} feeds, nothing is saved.\n`);
  const results = await fetchAll(SOURCES);

  const pool: PoolArticle[] = [];
  const seen = new Set<string>();
  for (const { source, result } of results) {
    const s = source as SourceConfig;
    if (result.status !== 'ok') {
      console.log(`✗ ${s.name.padEnd(24)} ${result.status === 'error' ? result.error : 'not modified'}`);
      continue;
    }
    const recent = result.items.filter((i) => isRecent(i, now, s.tier) && onTopic(i));
    let dupes = 0;
    for (const item of recent) {
      if (seen.has(item.canonicalUrl)) {
        dupes++;
        continue;
      }
      seen.add(item.canonicalUrl);
      pool.push({
        id: item.canonicalUrl,
        title: item.title,
        tokens: titleTokens(item.title),
        storyId: null,
        tier: s.tier,
        sourceId: s.name, // outlet name: several feeds can belong to one outlet
        at: item.publishedAt ?? now,
      });
    }
    const undated = result.items.filter((i) => !i.publishedAt).length;
    console.log(
      `✓ ${s.name.padEnd(24)} ${String(result.items.length).padStart(3)} items, ` +
        `${recent.length} from last ${MAX_ITEM_AGE_HOURS}h` +
        (dupes ? `, ${dupes} duplicate URLs` : '') +
        (undated ? `, ${undated} without date` : ''),
    );
    for (const item of recent.slice(0, 2)) console.log(`     · ${item.title}`);
  }

  let n = 0;
  const assigned = assignStories([], pool, () => `story-${++n}`);
  const byStory = new Map<string, PoolArticle[]>();
  for (const art of pool) {
    const sid = assigned.get(art.id)!;
    byStory.set(sid, [...(byStory.get(sid) ?? []), art]);
  }
  const multi = [...byStory.values()]
    .filter((arts) => new Set(arts.map((a) => a.sourceId)).size > 1)
    .map((arts) => ({
      arts,
      score: importanceScore(
        [...new Map(arts.map((a) => [a.sourceId, a.tier])).values()],
        new Date(Math.max(...arts.map((a) => a.at.getTime()))),
        now,
      ),
    }))
    .sort((a, b) => b.score - a.score);

  console.log(
    `\n${pool.length} unique articles -> ${byStory.size} stories; ` +
      `${multi.length} stories reported by 2+ outlets.\n`,
  );
  for (const { arts, score } of multi.slice(0, 10)) {
    console.log(`[importance ${score}]`);
    for (const a of arts) console.log(`   ${a.sourceId.padEnd(18)} ${a.title}`);
  }
}

async function run() {
  const db = getDb();
  const now = new Date();
  const run = check(
    await db.from('pipeline_runs').insert({ step: 'ingest' }).select('id').single(),
    'start run',
  ) as { id: string };

  // 1. Add any new sources from sources.ts (existing rows are left untouched).
  check(
    await db.from('sources').upsert(
      SOURCES.map((s) => ({
        slug: s.slug,
        name: s.name,
        feed_url: s.feedUrl,
        homepage: s.homepage,
        tier: s.tier,
        language: s.language,
      })),
      { onConflict: 'slug', ignoreDuplicates: true },
    ),
    'sync sources',
  );
  const sources = check(
    await db.from('sources').select('id, slug, name, feed_url, tier, etag, last_modified').eq('active', true),
    'load sources',
  ) as SourceRow[];

  // 2. Fetch feeds and insert new articles.
  const stats = {
    sources: sources.length,
    feedErrors: 0,
    notModified: 0,
    newArticles: 0,
    newStories: 0,
    joined: 0,
    retitled: 0,
    corrections: 0,
  };
  for (const { source, result } of await fetchAll(sources)) {
    const s = source as SourceRow;
    if (result.status === 'error') {
      stats.feedErrors++;
      console.warn(`✗ ${s.name}: ${result.error}`);
      await db.from('sources').update({ last_fetched_at: now.toISOString(), last_error: result.error }).eq('id', s.id);
      continue;
    }
    if (result.status === 'not-modified') {
      stats.notModified++;
      await db.from('sources').update({ last_fetched_at: now.toISOString(), last_error: null }).eq('id', s.id);
      continue;
    }

    const rows = result.items
      .filter((i) => isRecent(i, now, s.tier) && onTopic(i)) // AyudaWatch keeps only benefits topics
      .map((i) => ({
        source_id: s.id,
        url: i.url,
        canonical_url: i.canonicalUrl,
        title: i.title,
        snippet: i.snippet,
        published_at: (i.publishedAt ?? now).toISOString(),
      }));
    const inserted = rows.length
      ? (check(
          await db.from('articles').upsert(rows, { onConflict: 'canonical_url', ignoreDuplicates: true }).select('id'),
          `insert articles for ${s.slug}`,
        ) as { id: string }[])
      : [];
    stats.newArticles += inserted.length;

    // Outlets sometimes edit a headline to flag a correction or retraction.
    // Keep our copy of the title current, and re-check the story when that happens.
    const known = rows.length
      ? (check(
          await db
            .from('articles')
            .select('id, canonical_url, title, story_id')
            .in('canonical_url', rows.map((r) => r.canonical_url)),
          `load known articles for ${s.slug}`,
        ) as { id: string; canonical_url: string; title: string; story_id: string | null }[])
      : [];
    const newTitle = new Map(rows.map((r) => [r.canonical_url, r.title]));
    for (const a of known) {
      const title = newTitle.get(a.canonical_url);
      if (!title || title === a.title) continue;
      stats.retitled++;
      check(await db.from('articles').update({ title }).eq('id', a.id), 'update article title');
      if (a.story_id && CORRECTION_PATTERN.test(title) && !CORRECTION_PATTERN.test(a.title)) {
        stats.corrections++;
        console.log(`   ! correction flagged: "${title}"`);
        check(await db.from('stories').update({ recheck: true }).eq('id', a.story_id).eq('status', 'published'), 'flag recheck');
      }
    }
    console.log(`✓ ${s.name}: ${rows.length} recent, ${inserted.length} new`);

    await db
      .from('sources')
      .update({ last_fetched_at: now.toISOString(), last_error: null, etag: result.etag, last_modified: result.lastModified })
      .eq('id', s.id);
  }

  // 3. Cluster: put each new article into an existing or new story.
  const windowStart = new Date(now.getTime() - (CLUSTER_WINDOW_HOURS + MAX_ITEM_AGE_HOURS) * 3_600_000);
  const recent = check(
    await db
      .from('articles')
      .select('id, title, story_id, source_id, published_at, sources(tier, name)')
      .gte('published_at', windowStart.toISOString())
      .limit(5000),
    'load recent articles',
  ) as unknown as {
    id: string;
    title: string;
    story_id: string | null;
    source_id: string;
    published_at: string;
    sources: { tier: number; name: string } | null;
  }[];

  const pool: PoolArticle[] = recent.map((a) => ({
    id: a.id,
    title: a.title,
    tokens: titleTokens(a.title),
    storyId: a.story_id,
    tier: a.sources?.tier ?? 2,
    sourceId: a.sources?.name ?? a.source_id, // group by outlet, not by feed
    at: new Date(a.published_at),
  }));
  const unclustered = pool.filter((a) => a.storyId === null);

  const newStories: string[] = [];
  const assigned = assignStories(pool, unclustered, () => {
    const id = crypto.randomUUID();
    newStories.push(id);
    return id;
  });

  if (newStories.length) {
    const firstSeen = new Map<string, Date>();
    for (const a of unclustered) {
      const sid = assigned.get(a.id)!;
      if (!firstSeen.has(sid) || a.at < firstSeen.get(sid)!) firstSeen.set(sid, a.at);
    }
    check(
      await db.from('stories').insert(
        newStories.map((id) => ({ id, first_seen_at: (firstSeen.get(id) ?? now).toISOString() })),
      ),
      'create stories',
    );
  }
  stats.newStories = newStories.length;
  stats.joined = unclustered.length - newStories.length;

  // Group article updates by story to keep the number of requests small.
  const byStory = new Map<string, string[]>();
  for (const [articleId, storyId] of assigned) byStory.set(storyId, [...(byStory.get(storyId) ?? []), articleId]);
  for (const [storyId, articleIds] of byStory) {
    check(await db.from('articles').update({ story_id: storyId }).in('id', articleIds), 'link articles');
  }

  // A skipped story that gets new reports deserves another try (more outlets =
  // more source text), unless the AI judged it unsuitable (opinion, ads, ...).
  const joinedStories = [...byStory.keys()].filter((id) => !newStories.includes(id));
  if (joinedStories.length) {
    check(
      await db
        .from('stories')
        .update({ status: 'pending', skip_reason: null })
        .in('id', joinedStories)
        .eq('status', 'skipped')
        .not('skip_reason', 'like', 'ai_skip%'),
      'reopen skipped stories',
    );
  }

  // 4. Recompute importance for every story that changed.
  for (const storyId of byStory.keys()) {
    const arts = pool.filter((a) => a.storyId === storyId);
    const tiers = [...new Map(arts.map((a) => [a.sourceId, a.tier])).values()];
    const newest = new Date(Math.max(...arts.map((a) => a.at.getTime())));
    check(
      await db
        .from('stories')
        .update({ importance: importanceScore(tiers, newest, now), updated_at: now.toISOString() })
        .eq('id', storyId),
      'update importance',
    );
  }

  await db
    .from('pipeline_runs')
    .update({ finished_at: new Date().toISOString(), ok: stats.feedErrors < sources.length, stats })
    .eq('id', run.id);

  console.log('\nDone:', stats);
  if (sources.length > 0 && stats.feedErrors === sources.length) process.exitCode = 1;
}

(DRY_RUN ? dryRun() : run()).catch((err) => {
  console.error(err);
  process.exitCode = 1;
});
