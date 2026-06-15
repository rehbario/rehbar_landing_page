import { cn } from "@/lib/cn";
import { copy } from "@/content/copy";

/** The Rehbar wordmark: gradient "R" tile + name + Urdu mark (رہبر). */
export function BrandMark({
  className,
  showMark = true,
}: {
  className?: string;
  showMark?: boolean;
}) {
  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <span
        aria-hidden="true"
        className="grid size-9 place-items-center rounded-[10px] bg-gradient-to-br from-primary to-accent text-base font-extrabold text-white"
      >
        R
      </span>
      <span className="text-lg font-extrabold tracking-tight text-primary">
        {copy.nav.brand}
        {showMark && (
          <span
            lang="ur"
            dir="rtl"
            className="ml-1.5 align-middle text-base font-semibold text-muted"
          >
            {copy.nav.mark}
          </span>
        )}
      </span>
    </span>
  );
}
