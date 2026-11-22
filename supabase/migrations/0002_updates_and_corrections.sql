-- Buod Daily — week 4: story updates and automatic corrections
-- Run once in Supabase: Dashboard > SQL Editor > paste > Run. Safe to run twice.

-- Stories
alter table stories add column if not exists summarized_outlets integer not null default 0;
  -- how many outlets the current summary was written from; more outlets later = refresh it
alter table stories add column if not exists summary_updated_at timestamptz;
  -- set when a published summary is rewritten (shown as "Updated" on the site)
alter table stories add column if not exists recheck boolean not null default false;
  -- a source article was corrected or withdrawn: re-verify before keeping the story up

-- Articles
alter table articles add column if not exists removed_at timestamptz;
  -- the outlet took the article down (HTTP 404/410); it no longer counts as a source
alter table articles add column if not exists checked_at timestamptz;
  -- last time we checked the article link still works

create index if not exists stories_published_recent_idx on stories (status, published_at desc);
create index if not exists articles_checked_idx on articles (checked_at nulls first);

-- Existing published stories: record how many outlets they were summarized from.
update stories s
set summarized_outlets = sub.outlets
from (
  select story_id, count(distinct source_id) as outlets
  from articles
  where story_id is not null
  group by story_id
) sub
where s.id = sub.story_id and s.status = 'published' and s.summarized_outlets = 0;
