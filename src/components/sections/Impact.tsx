import { Section } from "@/components/ui/Section";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { copy } from "@/content/copy";

export function Impact() {
  return (
    <Section labelledBy="impact-title">
      <div className="reveal mx-auto max-w-3xl text-center">
        <Eyebrow>The point</Eyebrow>
        <h2
          id="impact-title"
          className="mt-3 text-[clamp(1.5rem,3.4vw,2.25rem)] font-extrabold leading-[1.2] tracking-tight text-primary"
        >
          {copy.impact.headline}
        </h2>
        <p className="mt-6 text-lg leading-relaxed text-muted">
          {copy.impact.body}
        </p>
      </div>

      {/* Representative student story — clearly illustrative (§9.7). */}
      <figure className="reveal mx-auto mt-12 max-w-2xl rounded-card border border-border bg-surface p-6 md:p-8">
        <figcaption className="mb-4 flex items-center gap-3">
          <span
            aria-hidden="true"
            className="grid size-11 place-items-center rounded-full bg-gradient-to-br from-primary to-accent text-base font-bold text-white"
          >
            {copy.impact.story.name.charAt(0)}
          </span>
          <span>
            <span className="block text-sm font-bold text-primary">
              {copy.impact.story.name}
            </span>
            <span className="block text-xs text-muted">
              {copy.impact.story.detail}
            </span>
          </span>
          <span className="ml-auto rounded-pill bg-highlight-soft px-2.5 py-1 text-[11px] font-semibold text-highlight">
            {copy.impact.storyLabel}
          </span>
        </figcaption>
        <blockquote className="text-lg leading-relaxed text-fg">
          “{copy.impact.story.quote}”
        </blockquote>
      </figure>
      <p className="reveal mx-auto mt-4 max-w-2xl text-center text-xs text-muted">
        {copy.impact.reserved}
      </p>
    </Section>
  );
}
