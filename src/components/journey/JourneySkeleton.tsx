import { Skeleton } from "@/components/ui/Skeleton";

/** Shown in the reserved box until the client animation layer mounts (§7, §10.5). */
export function JourneySkeleton() {
  return (
    <div className="grid items-center gap-8 md:grid-cols-2">
      <div className="flex justify-center">
        <Skeleton className="aspect-[9/19] w-[210px] rounded-[2.4rem]" />
      </div>
      <div className="w-full space-y-4">
        <Skeleton className="h-4 w-40" />
        <Skeleton className="h-[210px] w-full rounded-card" />
        <div className="flex gap-2">
          <Skeleton className="h-9 w-9 rounded-pill" />
          <Skeleton className="h-9 w-9 rounded-pill" />
          <Skeleton className="h-9 flex-1 rounded-pill" />
        </div>
      </div>
    </div>
  );
}
