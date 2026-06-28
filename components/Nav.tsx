"use client";

import { useEffect, useState } from "react";

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const links = [
    { href: "#services", label: "Services" },
    { href: "#how",      label: "How it works" },
    { href: "#team",     label: "Team" },
    { href: "#testimonials", label: "Testimonials" },
  ];

  /* ── colours that flip between states ── */
  const ink     = scrolled ? "#1A0F3C" : "#ffffff";
  const muted   = scrolled ? "rgba(26,15,60,0.65)" : "rgba(255,255,255,0.78)";
  const barBg   = scrolled ? "rgba(244,97,26,0.14)" : "transparent";
  const barBdr  = scrolled ? "1px solid rgba(244,97,26,0.28)" : "1px solid transparent";
  const barShdw = scrolled ? "0 8px 32px rgba(244,97,26,0.15)" : "none";
  const hamBg   = scrolled ? "#111" : "#fff";

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50"
      style={{
        padding: scrolled ? "0.6rem 1rem" : "1.4rem 2rem",
        display: "flex",
        justifyContent: "center",
        transition: "padding 0.38s cubic-bezier(.22,.68,0,1.1)",
      }}
    >
      {/* ── nav bar ── */}
      <nav
        style={{
          width: "100%",
          maxWidth: scrolled ? "920px" : "100%",
          background: barBg,
          backdropFilter: scrolled ? "blur(20px)" : "none",
          WebkitBackdropFilter: scrolled ? "blur(20px)" : "none",
          border: barBdr,
          borderRadius: scrolled ? 9999 : 0,
          boxShadow: barShdw,
          padding: scrolled ? "0.45rem 0.5rem 0.45rem 1.25rem" : "0",
          display: "grid",
          gridTemplateColumns: "1fr auto 1fr",
          alignItems: "center",
          gap: "1rem",
          transition: "all 0.38s cubic-bezier(.22,.68,0,1.1)",
        }}
      >
        {/* Logo — left col */}
        <a href="#" className="flex items-center gap-2 flex-shrink-0" style={{ justifySelf: "start" }}>
          <span
            className="w-2 h-2 rounded-full flex-shrink-0"
            style={{
              background: "#F4611A",
              opacity: scrolled ? 1 : 0,
              transform: scrolled ? "scale(1)" : "scale(0)",
              transition: "opacity 0.3s, transform 0.3s",
            }}
          />
          <span
            className="font-black text-base tracking-tight"
            style={{ color: ink, transition: "color 0.38s" }}
          >
            Tivra
          </span>
        </a>

        {/* Links — center col */}
        <div className="hidden md:flex items-center gap-0.5">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="px-3 py-1.5 rounded-full text-sm"
              style={{
                color: muted,
                transition: "color 0.38s",
              }}
            >
              {l.label}
            </a>
          ))}
        </div>

        {/* Actions — right col */}
        <div className="hidden md:flex items-center gap-3 flex-shrink-0" style={{ justifySelf: "end" }}>
          <a
            href="/book-demo"
            className="text-sm font-medium"
            style={{ color: muted, transition: "color 0.38s" }}
          >
            Login
          </a>

          {/* Compound CTA pill + arrow button */}
          <a
            href="/book-demo"
            className="flex items-center rounded-full overflow-hidden flex-shrink-0 transition-opacity hover:opacity-90 active:scale-95"
            style={{
              background: "#111111",
              boxShadow: scrolled ? "none" : "0 4px 16px rgba(0,0,0,0.25)",
              transition: "box-shadow 0.38s",
            }}
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

        {/* Mobile hamburger */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-2 col-start-3 justify-self-end"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span className="block w-5 h-0.5 rounded-full" style={{ background: hamBg, transform: menuOpen ? "rotate(45deg) translate(3px,3px)" : "none", transition: "transform 0.2s, background 0.38s" }} />
          <span className="block w-5 h-0.5 rounded-full" style={{ background: hamBg, opacity: menuOpen ? 0 : 1, transition: "opacity 0.2s, background 0.38s" }} />
          <span className="block w-5 h-0.5 rounded-full" style={{ background: hamBg, transform: menuOpen ? "rotate(-45deg) translate(3px,-3px)" : "none", transition: "transform 0.2s, background 0.38s" }} />
        </button>
      </nav>

      {/* Mobile menu */}
      {menuOpen && (
        <div
          className="absolute top-20 left-4 right-4 rounded-2xl shadow-xl p-4 flex flex-col gap-2"
          style={{ background: "#fff", border: "1px solid #E5E1DB" }}
        >
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="px-4 py-2.5 rounded-xl text-sm font-medium"
              style={{ color: "#111" }}
              onClick={() => setMenuOpen(false)}
            >
              {l.label}
            </a>
          ))}
          <a
            href="/book-demo"
            className="flex items-center rounded-full overflow-hidden mt-1 hover:opacity-90"
            style={{ background: "#111111" }}
            onClick={() => setMenuOpen(false)}
          >
            <span className="pl-4 pr-2 text-sm font-semibold text-white whitespace-nowrap flex-1" style={{ paddingTop: "0.45rem", paddingBottom: "0.45rem" }}>
              Book a Call
            </span>
            <span className="w-7 h-7 flex items-center justify-center rounded-full flex-shrink-0 m-0.5" style={{ background: "#F4611A" }}>
              <svg width="11" height="11" viewBox="0 0 11 11" fill="none">
                <path d="M2 9L9 2M9 2H4M9 2V7" stroke="white" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
          </a>
        </div>
      )}
    </header>
  );
}
