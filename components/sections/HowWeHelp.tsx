"use client";

import { useEffect, useRef, useState } from "react";
import ScrollRevealText from "@/components/ScrollRevealText";

const stats = [
  {
    value: "7",
    unit: " days",
    heading: "Discovery to Live",
    body: "From your first call to a published, indexed website — in under a week.",
  },
  {
    value: "3×",
    unit: "",
    heading: "More Client Enquiries",
    body: "Average increase in inbound leads our clients report within 30 days of launch.",
  },
];

function StatCard({
  value,
  unit,
  heading,
  body,
  visible,
  delay,
}: {
  value: string;
  unit: string;
  heading: string;
  body: string;
  visible: boolean;
  delay: number;
}) {
  return (
    <div
      className="flex-1 rounded-2xl p-5 flex flex-col justify-between"
      style={{
        background: "#F2EFEA",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(20px)",
        transition: `opacity 0.6s cubic-bezier(.22,.68,0,1.1) ${delay}s, transform 0.6s cubic-bezier(.22,.68,0,1.1) ${delay}s`,
      }}
    >
      <p
        className="font-black leading-none mb-3"
        style={{ fontSize: 36, color: "#F4611A", fontVariantNumeric: "tabular-nums" }}
      >
        {value}
        <span style={{ fontSize: 20 }}>{unit}</span>
      </p>
      <div>
        <p className="font-bold text-base mb-1" style={{ color: "#111111" }}>{heading}</p>
        <p className="text-sm leading-relaxed" style={{ color: "#787878" }}>{body}</p>
      </div>
    </div>
  );
}

export default function HowWeHelp() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section id="how" className="py-16 px-6" style={{ background: "#FAFAF8" }}>
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <p
              className="text-xs font-bold tracking-[0.16em] uppercase mb-3 tivra-reveal"
              style={{ color: "#F4611A" }}
            >
              The Process
            </p>
            <ScrollRevealText
              text="Simple, fast, and built entirely around you."
              className="font-black leading-tight"
              style={{ fontSize: "clamp(1.6rem, 2.8vw, 2.5rem)", maxWidth: "18ch", lineHeight: 1.15 }}
            />
          </div>
          <p
            className="text-sm leading-relaxed max-w-xs sm:text-right tivra-reveal"
            style={{ color: "#787878" }}
          >
            Tivra handles strategy, design, and development end-to-end — so you can focus on running your business.
          </p>
        </div>

        {/* Bento grid */}
        <div ref={ref} className="grid grid-cols-1 sm:grid-cols-3 gap-4">

          {/* Left — saffron statement card */}
          <div
            className="rounded-3xl p-6 flex flex-col justify-between"
            style={{
              background: "#F4611A",
              opacity: visible ? 1 : 0,
              transform: visible ? "translateY(0)" : "translateY(24px)",
              transition: "opacity 0.65s cubic-bezier(.22,.68,0,1.1) 0s, transform 0.65s cubic-bezier(.22,.68,0,1.1) 0s",
            }}
          >
            <p
              className="text-lg font-black leading-snug"
              style={{ color: "#ffffff" }}
            >
              We scope, design, and build your website — in 7 days. Zero guesswork, no bloated briefs.
            </p>
            <a
              href="/book-demo"
              className="inline-flex items-center gap-2 self-start mt-5 px-4 py-2 rounded-full text-sm font-bold transition-opacity hover:opacity-90"
              style={{ background: "#ffffff", color: "#F4611A" }}
            >
              Book a Free Call
              <span className="text-base leading-none">↗</span>
            </a>
          </div>

          {/* Middle — two stat cards stacked */}
          <div
            className="flex flex-col gap-4"
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? "translateY(0)" : "translateY(24px)",
              transition: "opacity 0.65s cubic-bezier(.22,.68,0,1.1) 0.12s, transform 0.65s cubic-bezier(.22,.68,0,1.1) 0.12s",
            }}
          >
            {stats.map((s, i) => (
              <StatCard key={s.heading} {...s} visible={visible} delay={0.2 + i * 0.1} />
            ))}
          </div>

          {/* Right — image / visual panel */}
          <div
            className="rounded-3xl overflow-hidden relative"
            style={{
              minHeight: 260,
              background: "#1A0F3C",
              opacity: visible ? 1 : 0,
              transform: visible ? "translateY(0)" : "translateY(24px)",
              transition: "opacity 0.65s cubic-bezier(.22,.68,0,1.1) 0.24s, transform 0.65s cubic-bezier(.22,.68,0,1.1) 0.24s",
            }}
          >
            {/* Abstract grid illustration */}
            <svg
              className="absolute inset-0 w-full h-full"
              viewBox="0 0 400 500"
              preserveAspectRatio="xMidYMid slice"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Grid lines */}
              {[0,1,2,3,4].map(i => (
                <line key={`h${i}`} x1="0" y1={100 + i * 80} x2="400" y2={100 + i * 80} stroke="rgba(255,255,255,0.06)" strokeWidth="1" />
              ))}
              {[0,1,2,3,4,5].map(i => (
                <line key={`v${i}`} x1={i * 80} y1="0" x2={i * 80} y2="500" stroke="rgba(255,255,255,0.06)" strokeWidth="1" />
              ))}
              {/* Browser window card */}
              <rect x="40" y="60" width="220" height="150" rx="12" fill="rgba(255,255,255,0.07)" />
              <rect x="40" y="60" width="220" height="28" rx="12" fill="rgba(255,255,255,0.1)" />
              <circle cx="60" cy="74" r="5" fill="rgba(244,97,26,0.6)" />
              <circle cx="76" cy="74" r="5" fill="rgba(255,186,0,0.4)" />
              <circle cx="92" cy="74" r="5" fill="rgba(255,255,255,0.2)" />
              <rect x="56" y="108" width="140" height="8" rx="4" fill="rgba(255,255,255,0.15)" />
              <rect x="56" y="124" width="100" height="8" rx="4" fill="rgba(255,255,255,0.09)" />
              <rect x="56" y="140" width="120" height="8" rx="4" fill="rgba(255,255,255,0.09)" />
              <rect x="56" y="160" width="60" height="24" rx="8" fill="rgba(244,97,26,0.8)" />
              {/* Stat chip */}
              <rect x="180" y="170" width="100" height="52" rx="12" fill="rgba(244,97,26,0.9)" />
              <text x="230" y="192" textAnchor="middle" fill="white" fontSize="11" fontWeight="700" opacity="0.7">Avg. Delivery</text>
              <text x="230" y="212" textAnchor="middle" fill="white" fontSize="18" fontWeight="900">7 days</text>
              {/* Notification card */}
              <rect x="120" y="260" width="200" height="68" rx="14" fill="rgba(255,255,255,0.09)" />
              <rect x="136" y="276" width="28" height="28" rx="8" fill="rgba(244,97,26,0.7)" />
              <rect x="174" y="280" width="110" height="7" rx="3.5" fill="rgba(255,255,255,0.35)" />
              <rect x="174" y="294" width="80" height="7" rx="3.5" fill="rgba(255,255,255,0.15)" />
              {/* Bottom label */}
              <rect x="40" y="370" width="180" height="48" rx="12" fill="rgba(255,255,255,0.07)" />
              <rect x="56" y="383" width="80" height="7" rx="3.5" fill="rgba(255,255,255,0.3)" />
              <rect x="56" y="398" width="50" height="7" rx="3.5" fill="rgba(255,255,255,0.12)" />
            </svg>

            {/* Bottom label overlay */}
            <div className="absolute bottom-6 left-6 right-6">
              <div
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold"
                style={{ background: "rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.8)", backdropFilter: "blur(8px)" }}
              >
                <span className="w-2 h-2 rounded-full bg-green-400 inline-block" />
                Your site is live
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
