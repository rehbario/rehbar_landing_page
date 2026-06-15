import type { ReactNode } from "react";

type IconProps = { className?: string };

function LineIcon({
  className,
  children,
}: IconProps & { children: ReactNode }) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      {children}
    </svg>
  );
}

export function IconMenu({ className }: IconProps) {
  return (
    <LineIcon className={className}>
      <line x1="3" y1="6" x2="21" y2="6" />
      <line x1="3" y1="12" x2="21" y2="12" />
      <line x1="3" y1="18" x2="21" y2="18" />
    </LineIcon>
  );
}

export function IconClose({ className }: IconProps) {
  return (
    <LineIcon className={className}>
      <line x1="6" y1="6" x2="18" y2="18" />
      <line x1="18" y1="6" x2="6" y2="18" />
    </LineIcon>
  );
}

export function IconArrowRight({ className }: IconProps) {
  return (
    <LineIcon className={className}>
      <line x1="5" y1="12" x2="19" y2="12" />
      <polyline points="12 5 19 12 12 19" />
    </LineIcon>
  );
}

export function IconCheck({ className }: IconProps) {
  return (
    <LineIcon className={className}>
      <polyline points="20 6 9 17 4 12" />
    </LineIcon>
  );
}

/** Find your path — counseling. */
export function IconCompass({ className }: IconProps) {
  return (
    <LineIcon className={className}>
      <circle cx="12" cy="12" r="9" />
      <polygon points="16 8 11 11 8 16 13 13" />
    </LineIcon>
  );
}

/** See where you stand — assessment. */
export function IconTarget({ className }: IconProps) {
  return (
    <LineIcon className={className}>
      <circle cx="12" cy="12" r="9" />
      <circle cx="12" cy="12" r="5" />
      <circle cx="12" cy="12" r="1.4" fill="currentColor" stroke="none" />
    </LineIcon>
  );
}

/** Close the gap — prep. */
export function IconCap({ className }: IconProps) {
  return (
    <LineIcon className={className}>
      <path d="M22 10 12 5 2 10l10 5 10-5Z" />
      <path d="M6 12v5c0 1.2 2.7 3 6 3s6-1.8 6-3v-5" />
    </LineIcon>
  );
}

/** Compounding AI / moat. */
export function IconSpark({ className }: IconProps) {
  return (
    <LineIcon className={className}>
      <path d="M12 2c.6 5 2.4 6.8 7.4 7.4-5 .6-6.8 2.4-7.4 7.4-.6-5-2.4-6.8-7.4-7.4 5-.6 6.8-2.4 7.4-7.4Z" />
    </LineIcon>
  );
}

/** Built to scale — growth. */
export function IconTrendingUp({ className }: IconProps) {
  return (
    <LineIcon className={className}>
      <polyline points="3 17 9 11 13 15 21 7" />
      <polyline points="15 7 21 7 21 13" />
    </LineIcon>
  );
}

/* ── Social (filled) ── */
export function IconInstagram({ className }: IconProps) {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.9}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function IconFacebook({ className }: IconProps) {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );
}

export function IconLinkedIn({ className }: IconProps) {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect x="2" y="9" width="4" height="12" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}
