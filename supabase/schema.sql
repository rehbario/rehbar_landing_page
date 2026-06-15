-- Rehbar waitlist — run once in the Supabase SQL editor.
-- (Supabase Postgres 15 has gen_random_uuid() built in; no extension needed.)

create table if not exists public.rehbar_waiting_list (
  id                uuid primary key default gen_random_uuid(),
  created_at        timestamptz not null default now(),
  full_name         text not null default '',
  phone             text not null unique,   -- unique → resubmits upsert/enrich, not error
  city              text,
  education_status  text,                   -- a label, e.g. "FSc Part I" (NOT numeric)
  source            text,                   -- placement: hero | header | final | inline
  utm               jsonb,                  -- utm_source/medium/campaign/content/term
  user_agent        text
);

-- REQUIRED: RLS on, NO policies. The app writes with the service-role key, which
-- bypasses RLS. Without this, the public anon key can read/write this PII table.
alter table public.rehbar_waiting_list enable row level security;

create index if not exists rehbar_waiting_list_created_at_idx
  on public.rehbar_waiting_list (created_at desc);
