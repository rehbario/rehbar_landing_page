import { Container } from "@/components/ui/Container";
import { Skeleton } from "@/components/ui/Skeleton";

/** Lightweight page skeleton shown while the route segment streams (§7). */
export default function Loading() {
  return (
    <Container className="py-20 md:py-28">
      <div className="mx-auto flex max-w-2xl flex-col items-center text-center">
        <Skeleton className="h-7 w-72 rounded-pill" />
        <Skeleton className="mt-6 h-12 w-full max-w-xl" />
        <Skeleton className="mt-3 h-12 w-3/4" />
        <Skeleton className="mt-6 h-5 w-full max-w-md" />
        <Skeleton className="mt-2 h-5 w-2/3" />
        <div className="mt-8 flex gap-3">
          <Skeleton className="h-12 w-36 rounded-pill" />
          <Skeleton className="h-12 w-44 rounded-pill" />
        </div>
      </div>
    </Container>
  );
}
