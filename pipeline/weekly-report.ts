// Weekly AyudaWatch report: opens a GitHub issue (label "weekly-report") every Monday, which GitHub
// emails to the repo owner. Read-only: it changes nothing on the site or the Facebook Page.
//
//   npm run weekly-report             -> open the issue (needs GITHUB_TOKEN + GITHUB_REPOSITORY, set in Actions)
//   npm run weekly-report -- --print  -> print the report here instead
//
// Covers the 7 days before the run (Philippine time), compared with the 7 days before that.

import { check, getDb } from './lib/db.ts';

const PRINT = process.argv.includes('--print');
const REPO = process.env.GITHUB_REPOSITORY;
const GH_TOKEN = process.env.GITHUB_TOKEN;
const PAGE_ID = process.env.FB_PAGE_ID;
const FB_TOKEN = process.env.FB_PAGE_TOKEN;
const OWNER = (REPO ?? 'iamjmlim/ayudawatch').split('/')[0];
const LABEL = 'weekly-report';
const DAY = 86_400_000;
const PHT = 8 * 3_600_000;

const db = getDb();

const phDate = (ms: number) => new Date(ms + PHT).toISOString().slice(0, 10);
const fmt = (iso: string) => new Intl.DateTimeFormat('en-PH', { timeZone: 'UTC', month: 'short', day: 'numeric' }).format(new Date(`${iso}T00:00:00Z`));
const change = (now: number, before: number) => (before === 0 ? (now > 0 ? 'new' : '–') : `${now >= before ? '+' : ''}${Math.round(((now - before) / before) * 100)}%`);

async function count(table: string, column: string, from: string, to: string, extra?: (q: any) => any) {
  let q = db.from(table).select('id', { count: 'exact', head: true }).gte(column, from).lt(column, to);
  if (extra) q = extra(q);
  const { count: n, error } = await q;
  if (error) throw new Error(`${table}: ${error.message}`);
  return n ?? 0;
}

async function calculatorUses(fromDay: string, toDay: string) {
  const rows = check(await db.from('calculator_uses').select('slug, uses').gte('day', fromDay).lt('day', toDay), 'calculator uses') as {
    slug: string;
    uses: number;
  }[];
  const bySlug = new Map<string, number>();
  for (const r of rows) bySlug.set(r.slug, (bySlug.get(r.slug) ?? 0) + r.uses);
  return bySlug;
}

async function setting<T>(key: string): Promise<T | null> {
  const row = check(await db.from('settings').select('value').eq('key', key).maybeSingle(), key) as { value: T } | null;
  return row?.value ?? null;
}

async function fbGet(path: string): Promise<Record<string, any> | null> {
  if (!FB_TOKEN) return null;
  try {
    const res = await fetch(`https://graph.facebook.com/${path}${path.includes('?') ? '&' : '?'}access_token=${FB_TOKEN}`, { signal: AbortSignal.timeout(20_000) });
    const data = (await res.json()) as Record<string, any>;
    return res.ok && !data.error ? data : null;
  } catch {
    return null;
  }
}

async function github(path: string, init?: RequestInit) {
  const res = await fetch(`https://api.github.com/repos/${REPO}${path}`, {
    ...init,
    headers: { Authorization: `Bearer ${GH_TOKEN}`, Accept: 'application/vnd.github+json', 'Content-Type': 'application/json' },
  });
  if (!res.ok) throw new Error(`GitHub ${res.status}: ${await res.text()}`);
  return res.json();
}

async function failedRuns(since: string): Promise<string[]> {
  if (!REPO || !GH_TOKEN) return [];
  const data = (await github(`/actions/runs?status=failure&created=>=${since}&per_page=100`)) as { workflow_runs: { name: string }[] };
  const byName = new Map<string, number>();
  for (const r of data.workflow_runs) byName.set(r.name, (byName.get(r.name) ?? 0) + 1);
  return [...byName].map(([name, n]) => `${name}: ${n} failed run${n > 1 ? 's' : ''}`);
}

async function main() {
  const now = Date.now();
  const end = phDate(now); // today (PHT), not included
  const start = phDate(now - 7 * DAY);
  const prevStart = phDate(now - 14 * DAY);
  // Timestamps at Philippine midnight, in UTC.
  const at = (d: string) => new Date(Date.parse(`${d}T00:00:00Z`) - PHT).toISOString();

  const [published, publishedPrev, fbStories, uses, usesPrev] = await Promise.all([
    count('stories', 'published_at', at(start), at(end), (q) => q.eq('status', 'published')),
    count('stories', 'published_at', at(prevStart), at(start), (q) => q.eq('status', 'published')),
    count('stories', 'fb_posted_at', at(start), at(end)),
    calculatorUses(start, end),
    calculatorUses(prevStart, start),
  ]);
  const totalUses = [...uses.values()].reduce((a, b) => a + b, 0);
  const totalUsesPrev = [...usesPrev.values()].reduce((a, b) => a + b, 0);

  const guide = await setting<{ last_key?: string; last_posted_at?: string }>('fb_guide_state');
  const reels = await setting<{ posted?: string[]; last_posted_at?: string; last_video_id?: string }>('fb_reel_state');
  const special = await setting<{ posted?: string[]; last_posted_at?: string }>('fb_special_state');
  const inWeek = (iso?: string) => Boolean(iso && iso >= at(start) && iso < at(end));

  const page = PAGE_ID ? await fbGet(`${PAGE_ID}?fields=followers_count,fan_count`) : null;
  const reelInfo = reels?.last_video_id && inWeek(reels.last_posted_at) ? await fbGet(`${reels.last_video_id}?fields=views,permalink_url`) : null;
  const failures = await failedRuns(start).catch(() => ['(could not read workflow runs)']);

  const lines: string[] = [];
  lines.push(`@${OWNER} here is AyudaWatch's week, **${fmt(start)} – ${fmt(phDate(now - DAY))}** (Philippine time).`, '');

  lines.push('### Calculators', '');
  lines.push(`**${totalUses}** uses (${change(totalUses, totalUsesPrev)} vs the week before)`, '');
  if (uses.size) {
    lines.push('| Calculator | Uses | Week before |', '|---|---:|---:|');
    for (const [slug, n] of [...uses].sort((a, b) => b[1] - a[1])) lines.push(`| ${slug} | ${n} | ${usesPrev.get(slug) ?? 0} |`);
    lines.push('');
  }

  lines.push('### Site', '');
  lines.push(`- Stories published: **${published}** (${change(published, publishedPrev)})`);
  lines.push('- Visits and top pages: see the Vercel dashboard (Analytics tab); Google searches: Search Console.', '');

  lines.push('### Facebook Page', '');
  if (page) lines.push(`- Followers: **${page.followers_count ?? page.fan_count ?? '?'}**`);
  lines.push(`- Story posts: **${fbStories}**`);
  if (inWeek(guide?.last_posted_at)) lines.push(`- Weekly guide/calculator post: ${guide?.last_key}`);
  if (inWeek(special?.last_posted_at)) lines.push(`- Special post: ${special?.posted?.at(-1)}`);
  if (inWeek(reels?.last_posted_at)) {
    const views = reelInfo?.views != null ? ` · ${reelInfo.views} views` : '';
    const link = reelInfo?.permalink_url ? ` · [open](https://www.facebook.com${reelInfo.permalink_url})` : '';
    lines.push(`- Reel: ${reels?.posted?.at(-1)}${views}${link}`);
  }
  lines.push('');

  lines.push('### Problems', '');
  lines.push(failures.length ? failures.map((f) => `- ⚠️ ${f}`).join('\n') : '- None: every scheduled job ran fine.', '');
  lines.push('_Automatic report. Read-only: nothing on the site or Page was changed. Close this issue once read (next week’s report closes it anyway)._');

  const title = `Weekly report: ${fmt(start)} – ${fmt(phDate(now - DAY))}`;
  const body = lines.join('\n');
  if (PRINT || !REPO || !GH_TOKEN) {
    console.log(`${title}\n\n${body}`);
    return;
  }
  // Close last week's report, then open this one.
  const open = (await github(`/issues?state=open&labels=${LABEL}&per_page=20`)) as { number: number }[];
  for (const i of open) await github(`/issues/${i.number}`, { method: 'PATCH', body: JSON.stringify({ state: 'closed' }) });
  const created = (await github('/issues', { method: 'POST', body: JSON.stringify({ title, body, labels: [LABEL] }) })) as { html_url: string };
  console.log(`Opened ${created.html_url}`);
}

main().catch((err) => {
  console.error(err instanceof Error ? err.message : err);
  process.exitCode = 1;
});
