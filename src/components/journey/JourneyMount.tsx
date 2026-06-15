"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { JourneySkeleton } from "./JourneySkeleton";

// Code-split: the animation chunk loads only when the section nears the viewport.
const JourneyAnimation = dynamic(
  () => import("./JourneyAnimation").then((m) => m.JourneyAnimation),
  { ssr: false, loading: () => <JourneySkeleton /> },
);

export function JourneyMount() {
  const ref = useRef<HTMLDivElement>(null);
  const [show, setShow] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") {
      setShow(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setShow(true);
          io.disconnect();
        }
      },
      { rootMargin: "200px 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={ref} className="min-h-[560px] md:min-h-[470px]">
      {show ? <JourneyAnimation /> : <JourneySkeleton />}
    </div>
  );
}
