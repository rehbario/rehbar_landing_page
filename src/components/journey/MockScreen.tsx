import type { JourneyStage } from "./journey.config";
import { student } from "./journey.config";
import { IconCheck } from "@/components/ui/icons";

/**
 * Config-driven mock app screen per stage (§10.2). Rendered as lightweight UI
 * (no images) so it ships in the static HTML and costs nothing to load. Swap in
 * real screenshots later via the stage `screen` path + next/image.
 */
function ScreenBody({ stage }: { stage: JourneyStage }) {
  switch (stage.id) {
    case "goal":
      return (
        <div className="space-y-2">
          <p className="text-[11px] font-semibold text-fg">
            What do you want to be?
          </p>
          {["Doctor", "Engineer", "Business"].map((o) => (
            <div
              key={o}
              className={
                o === "Engineer"
                  ? "flex items-center justify-between rounded-lg border border-accent bg-accent-soft px-3 py-2 text-[11px] font-semibold text-primary"
                  : "rounded-lg border border-border px-3 py-2 text-[11px] text-muted"
              }
            >
              {o}
              {o === "Engineer" && <IconCheck className="size-3.5 text-accent" />}
            </div>
          ))}
        </div>
      );
    case "shortlist":
      return (
        <div className="space-y-2">
          <p className="text-[11px] font-semibold text-fg">Your shortlist</p>
          <div className="flex items-center justify-between rounded-lg border border-accent bg-accent-soft px-3 py-2">
            <span className="text-[11px] font-bold text-primary">NUST</span>
            <span className="text-[10px] text-muted">NET ≈ 140</span>
          </div>
          {["GIKI", "UET"].map((u) => (
            <div
              key={u}
              className="flex items-center justify-between rounded-lg border border-border px-3 py-2 text-[11px] text-muted"
            >
              <span>{u}</span>
              <span className="text-[10px]">shortlisted</span>
            </div>
          ))}
        </div>
      );
    case "prep":
      return (
        <div className="flex h-full flex-col items-center justify-center gap-2 text-center">
          <div className="grid size-10 place-items-center rounded-full bg-highlight-soft text-highlight">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
              <rect x="5" y="11" width="14" height="9" rx="2" />
              <path d="M8 11V8a4 4 0 0 1 8 0v3" />
            </svg>
          </div>
          <p className="text-[12px] font-bold text-primary">Prep</p>
          <span className="rounded-pill bg-highlight-soft px-2 py-0.5 text-[10px] font-semibold text-highlight">
            Coming soon
          </span>
        </div>
      );
    case "destination":
      return (
        <div className="flex h-full flex-col items-center justify-center gap-2 text-center">
          <div className="grid size-12 place-items-center rounded-full bg-accent text-white">
            <IconCheck className="size-6" />
          </div>
          <p className="text-[13px] font-extrabold text-primary">
            Admitted to {student.target}
          </p>
          <p className="text-[10px] text-muted">Offer accepted</p>
        </div>
      );
    default: {
      // Scored stages (diagnostic / guidance / practice / final): a big score.
      const score = stage.score ?? 0;
      const crossed = score >= student.targetScore;
      const gap = Math.max(0, student.targetScore - score);
      return (
        <div className="flex flex-col items-center gap-1.5">
          <p className="text-[10px] font-semibold uppercase tracking-wide text-muted">
            {stage.id === "final" ? "Final mock" : "Score"}
          </p>
          <p
            className={
              crossed
                ? "text-4xl font-extrabold text-accent"
                : "text-4xl font-extrabold text-primary"
            }
          >
            {score}
          </p>
          <div className="mt-1 w-full">
            <div className="flex justify-between text-[9px] text-muted">
              <span>0</span>
              <span>{student.target} {student.targetScore}</span>
            </div>
            <div className="relative mt-1 h-2 rounded-pill bg-surface">
              <div
                className={
                  crossed
                    ? "h-full rounded-pill bg-accent"
                    : "h-full rounded-pill bg-primary"
                }
                style={{ width: `${Math.min(100, (score / 170) * 100)}%` }}
              />
              <span
                className="absolute top-0 h-2 w-0.5 bg-highlight"
                style={{ left: `${(student.targetScore / 170) * 100}%` }}
              />
            </div>
          </div>
          <p
            className={
              crossed
                ? "mt-1 text-[10px] font-semibold text-accent"
                : "mt-1 text-[10px] font-semibold text-highlight"
            }
          >
            {crossed ? "Crosses the bar ✓" : `${gap} to go`}
          </p>
        </div>
      );
    }
  }
}

export function MockScreen({ stage }: { stage: JourneyStage }) {
  return (
    <div className="flex h-full flex-col bg-gradient-to-b from-primary-soft to-white p-3.5">
      <div className="flex items-center justify-between text-[9px] text-muted">
        <span className="font-semibold text-primary">Rehbar</span>
        <span>9:41</span>
      </div>
      <div className="mt-2 flex-1 rounded-xl bg-white p-3 shadow-sm">
        <ScreenBody stage={stage} />
      </div>
      <p className="mt-2 text-center text-[10px] leading-snug text-muted">
        {stage.note}
      </p>
    </div>
  );
}
