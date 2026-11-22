import { Suspense } from 'react';
import { connection } from 'next/server';
import { ExternalLink, LogOut } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { adminConfigured, isAdmin } from '@/lib/admin-auth';
import { formatDateTime } from '@/lib/i18n';
import { adminDb } from '@/lib/supabase';
import { logout, setPublishing, setSourceActive, unpublishStory } from './actions';
import { LoginForm } from './login-form';

type ReviewRow = {
  id: string;
  slug: string | null;
  status: string;
  category: string | null;
  sensitivity: string;
  skip_reason: string | null;
  summary_updated_at: string | null;
  recheck: boolean;
  fb_post_id: string | null;
  published_at: string | null;
  updated_at: string;
  summaries: { lang: string; headline: string; summary: string; why_it_matters: string | null; model: string }[];
  articles: { title: string; removed_at: string | null; sources: { name: string } | null }[];
};

function philippineDate(): string {
  return new Date(Date.now() + 8 * 3_600_000).toISOString().slice(0, 10);
}

// Data loading lives outside the component so "now" is read once per request.
async function loadDashboard() {
  await connection(); // per-request data: never prerender
  const db = adminDb();
  const since = new Date(Date.now() - 24 * 3_600_000).toISOString();
  return Promise.all([
    db.from('settings').select('value').eq('key', 'publishing_enabled').maybeSingle(),
    db.from('ai_usage').select('provider, calls').eq('day', philippineDate()),
    db.from('pipeline_runs').select('step, started_at, ok, stats').order('started_at', { ascending: false }).limit(6),
    db
      .from('stories')
      .select(
        'id, slug, status, category, sensitivity, skip_reason, published_at, updated_at, summary_updated_at, recheck, fb_post_id, summaries(lang, headline, summary, why_it_matters, model), articles(title, removed_at, sources(name))',
      )
      .in('status', ['published', 'skipped', 'unpublished'])
      .gte('updated_at', since)
      .order('updated_at', { ascending: false })
      .limit(80),
    db.from('sources').select('id, name, slug, tier, active, last_fetched_at, last_error').order('name'),
    db.from('stories').select('id', { count: 'exact', head: true }).eq('status', 'pending'),
  ]);
}

async function Dashboard() {
  const [settings, usage, runs, review, sources, pending] = await loadDashboard();

  const publishing = settings.data?.value !== false;
  const calls = (usage.data ?? []).reduce((n: number, r: { calls: number }) => n + r.calls, 0);
  const rows = (review.data ?? []) as unknown as ReviewRow[];
  const published = rows.filter((r) => r.status === 'published').length;

  return (
    <div className="mx-auto max-w-6xl space-y-10 px-4 py-8 sm:px-6">
      <header className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="font-serif text-3xl font-semibold">
            Ayuda<span className="text-primary">Watch</span> admin
          </h1>
          <p className="text-sm text-muted-foreground">Last 24 hours · times in PHT</p>
        </div>
        <form action={logout}>
          <Button variant="ghost" size="sm" type="submit">
            <LogOut aria-hidden /> Sign out
          </Button>
        </form>
      </header>

      {/* Status */}
      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-xl border border-border bg-card p-4">
          <p className="text-xs font-medium tracking-wide text-muted-foreground uppercase">Auto-publishing</p>
          <p className={`mt-1 text-2xl font-semibold ${publishing ? 'text-primary' : 'text-destructive'}`}>
            {publishing ? 'On' : 'Paused'}
          </p>
          <form action={setPublishing} className="mt-3">
            <input type="hidden" name="enabled" value={publishing ? 'false' : 'true'} />
            <Button type="submit" size="sm" variant={publishing ? 'destructive' : 'default'}>
              {publishing ? 'Pause all publishing' : 'Resume publishing'}
            </Button>
          </form>
        </div>
        <div className="rounded-xl border border-border bg-card p-4">
          <p className="text-xs font-medium tracking-wide text-muted-foreground uppercase">Published (24h)</p>
          <p className="mt-1 text-2xl font-semibold">{published}</p>
          <p className="mt-1 text-sm text-muted-foreground">{rows.length - published} skipped/removed</p>
        </div>
        <div className="rounded-xl border border-border bg-card p-4">
          <p className="text-xs font-medium tracking-wide text-muted-foreground uppercase">AI calls today</p>
          <p className="mt-1 text-2xl font-semibold">{calls}</p>
          <p className="mt-1 text-sm text-muted-foreground">
            {(usage.data ?? []).map((u: { provider: string; calls: number }) => `${u.provider}: ${u.calls}`).join(' · ') || '—'}
          </p>
        </div>
        <div className="rounded-xl border border-border bg-card p-4">
          <p className="text-xs font-medium tracking-wide text-muted-foreground uppercase">Waiting</p>
          <p className="mt-1 text-2xl font-semibold">{pending.count ?? 0}</p>
          <p className="mt-1 text-sm text-muted-foreground">pending stories (most single-outlet)</p>
        </div>
      </section>

      {/* Review log */}
      <section>
        <h2 className="font-serif text-2xl font-semibold">Review log</h2>
        <p className="text-sm text-muted-foreground">
          Spot-check the English and Filipino. Unpublishing removes the story and adds a public note to Corrections.
        </p>
        <ul className="mt-4 divide-y divide-border rounded-xl border border-border bg-card">
          {rows.length === 0 && <li className="p-4 text-sm text-muted-foreground">Nothing in the last 24 hours.</li>}
          {rows.map((r) => {
            const en = r.summaries.find((s) => s.lang === 'en');
            const fil = r.summaries.find((s) => s.lang === 'fil');
            const outlets = new Set(r.articles.map((a) => a.sources?.name)).size;
            return (
              <li key={r.id} className="p-4">
                <div className="flex flex-wrap items-center gap-2 text-xs">
                  <Badge variant={r.status === 'published' ? 'default' : r.status === 'unpublished' ? 'destructive' : 'secondary'}>
                    {r.status}
                  </Badge>
                  {r.category && <Badge variant="outline">{r.category}</Badge>}
                  {r.sensitivity !== 'normal' && <Badge variant="outline">{r.sensitivity}</Badge>}
                  {r.summary_updated_at && <Badge variant="outline">updated {formatDateTime(r.summary_updated_at, 'en')}</Badge>}
                  {r.recheck && <Badge variant="destructive">re-check pending</Badge>}
                  {r.fb_post_id && <Badge variant="outline">on Facebook</Badge>}
                  {r.articles.some((a) => a.removed_at) && <Badge variant="destructive">source withdrawn</Badge>}
                  <span className="text-muted-foreground">{outlets} outlets</span>
                  <span className="text-muted-foreground">{formatDateTime(r.published_at ?? r.updated_at, 'en')}</span>
                  {en?.model && <span className="text-muted-foreground">{en.model}</span>}
                </div>

                {en ? (
                  <details className="group mt-2">
                    <summary className="cursor-pointer list-none">
                      <span className="font-serif text-lg font-semibold">{en.headline}</span>
                      {fil && <span className="block text-muted-foreground">{fil.headline}</span>}
                    </summary>
                    <div className="mt-3 grid gap-4 text-sm leading-relaxed md:grid-cols-2">
                      <div>
                        <p className="font-medium">EN</p>
                        <p>{en.summary}</p>
                        <p className="mt-2 text-muted-foreground">Why: {en.why_it_matters}</p>
                      </div>
                      {fil && (
                        <div>
                          <p className="font-medium">FIL</p>
                          <p>{fil.summary}</p>
                          <p className="mt-2 text-muted-foreground">Bakit: {fil.why_it_matters}</p>
                        </div>
                      )}
                    </div>
                  </details>
                ) : (
                  <>
                    <p className="mt-2 font-serif text-lg font-semibold text-muted-foreground">
                      {r.articles[0]?.title ?? 'Untitled'} <span className="font-sans text-xs font-normal">(outlet headline)</span>
                    </p>
                    <p className="text-sm text-muted-foreground">{r.skip_reason ?? 'No summary'}</p>
                  </>
                )}
                {en && r.skip_reason && <p className="mt-1 text-sm text-muted-foreground">Skipped: {r.skip_reason}</p>}

                {r.status === 'published' && (
                  <div className="mt-3 flex flex-wrap items-center gap-2">
                    {r.slug && (
                      <a
                        href={`/en/story/${r.slug}`}
                        target="_blank"
                        rel="noopener"
                        className="inline-flex items-center gap-1 text-sm text-primary hover:underline"
                      >
                        View <ExternalLink className="size-3.5" aria-hidden />
                      </a>
                    )}
                    <form action={unpublishStory} className="flex flex-1 flex-wrap items-center gap-2">
                      <input type="hidden" name="storyId" value={r.id} />
                      <Input
                        name="note"
                        placeholder="Public correction note (e.g. wrong figure in summary)"
                        className="h-8 max-w-md flex-1"
                        aria-label="Correction note"
                      />
                      <Button type="submit" size="sm" variant="destructive">
                        Unpublish
                      </Button>
                    </form>
                  </div>
                )}
              </li>
            );
          })}
        </ul>
      </section>

      {/* Pipeline runs + sources */}
      <section className="grid gap-8 lg:grid-cols-2">
        <div>
          <h2 className="font-serif text-2xl font-semibold">Sources</h2>
          <ul className="mt-4 divide-y divide-border rounded-xl border border-border bg-card">
            {(sources.data ?? []).map(
              (s: { id: string; name: string; tier: number; active: boolean; last_fetched_at: string | null; last_error: string | null }) => (
                <li key={s.id} className="flex items-center justify-between gap-3 p-3">
                  <div className="min-w-0">
                    <p className="font-medium">
                      {s.name} <span className="text-xs text-muted-foreground">tier {s.tier}</span>
                    </p>
                    <p className="truncate text-xs text-muted-foreground">
                      {s.last_error
                        ? `Error: ${s.last_error}`
                        : s.last_fetched_at
                          ? `Read ${formatDateTime(s.last_fetched_at, 'en')}`
                          : 'Never read'}
                    </p>
                  </div>
                  <form action={setSourceActive}>
                    <input type="hidden" name="sourceId" value={s.id} />
                    <input type="hidden" name="active" value={s.active ? 'false' : 'true'} />
                    <Button type="submit" size="sm" variant={s.active ? 'outline' : 'default'}>
                      {s.active ? 'Turn off' : 'Turn on'}
                    </Button>
                  </form>
                </li>
              ),
            )}
          </ul>
        </div>
        <div>
          <h2 className="font-serif text-2xl font-semibold">Recent pipeline runs</h2>
          <ul className="mt-4 divide-y divide-border rounded-xl border border-border bg-card text-sm">
            {(runs.data ?? []).map((r: { step: string; started_at: string; ok: boolean | null; stats: Record<string, unknown> | null }, i: number) => (
              <li key={i} className="p-3">
                <p className="font-medium">
                  {r.step}{' '}
                  <Badge variant={r.ok === false ? 'destructive' : 'secondary'}>{r.ok === null ? 'running' : r.ok ? 'ok' : 'problem'}</Badge>
                </p>
                <p className="text-xs text-muted-foreground">{formatDateTime(r.started_at, 'en')}</p>
                {r.stats && (
                  <p className="mt-1 font-mono text-xs break-all text-muted-foreground">
                    {Object.entries(r.stats)
                      .filter(([, v]) => v !== 0 && v !== false)
                      .map(([k, v]) => `${k}: ${v}`)
                      .join(' · ')}
                  </p>
                )}
              </li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
}

async function AdminGate() {
  if (!adminConfigured()) {
    return (
      <div className="mx-auto mt-24 max-w-md rounded-xl border border-border bg-card p-6 text-sm">
        <h1 className="font-serif text-2xl font-semibold">Admin not set up</h1>
        <p className="mt-2 text-muted-foreground">
          Set an <code>ADMIN_PASSWORD</code> environment variable (at least 12 characters) to enable the admin page.
        </p>
      </div>
    );
  }
  if (!(await isAdmin())) return <LoginForm />;
  return <Dashboard />;
}

export default function AdminPage() {
  return (
    <Suspense fallback={<p className="p-8 text-sm text-muted-foreground">Loading…</p>}>
      <AdminGate />
    </Suspense>
  );
}
