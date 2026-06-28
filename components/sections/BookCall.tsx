"use client";

import Cal, { getCalApi } from "@calcom/embed-react";
import { useEffect } from "react";

export default function BookCall() {
  useEffect(() => {
    (async function () {
      const cal = await getCalApi({ namespace: "15min" });
      cal("ui", {
        cssVarsPerTheme: {
          light: {
            "cal-brand":           "#F4611A",
            "cal-brand-emphasis":  "#D94E0E",
            "cal-brand-text":      "#FFFFFF",
            "cal-bg":              "#FAFAF8",
            "cal-bg-subtle":       "#F2EFEA",
            "cal-bg-muted":        "#E8E4DE",
            "cal-border":          "#E5E1DB",
            "cal-border-subtle":   "#E5E1DB",
            "cal-text":            "#111111",
            "cal-text-muted":      "#787878",
          },
          dark: {
            "cal-brand":           "#F4611A",
            "cal-brand-emphasis":  "#D94E0E",
            "cal-brand-text":      "#FFFFFF",
            "cal-bg":              "#1A0F3C",
            "cal-bg-subtle":       "#221447",
            "cal-bg-muted":        "#2A1A55",
            "cal-border":          "#3D2B6B",
            "cal-border-subtle":   "#3D2B6B",
            "cal-text":            "#FFFFFF",
            "cal-text-muted":      "#A89EC0",
          },
        },
        hideEventTypeDetails: false,
        layout: "month_view",
      });
    })();
  }, []);

  return (
    <section id="book" className="py-24 px-6" style={{ background: "#FFFDF8" }}>
      <div className="max-w-5xl mx-auto">

        <div className="text-center mb-12 tivra-reveal">
          <p
            className="text-xs font-bold tracking-[0.18em] uppercase mb-4"
            style={{ color: "#F4611A" }}
          >
            Book a Call
          </p>
          <h2
            className="text-3xl sm:text-4xl font-black mb-4"
            style={{ color: "#1A0F3C", textWrap: "balance" } as React.CSSProperties}
          >
            Let&apos;s talk about your project.
          </h2>
          <p className="text-base max-w-md mx-auto" style={{ color: "#6B5E7A" }}>
            Pick a time that works for you. We&apos;ll spend 15 minutes
            understanding your goals — no sales pitch, no commitment.
          </p>
        </div>

        <div
          className="rounded-2xl overflow-hidden tivra-reveal"
          data-delay="1"
          style={{ border: "1px solid #E5E1DB" }}
        >
          <Cal
            namespace="15min"
            calLink="priyanshi-rana-vxu0bo/15min"
            config={{ layout: "month_view", useSlotsViewOnSmallScreen: "true" }}
            style={{ width: "100%", minHeight: 600 }}
          />
        </div>

      </div>
    </section>
  );
}
