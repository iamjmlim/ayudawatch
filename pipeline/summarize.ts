// Step 3-6 of the pipeline: for the most important pending stories, read the
// articles, ask the AI for an English + Filipino summary, run the quality gate,
// and auto-publish the ones that pass.
//
//   npm run summarize               -> summarize + publish
//   npm run summarize -- --dry-run  -> call the AI and print results, save nothing
//
// Settings (env vars, all optional except the provider key):
//   AI_PROVIDER=gemini|groq     AI_FALLBACK_PROVIDER=groq|gemini
//   AI_DAILY_LIMIT=100          max AI calls per day (Philippine time), all providers
//   STORIES_PER_RUN=6           stories handled per run
//   MIN_OUTLETS=2               outlets needed for a normal story (without a tier-1 source)

import { check, getDb } from './lib/db.ts';
import { fetchArticleText } from './lib/article.ts';
import { groundingChecks, meetsSourceRule, parseDraft, type CheckResult, type SummaryDraft } from './lib/gate.ts';
import { AiError, callProvider, configuredProviders, type AiResponse } from './ai/providers.ts';
import {
  buildUserPrompt,
  PROMPT_VERSION,
  SUMMARY_SYSTEM_PROMPT,
  type Sensitivity,
  type SourceForPrompt,
} from './ai/prompts.ts';

const DRY_RUN = process.argv.includes('--dry-run');
const DAILY_LIMIT = Number(process.env.AI_DAILY_LIMIT ?? 100);
const STORIES_PER_RUN = Number(process.env.STORIES_PER_RUN ?? 6);
const MIN_OUTLETS = Number(process.env.MIN_OUTLETS ?? 2);
const MAX_SOURCES_PER_STORY = 4;
const MAX_ATTEMPTS = 2; // first try + one automatic rewrite
const CANDIDATE_WINDOW_HOURS = 36;

const db = getDb();

type StoryRow = {
  id: string;
  status: 'pending' | 'published';
  importance: number;
  sensitivity: Sensitivity;
  summarized_outlets: number;
  recheck: boolean;
  articles: {
    title: string;
    snippet: string | null;
    url: string;
    published_at: string;
    removed_at: string | null;
    sources: { name: string; slug: string; tier: number } | null;
  }[];
};

const STORY_SELECT =
  'id, status, importance, sensitivity, summarized_outlets, recheck, ' +
  'articles(title, snippet, url, published_at, removed_at, sources(name, slug, tier))';

// Articles an outlet has taken down no longer count as sources.
function liveArticles(story: StoryRow) {
  return story.articles.filter((a) => !a.removed_at);
}

function outletInfo(story: StoryRow) {
  const tiers = new Map(liveArticles(story).map((a) => [a.sources?.name ?? a.url, a.sources?.tier ?? 2]));
  return { outlets: tiers.size, tier1: [...tiers.values()].filter((t) => t === 1).length };
}

function philippineDate(d = new Date()): string {
  return new Date(d.getTime() + 8 * 3_600_000).toISOString().slice(0, 10);
}

async function callsUsedToday(): Promise<number> {
  const rows = check(await db.from('ai_usage').select('calls').eq('day', philippineDate()), 'read ai usage') as {
    calls: number;
  }[];
  return rows.reduce((sum, r) => sum + r.calls, 0);
}

async function recordCall(provider: string) {
  if (DRY_RUN) return;
  const day = philippineDate();
  const existing = check(
    await db.from('ai_usage').select('calls').eq('day', day).eq('provider', provider).maybeSingle(),
    'read usage row',
  ) as { calls: number } | null;
  check(
    await db.from('ai_usage').upsert({ day, provider, calls: (existing?.calls ?? 0) + 1 }),
    'record ai call',
  );
}

// Stops the run. `fatal` = needs your attention (bad key, unknown model);
// otherwise it's temporary (limit reached, AI overloaded) and the next run retries.
class OutOfCalls extends Error {
  readonly fatal: boolean;
  constructor(message: string, fatal = false) {
    super(message);
    this.fatal = fatal;
  }
}

let callsLeft = 0;

// Calls the main provider, falling back to the backup on rate limits or outages.
async function askAi(user: string): Promise<AiResponse> {
  let lastError: unknown = null;
  for (const provider of configuredProviders()) {
    if (callsLeft <= 0) throw new OutOfCalls('Daily AI limit reached');
    try {
      callsLeft--;
      const res = await callProvider(provider, { system: SUMMARY_SYSTEM_PROMPT, user });
      await recordCall(provider);
      return res;
    } catch (err) {
      lastError = err;
      if (err instanceof AiError && err.status !== null) await recordCall(provider); // the request still counted
      console.warn(`   ${provider} failed: ${(err as Error).message.replace(/\s+/g, ' ').slice(0, 160)}`);
    }
  }
  if (lastError instanceof AiError && lastError.isRateLimit) throw new OutOfCalls('All AI providers are rate-limited');
  if (lastError instanceof AiError && lastError.isConfigError) {
    throw new OutOfCalls(`AI provider setup problem, fix it before the next run: ${lastError.message.slice(0, 200)}`, true);
  }
  throw lastError;
}

function slugify(headline: string, id: string): string {
  const base = headline
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
  // Cut at ~70 characters on a word boundary, never mid-word.
  const short = base.length <= 70 ? base : base.slice(0, 71).replace(/-[^-]*$/, '');
  return `${short}-${id.slice(0, 6)}`;
}

async function gatherSources(story: StoryRow): Promise<SourceForPrompt[]> {
  // One article per outlet (the newest), most important outlets first.
  const perOutlet = new Map<string, StoryRow['articles'][number]>();
  for (const a of [...liveArticles(story)].sort((x, y) => y.published_at.localeCompare(x.published_at))) {
    const slug = a.sources?.name ?? a.url; // one article per outlet, not per feed
    if (!perOutlet.has(slug)) perOutlet.set(slug, a);
  }
  const chosen = [...perOutlet.values()]
    .sort((x, y) => (x.sources?.tier ?? 2) - (y.sources?.tier ?? 2))
    .slice(0, MAX_SOURCES_PER_STORY);

  return Promise.all(
    chosen.map(async (a) => {
      const full = await fetchArticleText(a.url);
      return {
        outlet: a.sources?.name ?? 'Unknown outlet',
        title: a.title,
        text: full ?? a.snippet ?? a.title,
        isFullText: full !== null,
      };
    }),
  );
}

type Outcome =
  | { kind: 'published'; draft: SummaryDraft; model: string }
  | { kind: 'skipped'; reason: string; draft?: SummaryDraft };

async function processStory(story: StoryRow, outletInfo: { outlets: number; tier1: number }) {
  const sources = await gatherSources(story);
  const sourceText = sources.map((s) => `${s.title}\n${s.text}`).join('\n\n');
  const checks: CheckResult[] = [];
  let feedback: string | undefined;
  let outcome: Outcome | null = null;

  for (let attempt = 1; attempt <= MAX_ATTEMPTS && !outcome; attempt++) {
    const res = await askAi(buildUserPrompt(sources, feedback));
    const { draft, problems } = parseDraft(res.text);

    if (draft?.skip) {
      outcome = { kind: 'skipped', reason: `ai_skip: ${draft.skip_reason || 'not suitable'}` };
      break;
    }
    const grounding = draft && problems.length === 0 ? groundingChecks(draft, sourceText) : [];
    const failed = [...problems, ...grounding.filter((c) => !c.passed).map((c) => c.details!)];

    checks.push(
      { name: `attempt_${attempt}_format`, passed: problems.length === 0, details: problems.join(' ') || undefined },
      ...grounding.map((c) => ({ ...c, name: `attempt_${attempt}_${c.name}` })),
    );

    if (failed.length === 0 && draft) {
      outcome = meetsSourceRule(draft.sensitivity, outletInfo, MIN_OUTLETS)
        ? { kind: 'published', draft, model: `${res.provider}:${res.model}` }
        : { kind: 'skipped', reason: `needs_more_outlets: ${draft.sensitivity} story has ${outletInfo.outlets}`, draft };
    } else if (attempt === MAX_ATTEMPTS) {
      outcome = { kind: 'skipped', reason: `quality: ${failed.join(' | ')}`.slice(0, 500), draft };
    } else {
      feedback = failed.map((f) => `- ${f}`).join('\n');
    }
  }
  return { outcome: outcome!, checks, sources };
}

type WorkItem = {
  story: StoryRow;
  info: { outlets: number; tier1: number };
  kind: 'new' | 'refresh' | 'recheck';
};

async function addCorrection(storyId: string, note: string) {
  const { data } = await db.from('summaries').select('headline').eq('story_id', storyId).eq('lang', 'en').maybeSingle();
  const headline = data?.headline ? `“${data.headline}”` : 'A story';
  check(await db.from('corrections').insert({ story_id: storyId, note: `${headline} ${note}` }), 'add correction');
}

async function unpublish(storyId: string, reason: string) {
  await addCorrection(storyId, `was removed automatically: ${reason}.`);
  check(
    await db.from('stories').update({ status: 'unpublished', recheck: false, skip_reason: reason }).eq('id', storyId),
    'unpublish story',
  );
}

async function loadWork(): Promise<WorkItem[]> {
  const since = new Date(Date.now() - CANDIDATE_WINDOW_HOURS * 3_600_000).toISOString();

  const pending = check(
    await db
      .from('stories')
      .select(STORY_SELECT)
      .eq('status', 'pending')
      .gte('updated_at', since)
      .order('importance', { ascending: false })
      .limit(300),
    'load pending stories',
  ) as unknown as StoryRow[];

  // Published stories that got new outlets (ingest bumps updated_at) or were flagged for a re-check.
  const published = check(
    await db
      .from('stories')
      .select(STORY_SELECT)
      .eq('status', 'published')
      .or(`updated_at.gte.${since},recheck.eq.true`)
      .order('importance', { ascending: false })
      .limit(300),
    'load published stories',
  ) as unknown as StoryRow[];

  const rechecks: WorkItem[] = [];
  const rest: WorkItem[] = [];
  for (const story of published) {
    const info = outletInfo(story);
    if (story.recheck) rechecks.push({ story, info, kind: 'recheck' });
    else if (info.outlets > story.summarized_outlets) rest.push({ story, info, kind: 'refresh' });
  }
  for (const story of pending) {
    const info = outletInfo(story);
    if (info.tier1 >= 1 || info.outlets >= MIN_OUTLETS) rest.push({ story, info, kind: 'new' });
  }
  rest.sort((a, b) => b.story.importance - a.story.importance);

  console.log(
    `${pending.length} pending stories; work this run: ${rechecks.length} corrections to re-check, ` +
      `${rest.filter((w) => w.kind === 'refresh').length} published stories with new outlets, ` +
      `${rest.filter((w) => w.kind === 'new').length} new stories (need ${MIN_OUTLETS}+ outlets).\n`,
  );
  // Corrections always go first; they matter more than new stories.
  return [...rechecks, ...rest].slice(0, Math.max(STORIES_PER_RUN, rechecks.length));
}

async function main() {
  const settings = check(
    await db.from('settings').select('value').eq('key', 'publishing_enabled').maybeSingle(),
    'read settings',
  ) as { value: unknown } | null;
  if (settings && settings.value === false) {
    console.log('Publishing is paused (kill switch). Nothing to do.');
    return;
  }

  const used = await callsUsedToday();
  callsLeft = DAILY_LIMIT - used;
  console.log(`${DRY_RUN ? 'DRY RUN. ' : ''}AI calls today: ${used}/${DAILY_LIMIT}. Providers: ${configuredProviders().join(' -> ')}`);

  const work = await loadWork();

  const run = DRY_RUN
    ? null
    : (check(await db.from('pipeline_runs').insert({ step: 'summarize' }).select('id').single(), 'start run') as {
        id: string;
      });
  const stats = {
    work: work.length,
    published: 0,
    updated: 0,
    unpublished: 0,
    kept: 0, // refresh failed checks: the existing summary stays
    skipped: 0,
    errors: 0, // AI temporarily unavailable for a story (retried next run)
    bugs: 0, // anything else (database, code): needs attention
    stoppedEarly: false,
    needsAttention: false,
  };
  let failuresInARow = 0;

  for (const { story, info, kind } of work) {
    // If the AI keeps failing, stop and let the next scheduled run try again.
    if (failuresInARow >= 2) {
      console.log('Stopping: AI providers are unavailable right now; the next run will retry.');
      stats.stoppedEarly = true;
      break;
    }
    try {
      // A corrected/withdrawn source can leave too few outlets: remove without spending an AI call.
      if (kind === 'recheck' && !meetsSourceRule(story.sensitivity, info, MIN_OUTLETS)) {
        stats.unpublished++;
        console.log(`✗ UNPUBLISH (${info.outlets} outlets left): too few sources after a correction/withdrawal`);
        if (!DRY_RUN) {
          await unpublish(story.id, 'a source outlet withdrew or corrected its report, leaving too few sources');
        }
        continue;
      }
      if (callsLeft <= 0) {
        console.log('Daily AI limit reached; remaining stories wait for tomorrow.');
        stats.stoppedEarly = true;
        break;
      }

      const { outcome, checks, sources } = await processStory(story, info);
      failuresInARow = 0;
      const fullTexts = sources.filter((s) => s.isFullText).length;
      const label = `${kind}, ${info.outlets} outlets, ${fullTexts}/${sources.length} full texts`;

      if (outcome.kind === 'published') {
        const d = outcome.draft;
        console.log(`✓ ${kind === 'new' ? 'PUBLISH' : 'UPDATE'} [${d.category}/${d.sensitivity}] (${label})`);
        console.log(`   EN : ${d.headline_en}\n        ${d.summary_en}\n        Why: ${d.why_it_matters_en}`);
        console.log(`   FIL: ${d.headline_fil}\n        ${d.summary_fil}\n        Bakit: ${d.why_it_matters_fil}\n`);
      } else {
        console.log(`✗ ${kind === 'new' ? 'SKIP' : kind === 'recheck' ? 'UNPUBLISH' : 'KEEP OLD'} (${label}): ${outcome.reason}`);
        if (outcome.draft?.headline_en) console.log(`   draft: ${outcome.draft.headline_en}`);
        console.log('');
      }

      if (outcome.kind === 'published') {
        if (kind === 'new') stats.published++;
        else stats.updated++;
      } else if (kind === 'new') stats.skipped++;
      else if (kind === 'recheck') stats.unpublished++;
      else stats.kept++;
      if (DRY_RUN) continue;

      if (checks.length) {
        check(
          await db.from('quality_checks').insert(
            checks.map((c) => ({ story_id: story.id, check_name: c.name, passed: c.passed, details: c.details ?? null })),
          ),
          'save checks',
        );
      }

      if (outcome.kind === 'published') {
        const d = outcome.draft;
        const common = { story_id: story.id, model: outcome.model, prompt_version: PROMPT_VERSION };
        check(
          await db.from('summaries').upsert(
            [
              { ...common, lang: 'en', headline: d.headline_en, summary: d.summary_en, why_it_matters: d.why_it_matters_en },
              { ...common, lang: 'fil', headline: d.headline_fil, summary: d.summary_fil, why_it_matters: d.why_it_matters_fil },
            ],
            { onConflict: 'story_id,lang' },
          ),
          'save summaries',
        );
        const now = new Date().toISOString();
        check(
          await db
            .from('stories')
            .update({
              status: 'published',
              category: d.category,
              sensitivity: d.sensitivity,
              skip_reason: null,
              summarized_outlets: info.outlets,
              recheck: false,
              // New stories get a slug and publish time; refreshed ones keep theirs.
              ...(kind === 'new'
                ? { slug: slugify(d.headline_en, story.id), published_at: now }
                : { summary_updated_at: now }),
            })
            .eq('id', story.id),
          'save story',
        );
        if (kind === 'recheck') {
          await addCorrection(story.id, 'was rewritten after a source outlet corrected or withdrew its report.');
        }
      } else if (kind === 'new') {
        check(
          await db
            .from('stories')
            .update({
              status: 'skipped',
              skip_reason: outcome.reason,
              ...(outcome.draft?.category ? { category: outcome.draft.category } : {}),
              ...(outcome.draft?.sensitivity ? { sensitivity: outcome.draft.sensitivity } : {}),
            })
            .eq('id', story.id),
          'skip story',
        );
      } else if (kind === 'recheck') {
        await unpublish(story.id, 'a source outlet corrected or withdrew its report and the summary could not be re-verified');
      } else {
        // The refresh didn't pass; keep the published summary and don't retry for the same outlets.
        check(await db.from('stories').update({ summarized_outlets: info.outlets }).eq('id', story.id), 'keep story');
      }
    } catch (err) {
      if (err instanceof OutOfCalls) {
        console.log(`Stopping: ${err.message}.`);
        stats.stoppedEarly = true;
        if (err.fatal) stats.needsAttention = true;
        break;
      }
      if (err instanceof AiError) {
        stats.errors++;
        failuresInARow++;
      } else {
        stats.bugs++;
      }
      console.error(`! Error on story ${story.id}: ${(err as Error).message.replace(/\s+/g, ' ').slice(0, 200)}`);
    }
  }

  if (run) {
    await db
      .from('pipeline_runs')
      // "ok" means nothing needs your attention; a busy free AI tier is not a problem.
      .update({ finished_at: new Date().toISOString(), ok: !stats.needsAttention && stats.bugs === 0, stats })
      .eq('id', run.id);
  }
  console.log('Done:', stats);

  // Tell the website to refresh so changes show up right away.
  const siteUrl = process.env.SITE_URL;
  const secret = process.env.REVALIDATE_SECRET;
  const changed = stats.published + stats.updated + stats.unpublished;
  if (!DRY_RUN && changed > 0 && siteUrl && secret) {
    try {
      const res = await fetch(`${siteUrl.replace(/\/$/, '')}/api/revalidate`, {
        method: 'POST',
        headers: { 'x-revalidate-secret': secret },
        signal: AbortSignal.timeout(15_000),
      });
      console.log(`Website refresh: HTTP ${res.status}`);
    } catch (err) {
      console.warn(`Website refresh failed (pages will still update within ~10 min): ${(err as Error).message}`);
    }
  }
  // Fail the GitHub run (so you get an email) only when something needs fixing.
  // A busy free AI tier is normal: those stories simply wait for the next run.
  if (stats.needsAttention || stats.bugs > 0) process.exitCode = 1;
}

main().catch((err) => {
  console.error(err);
  process.exitCode = 1;
});
