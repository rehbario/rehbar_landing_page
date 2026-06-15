import { Section } from "@/components/ui/Section";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { IconCheck } from "@/components/ui/icons";
import { WaitlistForm } from "@/components/waitlist/WaitlistForm";
import { copy } from "@/content/copy";

/** Inline waitlist band, placed at peak interest right after the Journey demo. */
export function WaitlistSection() {
  return (
    <Section id="waitlist" surface labelledBy="waitlist-section-title">
      <div className="mx-auto grid max-w-4xl items-center gap-10 md:grid-cols-2">
        <div className="reveal">
          <Eyebrow>{copy.waitlist.sectionEyebrow}</Eyebrow>
          <h2
            id="waitlist-section-title"
            className="mt-3 text-[clamp(1.6rem,3.6vw,2.4rem)] font-extrabold leading-[1.15] tracking-tight text-primary"
          >
            {copy.waitlist.sectionHeadline}
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-muted">
            {copy.waitlist.sectionSubhead}
          </p>
          <ul className="mt-6 space-y-2.5">
            {copy.waitlist.benefits.map((b) => (
              <li key={b} className="flex items-center gap-2.5 text-sm text-fg">
                <span className="grid size-5 shrink-0 place-items-center rounded-full bg-accent-soft text-accent">
                  <IconCheck className="size-3.5" />
                </span>
                {b}
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-card border border-border bg-white p-6 shadow-sm">
          <WaitlistForm source="inline" />
        </div>
      </div>
    </Section>
  );
}
