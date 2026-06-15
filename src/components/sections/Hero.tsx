import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { PhoneFrame } from "@/components/ui/PhoneFrame";
import { IconArrowRight } from "@/components/ui/icons";
import { copy } from "@/content/copy";
import { WaitlistCta } from "@/components/waitlist/WaitlistCta";

function Ring({ value }: { value: number }) {
  const r = 18;
  const circumference = 2 * Math.PI * r;
  const offset = circumference - (value / 100) * circumference;
  return (
    <svg width="48" height="48" viewBox="0 0 48 48" aria-hidden="true">
      <circle cx="24" cy="24" r={r} fill="none" stroke="#e1e7ee" strokeWidth="5" />
      <circle
        cx="24"
        cy="24"
        r={r}
        fill="none"
        stroke="#2A9D8F"
        strokeWidth="5"
        strokeLinecap="round"
        strokeDasharray={circumference}
        strokeDashoffset={offset}
        transform="rotate(-90 24 24)"
      />
      <text
        x="24"
        y="24"
        textAnchor="middle"
        dominantBaseline="central"
        fontSize="11"
        fontWeight="700"
        fill="#1B3A57"
      >
        {value}
      </text>
    </svg>
  );
}

/** Illustrative product preview rendered as UI (no image → no LCP/CLS cost). */
function HeroDashboard() {
  const subjects = [
    { label: "Maths", val: 62 },
    { label: "Physics", val: 78 },
    { label: "Chemistry", val: 85 },
  ];
  return (
    <div className="flex h-full flex-col bg-gradient-to-b from-primary-soft to-white p-4">
      <div className="flex items-center justify-between text-[10px] text-muted">
        <span>9:41</span>
        <span className="rounded-pill bg-white px-2 py-0.5 font-semibold text-accent shadow-sm">
          Preview
        </span>
      </div>

      <div className="mt-3 flex items-center gap-2">
        <div className="grid size-7 place-items-center rounded-lg bg-gradient-to-br from-primary to-accent text-[11px] font-bold text-white">
          A
        </div>
        <div className="leading-tight">
          <div className="text-[11px] font-semibold text-fg">Ayesha</div>
          <div className="text-[9px] text-muted">Target · NUST</div>
        </div>
      </div>

      <div className="mt-4 flex items-center gap-3 rounded-xl bg-white p-3 shadow-sm">
        <Ring value={72} />
        <div>
          <div className="text-[9px] uppercase tracking-wide text-muted">
            Readiness
          </div>
          <div className="text-sm font-bold text-primary">On track</div>
        </div>
      </div>

      <div className="mt-3 space-y-2">
        {subjects.map((s) => (
          <div key={s.label}>
            <div className="flex justify-between text-[10px]">
              <span className="text-fg">{s.label}</span>
              <span className="text-muted">{s.val}%</span>
            </div>
            <div className="mt-1 h-1.5 rounded-pill bg-surface">
              <div
                className="h-full rounded-pill bg-accent"
                style={{ width: `${s.val}%` }}
              />
            </div>
          </div>
        ))}
      </div>

      <div className="mt-auto flex items-center justify-between rounded-xl bg-primary p-3 text-white">
        <div className="text-[10px] leading-tight">
          <div className="font-semibold">Next · focused practice</div>
          <div className="text-white/70">20 min · Maths</div>
        </div>
        <div className="grid size-7 place-items-center rounded-full bg-accent">
          <svg width="10" height="10" viewBox="0 0 24 24" fill="#fff" aria-hidden="true">
            <path d="M5 3l14 9-14 9V3z" />
          </svg>
        </div>
      </div>
    </div>
  );
}

export function Hero() {
  return (
    <section
      aria-labelledby="hero-title"
      className="relative overflow-hidden border-b border-border"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-50"
        style={{
          backgroundImage: "radial-gradient(#d8dee6 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 70% 55% at 50% -10%, #ffffff 35%, transparent 100%)",
        }}
      />

      <Container className="relative grid items-center gap-12 py-16 md:grid-cols-2 md:py-24 md:gap-8">
        <div>
          <Eyebrow>{copy.hero.eyebrow}</Eyebrow>
          <h1
            id="hero-title"
            className="mt-4 text-[clamp(2.2rem,6vw,3.75rem)] font-extrabold leading-[1.08] tracking-[-0.02em] text-primary"
          >
            {copy.hero.headline}
          </h1>
          <p className="mt-5 max-w-xl text-lg leading-relaxed text-muted">
            {copy.hero.subhead}
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <WaitlistCta source="hero" size="lg">
              {copy.waitlist.triggerLabel}
              <IconArrowRight className="size-4" />
            </WaitlistCta>
            <Button href="#journey" variant="secondary" size="lg">
              {copy.hero.secondaryCta}
            </Button>
          </div>
        </div>

        {/* Right: product preview. Reserve an authentic-photo slot here later. */}
        <div className="relative mx-auto w-full max-w-sm">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "radial-gradient(circle at 50% 42%, rgba(42,157,143,0.18), transparent 70%)",
            }}
          />
          <PhoneFrame className="relative">
            <HeroDashboard />
          </PhoneFrame>
        </div>
      </Container>
    </section>
  );
}
