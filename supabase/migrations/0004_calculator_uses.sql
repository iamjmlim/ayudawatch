-- Anonymous calculator usage counts: one row per calculator per day (Philippine time).
-- No personal data: only the calculator's slug, the date and a number.

create table if not exists calculator_uses (
  slug text not null,
  day  date not null,
  uses integer not null default 0,
  primary key (slug, day)
);

-- Locked down: no direct reads or writes with the publishable key.
alter table calculator_uses enable row level security;

-- The only way in for the public site: add one use for a calculator today.
create or replace function count_calculator_use(p_slug text)
returns void
language sql
security definer
set search_path = public
as $$
  insert into calculator_uses (slug, day, uses)
  values (left(p_slug, 40), (now() at time zone 'Asia/Manila')::date, 1)
  on conflict (slug, day) do update set uses = calculator_uses.uses + 1;
$$;

revoke all on function count_calculator_use(text) from public;
grant execute on function count_calculator_use(text) to anon, authenticated;

-- Totals for the last 30 days, for ordering calculators by real use (read with the service role key).
create or replace view calculator_uses_30d as
  select slug, sum(uses)::integer as uses
  from calculator_uses
  where day >= (now() at time zone 'Asia/Manila')::date - 30
  group by slug
  order by uses desc;

revoke all on calculator_uses_30d from anon, authenticated;
