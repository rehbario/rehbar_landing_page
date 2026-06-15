import { journey, stages, student } from "./journey.config";

/**
 * SVG score arc (§10.2). Pure component (no hooks) → renders on the server for
 * the static fallback and inside the client animation. `revealed` is the index
 * up to which stages are shown; the line draws up and crosses the target bar.
 */

const W = 320;
const H = 210;
const PAD = { l: 34, r: 14, t: 20, b: 26 };
const S_MIN = 80;
const S_MAX = 160;

type Pt = {
  x: number;
  y: number;
  score: number;
  idx: number;
  future: boolean;
  celebrate: boolean;
};

const scored: Pt[] = (() => {
  const withScore = stages
    .map((s, idx) => ({ s, idx }))
    .filter(({ s }) => s.score !== null);
  const n = withScore.length;
  return withScore.map(({ s, idx }, i) => ({
    x: PAD.l + (n <= 1 ? 0 : (i * (W - PAD.r - PAD.l)) / (n - 1)),
    y:
      H -
      PAD.b -
      (((s.score as number) - S_MIN) / (S_MAX - S_MIN)) * (H - PAD.b - PAD.t),
    score: s.score as number,
    idx,
    future: Boolean(s.future),
    celebrate: Boolean(s.celebrate),
  }));
})();

const targetY =
  H - PAD.b - ((student.targetScore - S_MIN) / (S_MAX - S_MIN)) * (H - PAD.b - PAD.t);

export const scoreArcCaption = `Score rises from ${scored[0].score} to ${
  scored[scored.length - 1].score
}, crossing ${student.target}'s ${student.targetScore} bar.`;

export function ScoreArc({
  revealed = stages.length - 1,
  animate = false,
  className,
}: {
  revealed?: number;
  animate?: boolean;
  className?: string;
}) {
  const transition = animate ? "all 0.5s ease" : undefined;

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      className={className}
      role="img"
      aria-label={scoreArcCaption}
      preserveAspectRatio="xMidYMid meet"
    >
      {/* baseline */}
      <line
        x1={PAD.l}
        y1={H - PAD.b}
        x2={W - PAD.r}
        y2={H - PAD.b}
        stroke="#e1e7ee"
        strokeWidth="1.5"
      />

      {/* target line */}
      <line
        x1={PAD.l}
        y1={targetY}
        x2={W - PAD.r}
        y2={targetY}
        stroke="#E9A23B"
        strokeWidth="1.5"
        strokeDasharray="5 4"
      />
      <text
        x={W - PAD.r}
        y={targetY - 6}
        textAnchor="end"
        fontSize="10"
        fontWeight="700"
        fill="#b9791f"
      >
        {student.target} · {student.targetScore}
      </text>

      {/* segments */}
      {scored.slice(0, -1).map((p, i) => {
        const next = scored[i + 1];
        const shown = revealed >= next.idx;
        const isFuture = p.future || next.future;
        const len = Math.hypot(next.x - p.x, next.y - p.y);
        if (isFuture) {
          return (
            <line
              key={`seg-${i}`}
              x1={p.x}
              y1={p.y}
              x2={next.x}
              y2={next.y}
              stroke="#E9A23B"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeDasharray="5 4"
              style={{ transition, opacity: shown ? 1 : 0 }}
            />
          );
        }
        return (
          <line
            key={`seg-${i}`}
            x1={p.x}
            y1={p.y}
            x2={next.x}
            y2={next.y}
            stroke="#1B3A57"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeDasharray={len}
            strokeDashoffset={shown ? 0 : len}
            style={{ transition }}
          />
        );
      })}

      {/* points + score labels */}
      {scored.map((p, i) => {
        const shown = revealed >= p.idx;
        const aboveTarget = p.score >= student.targetScore;
        const fill = p.celebrate
          ? "#E9A23B"
          : aboveTarget
            ? "#2A9D8F"
            : "#1B3A57";
        return (
          <g
            key={`pt-${i}`}
            style={{ transition, opacity: shown ? 1 : 0 }}
          >
            {p.celebrate && shown && (
              <circle
                cx={p.x}
                cy={p.y}
                r="9"
                fill="#E9A23B"
                opacity="0.25"
                className={animate ? "pop" : undefined}
              />
            )}
            <circle
              cx={p.x}
              cy={p.y}
              r={p.celebrate ? 5 : 4}
              fill={fill}
              stroke="#fff"
              strokeWidth="1.5"
            />
            <text
              x={p.x}
              y={p.y - 10}
              textAnchor="middle"
              fontSize="10"
              fontWeight="700"
              fill={fill}
            >
              {p.score}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

export { journey };
