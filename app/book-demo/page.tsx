"use client";

import Cal, { getCalApi } from "@calcom/embed-react";
import { useEffect } from "react";
import Link from "next/link";

export default function BookDemoPage() {
  useEffect(() => {
    (async function () {
      const cal = await getCalApi({ namespace: "15min" });
      cal("ui", {
        cssVarsPerTheme: {
          light: {
            "cal-brand":          "#F4611A",
            "cal-brand-emphasis": "#D94E0E",
            "cal-brand-text":     "#FFFFFF",
            "cal-bg":             "#FFFFFF",
            "cal-bg-subtle":      "#F2EFEA",
            "cal-bg-muted":       "#E8E4DE",
            "cal-border":         "#E5E1DB",
            "cal-border-subtle":  "#E5E1DB",
            "cal-text":           "#111111",
            "cal-text-muted":     "#787878",
          },
          dark: {
            "cal-brand":          "#F4611A",
            "cal-brand-emphasis": "#D94E0E",
            "cal-brand-text":     "#FFFFFF",
            "cal-bg":             "#1A0F3C",
            "cal-bg-subtle":      "#221447",
            "cal-bg-muted":       "#2A1A55",
            "cal-border":         "#3D2B6B",
            "cal-border-subtle":  "#3D2B6B",
            "cal-text":           "#FFFFFF",
            "cal-text-muted":     "#A89EC0",
          },
        },
        hideEventTypeDetails: false,
        layout: "month_view",
      });
    })();
  }, []);

  return (
    <div
      className="h-screen overflow-hidden flex flex-col"
      style={{
        background:
          "radial-gradient(ellipse 72% 56% at 50% 30%, rgba(255,236,150,0.36) 0%, transparent 68%), #F5F1E8",
      }}
    >
      {/* ── Top bar — fixed height, no grow ── */}
      <div className="flex-shrink-0 flex items-center justify-between px-6 sm:px-10 py-4">
        <Link
          href="/"
          className="flex items-center gap-2 text-sm font-semibold transition-opacity hover:opacity-60"
          style={{
            color: "#1A0F3C",
            border: "1.5px solid #C8C0B8",
            borderRadius: "999px",
            padding: "0.4rem 1rem",
            background: "rgba(255,255,255,0.55)",
            backdropFilter: "blur(6px)",
          }}
        >
          <svg width="13" height="13" viewBox="0 0 14 14" fill="none">
            <path d="M9 2L4 7l5 5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          Back to home
        </Link>

        <p
          className="font-black text-xl sm:text-2xl text-right hidden sm:block"
          style={{ color: "#1A0F3C", lineHeight: 1.2 }}
        >
          Ready for a closer look?
        </p>
      </div>

      {/* ── Card area — takes all remaining vertical space ── */}
      <div className="flex-1 min-h-0 px-4 sm:px-8 pb-4 flex justify-center">
        <div className="relative w-full max-w-5xl flex flex-col">

          {/* Shadow cards behind — absolute so they don't push layout */}
          <div
            className="absolute inset-0 rounded-3xl pointer-events-none"
            style={{
              background: "#fff",
              transform: "rotate(-1.8deg) translateY(8px) translateX(-3px)",
              boxShadow: "0 4px 20px rgba(0,0,0,0.06)",
              border: "1px solid #EDE9E3",
            }}
          />
          <div
            className="absolute inset-0 rounded-3xl pointer-events-none"
            style={{
              background: "#fff",
              transform: "rotate(1deg) translateY(4px) translateX(2px)",
              boxShadow: "0 4px 20px rgba(0,0,0,0.07)",
              border: "1px solid #EDE9E3",
            }}
          />

          {/* Main card — fills available height via flex-1 */}
          <div
            className="relative flex-1 flex flex-col rounded-3xl overflow-hidden"
            style={{
              background: "#fff",
              boxShadow: "0 12px 48px rgba(0,0,0,0.11)",
              border: "1px solid #E5E1DB",
            }}
          >
            {/* Tivra branding strip */}
            <div
              className="flex-shrink-0 flex items-center gap-3 px-5 py-3"
              style={{ borderBottom: "1px solid #F0EDE9" }}
            >
              <div
                className="w-7 h-7 rounded-xl flex items-center justify-center font-black text-white"
                style={{ background: "#F4611A", fontSize: 11 }}
              >
                T
              </div>
              <div>
                <p className="text-xs font-semibold" style={{ color: "#ABABAB" }}>Tivra</p>
                <p className="text-sm font-black" style={{ color: "#1A0F3C" }}>Free Discovery Call · 15 min</p>
              </div>
              <div className="ml-auto flex items-center gap-1.5">
                <div className="w-1.5 h-1.5 rounded-full" style={{ background: "#22C55E" }} />
                <span className="text-xs font-medium" style={{ color: "#787878" }}>No commitment</span>
              </div>
            </div>

            {/* Cal embed — fills the rest of the card */}
            <div className="flex-1 min-h-0">
              <Cal
                namespace="15min"
                calLink="priyanshi-rana-vxu0bo/15min"
                config={{ layout: "month_view", useSlotsViewOnSmallScreen: "true" }}
                style={{ width: "100%", height: "100%" }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
