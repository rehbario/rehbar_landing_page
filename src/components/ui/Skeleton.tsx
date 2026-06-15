import { cn } from "@/lib/cn";

/** Shimmer placeholder block (§7). Decorative — hidden from a11y tree. */
export function Skeleton({ className }: { className?: string }) {
  return <div className={cn("skeleton", className)} aria-hidden="true" />;
}
