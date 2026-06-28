"use client";

import { useState } from "react";
import ScrollRevealText from "@/components/ScrollRevealText";

const steps = [
  {
    num: "01",
    line1: "Create your",
    line2: "Workspace",
    desc: "Set up your project space, define scope, and invite your client — everything starts in one organised place.",
    bullets: [
      "Invite clients with a single link",
      "Define deliverables and scope upfront",
      "Centralise files, tasks, and notes",
      "Set timelines clients can actually follow",
    ],
    bg: "#007B6E",
    ringColor: "rgba(255,255,255,0.12)",
    textMuted: "rgba(255,255,255,0.65)",
    textMain: "#ffffff",
    icon: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
        <rect x="1" y="1" width="8.5" height="8.5" rx="2.5" fill="rgba(255,255,255,0.9)" />
        <rect x="12.5" y="1" width="8.5" height="8.5" rx="2.5" fill="rgba(255,255,255,0.4)" />
        <rect x="1" y="12.5" width="8.5" height="8.5" rx="2.5" fill="rgba(255,255,255,0.4)" />
        <rect x="12.5" y="12.5" width="8.5" height="8.5" rx="2.5" fill="rgba(255,255,255,0.2)" />
      </svg>
    ),
  },
  {
    num: "02",
    line1: "Share every",
    line2: "Update",
    desc: "Upload files, post updates, send messages, and manage approvals — all in one portal your clients actually understand.",
    bullets: [
      "Upload files with version tracking",
      "Get client approvals in one click",
      "Automated notifications, no chasing",
      "Real-time comments and feedback",
    ],
    bg: "#F4611A",
    ringColor: "rgba(255,255,255,0.12)",
    textMuted: "rgba(255,255,255,0.65)",
    textMain: "#ffffff",
    icon: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
        <path d="M3 6h16M3 11h11M3 16h13" stroke="rgba(255,255,255,0.9)" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    num: "03",
    line1: "Align on every",
    line2: "Next Step",
    desc: "Clients stay in sync with progress and milestones — without chasing you for status updates.",
    bullets: [
      "Shared milestone tracker for all parties",
      "Progress visible to client at all times",
      "Zero 'what's the status?' messages",
      "Smooth handoffs at every stage",
    ],
    bg: "#FFBA00",
    ringColor: "rgba(0,0,0,0.08)",
    textMuted: "rgba(17,17,17,0.55)",
    textMain: "#111111",
    icon: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
        <path d="M11 3v16M5 9l6-6 6 6" stroke="#111" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" opacity="0.6" />
      </svg>
    ),
  },
];

function Rings({ color }: { color: string }) {
  return (
    <svg
      width="150" height="150" viewBox="0 0 150 150" fill="none"
      className="absolute -top-6 -right-6 pointer-events-none"
      aria-hidden="true"
    >
      <circle cx="120" cy="30" r="72" stroke={color} strokeWidth="1.5" />
      <circle cx="120" cy="30" r="52" stroke={color} strokeWidth="1.5" />
      <circle cx="120" cy="30" r="34" stroke={color} strokeWidth="1.5" />
      <circle cx="120" cy="30" r="16" stroke={color} strokeWidth="2" />
    </svg>
  );
}

function StepCard({ step, delay }: { step: typeof steps[number]; delay: number }) {
  const [flipped, setFlipped] = useState(false);

  return (
    <div
      className="tivra-reveal cursor-pointer"
      data-delay={String(delay)}
      style={{ perspective: "1000px", minHeight: 330 }}
      onMouseEnter={() => setFlipped(true)}
      onMouseLeave={() => setFlipped(false)}
    >
      <div
        style={{
          position: "relative",
          width: "100%",
          minHeight: 330,
          transformStyle: "preserve-3d",
          transition: "transform 0.65s cubic-bezier(.4,0,.2,1)",
          transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)",
        }}
      >
        {/* ── Front ── */}
        <div
          className="absolute inset-0 rounded-3xl p-7 flex flex-col overflow-hidden"
          style={{
            background: step.bg,
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
          }}
        >
          <Rings color={step.ringColor} />

          <p
            className="text-xs font-black tracking-[0.14em] uppercase mb-5 relative z-10"
            style={{ color: step.textMuted }}
          >
            {step.num}
          </p>

          <div
            className="w-11 h-11 rounded-2xl flex items-center justify-center mb-5 relative z-10"
            style={{ background: "rgba(255,255,255,0.18)" }}
          >
            {step.icon}
          </div>

          <div className="relative z-10 mb-4 flex-1">
            <p className="text-base font-normal leading-snug" style={{ color: step.textMuted }}>
              {step.line1}
            </p>
            <p className="text-[1.55rem] font-bold leading-tight" style={{ color: step.textMain }}>
              {step.line2}
            </p>
          </div>

          <p className="text-sm font-normal leading-relaxed relative z-10" style={{ color: step.textMuted }}>
            {step.desc}
          </p>

          {/* Flip hint */}
          <div
            className="absolute bottom-4 right-5 text-xs font-semibold flex items-center gap-1"
            style={{ color: step.textMuted }}
          >
            More
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path d="M2 6h8M6 2l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        </div>

        {/* ── Back ── */}
        <div
          className="absolute inset-0 rounded-3xl p-7 flex flex-col overflow-hidden"
          style={{
            background: step.bg,
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
          }}
        >
          <Rings color={step.ringColor} />

          <p
            className="text-xs font-black tracking-[0.14em] uppercase mb-4 relative z-10"
            style={{ color: step.textMuted }}
          >
            {step.num}
          </p>

          <p className="text-lg font-bold leading-tight mb-5 relative z-10" style={{ color: step.textMain }}>
            {step.line1} {step.line2}
          </p>

          <ul className="flex flex-col gap-3 flex-1 relative z-10">
            {step.bullets.map((b) => (
              <li key={b} className="flex items-start gap-2.5">
                <span
                  className="mt-0.5 w-4 h-4 rounded-full flex-shrink-0 flex items-center justify-center"
                  style={{ background: "rgba(255,255,255,0.2)" }}
                >
                  <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
                    <path d="M1.5 4l1.8 1.8L6.5 2" stroke={step.textMain} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
                <span className="text-sm font-normal leading-snug" style={{ color: step.textMuted }}>
                  {b}
                </span>
              </li>
            ))}
          </ul>

          {/* Flip back hint */}
          <div
            className="absolute bottom-4 right-5 text-xs font-semibold flex items-center gap-1"
            style={{ color: step.textMuted }}
          >
            Back
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path d="M10 6H2M6 2L2 6l4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function WhatWeDo() {
  return (
    <section id="services" className="py-24 px-6" style={{ background: "#fff" }}>
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="mb-12">
          <p
            className="text-xs font-bold tracking-[0.16em] uppercase mb-4 tivra-reveal"
            style={{ color: "#F4611A" }}
          >
            How it works
          </p>
          <ScrollRevealText
            text="The way client collaboration should work from the start."
            className="font-black leading-tight"
            style={{ fontSize: "clamp(1.6rem, 2.8vw, 2.5rem)", maxWidth: "20ch", lineHeight: 1.15 }}
          />
        </div>

        {/* Cards */}
        <div className="grid sm:grid-cols-3 gap-5">
          {steps.map((step, i) => (
            <StepCard key={step.num} step={step} delay={i + 1} />
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-10 flex items-center flex-wrap gap-4 tivra-reveal" data-delay="4">
          <p className="text-base" style={{ color: "#787878" }}>
            Not sure what you need?{" "}
            <span className="font-semibold" style={{ color: "#111111" }}>Let&apos;s figure it out together.</span>
          </p>
          <a
            href="/book-demo"
            className="inline-flex items-center rounded-full overflow-hidden transition-opacity hover:opacity-90 active:scale-95"
            style={{ background: "#111111", boxShadow: "0 4px 16px rgba(0,0,0,0.18)" }}
          >
            <span className="pl-4 pr-2 text-sm font-semibold text-white whitespace-nowrap" style={{ paddingTop: "0.45rem", paddingBottom: "0.45rem" }}>
              Book a Call
            </span>
            <span
              className="w-7 h-7 flex items-center justify-center rounded-full flex-shrink-0 m-0.5"
              style={{ background: "#F4611A" }}
            >
              <svg width="11" height="11" viewBox="0 0 11 11" fill="none">
                <path d="M2 9L9 2M9 2H4M9 2V7" stroke="white" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
          </a>
        </div>

      </div>
    </section>
  );
}
