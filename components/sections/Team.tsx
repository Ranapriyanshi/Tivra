const team = [
  {
    name: "Dhiraj Rana",
    role: "Founder",
    initials: "DR",
    bio: "The visionary behind Tivra. Dhiraj built this company on the belief that every small business deserves a world-class online presence — regardless of budget.",
    gradient: "linear-gradient(135deg, #F4611A 0%, #FFBA00 100%)",
  },
  {
    name: "Dhiran Singh",
    role: "Product Management",
    initials: "DS",
    bio: "Dhiran makes sure every project ships on time and exceeds expectations. He translates business goals into crisp, actionable product decisions.",
    gradient: "linear-gradient(135deg, #007B6E 0%, #00A896 100%)",
  },
  {
    name: "Priyanshi Rana",
    role: "Tech Management",
    initials: "PR",
    bio: "Priyanshi leads the technical execution at Tivra. From architecture to deployment, she ensures every site is fast, secure, and built to scale.",
    gradient: "linear-gradient(135deg, #1A0F3C 0%, #4B3B8C 100%)",
  },
];

export default function Team() {
  return (
    <section id="team" className="relative py-24 px-6 overflow-hidden" style={{ background: "#F4611A" }}>
      {/* Grid overlay — same checkered look as the hero */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.09) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.09) 1px, transparent 1px)
          `,
          backgroundSize: "44px 44px",
        }}
      />

      <div className="relative z-10 max-w-6xl mx-auto">

        {/* Header */}
        <div className="mb-14">
          <p
            className="text-xs font-bold tracking-[0.16em] uppercase mb-4"
            style={{ color: "#1A0F3C" }}
          >
            The Team
          </p>
          <h2
            className="text-4xl sm:text-5xl font-black leading-tight max-w-xl text-white"
            style={{ textWrap: "balance" } as React.CSSProperties}
          >
            Meet the people behind your website.
          </h2>
        </div>

        <div className="grid sm:grid-cols-3 gap-5">
          {team.map((member) => (
            <div
              key={member.name}
              className="rounded-2xl overflow-hidden"
              style={{ background: "#F2EFEA" }}
            >
              {/* Gradient avatar strip */}
              <div
                className="h-24 flex items-center justify-center"
                style={{ background: member.gradient }}
              >
                <div
                  className="w-14 h-14 rounded-full flex items-center justify-center text-white font-black text-lg"
                  style={{ background: "rgba(255,255,255,0.2)" }}
                >
                  {member.initials}
                </div>
              </div>

              {/* Info */}
              <div className="p-6">
                <p
                  className="text-xs font-bold tracking-[0.12em] uppercase mb-1"
                  style={{ color: "#F4611A" }}
                >
                  {member.role}
                </p>
                <h3
                  className="font-black text-lg mb-3"
                  style={{ color: "#111111" }}
                >
                  {member.name}
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: "#787878" }}>
                  {member.bio}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
