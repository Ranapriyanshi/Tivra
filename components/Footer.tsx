const NAV_LINKS = ["Services", "Team", "Testimonials", "Book a Call"];

function MarqueeItem({ prefix }: { prefix: string }) {
  return (
    <>
      {Array.from({ length: 10 }, (_, i) => (
        <span
          key={`${prefix}-${i}`}
          className="flex items-center gap-4 shrink-0"
          style={{ paddingRight: "3rem" }}
        >
          {/* Double play arrows — like YUZU's ►► */}
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none" style={{ flexShrink: 0 }}>
            <path d="M3 4l5 5-5 5V4zM9 4l5 5-5 5V4z" fill="white" fillOpacity="0.9"/>
          </svg>
          <span
            style={{
              fontSize: "0.78rem",
              fontWeight: 800,
              letterSpacing: "0.18em",
              color: "#fff",
              textTransform: "uppercase",
              whiteSpace: "nowrap",
            }}
          >
            Book a Free Call
          </span>
        </span>
      ))}
    </>
  );
}

export default function Footer() {
  return (
    <footer>

      {/* ── Announcement bar — light, like YUZU's lavender strip ── */}
      <div style={{ background: "#F2EFEA", borderTop: "1px solid #E5E1DB" }}>
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 px-6 py-5">
          <div>
            <p className="font-black text-base" style={{ color: "#111" }}>
              There&apos;s a lot more to show than fits on one page.
            </p>
            <p className="text-sm mt-0.5" style={{ color: "#787878" }}>
              We really recommend booking a call with our team.
            </p>
          </div>
          <a
            href="/book-demo"
            className="flex-shrink-0 flex items-center rounded-full overflow-hidden hover:opacity-90 active:scale-95 transition-opacity"
            style={{ background: "#111111", boxShadow: "0 4px 16px rgba(0,0,0,0.16)" }}
          >
            <span
              className="pl-5 pr-3 text-sm font-semibold text-white whitespace-nowrap"
              style={{ paddingTop: "0.5rem", paddingBottom: "0.5rem" }}
            >
              Book a Free Call
            </span>
            <span
              className="w-8 h-8 flex items-center justify-center rounded-full flex-shrink-0 m-0.5"
              style={{ background: "#F4611A" }}
            >
              <svg width="11" height="11" viewBox="0 0 11 11" fill="none">
                <path d="M2 9L9 2M9 2H4M9 2V7" stroke="white" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
          </a>
        </div>
      </div>

      {/* ── Dark wordmark section ── */}
      <div style={{ background: "#1A0F3C", overflow: "hidden" }}>

        {/* Footer nav row — sits at top of dark area */}
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 px-6 pt-10 pb-4">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full" style={{ background: "#F4611A" }} />
            <span className="font-black text-base" style={{ color: "#fff" }}>Tivra</span>
          </div>
          <div className="flex items-center gap-6">
            {NAV_LINKS.map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase().replace(/ /g, "")}`}
                className="text-xs transition-colors hover:text-white"
                style={{ color: "rgba(255,255,255,0.38)" }}
              >
                {item}
              </a>
            ))}
          </div>
          <p className="text-xs" suppressHydrationWarning style={{ color: "rgba(255,255,255,0.22)" }}>
            © {new Date().getFullYear()} Tivra
          </p>
        </div>

        {/* ── Massive "TIVRA" wordmark — like YUZU's big text ── */}
        <div style={{ overflow: "hidden", lineHeight: 1 }}>
          <p
            style={{
              fontSize: "clamp(5.5rem, 21vw, 23rem)",
              fontWeight: 900,
              color: "#FFBA00",
              letterSpacing: "-0.025em",
              lineHeight: 0.82,
              paddingLeft: "0.06em",
              marginBottom: 0,
            }}
          >
            Tivra
          </p>
        </div>

        {/* ── Pull-tab marquee CTA — like YUZU's bottom strip ── */}
        <a
          href="/book-demo"
          className="block overflow-hidden"
          style={{
            background: "#F4611A",
            borderTop: "1.5px solid rgba(255,255,255,0.14)",
          }}
        >
          {/* Perforated top edge */}
          <div
            style={{
              height: 6,
              backgroundImage: "radial-gradient(circle, #1A0F3C 3px, transparent 3px)",
              backgroundSize: "18px 6px",
              backgroundPosition: "0 0",
              marginBottom: -1,
            }}
          />
          {/* Scrolling text — 2× items so translateX(-50%) loops seamlessly */}
          <div
            className="flex items-center py-3"
            style={{
              animation: "tivra-marquee 20s linear infinite",
              willChange: "transform",
            }}
          >
            <MarqueeItem prefix="a" />
            <MarqueeItem prefix="b" />
          </div>
        </a>
      </div>

    </footer>
  );
}
