const team = [
  {
    name: "Dhiraj Rana",
    role: "Founder",
    initials: "DR",
    image: "/Personal.jpeg",
    linkedin: "https://www.linkedin.com/in/dhiraj-rana",
    accent: "#F4611A",
  },
  {
    name: "Dhiran Singh",
    role: "Product Management",
    initials: "DS",
    image: "/Personal.jpeg",
    linkedin: "https://www.linkedin.com/in/dhiran-singh",
    accent: "#007B6E",
  },
  {
    name: "Priyanshi Rana",
    role: "Tech Management",
    initials: "PR",
    image: "/Personal.jpeg",
    linkedin: "https://www.linkedin.com/in/priyanshi-rana",
    accent: "#1A0F3C",
  },
];

export default function Team() {
  return (
    <section
      id="team"
      className="py-24 px-6"
      style={{ background: "#FAFAF8" }}
    >
      <div className="max-w-6xl mx-auto">

        {/* Section header */}
        <div className="mb-16 tivra-reveal">
          <p
            className="text-xs font-bold tracking-[0.16em] uppercase mb-4"
            style={{ color: "#F4611A" }}
          >
            The Team
          </p>
          <h2
            className="text-3xl sm:text-4xl font-black leading-tight max-w-xl"
            style={{ color: "#1A0F3C" }}
          >
            Meet the people behind your website.
          </h2>
        </div>

        {/* Cards */}
        <div className="grid sm:grid-cols-3 gap-6">
          {team.map((member, i) => (
            <div
              key={member.name}
              className="tivra-reveal"
              data-delay={String(i + 1)}
              style={{
                background: "#FFFFFF",
                borderRadius: "32px",
                boxShadow: "0 4px 32px rgba(0,0,0,0.08), 0 1px 4px rgba(0,0,0,0.04)",
                padding: "8px",
              }}
            >
              {/* Image frame — inset inside the white card, fills full height */}
              <div
                style={{
                  borderRadius: "24px",
                  overflow: "hidden",
                  position: "relative",
                  aspectRatio: "3 / 3.8",
                  background: member.accent,
                }}
              >
                {/* Photo */}
                {member.image ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={member.image}
                    alt={member.name}
                    style={{
                      position: "absolute",
                      inset: 0,
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      objectPosition: "top center",
                    }}
                  />
                ) : (
                  <div
                    className="absolute inset-0 flex items-center justify-center font-black text-white select-none"
                    style={{ fontSize: "4rem" }}
                  >
                    {member.initials}
                  </div>
                )}

                {/* Connect button — over the image, bottom right */}
                <a
                  href={member.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Connect with ${member.name} on LinkedIn`}
                  className="flex items-center gap-1.5 font-bold text-sm text-white transition-opacity hover:opacity-85 active:scale-95"
                  style={{
                    position: "absolute",
                    bottom: "12px",
                    right: "12px",
                    background: "#111111",
                    borderRadius: "14px",
                    padding: "10px 16px",
                    lineHeight: 1,
                  }}
                >
                  + Connect
                </a>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
