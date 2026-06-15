"use client";

import { useEffect, useState } from "react";
import { stages } from "./journey.config";
import { StageCard } from "./StageCard";
import { ScoreArc } from "./ScoreArc";
import { IconArrowRight } from "@/components/ui/icons";

const LAST = stages.length - 1;

function prefersReducedMotion() {
  return (
    typeof window !== "undefined" &&
    typeof window.matchMedia === "function" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

/**
 * Interactive layer (§10.3). Auto-advances once when it mounts (the island only
 * mounts after scrolling into view); Prev/Next + the stage rail give manual
 * control. Reduced-motion → starts at the final state with no animation.
 */
export function JourneyAnimation() {
  const [reduced] = useState(prefersReducedMotion);
  const [current, setCurrent] = useState(() =>
    prefersReducedMotion() ? LAST : 0,
  );
  const [manual, setManual] = useState(false);

  useEffect(() => {
    if (reduced || manual || current >= LAST) return;
    const delay = current === 0 ? 650 : 1100;
    const id = window.setTimeout(
      () => setCurrent((c) => Math.min(c + 1, LAST)),
      delay,
    );
    return () => window.clearTimeout(id);
  }, [current, manual, reduced]);

  const go = (i: number) => {
    setManual(true);
    setCurrent(Math.max(0, Math.min(LAST, i)));
  };

  const stage = stages[current];

  return (
    <div className="grid items-center gap-8 md:grid-cols-2">
      <div className="flex justify-center">
        <StageCard stage={stage} />
      </div>

      <div className="w-full">
        <ol className="mb-4 flex flex-wrap gap-1.5" aria-label="Journey stages">
          {stages.map((s, i) => {
            const active = i === current;
            const done = i < current;
            return (
              <li key={s.id}>
                <button
                  type="button"
                  onClick={() => go(i)}
                  title={s.label}
                  aria-label={s.label}
                  aria-current={active ? "step" : undefined}
                  className={
                    active
                      ? "rounded-pill bg-primary px-2.5 py-1 text-[11px] font-semibold text-white"
                      : done
                        ? "rounded-pill bg-accent-soft px-2.5 py-1 text-[11px] font-medium text-accent"
                        : "rounded-pill border border-border px-2.5 py-1 text-[11px] text-muted transition-colors hover:border-accent"
                  }
                >
                  {i + 1}
                </button>
              </li>
            );
          })}
        </ol>

        <div className="rounded-card border border-border bg-white p-3">
          <ScoreArc revealed={current} animate={!reduced} className="w-full" />
        </div>

        <p className="mt-3 min-h-[2.75rem] text-sm font-semibold text-primary">
          {current + 1}. {stage.label}
          <span className="block text-xs font-normal text-muted">
            {stage.note}
          </span>
        </p>

        <div className="mt-3 flex items-center gap-2">
          <button
            type="button"
            onClick={() => go(current - 1)}
            disabled={current === 0}
            aria-label="Previous stage"
            className="grid size-10 place-items-center rounded-pill border border-border text-primary transition-colors hover:border-accent disabled:opacity-40"
          >
            <IconArrowRight className="size-4 rotate-180" />
          </button>
          <button
            type="button"
            onClick={() => go(current + 1)}
            disabled={current === LAST}
            aria-label="Next stage"
            className="grid size-10 place-items-center rounded-pill border border-border text-primary transition-colors hover:border-accent disabled:opacity-40"
          >
            <IconArrowRight className="size-4" />
          </button>
          <span className="ml-auto text-xs font-medium text-muted">
            {current + 1} / {stages.length}
          </span>
        </div>
      </div>
    </div>
  );
}
