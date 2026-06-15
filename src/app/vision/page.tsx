import type { Metadata } from "next";
import Link from "next/link";
import { buildMetadata } from "@/lib/seo";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Button } from "@/components/ui/Button";
import { IconArrowRight, IconTrendingUp } from "@/components/ui/icons";
import { copy } from "@/content/copy";
import { site } from "@/lib/site";

export const metadata: Metadata = buildMetadata({
  title: "The Rehbar vision — guidance for the developing world",
  description:
    "How Rehbar scales from Pakistan: one engine, three verticals — counseling, assessment, prep — a compounding data moat, and growth across markets.",
  path: "/vision",
});

const v = copy.vision;

export default function VisionPage() {
  return (
    <>
      {/* Header */}
      <Section labelledBy="vision-title" className="pt-14">
        <div className="mx-auto max-w-3xl">
          <Link
            href="/"
            className="text-sm font-medium text-muted transition-colors hover:text-primary"
          >
            {v.backToHome}
          </Link>
          <Eyebrow className="mt-6">{v.eyebrow}</Eyebrow>
          <h1
            id="vision-title"
            className="mt-3 text-[clamp(2rem,5vw,3.25rem)] font-extrabold leading-[1.1] tracking-[-0.02em] text-primary"
          >
            {v.headline}
          </h1>
          <p className="mt-5 text-lg leading-relaxed text-muted">{v.subhead}</p>
        </div>
      </Section>

      {/* Problem at scale */}
      <Section surface labelledBy="vision-problem">
        <div className="mx-auto max-w-3xl">
          <h2
            id="vision-problem"
            className="text-[clamp(1.5rem,3.4vw,2.1rem)] font-extrabold leading-tight tracking-tight text-primary"
          >
            {v.problem.headline}
          </h2>
          <div className="mt-6 space-y-4">
            {v.problem.body.map((p, i) => (
              <p key={i} className="text-lg leading-relaxed text-muted">
                {p}
              </p>
            ))}
          </div>
        </div>
      </Section>

      {/* Platform: three verticals */}
      <Section labelledBy="vision-platform">
        <div className="mx-auto max-w-3xl">
          <h2
            id="vision-platform"
            className="text-[clamp(1.5rem,3.4vw,2.1rem)] font-extrabold leading-tight tracking-tight text-primary"
          >
            {v.platform.headline}
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-muted">
            {v.platform.intro}
          </p>
        </div>
        <div className="mx-auto mt-10 grid max-w-4xl gap-5 md:grid-cols-3">
          {v.platform.verticals.map((vert) => (
            <div
              key={vert.name}
              className="relative rounded-card border border-border bg-white p-6"
            >
              {"badge" in vert && (
                <span className="absolute right-4 top-4 rounded-pill bg-highlight-soft px-2.5 py-1 text-[11px] font-semibold text-highlight">
                  {vert.badge}
                </span>
              )}
              <h3 className="text-lg font-bold text-primary">{vert.name}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                {vert.body}
              </p>
            </div>
          ))}
        </div>
      </Section>

      {/* Moat */}
      <Section surface labelledBy="vision-moat">
        <div className="mx-auto max-w-3xl">
          <h2
            id="vision-moat"
            className="text-[clamp(1.5rem,3.4vw,2.1rem)] font-extrabold leading-tight tracking-tight text-primary"
          >
            {v.moat.headline}
          </h2>
          <p className="mt-6 text-lg leading-relaxed text-muted">
            {v.moat.body}
          </p>
        </div>
      </Section>

      {/* Growth axes */}
      <Section labelledBy="vision-growth">
        <div className="mx-auto max-w-3xl">
          <h2
            id="vision-growth"
            className="text-[clamp(1.5rem,3.4vw,2.1rem)] font-extrabold leading-tight tracking-tight text-primary"
          >
            {v.growth.headline}
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-muted">
            {v.growth.intro}
          </p>
        </div>
        <div className="mx-auto mt-10 grid max-w-4xl gap-4 sm:grid-cols-2">
          {v.growth.axes.map((axis) => (
            <div
              key={axis.label}
              className="flex gap-4 rounded-card border border-border bg-white p-5"
            >
              <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-accent-soft text-accent">
                <IconTrendingUp className="size-5" />
              </span>
              <span>
                <span className="block font-bold text-primary">
                  {axis.label}
                </span>
                <span className="mt-1 block text-sm leading-relaxed text-muted">
                  {axis.body}
                </span>
              </span>
            </div>
          ))}
        </div>
      </Section>

      {/* Team */}
      <Section surface labelledBy="vision-team">
        <div className="mx-auto max-w-3xl">
          <h2
            id="vision-team"
            className="text-[clamp(1.5rem,3.4vw,2.1rem)] font-extrabold leading-tight tracking-tight text-primary"
          >
            {v.team.headline}
          </h2>
          <p className="mt-6 text-lg leading-relaxed text-muted">
            {v.team.body}
          </p>
        </div>
      </Section>

      {/* CTA */}
      <section
        aria-labelledby="vision-cta"
        className="bg-primary py-20 text-white md:py-28"
      >
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <h2
              id="vision-cta"
              className="text-[clamp(1.6rem,3.4vw,2.25rem)] font-extrabold tracking-tight"
            >
              {v.cta.headline}
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-white/80">
              {v.cta.body}
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <Button href={`mailto:${site.contactEmail}`} size="lg">
                {v.cta.primary}
                <IconArrowRight className="size-4" />
              </Button>
              <Button href="/" variant="secondary" size="lg">
                {v.cta.secondary}
              </Button>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
