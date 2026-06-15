import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import { Container } from "@/components/ui/Container";

type SectionProps = {
  id?: string;
  /** id of the heading element, wired to aria-labelledby (§5 semantic HTML). */
  labelledBy?: string;
  /** Muted surface background with hairline top/bottom borders. */
  surface?: boolean;
  className?: string;
  containerClassName?: string;
  children: ReactNode;
};

export function Section({
  id,
  labelledBy,
  surface,
  className,
  containerClassName,
  children,
}: SectionProps) {
  return (
    <section
      id={id}
      aria-labelledby={labelledBy}
      className={cn(
        "scroll-mt-24 py-20 md:py-28",
        surface && "border-y border-border bg-surface",
        className,
      )}
    >
      <Container className={containerClassName}>{children}</Container>
    </section>
  );
}
