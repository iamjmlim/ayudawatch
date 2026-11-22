# AyudaWatch

*Benefits and aid news, made clear. · Balita sa ayuda at benepisyo, malinaw.*

Independent (**not a government website**) updates on Philippine government
benefits, aid programs, IDs and documents, school and work announcements,
holidays and government-set prices, in Filipino and English, each linked to
the official source. Built on the [Buod Daily](https://github.com/iamjmlim/Buod-Daily) engine.

## How it works

Every 30 minutes the pipeline:

1. **Collects** official announcements (DepEd and Official Gazette RSS, Philippine
   News Agency and PhilHealth news lists) and established PH news feeds, keeping
   only benefits topics (`pipeline/lib/topics.ts`).
2. **Groups** reports of the same event and **summarizes** them with AI in English
   and Filipino, with a "What it means for you / Para sa iyo" note grounded in the sources.
3. **Checks** every name, number and date against the sources, then auto-publishes:
   official announcements alone; news reports with 2+ outlets (3+ if sensitive).
4. **Re-checks** stories when sources are corrected or withdrawn.
5. Optionally posts to Facebook and sends a morning email digest.

## Setup (one time)

1. **Supabase**: create a free project; in SQL Editor run, in order,
   `supabase/migrations/0001_init.sql`, `0002_updates_and_corrections.sql`, `0003_facebook.sql`.
2. **Local**: copy `.env.example` to `.env.local`, fill in the values, then:
   ```bash
   npm install
   npm run ingest:dry      # read sources, print what would be stored
   npm run ingest          # store articles
   npm run summarize:dry   # print AI summaries, save nothing
   ```
3. **GitHub**: push to a **public** repo; add Actions secrets `SUPABASE_URL`,
   `SUPABASE_SERVICE_ROLE_KEY`, `GEMINI_API_KEY`, `GROQ_API_KEY`, `REVALIDATE_SECRET`
   (optional: `FB_PAGE_ID`, `FB_PAGE_TOKEN`, `BUTTONDOWN_API_KEY`) and variable `SITE_URL`.
4. **Vercel**: import the repo; set `SUPABASE_URL`, `SUPABASE_PUBLISHABLE_KEY`,
   `SUPABASE_SERVICE_ROLE_KEY`, `ADMIN_PASSWORD`, `REVALIDATE_SECRET`, `NEXT_PUBLIC_SITE_URL`.
5. **Schedule**: a cron-job.org job that triggers `.github/workflows/pipeline.yml`
   every 30 minutes (same as Buod Daily).

## Sections

Aid & subsidies · SSS & GSIS · PhilHealth · Pag-IBIG & housing · School · Work & wages ·
OFWs · IDs & documents · Taxes · Holidays · Prices & fares. Each section page lists
the official agency websites (`lib/agencies.ts`).
