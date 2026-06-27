const steps = [
  {
    num: "01",
    title: "Create your workspace",
    desc: "Set up your project space, define the scope, and invite your client. Everything starts in one organised place.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <rect x="2" y="2" width="7" height="7" rx="2" fill="#F4611A"/>
        <rect x="11" y="2" width="7" height="7" rx="2" fill="#F4611A" opacity=".4"/>
        <rect x="2" y="11" width="7" height="7" rx="2" fill="#F4611A" opacity=".4"/>
        <rect x="11" y="11" width="7" height="7" rx="2" fill="#F4611A" opacity=".2"/>
      </svg>
    ),
  },
  {
    num: "02",
    title: "Share every update clearly",
    desc: "Upload files, post updates, send messages, and manage approvals — all in one portal your clients actually understand.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <path d="M4 6h12M4 10h8M4 14h10" stroke="#F4611A" strokeWidth="2" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    num: "03",
    title: "Align on every next step",
    desc: "Clients stay in sync with progress, timelines, and upcoming milestones — without chasing you for status updates.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <path d="M10 4v12M5 9l5-5 5 5" stroke="#F4611A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
];

export default function WhatWeDo() {
  return (
    <section id="services" className="py-24 px-6" style={{ background: "#fff" }}>
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="mb-16 tivra-reveal">
          <p
            className="text-xs font-bold tracking-[0.16em] uppercase mb-4"
            style={{ color: "#F4611A" }}
          >
            How it works
          </p>
          <h2
            className="text-4xl sm:text-5xl font-black leading-tight max-w-xl"
            style={{ color: "#111111", textWrap: "balance" } as React.CSSProperties}
          >
            The way client collaboration should work from the start.
          </h2>
        </div>

        {/* Three-column cards */}
        <div className="grid sm:grid-cols-3 gap-5">
          {steps.map((s, i) => (
            <div
              key={s.num}
              className="rounded-2xl p-6 tivra-reveal"
              data-delay={String(i + 1)}
              style={{ background: "#1A0F3C" }}
            >
              {/* Number + icon row */}
              <div className="flex items-center justify-between mb-6">
                <span
                  className="text-xs font-black tracking-widest"
                  style={{ color: "rgba(255,255,255,0.2)" }}
                >
                  {s.num}
                </span>
                <div
                  className="w-9 h-9 rounded-xl flex items-center justify-center"
                  style={{ background: "rgba(244,97,26,0.15)" }}
                >
                  {s.icon}
                </div>
              </div>

              <h3 className="font-black text-lg mb-3 text-white">{s.title}</h3>
              <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.5)" }}>
                {s.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-10 flex items-center justify-between flex-wrap gap-4 tivra-reveal" data-delay="4">
          <p className="text-base" style={{ color: "#787878" }}>
            Not sure what you need?{" "}
            <a href="#book" className="font-semibold" style={{ color: "#111111" }}>
              Let&apos;s figure it out together →
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}
