import { Section } from "@/components/ui/Section";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { copy } from "@/content/copy";

export function Problem() {
  return (
    <Section surface labelledBy="problem-title">
      <div className="reveal mx-auto max-w-3xl text-center">
        <Eyebrow>The problem</Eyebrow>
        <h2
          id="problem-title"
          className="mt-3 text-[clamp(1.6rem,3.6vw,2.4rem)] font-extrabold leading-[1.15] tracking-tight text-primary"
        >
          {copy.problem.headline}
        </h2>
        <p className="mt-6 text-lg leading-relaxed text-muted">
          {copy.problem.body}
        </p>
      </div>
      <div className="reveal mx-auto mt-10 max-w-2xl">
        <p className="rounded-card border-l-4 border-highlight bg-highlight-soft px-5 py-4 text-base font-semibold text-fg">
          {copy.problem.scaleLine}
        </p>
      </div>
    </Section>
  );
}
