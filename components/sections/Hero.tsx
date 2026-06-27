import WorldMapBg from "@/components/WorldMapBg";
import TypewriterLoop from "@/components/TypewriterLoop";
import CountUp from "@/components/CountUp";

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

      {/* World map overlay — real Natural Earth 1:110m data */}
      <WorldMapBg />

      {/* Above-fold content */}
      <div className="relative z-10 flex flex-col items-center text-center max-w-4xl mx-auto">
        {/* Headline */}
        <h1
          className="text-[2rem] sm:text-[2.875rem] lg:text-[3.5rem] font-black leading-[1.1] tracking-tight mb-6 text-white"
        >
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

        {/* Subtitle — typewriter loop, fixed height prevents layout shift */}
        <div style={{ height: "5.5rem", marginBottom: "0.25rem" }} className="flex items-start max-w-lg w-full justify-center">
          <TypewriterLoop
            className="text-lg leading-relaxed text-center"
            style={{ color: "rgba(255,255,255,0.75)" }}
          />
        </div>

        {/* CTA */}
        <a
          href="#book"
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

        {/* Trust badges */}
        <div className="flex flex-wrap justify-center gap-6">
          {["Fast Delivery", "Startup-Friendly Pricing", "Ongoing Support"].map((label) => (
            <div key={label} className="flex items-center gap-1.5">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <circle cx="8" cy="8" r="8" fill="rgba(255,255,255,0.22)" />
                <path d="M5 8l2 2 4-4" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span className="text-sm font-medium" style={{ color: "rgba(255,255,255,0.8)" }}>
                {label}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Floating illustration — max-w-5xl so side cards at left-0/right-0 overlap browser */}
      <div className="relative z-10 w-full max-w-5xl mx-auto mt-14">
        <div className="relative flex justify-center items-end px-4">

          {/* Left floating card — Project Scope */}
          <div
            className="absolute left-0 bottom-10 hidden lg:flex flex-col gap-2"
            style={{ zIndex: 10, animation: "tivra-float-in 0.7s 0.55s cubic-bezier(.22,.68,0,1.2) both" }}
          >
            {/* Label chip */}
            <div className="flex items-center gap-1.5 self-start px-2.5 py-1 rounded-full text-xs font-semibold" style={{ background: "rgba(255,255,255,0.22)", color: "#fff", backdropFilter: "blur(8px)" }}>
              <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: "#F4611A" }} />
              Project Scope
            </div>
            {/* Card */}
            <div
              className="illus-card illus-scope rounded-2xl p-4 w-56"
              style={{ background: "#fff", boxShadow: "0 12px 40px rgba(0,0,0,0.22)", border: "1px solid #F0EDE9" }}
            >
              {[
                { label: "Homepage Design", color: "#007B6E", done: true },
                { label: "Services Page",   color: "#F4611A", done: true },
                { label: "Contact Form",    color: "#FFBA00", done: false },
              ].map((item) => (
                <div key={item.label} className="flex items-center gap-2 py-1">
                  <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: item.color }} />
                  <span className="text-xs flex-1" style={{ color: item.done ? "#111" : "#ABABAB" }}>{item.label}</span>
                  {item.done && <span className="text-xs font-bold" style={{ color: "#007B6E" }}>✓</span>}
                </div>
              ))}
            </div>
          </div>

          {/* Center — browser mockup */}
          <div
            className="illus-card illus-browser rounded-2xl overflow-hidden w-full max-w-3xl"
            style={{
              boxShadow: "0 24px 80px rgba(0,0,0,0.3)",
              border: "1px solid rgba(255,255,255,0.15)",
              background: "#fff",
            }}
          >
            {/* Browser chrome */}
            <div className="flex items-center gap-1.5 px-4 py-3" style={{ background: "#F2EFEA", borderBottom: "1px solid #E5E1DB" }}>
              <div className="w-2.5 h-2.5 rounded-full" style={{ background: "#FF5F57" }} />
              <div className="w-2.5 h-2.5 rounded-full" style={{ background: "#FFBD2E" }} />
              <div className="w-2.5 h-2.5 rounded-full" style={{ background: "#28CA42" }} />
              <div className="ml-4 flex-1 rounded-full px-3 py-1 text-xs" style={{ background: "#fff", color: "#ABABAB", border: "1px solid #E5E1DB", maxWidth: 220 }}>
                tivra.in/your-website
              </div>
            </div>
            {/* Three-card product UI */}
            <div className="grid grid-cols-3 gap-2 p-3" style={{ background: "#F5F3F0" }}>
              {/* Left — client card */}
              <div className="rounded-xl p-2.5 bg-white" style={{ border: "1px solid #E8D9C8" }}>
                <div className="w-7 h-7 rounded-full flex items-center justify-center font-bold text-white mb-2" style={{ background: "linear-gradient(135deg,#F4611A,#FFBA00)", fontSize: 9 }}>AK</div>
                <p className="font-bold mb-0.5" style={{ fontSize: 10, color: "#1A0F3C" }}>Alex Kim</p>
                <p className="mb-2" style={{ fontSize: 9, color: "#999" }}>Radiant · $4,280</p>
                <div className="flex flex-col gap-1 mb-2">
                  {[["Projects",3,200],["Updates",6,350],["Invoices",4,500]].map(([l,v,d]) => (
                    <div key={l as string} className="flex justify-between" style={{ fontSize: 9 }}>
                      <span style={{ color: "#999" }}>{l}</span>
                      <span className="font-bold" style={{ color: "#1A0F3C" }}>
                        <CountUp to={v as number} duration={1000} delay={d as number} />
                      </span>
                    </div>
                  ))}
                </div>
                <div className="w-5 h-5 rounded-md flex items-center justify-center" style={{ background: "#F4611A" }}>
                  <svg width="8" height="8" viewBox="0 0 8 8" fill="none"><path d="M4 1v6M1 4l3-3 3 3" stroke="white" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </div>
              </div>
              {/* Center — activity feed */}
              <div className="rounded-xl p-2.5" style={{ background: "#1A0F3C" }}>
                <p className="font-bold uppercase mb-2" style={{ fontSize: 8, letterSpacing: "0.06em", color: "rgba(255,255,255,0.35)" }}>Activity</p>
                {[
                  { dot: "#F4611A", text: "Homepage visuals uploaded", time: "5h" },
                  { dot: "#22C55E", text: "Brand guidelines approved", time: "4h" },
                  { dot: "#3B82F6", text: "Feedback on mockups",       time: "1d" },
                  { dot: "rgba(255,255,255,0.3)", text: "Scope finalised", time: "2d" },
                ].map((item, i) => (
                  <div key={i} className="flex gap-1.5 py-1" style={{ borderBottom: i < 3 ? "1px solid rgba(255,255,255,0.07)" : "none" }}>
                    <div className="w-1.5 h-1.5 rounded-full flex-shrink-0 mt-0.5" style={{ background: item.dot }} />
                    <div className="flex-1 min-w-0">
                      <p className="leading-snug truncate" style={{ fontSize: 9, color: "rgba(255,255,255,0.85)" }}>{item.text}</p>
                      <p style={{ fontSize: 8, color: "rgba(255,255,255,0.3)" }}>{item.time}</p>
                    </div>
                  </div>
                ))}
                <div className="mt-2 py-1 px-2 rounded-full flex items-center justify-center gap-1 font-semibold text-white" style={{ background: "#F4611A", fontSize: 9 }}>Confirm stage ✓</div>
              </div>
              {/* Right — chat + task */}
              <div className="rounded-xl p-2.5 bg-white flex flex-col gap-1.5" style={{ border: "1px solid #E8D9C8" }}>
                <div className="rounded-xl rounded-bl-sm px-2 py-1 self-start" style={{ background: "#F3F4F6", color: "#1A0F3C", fontSize: 9, lineHeight: 1.4 }}>Expect an update soon!</div>
                <div className="rounded-xl rounded-br-sm px-2 py-1 self-end" style={{ background: "#F4611A", color: "#fff", fontSize: 9, lineHeight: 1.4 }}>Thank you! 👋</div>
                <div className="mt-auto rounded-lg p-2" style={{ background: "#F0FDF4", border: "1px solid #BBF7D0" }}>
                  <p className="font-bold mb-0.5" style={{ fontSize: 8, color: "#16A34A" }}>✓ Task completed</p>
                  <p className="font-semibold leading-snug" style={{ fontSize: 9, color: "#1A0F3C" }}>Redesign hero for About us</p>
                  <p style={{ fontSize: 8, color: "#999" }}>Website redesign</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right — notification + stat cards */}
          <div
            className="absolute right-0 top-0 hidden lg:flex flex-col gap-2 items-end"
            style={{ zIndex: 10, animation: "tivra-float-in 0.7s 0.75s cubic-bezier(.22,.68,0,1.2) both" }}
          >
            {/* Notification label + card */}
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold self-end" style={{ background: "rgba(255,255,255,0.22)", color: "#fff", backdropFilter: "blur(8px)" }}>
              <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: "#007B6E" }} />
              Live Status
            </div>
            <div
              className="illus-card illus-notify rounded-2xl px-4 py-3 flex items-center gap-3"
              style={{ background: "#fff", boxShadow: "0 8px 32px rgba(0,0,0,0.18)", border: "1px solid #F0EDE9" }}
            >
              <div className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold text-white flex-shrink-0" style={{ background: "#007B6E" }}>✓</div>
              <div>
                <p className="text-xs font-bold" style={{ color: "#111" }}>Client Approved</p>
                <p className="text-xs" style={{ color: "#ABABAB" }}>Just now</p>
              </div>
            </div>

            {/* Stat label + card */}
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold self-end mt-1" style={{ background: "rgba(255,255,255,0.22)", color: "#fff", backdropFilter: "blur(8px)" }}>
              <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: "#F4611A" }} />
              Performance
            </div>
            <div
              className="illus-card illus-stat rounded-2xl p-4"
              style={{ background: "#111111", boxShadow: "0 8px 32px rgba(0,0,0,0.25)" }}
            >
              <p className="text-xs mb-1" style={{ color: "rgba(255,255,255,0.45)" }}>Avg. Delivery</p>
              <p className="text-3xl font-black text-white" style={{ fontVariantNumeric: "tabular-nums" }}>
                <CountUp from={14} to={7} duration={1400} suffix=" days" loop holdDuration={2000} />
              </p>
              <p className="text-xs mt-1 font-semibold" style={{ color: "#007B6E" }}>
                ↓ <CountUp to={3} duration={1200} delay={300} suffix="× faster than average" />
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
