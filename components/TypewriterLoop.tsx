"use client";

import { useEffect, useState } from "react";

const PHRASES = [
  "Tivra crafts high-performance websites for startups and small businesses — from concept to launch, fast.",
  "We turn your idea into a live, converting website in days — not months.",
  "Your brand deserves a site as sharp as your product. We build exactly that.",
];

const TYPE_SPEED   = 28;   // ms per character
const DELETE_SPEED = 14;   // ms per character
const PAUSE_AFTER  = 2200; // ms before deleting
const PAUSE_BEFORE = 400;  // ms before typing next phrase

export default function TypewriterLoop({ className, style }: { className?: string; style?: React.CSSProperties }) {
  const [displayed, setDisplayed] = useState("");
  const [phraseIdx, setPhraseIdx] = useState(0);
  const [phase, setPhase] = useState<"typing" | "pausing" | "deleting" | "waiting">("typing");

  useEffect(() => {
    const target = PHRASES[phraseIdx];

    if (phase === "typing") {
      if (displayed.length < target.length) {
        const t = setTimeout(() => setDisplayed(target.slice(0, displayed.length + 1)), TYPE_SPEED);
        return () => clearTimeout(t);
      } else {
        const t = setTimeout(() => setPhase("deleting"), PAUSE_AFTER);
        return () => clearTimeout(t);
      }
    }

    if (phase === "deleting") {
      if (displayed.length > 0) {
        const t = setTimeout(() => setDisplayed((d) => d.slice(0, -1)), DELETE_SPEED);
        return () => clearTimeout(t);
      } else {
        setPhase("waiting");
      }
    }

    if (phase === "waiting") {
      const t = setTimeout(() => {
        setPhraseIdx((i) => (i + 1) % PHRASES.length);
        setPhase("typing");
      }, PAUSE_BEFORE);
      return () => clearTimeout(t);
    }
  }, [displayed, phase, phraseIdx]);

  return (
    <p className={className} style={style}>
      {displayed}
      <span
        aria-hidden
        style={{
          display: "inline-block",
          width: 2,
          height: "1em",
          background: "rgba(255,255,255,0.8)",
          verticalAlign: "text-bottom",
          marginLeft: 2,
          borderRadius: 1,
          animation: "tivra-cursor-blink 0.7s step-end infinite",
        }}
      />
    </p>
  );
}
