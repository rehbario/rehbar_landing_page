"use client";

import type { ReactNode } from "react";
import { Button, type ButtonProps } from "@/components/ui/Button";
import { useWaitlist } from "./WaitlistProvider";

/** A Button that opens the waitlist modal, tagging the submission `source`. */
export function WaitlistCta({
  source,
  children,
  variant,
  size,
  className,
  onClick,
}: {
  source: string;
  children: ReactNode;
  variant?: ButtonProps["variant"];
  size?: ButtonProps["size"];
  className?: string;
  /** Runs after opening (e.g. close the mobile menu). */
  onClick?: () => void;
}) {
  const { open } = useWaitlist();
  return (
    <Button
      variant={variant}
      size={size}
      className={className}
      onClick={() => {
        open(source);
        onClick?.();
      }}
    >
      {children}
    </Button>
  );
}
