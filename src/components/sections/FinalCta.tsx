import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { WaitlistCta } from "@/components/waitlist/WaitlistCta";
import { IconArrowRight } from "@/components/ui/icons";
import { copy } from "@/content/copy";
import { site } from "@/lib/site";

export function FinalCta() {
  return (
    <section
      id="start"
      aria-labelledby="final-cta-title"
      className="scroll-mt-24 bg-primary py-20 text-white md:py-28"
    >
      <Container>
        <h2 id="final-cta-title" className="sr-only">
          Get started with Rehbar
        </h2>
        <div className="grid gap-10 md:grid-cols-2 md:gap-8">
          {/* Student */}
          <div className="flex flex-col items-start md:border-r md:border-white/15 md:pr-10">
            <p className="text-xs font-semibold uppercase tracking-[0.12em] text-highlight">
              For students
            </p>
            <p className="mt-3 text-[clamp(1.5rem,3.2vw,2.1rem)] font-extrabold leading-tight tracking-tight">
              {copy.finalCta.student.headline}
            </p>
            <div className="mt-6">
              <WaitlistCta source="final" size="lg">
                {copy.finalCta.student.cta}
                <IconArrowRight className="size-4" />
              </WaitlistCta>
            </div>
          </div>

          {/* Investor / partner */}
          <div className="flex flex-col items-start">
            <p className="text-xs font-semibold uppercase tracking-[0.12em] text-highlight">
              For investors & partners
            </p>
            <p className="mt-3 text-[clamp(1.5rem,3.2vw,2.1rem)] font-extrabold leading-tight tracking-tight">
              {copy.finalCta.investor.headline}
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3">
              <Button href="/vision" variant="secondary" size="lg">
                {copy.finalCta.investor.cta}
              </Button>
              <a
                href={`mailto:${site.contactEmail}`}
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-white underline-offset-4 hover:text-highlight hover:underline"
              >
                {copy.finalCta.investor.secondary}
                <IconArrowRight className="size-4" />
              </a>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
