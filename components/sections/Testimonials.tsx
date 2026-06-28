"use client";

const featured = {
  quote: "Tivra transformed our online presence in two weeks. We went from a broken WordPress site to a professional platform that actually drives enquiries. The team genuinely cared.",
  author: "Ravi Kumar",
  company: "TechSprint Labs",
  initials: "RK",
};

const others = [
  {
    quote: "We needed a website fast and Tivra delivered beyond what we imagined. Our food brand finally looks as premium as the product.",
    author: "Ananya Gupta",
    company: "GreenLeaf Foods",
    initials: "AG",
    color: "#007B6E",
  },
  {
    quote: "Working with Tivra felt like having an in-house team. They understood our logistics business immediately.",
    author: "Sanjay Mehta",
    company: "LogiMove",
    initials: "SM",
    color: "#4B3B8C",
  },
];

const stats = [
  { value: "50+",  label: "Clients Helped" },
  { value: "7",    label: "Day Avg. Delivery" },
  { value: "100%", label: "On-time Launch Rate" },
];

function QuoteMark({ color = "currentColor" }: { color?: string }) {
  return (
    <svg width="22" height="18" viewBox="0 0 22 18" fill="none" className="mb-4">
      <path
        d="M0 18V10.8C0 4.8 3.6 1.2 10.8 0l1.2 2.4C7.6 3.6 5.6 6 5.2 9.6H9V18H0ZM13 18V10.8C13 4.8 16.6 1.2 23.8 0L25 2.4C20.6 3.6 18.6 6 18.2 9.6H22V18H13Z"
        fill={color}
      />
    </svg>
  );
}

function Stars() {
  return (
    <div className="flex gap-1 mb-5">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} width="16" height="16" viewBox="0 0 18 18" fill="#FFBA00">
          <path d="M9 1l2.4 5 5.6.8-4 3.9.9 5.5L9 13.5l-4.9 2.7.9-5.5L1 6.8l5.6-.8z" />
        </svg>
      ))}
    </div>
  );
}

function Avatar({ initials, color }: { initials: string; color: string }) {
  return (
    <div
      className="w-10 h-10 rounded-full flex items-center justify-center text-xs font-black text-white flex-shrink-0"
      style={{ background: color }}
    >
      {initials}
    </div>
  );
}

export default function Testimonials() {
  return (
    <section id="testimonials" className="py-24 px-6" style={{ background: "#F2EFEA" }}>
      <div className="max-w-6xl mx-auto">

        <p className="text-xs font-bold tracking-[0.16em] uppercase mb-4 tivra-reveal" style={{ color: "#F4611A" }}>
          Testimonials
        </p>
        <h2
          className="text-3xl sm:text-4xl font-black mb-12 tivra-reveal"
          data-delay="1"
          style={{ color: "#111111" }}
        >
          What our clients say.
        </h2>

        {/* Asymmetric grid — matches reference layout */}
        <div className="grid grid-cols-1 sm:grid-cols-[2fr_3fr] gap-4 items-start">

          {/* ── Left: featured dark card ── */}
          <div
            className="rounded-3xl p-8 flex flex-col justify-between tivra-reveal"
            data-delay="2"
            style={{
              background: "#1A0F3C",
              minHeight: 380,
              transition: "transform 0.3s cubic-bezier(.22,.68,0,1.2), box-shadow 0.3s",
              cursor: "default",
            }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLDivElement).style.transform = "translateY(-6px)";
              (e.currentTarget as HTMLDivElement).style.boxShadow = "0 24px 64px rgba(26,15,60,0.28)";
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLDivElement).style.transform = "translateY(0)";
              (e.currentTarget as HTMLDivElement).style.boxShadow = "none";
            }}
          >
            <div>
              <QuoteMark color="rgba(255,255,255,0.25)" />
              <blockquote className="text-lg font-normal leading-relaxed" style={{ color: "rgba(255,255,255,0.9)" }}>
                {featured.quote}
              </blockquote>
            </div>
            <div>
              <Stars />
              <div className="flex items-center gap-3">
                <Avatar initials={featured.initials} color="#F4611A" />
                <div>
                  <p className="text-sm font-bold text-white">{featured.author}</p>
                  <p className="text-xs" style={{ color: "rgba(255,255,255,0.5)" }}>{featured.company}</p>
                </div>
              </div>
            </div>
          </div>

          {/* ── Right: two quote cards + stats card ── */}
          <div className="flex flex-col gap-4">

            {/* Two smaller quote cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {others.map((t, i) => (
                <div
                  key={t.author}
                  className="rounded-3xl p-6 flex flex-col justify-between tivra-reveal"
                  data-delay={String(i + 3)}
                  style={{
                    background: "#ffffff",
                    border: "1.5px solid #E5E1DB",
                    transition: "transform 0.3s cubic-bezier(.22,.68,0,1.2), box-shadow 0.3s",
                    cursor: "default",
                  }}
                  onMouseEnter={e => {
                    (e.currentTarget as HTMLDivElement).style.transform = "translateY(-5px)";
                    (e.currentTarget as HTMLDivElement).style.boxShadow = "0 16px 48px rgba(0,0,0,0.1)";
                  }}
                  onMouseLeave={e => {
                    (e.currentTarget as HTMLDivElement).style.transform = "translateY(0)";
                    (e.currentTarget as HTMLDivElement).style.boxShadow = "none";
                  }}
                >
                  <div>
                    <QuoteMark color="#E5E1DB" />
                    <p className="text-sm leading-relaxed mb-5" style={{ color: "#555" }}>
                      {t.quote}
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <Avatar initials={t.initials} color={t.color} />
                    <div>
                      <p className="text-sm font-bold" style={{ color: "#111" }}>{t.author}</p>
                      <p className="text-xs" style={{ color: "#ABABAB" }}>{t.company}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Stats card */}
            <div
              className="rounded-3xl px-8 py-7 tivra-reveal"
              data-delay="5"
              style={{
                background: "#ffffff",
                border: "1.5px solid #E5E1DB",
                transition: "transform 0.3s cubic-bezier(.22,.68,0,1.2), box-shadow 0.3s",
                cursor: "default",
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLDivElement).style.transform = "translateY(-5px)";
                (e.currentTarget as HTMLDivElement).style.boxShadow = "0 16px 48px rgba(0,0,0,0.08)";
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLDivElement).style.transform = "translateY(0)";
                (e.currentTarget as HTMLDivElement).style.boxShadow = "none";
              }}
            >
              <div className="grid grid-cols-3 divide-x" style={{ borderColor: "#E5E1DB" }}>
                {stats.map((s) => (
                  <div key={s.label} className="px-6 first:pl-0 last:pr-0">
                    <p
                      className="font-black leading-none mb-1"
                      style={{ fontSize: 36, color: "#111111", fontVariantNumeric: "tabular-nums" }}
                    >
                      {s.value}
                    </p>
                    <p className="text-sm" style={{ color: "#ABABAB" }}>{s.label}</p>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
