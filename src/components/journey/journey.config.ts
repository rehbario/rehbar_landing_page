/**
 * The editable Journey data (§10.1). Editing this array changes the whole demo —
 * no component code changes. `screen` paths are reserved for real screenshots
 * later; today each stage renders a config-driven mock screen by `id`.
 */
export const journey = {
  student: { name: "Ayesha", goal: "Engineer", target: "NUST", targetScore: 140 },
  stages: [
    { id: "goal", label: "Picks a goal", screen: "/screenshots/quickstart.png", score: null, note: "I want to be an engineer." },
    { id: "shortlist", label: "Finds her universities", screen: "/screenshots/shortlist.png", score: null, note: "Target: NUST (NET ≈ 140)." },
    { id: "diagnostic", label: "Takes a short test", screen: "/screenshots/diagnostic.png", score: 95, note: "Big gap — mostly in Maths." },
    { id: "guidance", label: "Gets a clear plan", screen: "/screenshots/counselor.png", score: 104, note: "Knows exactly what to fix." },
    { id: "practice", label: "Practices, focused", screen: "/screenshots/practice.png", score: 128, note: "Targeted mocks close the gap." },
    { id: "prep", label: "Prep (coming soon)", screen: "/screenshots/prep.png", score: 138, note: "Teaching layer accelerates.", future: true },
    { id: "final", label: "Final mock", screen: "/screenshots/result.png", score: 146, note: "Crosses the bar." },
    { id: "destination", label: "Reaches her goal", screen: "/screenshots/admitted.png", score: 146, note: "Admitted to NUST.", celebrate: true },
  ],
} as const;

export type JourneyStage = {
  id: string;
  label: string;
  screen: string;
  score: number | null;
  note: string;
  future?: boolean;
  celebrate?: boolean;
};

/** Typed, widened view of the stages for component use. */
export const stages: readonly JourneyStage[] = journey.stages;
export const student = journey.student;
