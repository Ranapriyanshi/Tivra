"use client";

import { useState } from "react";

const plans = [
  {
    name: "Launch",
    tagline: "Perfect for startups getting online fast.",
    price: "$1,499",
    period: "one-time",
    cta: "Get Started",
    ctaHref: "/book-demo",
    features: [
      "Up to 5 pages",
      "Mobile-responsive design",
      "Basic SEO setup",
      "Contact form integration",
      "2 rounds of revisions",
      "14-day delivery",
      "30-day post-launch support",
    ],
  },
  {
    name: "Scale",
    tagline: "For businesses ready to stand out.",
    price: "$2,999",
    period: "one-time",
    popular: true,
    cta: "Book a Free Call",
    ctaHref: "/book-demo",
    features: [
      "Up to 12 pages",
      "Custom UI/UX design",
      "Full SEO optimisation",
      "Analytics & tracking setup",
      "Unlimited revisions",
      "7-day delivery",
      "90-day priority support",
      "Performance optimised",
    ],
  },
  {
    name: "Enterprise",
    tagline: "For teams with complex requirements.",
    price: "Custom",
    period: "",
    cta: "Talk to Us",
    ctaHref: "/book-demo",
    features: [
      "Everything in Scale",
      "E-commerce & custom features",
      "CMS / admin dashboard",
      "Third-party integrations",
      "Dedicated project manager",
      "Ongoing maintenance retainer",
      "SLA & priority response",
    ],
  },
];

function Check({ active }: { active: boolean }) {
  return (
    <svg width="15" height="15" viewBox="0 0 15 15" fill="none" className="flex-shrink-0 mt-0.5">
      <path d="M2.5 7.5l3.5 3.5L12.5 4" stroke={active ? "#F4611A" : "#ABABAB"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function Plans() {
  const [selected, setSelected] = useState(1); // Scale selected by default

  const plan = plans[selected];

  return (
    <section id="plans" className="py-24 px-6" style={{ background: "#FAFAF8" }}>
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="mb-12">
          <p
            className="text-xs font-bold tracking-[0.16em] uppercase mb-4 tivra-reveal"
            style={{ color: "#F4611A" }}
          >
            Pricing
          </p>
          <div className="tivra-reveal" data-delay="1">
            <h2 className="text-3xl sm:text-4xl font-black mb-3" style={{ color: "#111111" }}>
              Plans That <span style={{ color: "#F4611A" }}>Work For You</span>
            </h2>
            <p className="text-base max-w-md" style={{ color: "#787878" }}>
              Transparent pricing, no hidden fees — pick the plan that fits your goals.
            </p>
          </div>
        </div>

        {/* Containing card */}
        <div
          className="rounded-3xl overflow-hidden tivra-reveal"
          data-delay="1"
          style={{
            background: "#ffffff",
            border: "1.5px solid #E5E1DB",
            boxShadow: "0 8px 48px rgba(0,0,0,0.07)",
          }}
        >
          {/* Plan selector row */}
          <div
            className="grid grid-cols-3"
            style={{ borderBottom: "1.5px solid #E5E1DB" }}
          >
            {plans.map((p, i) => (
              <button
                key={p.name}
                onClick={() => setSelected(i)}
                className="flex flex-col items-start px-6 py-5 text-left transition-colors relative"
                style={{
                  background: selected === i ? "#FAFAF8" : "#ffffff",
                  borderRight: i < 2 ? "1.5px solid #E5E1DB" : "none",
                  cursor: "pointer",
                }}
              >
                {/* Selected indicator bar */}
                {selected === i && (
                  <span
                    className="absolute top-0 left-0 right-0 h-[3px] rounded-b-full"
                    style={{ background: "#F4611A" }}
                  />
                )}

                <div className="flex items-center justify-between w-full mb-1">
                  <span
                    className="text-sm font-black"
                    style={{ color: selected === i ? "#111111" : "#787878" }}
                  >
                    {p.name}
                  </span>
                  {p.popular && (
                    <span
                      className="text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wide"
                      style={{ background: "#FEE8DE", color: "#F4611A" }}
                    >
                      Popular
                    </span>
                  )}
                </div>

                <span
                  className="text-lg font-black leading-none"
                  style={{
                    color: selected === i ? "#111111" : "#ABABAB",
                    fontVariantNumeric: "tabular-nums",
                  }}
                >
                  {p.price}
                </span>
                {p.period && (
                  <span className="text-xs mt-0.5" style={{ color: "#ABABAB" }}>
                    /{p.period}
                  </span>
                )}
              </button>
            ))}
          </div>

          {/* Selected plan detail */}
          <div className="p-6 sm:p-8">
            <div className="flex flex-col sm:flex-row sm:items-start gap-8">

              {/* Left — tagline + features */}
              <div className="flex-1">
                <p className="text-sm mb-5" style={{ color: "#787878" }}>{plan.tagline}</p>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-y-2.5 gap-x-6">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm" style={{ color: "#333" }}>
                      <Check active />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Right — price + CTA */}
              <div className="sm:w-48 flex flex-col items-start sm:items-end gap-3 shrink-0">
                <div>
                  <p
                    className="font-black leading-none"
                    style={{
                      fontSize: plan.price === "Custom" ? 32 : 40,
                      color: "#111111",
                      fontVariantNumeric: "tabular-nums",
                    }}
                  >
                    {plan.price}
                  </p>
                  {plan.period && (
                    <p className="text-xs mt-1" style={{ color: "#ABABAB" }}>/{plan.period}</p>
                  )}
                </div>

                <a
                  href={plan.ctaHref}
                  className="inline-flex items-center rounded-full overflow-hidden transition-opacity hover:opacity-90 active:scale-95"
                  style={{ background: "#111111", boxShadow: "0 4px 16px rgba(0,0,0,0.18)" }}
                >
                  <span
                    className="pl-4 pr-2 text-sm font-semibold text-white whitespace-nowrap"
                    style={{ paddingTop: "0.45rem", paddingBottom: "0.45rem" }}
                  >
                    {plan.cta}
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

            </div>
          </div>

          {/* Footer note */}
          <div
            className="px-6 sm:px-8 py-4 text-xs tivra-reveal"
            data-delay="2"
            style={{ borderTop: "1.5px solid #E5E1DB", color: "#ABABAB" }}
          >
            All plans include a free 15-min discovery call. Prices in CAD, taxes may apply.
          </div>
        </div>

      </div>
    </section>
  );
}
