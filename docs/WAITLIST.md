# Waitlist setup (Supabase)

The waitlist collects **Name, Phone, City, Education** and stores rows in a
Supabase Postgres table. The landing page stays fully static; only the
`POST /api/waitlist` route is dynamic.

## 1. Create the table
In your Supabase project → **SQL Editor**, run [`supabase/schema.sql`](../supabase/schema.sql).

## 2. Add environment variables
From Supabase → **Project Settings → API**, copy the project URL and the
**`service_role`** key (secret — bypasses Row Level Security).

Local — create `.env.local` (gitignored; see [`.env.example`](../.env.example)):

```
SUPABASE_URL=https://YOUR-PROJECT.supabase.co
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
```

Production (Vercel) — **Settings → Environment Variables** → add both for
Production + Preview, then redeploy. Restart `npm run dev` after editing env.

> If the keys are missing the form fails gracefully (HTTP 503) and shows
> "Could not save right now."

## 3. View / export leads
Supabase → **Table Editor → rehbar_waiting_list** (sortable, filterable, CSV
export), or query in the SQL editor, e.g. segment by city/education:

```sql
select city, education_status, count(*)
from public.rehbar_waiting_list group by 1, 2 order by 3 desc;
```

## How it behaves
- **Phone** is normalized to `+92…` and the column is `unique`; a resubmission
  **upserts** (enriches the existing row) instead of erroring.
- **Spam:** hidden honeypot field + a best-effort in-memory rate limit
  (6 / minute / IP). For multi-instance hosting, back the limiter with Upstash
  Redis, or add Cloudflare Turnstile.
- **Consent** is required server-side; `created_at` is the consent timestamp.
- Each row records `source` (hero / header / final / inline) and any UTM params.

## Where to change things
- **Fields, education options, cities, all copy:** [`src/content/copy.ts`](../src/content/copy.ts) (`copy.waitlist`).
- **Validation / rate limit / phone format:** [`src/app/api/waitlist/route.ts`](../src/app/api/waitlist/route.ts).
- **Storage:** [`src/lib/waitlist-store.ts`](../src/lib/waitlist-store.ts) — swap this one
  file to move to Airtable/another backend; nothing else changes.
- **Placement:** `<WaitlistCta source="…">` opens the modal; `<WaitlistSection/>`
  is the inline form after the Journey demo.
