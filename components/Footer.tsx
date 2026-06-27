export default function Footer() {
  return (
    <footer className="pt-8 pb-10 px-6" style={{ background: "#FAFAF8", borderTop: "1px solid #E5E1DB" }}>
      <div className="max-w-6xl mx-auto">

        {/* CTA card — like Veliq's bottom section */}
        <div
          className="rounded-3xl px-8 py-14 text-center mb-12"
          style={{ background: "#F2EFEA" }}
        >
          <p
            className="text-xs font-bold tracking-[0.16em] uppercase mb-4"
            style={{ color: "#F4611A" }}
          >
            Ready to launch?
          </p>
          <h2
            className="text-3xl sm:text-4xl font-black mb-4"
            style={{ color: "#111111", textWrap: "balance" } as React.CSSProperties}
          >
            Your website is 7 days away.
          </h2>
          <p className="text-base mb-8 max-w-sm mx-auto" style={{ color: "#787878" }}>
            Book a free 15-minute call with our team. No pitch, no pressure.
          </p>
          <a
            href="#book"
            className="inline-flex items-center rounded-full overflow-hidden hover:opacity-90 active:scale-95 transition-opacity"
            style={{ background: "#111111", boxShadow: "0 4px 20px rgba(0,0,0,0.18)" }}
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
        </div>

        {/* Footer nav */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full" style={{ background: "#F4611A" }} />
            <span className="font-black text-base" style={{ color: "#111111" }}>Tivra</span>
          </div>

          <div className="flex items-center gap-6">
            {["Services", "Team", "Testimonials", "Book a Call"].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase().replace(/ /g, "")}`}
                className="text-xs transition-colors hover:text-black"
                style={{ color: "#ABABAB" }}
              >
                {item}
              </a>
            ))}
          </div>

          <p className="text-xs" style={{ color: "#CDCAC6" }}>
            © {new Date().getFullYear()} Tivra
          </p>
        </div>
      </div>
    </footer>
  );
}
