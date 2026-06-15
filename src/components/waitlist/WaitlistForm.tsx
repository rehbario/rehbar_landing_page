"use client";

import { useState, type FormEvent } from "react";
import { copy } from "@/content/copy";
import { Button } from "@/components/ui/Button";
import { IconCheck } from "@/components/ui/icons";

const w = copy.waitlist;

function readUtm(): Record<string, string> | null {
  if (typeof window === "undefined") return null;
  const params = new URLSearchParams(window.location.search);
  const utm: Record<string, string> = {};
  for (const k of [
    "utm_source",
    "utm_medium",
    "utm_campaign",
    "utm_content",
    "utm_term",
  ]) {
    const v = params.get(k);
    if (v) utm[k] = v;
  }
  return Object.keys(utm).length ? utm : null;
}

export function WaitlistForm({
  source = "cta",
  onSuccess,
}: {
  source?: string;
  onSuccess?: () => void;
}) {
  const [status, setStatus] = useState<
    "idle" | "submitting" | "success" | "error"
  >("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [serverError, setServerError] = useState("");

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setErrors({});
    setServerError("");
    setStatus("submitting");

    const fd = new FormData(e.currentTarget);
    const payload = {
      name: String(fd.get("name") ?? ""),
      phone: String(fd.get("phone") ?? ""),
      city: String(fd.get("city") ?? ""),
      education: String(fd.get("education") ?? ""),
      consent: fd.get("consent") === "on",
      company: String(fd.get("company") ?? ""), // honeypot
      source,
      utm: readUtm(),
    };

    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (res.ok) {
        setStatus("success");
        onSuccess?.();
        return;
      }
      if (res.status === 422) {
        const data = (await res.json()) as { errors?: Record<string, string> };
        setErrors(data.errors ?? {});
        setStatus("idle");
        return;
      }
      const data = (await res.json().catch(() => ({}))) as { error?: string };
      setServerError(data.error ?? w.errorBody);
      setStatus("error");
    } catch {
      setServerError(w.errorBody);
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="flex flex-col items-center gap-3 py-8 text-center">
        <div className="grid size-12 place-items-center rounded-full bg-accent text-white">
          <IconCheck className="size-6" />
        </div>
        <p className="text-lg font-bold text-primary">{w.successTitle}</p>
        <p className="max-w-xs text-sm text-muted">{w.successBody}</p>
      </div>
    );
  }

  const submitting = status === "submitting";

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-3.5">
      {/* honeypot — hidden from users & a11y tree */}
      <input
        type="text"
        name="company"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="pointer-events-none absolute -left-[9999px] h-0 w-0 opacity-0"
      />

      <div>
        <label htmlFor="wl-name" className="mb-1 block text-sm font-medium text-fg">
          {w.fields.name}
        </label>
        <input
          id="wl-name"
          name="name"
          required
          autoComplete="name"
          placeholder="Ayesha Khan"
          aria-invalid={Boolean(errors.name)}
          aria-describedby={errors.name ? "wl-name-err" : undefined}
          className="input"
        />
        {errors.name && (
          <p id="wl-name-err" className="mt-1 text-xs text-red-600">
            {errors.name}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="wl-phone" className="mb-1 block text-sm font-medium text-fg">
          {w.fields.phone}
        </label>
        <input
          id="wl-phone"
          name="phone"
          type="tel"
          inputMode="tel"
          required
          autoComplete="tel"
          placeholder="03XX XXXXXXX"
          aria-invalid={Boolean(errors.phone)}
          aria-describedby={
            errors.phone ? "wl-phone-err" : "wl-phone-hint"
          }
          className="input"
        />
        {errors.phone ? (
          <p id="wl-phone-err" className="mt-1 text-xs text-red-600">
            {errors.phone}
          </p>
        ) : (
          <p id="wl-phone-hint" className="mt-1 text-xs text-muted">
            {w.fields.phoneHint}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="wl-city" className="mb-1 block text-sm font-medium text-fg">
          {w.fields.city}
        </label>
        <input
          id="wl-city"
          name="city"
          required
          list="wl-cities"
          autoComplete="address-level2"
          placeholder={w.fields.cityPlaceholder}
          aria-invalid={Boolean(errors.city)}
          aria-describedby={errors.city ? "wl-city-err" : undefined}
          className="input"
        />
        <datalist id="wl-cities">
          {w.cities.map((c) => (
            <option key={c} value={c} />
          ))}
        </datalist>
        {errors.city && (
          <p id="wl-city-err" className="mt-1 text-xs text-red-600">
            {errors.city}
          </p>
        )}
      </div>

      <div>
        <label
          htmlFor="wl-education"
          className="mb-1 block text-sm font-medium text-fg"
        >
          {w.fields.education}
        </label>
        <select
          id="wl-education"
          name="education"
          required
          defaultValue=""
          aria-invalid={Boolean(errors.education)}
          aria-describedby={errors.education ? "wl-education-err" : undefined}
          className="input"
        >
          <option value="" disabled>
            {w.fields.educationPlaceholder}
          </option>
          {w.educationOptions.map((o) => (
            <option key={o} value={o}>
              {o}
            </option>
          ))}
        </select>
        {errors.education && (
          <p id="wl-education-err" className="mt-1 text-xs text-red-600">
            {errors.education}
          </p>
        )}
      </div>

      <label className="flex items-start gap-2 text-xs leading-relaxed text-muted">
        <input
          type="checkbox"
          name="consent"
          className="mt-0.5 size-4 shrink-0 accent-accent"
          aria-invalid={Boolean(errors.consent)}
        />
        <span>
          {w.consent}{" "}
          <a href="/privacy" className="text-accent hover:underline">
            {w.privacyLink}
          </a>
        </span>
      </label>
      {errors.consent && (
        <p className="text-xs text-red-600">{errors.consent}</p>
      )}

      {status === "error" && (
        <p role="alert" className="text-sm text-red-600">
          {serverError}
        </p>
      )}

      <Button type="submit" disabled={submitting} className="w-full">
        {submitting ? w.submitting : w.submit}
      </Button>
    </form>
  );
}
