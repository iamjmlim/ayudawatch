# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

- **Filipinos on phones** checking on benefits and public services: SSS, PhilHealth, Pag-IBIG, DSWD aid, class suspensions, IDs, holidays.
- **OFWs and their families** following DMW/OWWA and home-country benefits.
- Job: find out quickly what changed, whether it applies to them, what to do, and where the official source is.

## Product Purpose

AyudaWatch (independent, **not a government website**) turns official announcements and news reports about government benefits, aid, IDs/documents, school and work announcements, holidays and government-set prices into short, clear updates in Filipino and English, each with a "What it means for you / Para sa iyo" note and links to the official source. Success: readers trust it as an accurate, fast place to check updates, and it earns passively through search traffic and ads.

## Positioning

Fast, accurate, bilingual benefits updates that always point to the official source; fact-checked against sources; clean pages without spammy ads. Never impersonates or speaks for an agency.

## Operating Context

- Built on the Buod Daily engine (pipeline every 30 minutes; auto-publishing; corrections automation; admin review log; Facebook and email digest steps, configured separately).
- Official tier-1 sources: DepEd (RSS), Official Gazette (RSS), Philippine News Agency (homepage list), PhilHealth (news list). Plus news feeds from established PH outlets, filtered to benefits topics.
- Blocked by bot challenges and not worked around: DOLE, DOH, LTO, DFA, PSA, CSC, CHED, PCO, NDRRMC.

## Capabilities and Constraints

- Same stack as Buod Daily: Next.js 16 + shadcn/ui on Vercel, Supabase, GitHub Actions + cron-job.org, Gemini with Groq backup. Free tiers until it earns.
- Never invent requirements, amounts, dates or steps; "Para sa iyo" uses only what sources state.
- Never ask for personal data, ID numbers or payments; never process applications.
- Undecided: custom domain, AdSense timing, evergreen how-to guides (to be verified against official pages one by one).

## Brand Commitments

- Name: **AyudaWatch**. Tagline: "Benefits and aid news, made clear." / "Balita sa ayuda at benepisyo, malinaw."
- "Not a government website" shown on every page.
- Voice: plain, calm, practical; clear everyday Filipino.

## Evidence on Hand

- No readership, testimonials or partnerships yet. Do not fabricate any.

## Product Principles

1. Accuracy first: official link on everything; never guess requirements.
2. Independence is explicit: never look or sound like an agency.
3. Practical: tell people what it means for them, when sources say so.
4. Equal Filipino and English.
5. Light and fast for cheap phones and slow data.

## Accessibility & Inclusion

- Works on older Android phones and slow mobile data; WCAG AA contrast; system light/dark.
