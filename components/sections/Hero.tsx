import WorldMapBg from "@/components/WorldMapBg";
import TypewriterLoop from "@/components/TypewriterLoop";
import CountUp from "@/components/CountUp";
import HeroProgressBar from "@/components/HeroProgressBar";
import HeroCardReveal from "@/components/HeroCardReveal";

// ── Mini admin panel data ────────────────────────────────────────────────────
const MINI_COLS = [
  {
    label: "Lead",
    dot: "#F4611A",
    bg: "#FDEEE4",
    cards: [
      { name: "Zara Studio",   type: "Landing Page", pct: 10,  typeTxt: "#C44F0E", typeBg: "#FDEEE4" },
      { name: "Byte Labs",     type: "E-Commerce",   pct: 10,  typeTxt: "#007B6E", typeBg: "#E0F3F1" },
      { name: "Peak Digital",  type: "SaaS",         pct: 10,  typeTxt: "#6B5E7A", typeBg: "#F2EFF8" },
    ],
  },
  {
    label: "In Progress",
    dot: "#D4900A",
    bg: "#FFF5D6",
    cards: [
      { name: "Nova Health",   type: "Booking Site", pct: 50,  typeTxt: "#D93025", typeBg: "#FDECEA" },
      { name: "Kite Design",   type: "Portfolio",    pct: 50,  typeTxt: "#8A6000", typeBg: "#FFF5D6" },
      { name: "Maple Agency",  type: "Landing Page", pct: 65,  typeTxt: "#C44F0E", typeBg: "#FDEEE4" },
    ],
  },
  {
    label: "In Review",
    dot: "#007B6E",
    bg: "#E0F3F1",
    cards: [
      { name: "Sun Roast Co",  type: "Blog",         pct: 85,  typeTxt: "#4B3B8C", typeBg: "#EAE7F5" },
      { name: "Grid Studio",   type: "E-Commerce",   pct: 85,  typeTxt: "#007B6E", typeBg: "#E0F3F1" },
    ],
  },
  {
    label: "Delivered",
    dot: "#4B3B8C",
    bg: "#EAE7F5",
    cards: [
      { name: "Lumina AI",     type: "Landing Page", pct: 100, typeTxt: "#C44F0E", typeBg: "#FDEEE4" },
      { name: "Atlas Co",      type: "Portfolio",    pct: 100, typeTxt: "#8A6000", typeBg: "#FFF5D6" },
    ],
  },
];

// ── Sprint progress items (left floating card) ───────────────────────────────
const SPRINT = [
  { label: "Homepage Design",   color: "#007B6E", pct: 100, done: true  },
  { label: "Services Page",     color: "#F4611A", pct: 80,  done: false },
  { label: "Contact Form",      color: "#FFBA00", pct: 45,  done: false },
  { label: "Mobile Responsive", color: "#3B82F6", pct: 20,  done: false },
];

export default function Hero() {
  return (
    <section
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden pt-28 pb-20 px-6"
      style={{ background: "#F4611A" }}
    >
      {/* Grid overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.09) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.09) 1px, transparent 1px)
          `,
          backgroundSize: "44px 44px",
        }}
      />

      <WorldMapBg />

      {/* ── Above-fold content ── */}
      <div className="relative z-10 flex flex-col items-center text-center max-w-4xl mx-auto">
        {/* Floating context pill */}
        <div
          className="mb-5 flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-semibold"
          style={{
            background: "rgba(255,255,255,0.18)",
            backdropFilter: "blur(12px)",
            color: "#fff",
            border: "1px solid rgba(255,255,255,0.28)",
            animation: "tivra-float-in 0.6s 0.05s cubic-bezier(.22,.68,0,1.2) both",
          }}
        >
          <span
            className="w-2 h-2 rounded-full flex-shrink-0"
            style={{ background: "#fff", animation: "tivra-cursor-blink 1.8s ease-in-out infinite" }}
          />
          Trusted by 50+ growing startups
        </div>

        <h1 className="text-[2rem] sm:text-[2.875rem] lg:text-[3.5rem] font-black leading-[1.1] tracking-tight mb-6 text-white">
          Building intelligent software that works at the<br />
          <span
            style={{
              color: "#1A0F3C",
              animation: "tivra-blur-in 0.9s 0.25s cubic-bezier(.22,.68,0,1) both",
              display: "inline-block",
            }}
          >
            speed of thought.
          </span>
        </h1>

        <div style={{ height: "5.5rem", marginBottom: "0.25rem" }} className="flex items-start max-w-lg w-full justify-center">
          <TypewriterLoop
            className="text-lg leading-relaxed text-center"
            style={{ color: "rgba(255,255,255,0.75)" }}
          />
        </div>

        <a
          href="/book-demo"
          className="flex items-center rounded-full overflow-hidden flex-shrink-0 hover:opacity-90 active:scale-95 mb-4 transition-opacity"
          style={{ background: "#111111", boxShadow: "0 4px 20px rgba(0,0,0,0.28)" }}
        >
          <span className="pl-5 pr-3 text-sm font-semibold text-white whitespace-nowrap" style={{ paddingTop: "0.5rem", paddingBottom: "0.5rem" }}>
            Book a Free Call
          </span>
          <span className="w-8 h-8 flex items-center justify-center rounded-full flex-shrink-0 m-0.5" style={{ background: "#F4611A" }}>
            <svg width="11" height="11" viewBox="0 0 11 11" fill="none">
              <path d="M2 9L9 2M9 2H4M9 2V7" stroke="white" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
        </a>

        <div className="flex flex-wrap justify-center gap-6">
          {["Fast Delivery", "Startup-Friendly Pricing", "Ongoing Support"].map((label) => (
            <div key={label} className="flex items-center gap-1.5">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <circle cx="8" cy="8" r="8" fill="rgba(255,255,255,0.22)" />
                <path d="M5 8l2 2 4-4" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span className="text-sm font-medium" style={{ color: "rgba(255,255,255,0.8)" }}>{label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ── Floating illustration ── */}
      <div className="relative z-10 w-full max-w-5xl mx-auto mt-14">
        <div className="relative flex justify-center items-end px-4">

          {/* ── Left — Sprint Progress (scroll-triggered fly-in) ── */}
          <HeroCardReveal
            from="left"
            className="absolute left-0 hidden lg:flex flex-col gap-2"
            style={{ top: "8%", zIndex: 20 }}
          >
            <div className="flex items-center gap-1.5 self-start px-2.5 py-1 rounded-full text-xs font-semibold" style={{ background: "rgba(255,255,255,0.22)", color: "#fff", backdropFilter: "blur(8px)" }}>
              <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: "#F4611A" }} />
              Project Scope
            </div>
            <div
              className="illus-card illus-scope rounded-2xl p-5 w-72"
              style={{ background: "#fff", boxShadow: "0 16px 56px rgba(0,0,0,0.26)", border: "1px solid #F0EDE9" }}
            >
              <p className="text-xs font-bold uppercase mb-3" style={{ color: "#ABABAB", letterSpacing: "0.07em" }}>Sprint Progress</p>
              {SPRINT.map((item, i) => (
                <div key={item.label} className="mb-3 last:mb-0">
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center gap-1.5">
                      <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: item.color }} />
                      <span className="text-xs" style={{ color: item.done ? "#111" : "#666" }}>{item.label}</span>
                    </div>
                    {item.done
                      ? <span className="text-xs font-bold" style={{ color: "#007B6E" }}>✓</span>
                      : <span className="text-xs" style={{ color: "#ABABAB" }}>{item.pct}%</span>
                    }
                  </div>
                  {/* Scroll-triggered animated bar — fires when card enters viewport, resets when it leaves */}
                  <HeroProgressBar pct={item.pct} color={item.color} delay={i * 160} />
                </div>
              ))}
            </div>
          </HeroCardReveal>

          {/* ── Center — browser mockup with mini admin panel ── */}
          <div style={{ animation: "tivra-float-in 0.9s 0.2s cubic-bezier(.22,.68,0,1.15) both", width: "100%", maxWidth: "48rem" }}>
          <div
            className="illus-card illus-browser rounded-2xl overflow-hidden w-full"
            style={{ boxShadow: "0 24px 80px rgba(0,0,0,0.3)", border: "1px solid rgba(255,255,255,0.15)", background: "#fff" }}
          >
            {/* Apple three-dot chrome */}
            <div className="flex items-center gap-1.5 px-4 py-3" style={{ background: "#F2EFEA", borderBottom: "1px solid #E5E1DB" }}>
              <div className="w-2.5 h-2.5 rounded-full" style={{ background: "#FF5F57" }} />
              <div className="w-2.5 h-2.5 rounded-full" style={{ background: "#FFBD2E" }} />
              <div className="w-2.5 h-2.5 rounded-full" style={{ background: "#28CA42" }} />
              <div className="ml-4 flex-1 rounded-full px-3 py-1 text-xs" style={{ background: "#fff", color: "#ABABAB", border: "1px solid #E5E1DB", maxWidth: 220 }}>
                tivra.in/dashboard
              </div>
            </div>

            {/* App header */}
            <div className="flex items-center justify-between px-3 py-2" style={{ background: "#fff", borderBottom: "1px solid #E8E4DE" }}>
              <div className="flex items-center gap-1.5">
                <span style={{ fontSize: 10, fontWeight: 700, color: "#ABABAB" }}>Tivra</span>
                <span style={{ fontSize: 10, color: "#ABABAB" }}>/</span>
                <span style={{ fontSize: 10, fontWeight: 700, color: "#111" }}>Board</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1 rounded-md px-2 py-1" style={{ background: "#F5F3F0", border: "1px solid #E8E4DE" }}>
                  <svg width="8" height="8" viewBox="0 0 14 14" fill="none">
                    <circle cx="5.5" cy="5.5" r="4" stroke="#ABABAB" strokeWidth="1.4"/>
                    <path d="M9 9l3 3" stroke="#ABABAB" strokeWidth="1.4" strokeLinecap="round"/>
                  </svg>
                  <span style={{ fontSize: 8, color: "#ABABAB" }}>Search…</span>
                </div>
                <div className="w-6 h-6 rounded-md flex items-center justify-center" style={{ background: "#F5F3F0" }}>
                  <svg width="11" height="11" viewBox="0 0 17 17" fill="none">
                    <path d="M8.5 1.5A5 5 0 003.5 6.5v3l-1.5 2h13l-1.5-2v-3a5 5 0 00-5-5z" stroke="#ABABAB" strokeWidth="1.4"/>
                    <path d="M6.5 13.5a2 2 0 004 0" stroke="#ABABAB" strokeWidth="1.4" strokeLinecap="round"/>
                  </svg>
                </div>
                <div className="w-6 h-6 rounded-full flex items-center justify-center font-black text-white" style={{ background: "#F4611A", fontSize: 8 }}>T</div>
              </div>
            </div>

            {/* Body: sidebar + kanban */}
            <div className="flex" style={{ height: "320px", background: "#F5F3F0" }}>

              {/* Mini sidebar */}
              <div className="flex flex-col items-center py-2 gap-0.5 shrink-0" style={{ width: 32, background: "#fff", borderRight: "1px solid #E8E4DE" }}>
                <div className="w-5 h-5 rounded-md flex items-center justify-center font-black text-white mb-2" style={{ background: "#F4611A", fontSize: 7 }}>T</div>
                {[
                  { active: false, d: "M1 6l6-5 6 5v6a1 1 0 01-1 1H2a1 1 0 01-1-1V6z" },
                  { active: true,  d: null }, // board — special multi-rect
                  { active: false, d: "M1 12c0-2 2-3.5 5-3.5s5 1.5 5 3.5M6 5a2.5 2.5 0 100-5 2.5 2.5 0 000 5z" },
                ].map((item, i) => (
                  <button
                    key={i}
                    className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0"
                    style={{ background: item.active ? "#F4611A" : "transparent", color: item.active ? "#fff" : "#ABABAB" }}
                  >
                    {item.d ? (
                      <svg width="11" height="11" viewBox="0 0 13 13" fill="none">
                        <path d={item.d} stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round"/>
                      </svg>
                    ) : (
                      <svg width="11" height="11" viewBox="0 0 13 13" fill="none">
                        <rect x="1" y="1" width="4" height="10" rx="1" stroke="currentColor" strokeWidth="1.3"/>
                        <rect x="7" y="1" width="4" height="6" rx="1" stroke="currentColor" strokeWidth="1.3"/>
                        <rect x="7" y="8.5" width="4" height="2.5" rx="1" stroke="currentColor" strokeWidth="1.3"/>
                      </svg>
                    )}
                  </button>
                ))}
                <div className="mt-auto pb-1">
                  <button className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ color: "#ABABAB" }}>
                    <svg width="11" height="11" viewBox="0 0 14 14" fill="none">
                      <circle cx="7" cy="7" r="2" stroke="currentColor" strokeWidth="1.3"/>
                      <path d="M7 1v2M7 11v2M1 7h2M11 7h2" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
                    </svg>
                  </button>
                </div>
              </div>

              {/* Kanban columns */}
              <div className="flex-1 overflow-hidden p-2">
                <div className="grid grid-cols-4 gap-1.5 h-full">
                  {MINI_COLS.map((col) => (
                    <div key={col.label} className="flex flex-col gap-1.5 overflow-hidden min-w-0">
                      {/* Column header */}
                      <div className="flex items-center justify-between px-0.5">
                        <div className="flex items-center gap-1">
                          <div className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: col.dot }} />
                          <span style={{ fontSize: 8, fontWeight: 700, color: "#555", whiteSpace: "nowrap" }}>{col.label}</span>
                        </div>
                        <span className="rounded-full px-1.5 py-0.5 font-bold" style={{ fontSize: 7, background: col.bg, color: col.dot }}>{col.cards.length}</span>
                      </div>

                      {/* Cards */}
                      {col.cards.map((card, i) => (
                        <div key={i} className="rounded-lg p-2 flex-shrink-0" style={{ background: "#fff", border: "1px solid #EDE9E3" }}>
                          <span className="inline-block rounded-full px-1.5 py-0.5 mb-1.5 font-bold" style={{ fontSize: 7, background: card.typeBg, color: card.typeTxt }}>
                            {card.type}
                          </span>
                          <p style={{ fontSize: 9, fontWeight: 700, color: "#111", lineHeight: 1.3, marginBottom: 5 }}>{card.name}</p>
                          {/* Static progress bar — decorative inside the "screenshot" */}
                          <div className="h-1 rounded-full overflow-hidden mb-1.5" style={{ background: "#F2EFEA" }}>
                            <div className="h-full rounded-full" style={{ width: `${card.pct}%`, background: card.pct === 100 ? "#007B6E" : col.dot }} />
                          </div>
                          <div className="flex items-center justify-between">
                            <div className="w-4 h-4 rounded-full flex items-center justify-center font-black text-white" style={{ background: col.dot, fontSize: 6 }}>
                              {card.name[0]}
                            </div>
                            <span style={{ fontSize: 7, color: "#ABABAB" }}>
                              {card.pct === 100 ? "✓ Done" : `${card.pct}%`}
                            </span>
                          </div>
                        </div>
                      ))}

                      {/* Add card ghost — only on first column */}
                      {col.label === "Lead" && (
                        <div className="rounded-lg flex items-center justify-center py-1.5" style={{ border: "1.5px dashed #E0DAD4" }}>
                          <span style={{ fontSize: 8, color: "#ABABAB" }}>+ Add card</span>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Status bar */}
            <div className="flex items-center justify-between px-4 py-2.5" style={{ background: "#1A0F3C" }}>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full" style={{ background: "#22C55E" }} />
                <span style={{ fontSize: 10, color: "rgba(255,255,255,0.45)" }}>3 active projects</span>
              </div>
              <div className="flex items-center">
                {(["#F4611A","#007B6E","#3B82F6"] as string[]).map((c, i) => (
                  <div
                    key={i}
                    className="w-5 h-5 rounded-full flex items-center justify-center font-bold text-white"
                    style={{ background: c, fontSize: 7, border: "2px solid rgba(255,255,255,0.12)", marginLeft: i > 0 ? -6 : 0 }}
                  >
                    {(["T","A","K"] as string[])[i]}
                  </div>
                ))}
                <span className="ml-2" style={{ fontSize: 10, color: "rgba(255,255,255,0.4)" }}>Your team</span>
              </div>
            </div>
          </div>
          </div>{/* end browser animation wrapper */}

          {/* ── Right — notification + stat cards (scroll-triggered fly-in) ── */}
          <HeroCardReveal
            from="right"
            delay={180}
            className="absolute right-0 top-0 hidden lg:flex flex-col gap-3 items-end"
            style={{ zIndex: 20 }}
          >
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold self-end" style={{ background: "rgba(255,255,255,0.22)", color: "#fff", backdropFilter: "blur(8px)" }}>
              <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: "#007B6E" }} />
              Live Status
            </div>
            <div
              className="illus-card illus-notify rounded-2xl px-4 py-3.5 flex items-center gap-3"
              style={{ background: "#fff", boxShadow: "0 8px 40px rgba(0,0,0,0.22)", border: "1px solid #F0EDE9", minWidth: "210px" }}
            >
              <div className="w-10 h-10 rounded-full flex items-center justify-center text-base font-bold text-white flex-shrink-0" style={{ background: "#007B6E" }}>✓</div>
              <div>
                <p className="text-sm font-bold" style={{ color: "#111" }}>Client Approved</p>
                <p className="text-xs" style={{ color: "#ABABAB" }}>Just now</p>
              </div>
            </div>

            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold self-end mt-1" style={{ background: "rgba(255,255,255,0.22)", color: "#fff", backdropFilter: "blur(8px)" }}>
              <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: "#F4611A" }} />
              Performance
            </div>
            <div
              className="illus-card illus-stat rounded-2xl p-5"
              style={{ background: "#111111", boxShadow: "0 8px 40px rgba(0,0,0,0.3)", minWidth: "210px" }}
            >
              <p className="text-xs mb-1.5" style={{ color: "rgba(255,255,255,0.45)" }}>Avg. Delivery</p>
              <p className="text-3xl font-black text-white" style={{ fontVariantNumeric: "tabular-nums" }}>
                <CountUp from={14} to={7} duration={1400} suffix=" days" loop holdDuration={2000} />
              </p>
              <p className="text-xs mt-1.5 font-semibold" style={{ color: "#007B6E" }}>
                ↓ <CountUp to={3} duration={1200} delay={300} suffix="× faster than average" />
              </p>
            </div>
          </HeroCardReveal>

        </div>
      </div>
    </section>
  );
}
