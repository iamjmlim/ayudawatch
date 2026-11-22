-- Buod Daily — Facebook Page auto-posting
-- Run once in Supabase: Dashboard > SQL Editor > paste > Run. Safe to run twice.

alter table stories add column if not exists fb_post_id text;
  -- id of the Facebook Page post for this story (null = not posted)
alter table stories add column if not exists fb_posted_at timestamptz;
alter table stories add column if not exists fb_removed_at timestamptz;
  -- set when the post was deleted because the story was unpublished

create index if not exists stories_fb_posted_idx on stories (fb_posted_at desc);
