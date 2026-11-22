-- Buod Daily — initial schema
-- Run once in Supabase: Dashboard > SQL Editor > paste > Run.

create extension if not exists pgcrypto;

-- News outlets we read from. `active` and `tier` are edited from the admin page.
create table if not exists sources (
  id              uuid primary key default gen_random_uuid(),
  slug            text not null unique,          -- e.g. 'gma'
  name            text not null,
  feed_url        text not null unique,
  homepage        text not null,
  tier            smallint not null default 2 check (tier in (1, 2)),  -- 1 = wire/official
  language        text not null default 'en',
  active          boolean not null default true,
  last_fetched_at timestamptz,
  last_error      text,
  etag            text,                          -- lets us skip unchanged feeds
  last_modified   text,
  created_at      timestamptz not null default now()
);

-- A real-world news event; groups articles from different outlets.
create table if not exists stories (
  id            uuid primary key default gen_random_uuid(),
  slug          text unique,                      -- set when published
  category      text,
  importance    real not null default 0,
  sensitivity   text not null default 'normal' check (sensitivity in ('normal', 'sensitive', 'election')),
  status        text not null default 'pending'
                check (status in ('pending', 'skipped', 'published', 'unpublished')),
  skip_reason   text,
  first_seen_at timestamptz not null default now(),
  updated_at    timestamptz not null default now(),
  published_at  timestamptz
);
create index if not exists stories_status_idx on stories (status, first_seen_at desc);

-- One row per outlet article. We keep only metadata + the feed's own snippet,
-- never the full article text.
create table if not exists articles (
  id            uuid primary key default gen_random_uuid(),
  source_id     uuid not null references sources (id) on delete cascade,
  story_id      uuid references stories (id) on delete set null,
  url           text not null,
  canonical_url text not null unique,             -- dedupe key
  title         text not null,
  snippet       text,
  published_at  timestamptz,
  fetched_at    timestamptz not null default now()
);
create index if not exists articles_story_idx on articles (story_id);
create index if not exists articles_recent_idx on articles (published_at desc);

-- Our own AI-written text, one row per language.
create table if not exists summaries (
  id             uuid primary key default gen_random_uuid(),
  story_id       uuid not null references stories (id) on delete cascade,
  lang           text not null check (lang in ('en', 'fil')),
  headline       text not null,
  summary        text not null,
  why_it_matters text,
  model          text not null,
  prompt_version text not null,
  created_at     timestamptz not null default now(),
  unique (story_id, lang)
);

create table if not exists quality_checks (
  id         uuid primary key default gen_random_uuid(),
  story_id   uuid not null references stories (id) on delete cascade,
  check_name text not null,
  passed     boolean not null,
  details    text,
  created_at timestamptz not null default now()
);

create table if not exists corrections (
  id         uuid primary key default gen_random_uuid(),
  story_id   uuid not null references stories (id) on delete cascade,
  note       text not null,
  created_at timestamptz not null default now()
);

-- Key/value switches, e.g. the auto-publish kill switch.
create table if not exists settings (
  key   text primary key,
  value jsonb not null
);
insert into settings (key, value) values ('publishing_enabled', 'true')
on conflict (key) do nothing;

-- Daily AI call counter, used to stay inside free-tier limits.
create table if not exists ai_usage (
  day      date not null,
  provider text not null,
  calls    integer not null default 0,
  primary key (day, provider)
);

-- One row per pipeline run, for the health dashboard.
create table if not exists pipeline_runs (
  id          uuid primary key default gen_random_uuid(),
  step        text not null,
  started_at  timestamptz not null default now(),
  finished_at timestamptz,
  ok          boolean,
  stats       jsonb
);

-- Row Level Security: the public site may read only published content.
-- The pipeline uses the service-role key, which bypasses RLS.
alter table sources        enable row level security;
alter table stories        enable row level security;
alter table articles       enable row level security;
alter table summaries      enable row level security;
alter table quality_checks enable row level security;
alter table corrections    enable row level security;
alter table settings       enable row level security;
alter table ai_usage       enable row level security;
alter table pipeline_runs  enable row level security;

create policy "public reads published stories" on stories
  for select using (status = 'published');

create policy "public reads summaries of published stories" on summaries
  for select using (exists (
    select 1 from stories s where s.id = summaries.story_id and s.status = 'published'));

create policy "public reads articles of published stories" on articles
  for select using (exists (
    select 1 from stories s where s.id = articles.story_id and s.status = 'published'));

create policy "public reads sources" on sources for select using (true);

create policy "public reads corrections" on corrections for select using (true);
