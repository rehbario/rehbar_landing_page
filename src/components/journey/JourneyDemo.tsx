import { Section } from "@/components/ui/Section";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { copy } from "@/content/copy";
import { stages } from "./journey.config";
import { ScoreArc, scoreArcCaption } from "./ScoreArc";
import { JourneyMount } from "./JourneyMount";

/**
 * Centerpiece wrapper (§10). Server-renders the heading + the full semantic
 * journey (ordered list + static final ScoreArc) so the complete story is in
 * the DOM for SEO and no-JS. The interactive island enhances on top.
 */
export function JourneyDemo() {
  return (
    <Section id="journey" labelledBy="journey-title">
      <div className="reveal mx-auto max-w-2xl text-center">
        <Eyebrow>The Rehbar Journey</Eyebrow>
        <h2
          id="journey-title"
          className="mt-3 text-[clamp(1.6rem,3.6vw,2.4rem)] font-extrabold leading-[1.15] tracking-tight text-primary"
        >
          {copy.journey.headline}
        </h2>
        <p className="mt-4 text-lg leading-relaxed text-muted">
          {copy.journey.subhead}
        </p>
        <p className="mt-3 text-xs font-medium uppercase tracking-[0.12em] text-muted">
          {copy.journey.label}
        </p>
      </div>

      {/* Interactive island: code-split, scroll-triggered, skeleton until mount. */}
      <div className="reveal mx-auto mt-10 max-w-4xl">
        <div className="relative rounded-card border border-border bg-surface p-5 md:p-8">
          <span className="absolute right-4 top-4 z-10 rounded-pill bg-white px-2.5 py-1 text-[10px] font-semibold text-muted shadow-sm">
            {copy.journey.disclaimer}
          </span>
          <JourneyMount />
        </div>
      </div>

      {/* SSR semantic content — full story + static final arc (§10.4). */}
      <div className="mx-auto mt-12 max-w-4xl">
        <h3 className="text-sm font-bold uppercase tracking-[0.12em] text-muted">
          The journey, step by step
        </h3>
        <div className="mt-4 grid gap-6 md:grid-cols-[1fr_320px] md:items-start">
          <ol className="space-y-2">
            {stages.map((s, i) => (
              <li
                key={s.id}
                className="flex gap-3 rounded-lg border border-border bg-white px-3 py-2"
              >
                <span className="font-bold text-accent">{i + 1}</span>
                <span className="flex-1 text-sm">
                  <span className="font-semibold text-primary">{s.label}</span>
                  {s.score !== null && (
                    <span className="ml-2 text-xs font-semibold text-muted">
                      score {s.score}
                    </span>
                  )}
                  <span className="block text-xs text-muted">{s.note}</span>
                </span>
              </li>
            ))}
          </ol>
          <figure className="rounded-card border border-border bg-white p-3">
            <ScoreArc className="w-full" />
            <figcaption className="mt-2 text-center text-xs text-muted">
              {scoreArcCaption}
            </figcaption>
          </figure>
        </div>
      </div>
    </Section>
  );
}
