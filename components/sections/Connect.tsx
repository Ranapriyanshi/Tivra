const socials = [
  {
    label: "Email",
    value: "dhiraj503@gmail.com",
    href: "mailto:dhiraj503@gmail.com",
  },
  {
    label: "LinkedIn",
    value: "linkedin.com/company/tivra",
    href: "https://linkedin.com",
  },
  {
    label: "Instagram",
    value: "@tivra.in",
    href: "https://instagram.com",
  },
];

export default function Connect() {
  return (
    <section id="connect" className="py-24 px-6" style={{ background: "#FAFAF8" }}>
      <div className="max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-8">

          {/* Left — simple contact info */}
          <div>
            <p
              className="text-xs font-bold tracking-[0.16em] uppercase mb-4"
              style={{ color: "#F4611A" }}
            >
              Connect
            </p>
            <h2
              className="text-4xl sm:text-5xl font-black leading-tight mb-6"
              style={{ color: "#111111", textWrap: "balance" } as React.CSSProperties}
            >
              Let&apos;s build something great together.
            </h2>
            <p className="text-base leading-relaxed mb-10" style={{ color: "#787878" }}>
              Whether you have a fully formed brief or just a rough idea —
              reach out. We love talking to founders at every stage.
            </p>

            <div className="flex flex-col gap-5">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target={s.href.startsWith("mailto") ? undefined : "_blank"}
                  rel="noopener noreferrer"
                  className="group flex items-center gap-4"
                >
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wide mb-0.5" style={{ color: "#ABABAB" }}>
                      {s.label}
                    </p>
                    <p className="text-sm font-semibold group-hover:underline" style={{ color: "#111111" }}>
                      {s.value}
                    </p>
                  </div>
                </a>
              ))}
            </div>
          </div>

          {/* Right — form inside rounded grey card */}
          <form
            action="mailto:dhiraj503@gmail.com"
            method="get"
            className="rounded-3xl p-8"
            style={{ background: "#F2EFEA" }}
          >
            <h3 className="font-black text-xl mb-6" style={{ color: "#111111" }}>
              Send us a message
            </h3>

            <div className="flex flex-col gap-4">
              {[
                { label: "Your Name", name: "name", type: "text", placeholder: "Ravi Kumar" },
                { label: "Email", name: "email", type: "email", placeholder: "ravi@yourcompany.com" },
              ].map((field) => (
                <div key={field.name}>
                  <label
                    className="block text-xs font-semibold mb-1.5"
                    style={{ color: "#787878" }}
                  >
                    {field.label}
                  </label>
                  <input
                    type={field.type}
                    name={field.name}
                    placeholder={field.placeholder}
                    className="w-full px-4 py-3 rounded-xl text-sm outline-none"
                    style={{ background: "#fff", border: "1px solid #E5E1DB", color: "#111111" }}
                  />
                </div>
              ))}

              <div>
                <label className="block text-xs font-semibold mb-1.5" style={{ color: "#787878" }}>
                  Message
                </label>
                <textarea
                  name="body"
                  rows={4}
                  placeholder="Tell us about your project..."
                  className="w-full px-4 py-3 rounded-xl text-sm outline-none resize-none"
                  style={{ background: "#fff", border: "1px solid #E5E1DB", color: "#111111" }}
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-full font-semibold text-sm text-white transition-all hover:opacity-85 active:scale-95 mt-1"
                style={{ background: "#111111" }}
              >
                Send Message
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
