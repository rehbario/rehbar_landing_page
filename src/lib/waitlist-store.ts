import "server-only";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";

export type WaitlistRecord = {
  name: string;
  phone: string;
  city: string;
  education: string;
  source?: string | null;
  utm?: Record<string, string> | null;
  userAgent?: string | null;
};

export type StoreResult =
  | { ok: true }
  | { ok: false; error: "not_configured" | "db_error"; message?: string };

let cached: SupabaseClient | null = null;

function getClient(): SupabaseClient | null {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) return null;
  if (!cached) {
    cached = createClient(url, key, { auth: { persistSession: false } });
  }
  return cached;
}

export function isConfigured(): boolean {
  return Boolean(process.env.SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY);
}

/**
 * Upsert by phone: a resubmission enriches the existing row (keeps original
 * created_at) rather than erroring — so we "collect more and more data".
 */
export async function saveWaitlistEntry(
  rec: WaitlistRecord,
): Promise<StoreResult> {
  const supabase = getClient();
  if (!supabase) return { ok: false, error: "not_configured" };

  const { error } = await supabase.from("rehbar_waiting_list").upsert(
    {
      full_name: rec.name,
      phone: rec.phone,
      city: rec.city,
      education_status: rec.education,
      source: rec.source ?? null,
      utm: rec.utm ?? null,
      user_agent: rec.userAgent ?? null,
    },
    { onConflict: "phone" },
  );

  if (error) return { ok: false, error: "db_error", message: error.message };
  return { ok: true };
}
