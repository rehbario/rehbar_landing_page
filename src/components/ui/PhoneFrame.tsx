import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

/**
 * Phone bezel wrapper. The fixed aspect ratio reserves layout box → no CLS (§6).
 * Children render inside the white "screen".
 */
export function PhoneFrame({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("relative mx-auto w-full max-w-[280px]", className)}>
      <div className="relative aspect-[9/19] rounded-[2.4rem] border-[10px] border-[#0c1622] bg-[#0c1622] shadow-2xl shadow-primary/20">
        {/* notch */}
        <div className="absolute left-1/2 top-2 z-10 h-4 w-24 -translate-x-1/2 rounded-full bg-[#0c1622]" />
        <div className="relative h-full w-full overflow-hidden rounded-[1.7rem] bg-white">
          {children}
        </div>
      </div>
    </div>
  );
}
