import Link from "next/link";
import type { MouseEventHandler, ReactNode } from "react";
import { cn } from "@/lib/cn";

type Variant = "primary" | "secondary" | "ghost";
type Size = "md" | "lg";

export type ButtonProps = {
  children: ReactNode;
  href?: string;
  variant?: Variant;
  size?: Size;
  className?: string;
  /** Opens in a new tab with safe rel. Ignored for <button>. */
  external?: boolean;
  onClick?: MouseEventHandler<HTMLButtonElement | HTMLAnchorElement>;
  type?: "button" | "submit";
  disabled?: boolean;
  ariaLabel?: string;
};

const base =
  "inline-flex items-center justify-center gap-2 rounded-pill font-semibold leading-none transition-[color,background-color,border-color,transform] duration-150 active:translate-y-px disabled:pointer-events-none disabled:opacity-60";

const variants: Record<Variant, string> = {
  primary: "bg-accent text-white shadow-sm hover:bg-[#23867a]",
  secondary:
    "border border-border bg-white text-primary hover:border-accent hover:text-accent",
  ghost: "text-primary hover:text-accent",
};

const sizes: Record<Size, string> = {
  md: "h-11 px-5 text-sm",
  lg: "h-12 px-7 text-base",
};

export function Button({
  children,
  href,
  variant = "primary",
  size = "md",
  className,
  external,
  onClick,
  type = "button",
  disabled,
  ariaLabel,
}: ButtonProps) {
  const classes = cn(base, variants[variant], sizes[size], className);

  if (href !== undefined) {
    const isInternal = href.startsWith("/");
    const rel = external ? "noopener noreferrer" : undefined;
    const target = external ? "_blank" : undefined;

    if (isInternal && !external) {
      return (
        <Link
          href={href}
          className={classes}
          aria-label={ariaLabel}
          onClick={onClick}
        >
          {children}
        </Link>
      );
    }
    return (
      <a
        href={href}
        className={classes}
        target={target}
        rel={rel}
        aria-label={ariaLabel}
        onClick={onClick}
      >
        {children}
      </a>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={classes}
      aria-label={ariaLabel}
    >
      {children}
    </button>
  );
}
