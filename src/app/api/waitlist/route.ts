import { NextResponse } from "next/server";
import { copy } from "@/content/copy";
import { saveWaitlistEntry } from "@/lib/waitlist-store";

export const runtime = "nodejs";

const EDUCATION = copy.waitlist.educationOptions as readonly string[];

// Best-effort in-memory rate limit (per warm instance). For production-grade
// limiting across instances, back this with Upstash Redis or similar.
const WINDOW_MS = 60_000;
const MAX_PER_WINDOW = 6;
const hits = new Map<string, { count: number; start: number }>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = hits.get(ip);
  if (!entry || now - entry.start > WINDOW_MS) {
    hits.set(ip, { count: 1, start: now });
    return false;
  }
  entry.count += 1;
  return entry.count > MAX_PER_WINDOW;
}

/** Normalize Pakistani mobile numbers to +92XXXXXXXXXX, else null. */
function normalizePhone(raw: string): string | null {
  let d = raw.replace(/[^\d+]/g, "").replace(/^\+/, "");
  if (d.startsWith("0092")) d = d.slice(4);
  else if (d.startsWith("92")) d = d.slice(2);
  else if (d.startsWith("0")) d = d.slice(1);
  return /^3\d{9}$/.test(d) ? `+92${d}` : null;
}

function cleanUtm(input: unknown): Record<string, string> | null {
  if (!input || typeof input !== "object") return null;
  const allowed = [
    "utm_source",
    "utm_medium",
    "utm_campaign",
    "utm_content",
    "utm_term",
  ];
  const out: Record<string, string> = {};
  for (const k of allowed) {
    const val = (input as Record<string, unknown>)[k];
    if (typeof val === "string" && val) out[k] = val.slice(0, 120);
  }
  return Object.keys(out).length ? out : null;
}

export async function POST(req: Request) {
  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    req.headers.get("x-real-ip") ||
    "unknown";

  if (isRateLimited(ip)) {
    return NextResponse.json(
      { error: "Too many attempts. Please wait a moment." },
      { status: 429 },
    );
  }

  let body: Record<string, unknown>;
  try {
    body = (await req.json()) as Record<string, unknown>;
  } catch {
    return NextResponse.json({ error: "Bad request." }, { status: 400 });
  }

  // Honeypot: real users never fill this. Pretend success, store nothing.
  if (typeof body.company === "string" && body.company.trim() !== "") {
    return NextResponse.json({ ok: true }, { status: 200 });
  }

  const name = String(body.name ?? "").trim();
  const city = String(body.city ?? "").trim();
  const education = String(body.education ?? "").trim();
  const consent = body.consent === true;
  const phone = normalizePhone(String(body.phone ?? "").trim());

  const errors: Record<string, string> = {};
  if (name.length < 2 || name.length > 80) errors.name = "Enter your name.";
  if (!phone) errors.phone = "Enter a valid Pakistani mobile number.";
  if (city.length < 2 || city.length > 80) errors.city = "Enter your city.";
  if (!EDUCATION.includes(education))
    errors.education = "Select your education level.";
  if (!consent) errors.consent = "Please accept to continue.";

  if (Object.keys(errors).length) {
    return NextResponse.json({ errors }, { status: 422 });
  }

  const result = await saveWaitlistEntry({
    name,
    phone: phone as string,
    city,
    education,
    source:
      typeof body.source === "string" ? body.source.slice(0, 40) : null,
    utm: cleanUtm(body.utm),
    userAgent: req.headers.get("user-agent"),
  });

  if (!result.ok) {
    if (result.error === "not_configured") {
      console.error(
        "[waitlist] Supabase not configured — check SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY in .env.local, then restart the server.",
      );
      return NextResponse.json(
        { error: "Could not save right now. Please try again." },
        { status: 503 },
      );
    }
    console.error("[waitlist] Supabase insert failed:", result.message);
    return NextResponse.json(
      { error: "Could not save right now. Please try again." },
      { status: 500 },
    );
  }

  return NextResponse.json({ ok: true }, { status: 200 });
}
