import { RevealStagger, RevealItem, Reveal } from "./motion"

const TESTIMONIALS = [
  {
    name: "Dra. Larissa Luduvice",
    role: "Periodontista",
    text: "Vi na Vyllo algo que sentia falta no sistema que usava. Facilidade de uso e completude encantam. Alguns minutinhos no fim do dia e ganhei muito mais controle financeiro. O suporte é de fácil acesso. Só agradecer à Vyllo 🫶🏻",
    accent: "#60a5fa",
  },
  {
    name: "Dr. Luca Albuquerque",
    role: "Clínico-Geral",
    text: "É você bater o olho e ver como está o consultório. Não dá erro, não tem fórmula, é um facilitador que cumpre muito mais do que promete.",
    accent: "#a78bfa",
  },
  {
    name: "Dra. Victoria Santana",
    role: "Cirurgiã-Dentista",
    text: "O app facilitou muito o meu dia a dia. Gestão mais organizada, atendimento mais ágil e sobra mais tempo para focar nos pacientes.",
    accent: "#34d399",
  },
  {
    name: "Dr. Guilherme Tavares",
    role: "Endodontista",
    text: "É incrível encontrar uma ferramenta que realmente atende às demandas do dia a dia de um consultório.",
    accent: "#fbbf24",
  },
]

export function Testimonials() {
  return (
    <section className="relative overflow-hidden bg-[#0a1628] py-24 md:py-32">
      {/* Grid lines */}
      <div
        className="pointer-events-none absolute inset-0 grid-accent"
        style={{
          maskImage: "radial-gradient(ellipse 70% 60% at 50% 50%, #000 20%, transparent 80%)",
          WebkitMaskImage: "radial-gradient(ellipse 70% 60% at 50% 50%, #000 20%, transparent 80%)",
        }}
      />

      {/* Mesh gradients */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background: `
            radial-gradient(ellipse 50% 40% at 30% 0%, rgba(0,102,255,0.12) 0%, transparent 70%),
            radial-gradient(ellipse 40% 40% at 80% 100%, rgba(139,92,246,0.08) 0%, transparent 70%)
          `,
        }}
      />

      {/* Gradient dividers */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-vyllo/20 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-vyllo/20 to-transparent" />

      <div className="relative mx-auto max-w-5xl px-6">
        <Reveal>
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Quem usa, não volta pra planilha, papel ou{" "}
            <span className="relative inline-block">
              <span style={{ animation: "strikethrough-text 5s ease-in-out infinite" }}>
                sistema complicado
              </span>
              <span
                className="pointer-events-none absolute left-0 h-[2px] w-full origin-left rounded-full bg-red-400/80"
                style={{ top: "calc(50% - 1px)", transform: "scaleX(0)", animation: "strikethrough-line 5s ease-in-out infinite" }}
                aria-hidden="true"
              />
            </span>
          </h2>
        </Reveal>

        <RevealStagger className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {TESTIMONIALS.map((t) => (
            <RevealItem key={t.name}>
              <figure className="relative flex h-full flex-col justify-between rounded-xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm transition-all hover:border-white/15 hover:bg-white/[0.07]">
                {/* Accent line top */}
                <div
                  className="absolute top-0 left-6 right-6 h-px"
                  style={{ background: `linear-gradient(90deg, ${t.accent}40, transparent)` }}
                />

                <blockquote className="text-base leading-relaxed text-white/70">
                  &ldquo;{t.text}&rdquo;
                </blockquote>

                <figcaption className="mt-6 flex items-center gap-3 border-t border-white/10 pt-4">
                  <div
                    className="flex h-9 w-9 items-center justify-center rounded-full text-xs font-semibold text-white"
                    style={{ backgroundColor: t.accent }}
                  >
                    {t.name.charAt(0)}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-white">{t.name}</p>
                    <p className="text-xs text-white/40">{t.role}</p>
                  </div>
                </figcaption>
              </figure>
            </RevealItem>
          ))}
        </RevealStagger>
      </div>
    </section>
  )
}
