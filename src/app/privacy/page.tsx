import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { Section } from "@/components/ui/Section";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { site } from "@/lib/site";

export const metadata: Metadata = buildMetadata({
  title: "Privacy — Rehbar",
  description:
    "How Rehbar handles your data — a short, plain-language summary while our full policy is finalized ahead of launch.",
  path: "/privacy",
});

export default function PrivacyPage() {
  return (
    <Section labelledBy="privacy-title" className="pt-14">
      <div className="mx-auto max-w-2xl">
        <Eyebrow>Privacy</Eyebrow>
        <h1
          id="privacy-title"
          className="mt-3 text-[clamp(1.9rem,4vw,2.6rem)] font-extrabold leading-tight tracking-tight text-primary"
        >
          Your data, handled with care.
        </h1>
        <div className="mt-6 space-y-4 leading-relaxed text-muted">
          <p>
            Rehbar is being built for students, and we take privacy seriously.
            This is a short placeholder while our full privacy policy is
            finalized ahead of launch.
          </p>
          <p>
            In short: we collect only what we need to guide your journey, we
            don&apos;t sell your data, and you can reach us any time at{" "}
            <a
              className="text-accent hover:underline"
              href={`mailto:${site.contactEmail}`}
            >
              {site.contactEmail}
            </a>{" "}
            with questions.
          </p>
        </div>
      </div>
    </Section>
  );
}
