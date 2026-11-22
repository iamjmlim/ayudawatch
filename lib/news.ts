import { cacheLife, cacheTag } from 'next/cache';
import { publicDb } from './supabase';
import type { CategorySlug, Locale } from './i18n';

// Cached reads for the public site. New stories arrive every ~30 minutes;
// the pipeline also calls /api/revalidate, which refreshes the "stories" tag.

export type StorySource = { outlet: string; outletSlug: string; title: string; url: string; publishedAt: string };

export type Story = {
  id: string;
  slug: string;
  category: CategorySlug | null;
  sensitivity: 'normal' | 'sensitive' | 'election';
  publishedAt: string;
  updatedAt: string;
  summaryUpdatedAt: string | null; // set when the summary was rewritten after publishing
  headline: string;
  summary: string;
  whyItMatters: string | null;
  lang: Locale; // language actually shown (falls back to English)
  sources: StorySource[];
};

type Row = {
  id: string;
  slug: string;
  category: string | null;
  sensitivity: Story['sensitivity'];
  published_at: string;
  updated_at: string;
  summary_updated_at: string | null;
  summaries: { lang: Locale; headline: string; summary: string; why_it_matters: string | null }[];
  articles: {
    url: string;
    title: string;
    published_at: string;
    removed_at: string | null;
    sources: { name: string; slug: string } | null;
  }[];
};

const SELECT =
  'id, slug, category, sensitivity, published_at, updated_at, summary_updated_at, ' +
  'summaries(lang, headline, summary, why_it_matters), ' +
  'articles(url, title, published_at, removed_at, sources(name, slug))';

function toStory(row: Row, locale: Locale): Story | null {
  const summary = row.summaries.find((s) => s.lang === locale) ?? row.summaries.find((s) => s.lang === 'en');
  if (!summary) return null;

  // One link per outlet (its newest article), newest outlets first.
  const byOutlet = new Map<string, StorySource>();
  // Articles the outlet has taken down are not shown as sources.
  const live = row.articles.filter((a) => !a.removed_at);
  for (const a of [...live].sort((x, y) => y.published_at.localeCompare(x.published_at))) {
    const outletSlug = a.sources?.name ?? new URL(a.url).hostname; // one row per outlet, not per feed
    if (byOutlet.has(outletSlug)) continue;
    byOutlet.set(outletSlug, {
      outlet: a.sources?.name ?? new URL(a.url).hostname,
      outletSlug,
      title: a.title,
      url: a.url,
      publishedAt: a.published_at,
    });
  }

  return {
    id: row.id,
    slug: row.slug,
    category: (row.category as CategorySlug | null) ?? null,
    sensitivity: row.sensitivity,
    publishedAt: row.published_at,
    updatedAt: row.updated_at,
    summaryUpdatedAt: row.summary_updated_at,
    headline: summary.headline,
    summary: summary.summary,
    whyItMatters: summary.why_it_matters,
    lang: summary.lang,
    sources: [...byOutlet.values()],
  };
}

export async function getLatestStories(locale: Locale, category?: CategorySlug, limit = 40): Promise<Story[]> {
  'use cache';
  cacheLife({ stale: 300, revalidate: 600, expire: 86400 });
  cacheTag('stories');

  let query = publicDb()
    .from('stories')
    .select(SELECT)
    .eq('status', 'published')
    .order('published_at', { ascending: false })
    .limit(limit);
  if (category) query = query.eq('category', category);

  const { data, error } = await query;
  if (error) throw new Error(`Loading stories failed: ${error.message}`);
  return ((data ?? []) as unknown as Row[]).map((r) => toStory(r, locale)).filter((s): s is Story => s !== null);
}

// Sections that have at least one story among the latest ~80, newest-first.
// Used to hide section tabs that would only lead to an empty page.
export async function getActiveCategories(): Promise<CategorySlug[]> {
  'use cache';
  cacheLife({ stale: 300, revalidate: 600, expire: 86400 });
  cacheTag('stories');

  const { data, error } = await publicDb()
    .from('stories')
    .select('category')
    .eq('status', 'published')
    .not('category', 'is', null)
    .order('published_at', { ascending: false })
    .limit(80);
  if (error) throw new Error(`Loading sections failed: ${error.message}`);
  return [...new Set((data ?? []).map((r: { category: string }) => r.category as CategorySlug))];
}

export async function getStory(slug: string, locale: Locale): Promise<Story | null> {
  'use cache';
  cacheLife({ stale: 300, revalidate: 600, expire: 86400 });
  cacheTag('stories', `story:${slug}`);

  const { data, error } = await publicDb()
    .from('stories')
    .select(SELECT)
    .eq('status', 'published')
    .eq('slug', slug)
    .maybeSingle();
  if (error) throw new Error(`Loading story failed: ${error.message}`);
  return data ? toStory(data as unknown as Row, locale) : null;
}

export async function getRecentSlugs(limit = 30): Promise<string[]> {
  'use cache';
  cacheLife({ stale: 300, revalidate: 600, expire: 86400 });
  cacheTag('stories');

  const { data, error } = await publicDb()
    .from('stories')
    .select('slug')
    .eq('status', 'published')
    .order('published_at', { ascending: false })
    .limit(limit);
  if (error) throw new Error(`Loading slugs failed: ${error.message}`);
  return (data ?? []).map((r: { slug: string }) => r.slug);
}

export type Correction = { note: string; createdAt: string; slug: string | null; headline: string | null };

export async function getCorrections(): Promise<Correction[]> {
  'use cache';
  cacheLife({ stale: 300, revalidate: 600, expire: 86400 });
  cacheTag('stories');

  const { data, error } = await publicDb()
    .from('corrections')
    .select('note, created_at, story_id')
    .order('created_at', { ascending: false })
    .limit(100);
  if (error) throw new Error(`Loading corrections failed: ${error.message}`);
  return (data ?? []).map((c: { note: string; created_at: string }) => ({
    note: c.note,
    createdAt: c.created_at,
    slug: null,
    headline: null,
  }));
}

export type SourceOutlet = { name: string; homepage: string };

export async function getActiveSources(): Promise<SourceOutlet[]> {
  'use cache';
  cacheLife('hours');

  const { data, error } = await publicDb().from('sources').select('name, homepage').eq('active', true).order('name');
  if (error) throw new Error(`Loading sources failed: ${error.message}`);
  // Several feeds can belong to one outlet: list each outlet once.
  const seen = new Set<string>();
  return ((data ?? []) as SourceOutlet[]).filter((s) => (seen.has(s.name) ? false : (seen.add(s.name), true)));
}
