const NAV_COLS = [
  {
    heading: "Services",
    links: [
      { label: "How it works",  href: "#services" },
      { label: "The Process",   href: "#how" },
      { label: "Pricing",       href: "#plans" },
      { label: "Testimonials",  href: "#testimonials" },
    ],
  },
  {
    heading: "Company",
    links: [
      { label: "About Tivra",  href: "#" },
      { label: "Our Team",     href: "#team" },
      { label: "Book a Call",  href: "/book-demo" },
      { label: "Contact",      href: "/book-demo" },
    ],
  },
  {
    heading: "Legal",
    links: [
      { label: "Privacy Policy",    href: "#" },
      { label: "Terms of Service",  href: "#" },
    ],
  },
];

function IconLinkedIn() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"/>
      <circle cx="4" cy="4" r="2"/>
    </svg>
  );
}

function IconX() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.737-8.835L1.254 2.25H8.08l4.253 5.622 5.91-5.622zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77z"/>
    </svg>
  );
}

function IconInstagram() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
      <circle cx="12" cy="12" r="4"/>
      <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none"/>
    </svg>
  );
}

export default function Footer() {
  return (
    <footer style={{ background: "#FAFAF8", paddingBottom: 0 }}>

      {/* Padding wrapper keeps card off screen edges on mobile */}
      <div className="px-4 sm:px-6 pt-12">

      {/* ── Main card ── */}
      <div
        className="tivra-reveal max-w-6xl mx-auto p-6 sm:px-12 sm:pt-12 sm:pb-8"
        style={{
          background: "#ffffff",
          borderRadius: "32px",
          border: "1.5px solid #E5E1DB",
        }}
      >

        {/* Top row: brand + nav cols */}
        <div className="flex flex-col sm:flex-row justify-between gap-12">

          {/* Brand column */}
          <div style={{ maxWidth: "340px" }}>
            {/* Logo */}
            <div className="flex items-center gap-2.5 mb-5">
              <div
                className="flex items-center justify-center font-black text-white"
                style={{
                  width: 36, height: 36,
                  background: "#111111",
                  borderRadius: "10px",
                  fontSize: "15px",
                  color: "#F4611A",
                }}
              >
                T
              </div>
              <span className="font-black text-lg" style={{ color: "#111111" }}>Tivra</span>
            </div>

            {/* Tagline */}
            <p className="text-sm leading-relaxed mb-6" style={{ color: "#787878" }}>
              Tivra crafts high-performance websites for startups and small businesses — from concept to launch, fast.
            </p>

            {/* Social icons */}
            <div className="flex items-center gap-4">
              {[
                { href: "https://linkedin.com", icon: <IconLinkedIn />, label: "LinkedIn" },
                { href: "https://x.com",        icon: <IconX />,        label: "X"         },
                { href: "https://instagram.com",icon: <IconInstagram />,label: "Instagram" },
              ].map(({ href, icon, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="transition-opacity hover:opacity-60"
                  style={{ color: "#111111" }}
                >
                  {icon}
                </a>
              ))}
            </div>
          </div>

          {/* Nav columns */}
          <div className="flex flex-wrap gap-10 sm:gap-16">
            {NAV_COLS.map((col) => (
              <div key={col.heading}>
                <p className="text-sm font-black mb-4" style={{ color: "#111111" }}>
                  {col.heading}
                </p>
                <ul className="flex flex-col gap-3">
                  {col.links.map((link) => (
                    <li key={link.label}>
                      <a
                        href={link.href}
                        className="text-sm transition-colors hover:text-[#F4611A]"
                        style={{ color: "#787878", textDecoration: "none" }}
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

        </div>

        {/* Divider */}
        <div style={{ height: "1px", background: "#E5E1DB", margin: "36px 0 28px" }} />

        {/* Bottom row: copyright + legal */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <p className="text-xs" style={{ color: "#ABABAB" }} suppressHydrationWarning>
            © {new Date().getFullYear()} Tivra. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            {["Privacy Policy", "Terms of Service"].map((label) => (
              <a
                key={label}
                href="#"
                className="text-xs transition-colors hover:text-[#111]"
                style={{ color: "#ABABAB", textDecoration: "none" }}
              >
                {label}
              </a>
            ))}
          </div>
        </div>

      </div>

      </div>{/* /padding wrapper */}

      {/* ── Ghost wordmark below card ── */}
      <div style={{ overflow: "hidden", lineHeight: 1, paddingTop: "4px" }}>
        <p
          style={{
            fontSize: "clamp(5.5rem, 21vw, 23rem)",
            fontWeight: 900,
            color: "rgba(17,17,17,0.055)",
            letterSpacing: "-0.025em",
            lineHeight: 0.82,
            paddingLeft: "0.04em",
            marginBottom: 0,
            userSelect: "none",
          }}
        >
          Tivra
        </p>
      </div>

    </footer>
  );
}
