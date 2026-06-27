"use client";

import { useEffect, useRef, useState } from "react";

function useCountUp(target: number, active: boolean, duration = 1200) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!active) return;
    const start = performance.now();
    function step(now: number) {
      const t = Math.min(1, (now - start) / duration);
      const ease = t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
      setValue(Math.round(target * ease));
      if (t < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }, [active, target, duration]);
  return value;
}

/* Staggered fade/slide-in for a card's inner rows — driven by `visible` */
function rise(visible: boolean, i: number, base = 0.15): React.CSSProperties {
  const delay = base + i * 0.1;
  return {
    opacity: visible ? 1 : 0,
    transform: visible ? "translateY(0)" : "translateY(12px)",
    transition: `opacity 0.5s cubic-bezier(.22,.68,0,1.1) ${delay}s, transform 0.5s cubic-bezier(.22,.68,0,1.1) ${delay}s`,
  };
}

function FeatureSection({
  flip,
  label,
  heading,
  body,
  statValue,
  statSuffix,
  statLabel,
  mockup,
}: {
  flip?: boolean;
  label: string;
  heading: string;
  body: string;
  statValue: number;
  statSuffix: string;
  statLabel: string;
  mockup: (visible: boolean) => React.ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => { setVisible(entry.isIntersecting); },
      { threshold: 0, rootMargin: "0px 0px 18% 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const count = useCountUp(statValue, visible);

  return (
    <div
      ref={ref}
      className="grid grid-cols-1 lg:grid-cols-2 items-center gap-x-10 gap-y-8 py-16"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(28px)",
        transition: "opacity 0.65s cubic-bezier(.22,.68,0,1.1), transform 0.65s cubic-bezier(.22,.68,0,1.1)",
      }}
    >
      {/* Mockup */}
      <div className={`w-full max-w-[440px] ${flip ? "lg:order-2 lg:justify-self-end" : "lg:order-1 lg:justify-self-start"}`}>{mockup(visible)}</div>

      {/* Text */}
      <div className={`w-full max-w-xl ${flip ? "lg:order-1 lg:justify-self-start" : "lg:order-2 lg:justify-self-end"}`}>
        <p
          className="text-xs font-bold uppercase tracking-wider mb-3"
          style={{ color: "#F4611A" }}
        >
          {label}
        </p>
        <h3
          className="text-3xl sm:text-4xl font-black leading-tight mb-4"
          style={{ color: "#1A0F3C", textWrap: "balance" } as React.CSSProperties}
        >
          {heading}
        </h3>
        <p className="text-base leading-relaxed mb-8" style={{ color: "#787878" }}>
          {body}
        </p>
        <div>
          <p
            className="font-black leading-none mb-1"
            style={{ fontSize: 52, color: "#F4611A", fontVariantNumeric: "tabular-nums" }}
          >
            {count}{statSuffix}
          </p>
          <p className="text-sm font-medium" style={{ color: "#999" }}>{statLabel}</p>
        </div>
      </div>
    </div>
  );
}

/* ── Individual mockups ── */

function MockupWorkspace({ visible }: { visible: boolean }) {
  return (
    <div
      className="rounded-2xl p-5"
      style={{ background: "#1A0F3C", boxShadow: "0 16px 56px rgba(26,15,60,0.28)" }}
    >
      <p className="text-xs font-bold uppercase tracking-wider mb-1" style={{ color: "rgba(255,255,255,0.35)", ...rise(visible, 0) }}>
        Client
      </p>
      <p className="text-lg font-black text-white mb-1" style={rise(visible, 1)}>Kim Creed</p>
      <p className="text-xs mb-5" style={{ color: "rgba(255,255,255,0.4)", ...rise(visible, 2) }}>Budget $2,450 · 12 tasks</p>

      <div className="flex flex-col gap-2">
        {[
          { label: "Branding for agency", variant: "muted" },
          { label: "Website design", variant: "orange" },
          { label: "Webflow development", variant: "light" },
        ].map(({ label, variant }, i) => (
          <div
            key={label}
            className="flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-semibold"
            style={{
              background:
                variant === "orange"
                  ? "#F4611A"
                  : variant === "light"
                  ? "rgba(255,255,255,0.1)"
                  : "rgba(255,255,255,0.07)",
              color: variant === "orange" ? "#fff" : "rgba(255,255,255,0.7)",
              ...rise(visible, i + 3),
            }}
          >
            <span>{label}</span>
            <span
              className="w-5 h-5 rounded-md flex items-center justify-center text-xs"
              style={{ background: variant === "orange" ? "rgba(255,255,255,0.25)" : "rgba(255,255,255,0.12)" }}
            >
              →
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

function MockupUpdates({ visible }: { visible: boolean }) {
  return (
    <div
      className="rounded-2xl p-5"
      style={{
        background: "linear-gradient(135deg,#F4611A,#FF8C42)",
        boxShadow: "0 16px 56px rgba(244,97,26,0.35)",
      }}
    >
      <div
        className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold mb-4"
        style={{ background: "#1A0F3C", color: "#fff", ...rise(visible, 0) }}
      >
        Project milestones &nbsp;<strong>3/6</strong>
      </div>

      <div
        className="h-1.5 rounded-full mb-5 overflow-hidden"
        style={{ background: "rgba(255,255,255,0.2)" }}
      >
        <div
          className="h-full rounded-full"
          style={{
            width: visible ? "50%" : "0%",
            background: "#fff",
            transition: "width 0.9s cubic-bezier(.22,.68,0,1.1) 0.35s",
          }}
        />
      </div>

      <div className="rounded-xl p-4 bg-white" style={rise(visible, 2)}>
        <p className="text-xs font-bold uppercase tracking-wider mb-3" style={{ color: "#bbb" }}>
          Recent updates
        </p>
        {[
          { text: "Homepage visuals uploaded", time: "5h ago" },
          { text: "Brand guidelines approved", time: "5h ago" },
        ].map((item, i) => (
          <div
            key={item.text}
            className="flex justify-between items-center py-2 text-xs"
            style={{ borderBottom: "1px solid #F0EDE9", ...rise(visible, i + 3) }}
          >
            <span style={{ color: "#1A0F3C", fontWeight: 600 }}>{item.text}</span>
            <span style={{ color: "#bbb" }}>{item.time}</span>
          </div>
        ))}
        <div className="flex justify-end mt-3">
          <div
            className="w-7 h-7 rounded-full flex items-center justify-center text-white text-sm font-bold"
            style={{ background: "#F4611A" }}
          >
            →
          </div>
        </div>
      </div>
    </div>
  );
}

function MockupCashflow({ visible }: { visible: boolean }) {
  return (
    <div
      className="rounded-2xl p-5"
      style={{ background: "#1A0F3C", boxShadow: "0 16px 56px rgba(26,15,60,0.28)" }}
    >
      <p className="text-xs font-bold uppercase tracking-wider mb-1" style={{ color: "rgba(255,255,255,0.35)", ...rise(visible, 0) }}>
        Revenue
      </p>
      <p className="text-3xl font-black text-white mb-0.5" style={{ fontVariantNumeric: "tabular-nums", ...rise(visible, 1) }}>
        $5,280
      </p>
      <p className="text-xs mb-3" style={{ color: "rgba(255,255,255,0.4)", ...rise(visible, 2) }}>66% of monthly goal</p>

      <div
        className="h-2 rounded-full mb-1.5 overflow-hidden"
        style={{ background: "rgba(255,255,255,0.1)" }}
      >
        <div
          className="h-full rounded-full"
          style={{
            width: visible ? "66%" : "0%",
            background: "#F4611A",
            transition: "width 0.9s cubic-bezier(.22,.68,0,1.1) 0.35s",
          }}
        />
      </div>
      <p className="text-xs mb-5 font-semibold" style={{ color: "#F4611A", ...rise(visible, 3) }}>Goal: $8,000</p>

      <div className="flex flex-col gap-2">
        {[
          { label: "Yesterday", amount: "$1,500" },
          { label: "Dec 20 2025", amount: "$1,500" },
          { label: "Dec 7 2025", amount: "$4,600" },
        ].map(({ label, amount }, i) => (
          <div
            key={label}
            className="flex justify-between items-center px-3 py-2.5 rounded-xl text-xs"
            style={{ background: "rgba(255,255,255,0.06)", ...rise(visible, i + 4) }}
          >
            <span style={{ color: "rgba(255,255,255,0.55)" }}>{label}</span>
            <span className="font-bold text-white">{amount}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function HowWeHelp() {
  return (
    <section id="how" className="py-12 px-6" style={{ background: "#FAFAF8" }}>
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="mb-4 tivra-reveal">
          <p
            className="text-xs font-bold tracking-[0.16em] uppercase mb-4"
            style={{ color: "#F4611A" }}
          >
            How We Help
          </p>
          <h2
            className="text-4xl sm:text-5xl font-black leading-tight max-w-xl"
            style={{ color: "#111111", textWrap: "balance" } as React.CSSProperties}
          >
            Everything you need to go from idea to online.
          </h2>
        </div>

        <FeatureSection
          label="Organised client spaces"
          heading="One place for every client project"
          body="Give each client a dedicated space with all their projects, files, and updates — so nothing falls through the cracks and handoffs are instant."
          statValue={250}
          statSuffix="%"
          statLabel="faster first-deliverable handoff"
          mockup={(visible) => <MockupWorkspace visible={visible} />}
        />

        <FeatureSection
          flip
          label="Smart communication & updates"
          heading="Keep clients informed automatically"
          body="Send structured updates, collect approvals, and share milestones — without writing a single status email."
          statValue={40}
          statSuffix="%"
          statLabel="fewer client status check-ins"
          mockup={(visible) => <MockupUpdates visible={visible} />}
        />

        <FeatureSection
          label="Cash flow & payments"
          heading="Monitor revenue goals in real time"
          body="Track payments, invoices, and monthly targets in one clean dashboard. No spreadsheets, no chasing."
          statValue={30}
          statSuffix="%"
          statLabel="faster payment collection"
          mockup={(visible) => <MockupCashflow visible={visible} />}
        />

      </div>
    </section>
  );
}
