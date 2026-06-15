import { Section } from "@/components/ui/Section";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { copy } from "@/content/copy";
import {
  IconCompass,
  IconTarget,
  IconCap,
} from "@/components/ui/icons";

const icons = [IconCompass, IconTarget, IconCap];

export function HowItWorks() {
  return (
    <Section id="how" surface labelledBy="how-title">
      <div className="reveal mx-auto max-w-2xl text-center">
        <Eyebrow>How it works</Eyebrow>
        <h2
          id="how-title"
          className="mt-3 text-[clamp(1.6rem,3.6vw,2.4rem)] font-extrabold leading-[1.15] tracking-tight text-primary"
        >
          {copy.howItWorks.headline}
        </h2>
      </div>

      <div className="reveal mt-12 grid gap-5 md:grid-cols-3">
        {copy.howItWorks.cards.map((card, i) => {
          const Icon = icons[i];
          return (
            <div
              key={card.label}
              className="relative flex flex-col rounded-card border border-border bg-white p-6"
            >
              {card.badge && (
                <span className="absolute right-4 top-4 rounded-pill bg-highlight-soft px-2.5 py-1 text-[11px] font-semibold text-highlight">
                  {card.badge}
                </span>
              )}
              <div className="grid size-12 place-items-center rounded-xl bg-accent-soft text-accent">
                <Icon className="size-6" />
              </div>
              <p className="mt-4 text-xs font-semibold uppercase tracking-[0.12em] text-muted">
                {card.tag}
              </p>
              <h3 className="mt-1 text-lg font-bold text-primary">
                {card.label}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                {card.body}
              </p>
            </div>
          );
        })}
      </div>

      <p className="reveal mx-auto mt-10 max-w-2xl text-center text-sm font-medium text-muted">
        {copy.howItWorks.caption}
      </p>
    </Section>
  );
}
