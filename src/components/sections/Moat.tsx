import { Section } from "@/components/ui/Section";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { IconSpark, IconArrowRight } from "@/components/ui/icons";
import { copy } from "@/content/copy";

const loop = [
  "Every conversation & test",
  "Sharper, proprietary guidance",
  "Better outcomes",
  "More students",
];

export function Moat() {
  return (
    <Section id="why" labelledBy="why-title">
      <div className="reveal mx-auto max-w-3xl text-center">
        <div className="mx-auto grid size-12 place-items-center rounded-xl bg-accent-soft text-accent">
          <IconSpark className="size-6" />
        </div>
        <Eyebrow className="mt-5">Why Rehbar</Eyebrow>
        <h2
          id="why-title"
          className="mt-3 text-[clamp(1.6rem,3.6vw,2.4rem)] font-extrabold leading-[1.15] tracking-tight text-primary"
        >
          {copy.moat.headline}
        </h2>
        <p className="mt-6 text-lg leading-relaxed text-muted">
          {copy.moat.body}
        </p>
      </div>

      <ul className="reveal mx-auto mt-10 flex max-w-3xl flex-wrap items-center justify-center gap-x-3 gap-y-3">
        {loop.map((step, i) => (
          <li key={step} className="flex items-center gap-3">
            <span className="rounded-pill border border-border bg-white px-4 py-2 text-sm font-medium text-fg">
              {step}
            </span>
            {i < loop.length - 1 && (
              <IconArrowRight className="size-4 shrink-0 text-accent" />
            )}
          </li>
        ))}
      </ul>
      <p className="reveal mt-4 text-center text-xs font-medium uppercase tracking-[0.12em] text-muted">
        A compounding loop
      </p>
    </Section>
  );
}
