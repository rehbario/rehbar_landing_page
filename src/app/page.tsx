import { Hero } from "@/components/sections/Hero";
import { Problem } from "@/components/sections/Problem";
import { JourneyDemo } from "@/components/journey/JourneyDemo";
import { WaitlistSection } from "@/components/sections/WaitlistSection";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { Moat } from "@/components/sections/Moat";
import { Scale } from "@/components/sections/Scale";
import { Impact } from "@/components/sections/Impact";
import { FinalCta } from "@/components/sections/FinalCta";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Problem />
      <JourneyDemo />
      <WaitlistSection />
      <HowItWorks />
      <Moat />
      <Scale />
      <Impact />
      <FinalCta />
    </>
  );
}
