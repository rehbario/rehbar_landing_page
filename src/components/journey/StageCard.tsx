import { PhoneFrame } from "@/components/ui/PhoneFrame";
import { MockScreen } from "./MockScreen";
import type { JourneyStage } from "./journey.config";

/** Left half of the demo (§10.2): the phone showing the current stage's screen. */
export function StageCard({ stage }: { stage: JourneyStage }) {
  return (
    <PhoneFrame className="max-w-[210px]">
      <div key={stage.id} className="stage-in h-full">
        <MockScreen stage={stage} />
      </div>
    </PhoneFrame>
  );
}
