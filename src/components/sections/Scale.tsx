import { Section } from "@/components/ui/Section";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { IconTrendingUp } from "@/components/ui/icons";
import { copy } from "@/content/copy";

function GrowthGraphic() {
  const kbs = ["NUST", "UET", "+ more"];
  return (
    <div className="reveal mt-12 rounded-card border border-border bg-white p-6 md:p-8">
      <div className="flex flex-col items-stretch gap-6 md:flex-row md:items-center md:justify-center md:gap-4">
        {/* Swappable knowledge bases */}
        <div className="flex-1 text-center">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.12em] text-muted">
            Knowledge base · swappable
          </p>
          <div className="flex flex-wrap justify-center gap-2">
            {kbs.map((k) => (
              <span
                key={k}
                className="rounded-pill border border-dashed border-border bg-surface px-3 py-1.5 text-sm font-medium text-fg"
              >
                {k}
              </span>
            ))}
          </div>
        </div>

        <ArrowConnector />

        {/* The one engine */}
        <div className="flex-1 text-center">
          <div className="mx-auto inline-flex flex-col items-center rounded-xl bg-gradient-to-br from-primary to-accent px-6 py-4 text-white shadow-sm">
            <span className="text-base font-extrabold tracking-tight">
              Rehbar engine
            </span>
            <span className="text-[11px] text-white/75">one system</span>
          </div>
        </div>

        <ArrowConnector />

        {/* Rising stack */}
        <div className="flex-1 text-center">
          <svg
            viewBox="0 0 120 80"
            className="mx-auto w-full max-w-[160px]"
            role="img"
            aria-label="A rising stack: Counseling, Assessment, Prep"
          >
            <line x1="8" y1="72" x2="116" y2="72" stroke="#e1e7ee" strokeWidth="2" />
            <rect x="18" y="48" width="22" height="24" rx="3" fill="#1B3A57" />
            <rect x="49" y="32" width="22" height="40" rx="3" fill="#2A9D8F" />
            <rect
              x="80"
              y="14"
              width="22"
              height="58"
              rx="3"
              fill="#E9A23B"
              fillOpacity="0.45"
              stroke="#E9A23B"
              strokeWidth="1.5"
              strokeDasharray="3 3"
            />
            <polyline
              points="29,46 60,30 91,12"
              fill="none"
              stroke="#1B3A57"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
          <p className="mt-2 text-xs font-medium text-muted">
            Counseling → Assessment → Prep
          </p>
        </div>
      </div>
    </div>
  );
}

function ArrowConnector() {
  return (
    <div
      aria-hidden="true"
      className="flex items-center justify-center text-border"
    >
      <span className="hidden md:inline text-2xl">→</span>
      <span className="md:hidden text-2xl">↓</span>
    </div>
  );
}

export function Scale() {
  return (
    <Section id="scale" surface labelledBy="scale-title">
      <div className="reveal mx-auto max-w-3xl text-center">
        <Eyebrow>Built to scale</Eyebrow>
        <h2
          id="scale-title"
          className="mt-3 text-[clamp(1.6rem,3.6vw,2.4rem)] font-extrabold leading-[1.15] tracking-tight text-primary"
        >
          {copy.scale.headline}
        </h2>
        <p className="mt-6 text-lg leading-relaxed text-muted">
          {copy.scale.body}
        </p>
      </div>

      <GrowthGraphic />

      <div className="reveal mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {copy.scale.axes.map((axis) => (
          <div
            key={axis.label}
            className="rounded-card border border-border bg-white p-5"
          >
            <IconTrendingUp className="size-5 text-accent" />
            <p className="mt-3 text-sm font-bold text-primary">{axis.label}</p>
            <p className="mt-1 text-sm leading-relaxed text-muted">
              {axis.note}
            </p>
          </div>
        ))}
      </div>
    </Section>
  );
}
