const featured = {
  quote:
    "Tivra transformed our online presence in two weeks. We went from a broken WordPress site to a professional platform that actually drives enquiries. The team genuinely cared.",
  author: "Ravi Kumar",
  company: "TechSprint Labs",
  initials: "RK",
};

const others = [
  {
    quote:
      "We needed a website fast and Tivra delivered beyond what we imagined. Our food brand finally looks as premium as the product.",
    author: "Ananya Gupta",
    company: "GreenLeaf Foods",
    initials: "AG",
  },
  {
    quote:
      "Working with Tivra felt like having an in-house team. They understood our logistics business immediately.",
    author: "Sanjay Mehta",
    company: "LogiMove",
    initials: "SM",
  },
  {
    quote:
      "Our clinic booking site has cut call volume in half — patients self-schedule online now. Professional and affordable.",
    author: "Priya Sharma",
    company: "HealthFirst Clinic",
    initials: "PS",
  },
];

function Stars() {
  return (
    <div className="flex gap-1 mb-5">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} width="18" height="18" viewBox="0 0 18 18" fill="#FFBA00">
          <path d="M9 1l2.4 5 5.6.8-4 3.9.9 5.5L9 13.5l-4.9 2.7.9-5.5L1 6.8l5.6-.8z" />
        </svg>
      ))}
    </div>
  );
}

export default function Testimonials() {
  return (
    <section id="testimonials" className="py-24 px-6" style={{ background: "#FAFAF8" }}>
      <div className="max-w-5xl mx-auto">

        {/* Trust label */}
        <p className="text-center text-sm mb-12" style={{ color: "#ABABAB" }}>
          Trusted by growing businesses across India
        </p>

        {/* Featured testimonial */}
        <div
          className="rounded-3xl p-10 sm:p-14 text-center mb-6"
          style={{ background: "#F2EFEA" }}
        >
          <Stars />
          <blockquote
            className="text-2xl sm:text-3xl font-black leading-snug mb-6"
            style={{ color: "#111111", textWrap: "balance" } as React.CSSProperties}
          >
            &ldquo;{featured.quote}&rdquo;
          </blockquote>
          <p className="text-sm italic" style={{ color: "#ABABAB" }}>
            — {featured.author}, {featured.company}
          </p>
        </div>

        {/* Secondary testimonials */}
        <div className="grid sm:grid-cols-3 gap-4">
          {others.map((t) => (
            <div
              key={t.author}
              className="rounded-2xl p-6"
              style={{ background: "#F2EFEA" }}
            >
              <div className="flex items-center gap-3 mb-4">
                <div
                  className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-black text-white flex-shrink-0"
                  style={{ background: "#F4611A" }}
                >
                  {t.initials}
                </div>
                <div>
                  <p className="font-bold text-sm" style={{ color: "#111111" }}>
                    {t.author}
                  </p>
                  <p className="text-xs" style={{ color: "#ABABAB" }}>
                    {t.company}
                  </p>
                </div>
              </div>
              <p className="text-sm leading-relaxed" style={{ color: "#787878" }}>
                &ldquo;{t.quote}&rdquo;
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
