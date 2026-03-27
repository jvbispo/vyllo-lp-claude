import Image from "next/image"
import { RevealStagger, RevealItem, Reveal } from "./motion"

const TESTIMONIALS = [
  {
    name: "Dra. Larissa Luduvice",
    role: "Periodontista",
    text: "Eu usava três coisas diferentes: uma agenda no Google, prontuário num sistema separado e uma planilha pra financeiro. No final do mês eu passava horas tentando entender o que tinha acontecido. Com a Vyllo, quando eu termino o atendimento, já aparece no financeiro. Parece coisa pequena, mas mudou completamente como eu encerro o meu dia.",
    accent: "#60a5fa",
    image: "/dra-larissa-luduvice.jpg",
  },
  {
    name: "Dr. Luca Albuquerque",
    role: "Clínico-Geral",
    text: "É você bater o olho e ver como está o consultório. Não dá erro, não tem fórmula, é um facilitador que cumpre muito mais do que promete.",
    accent: "#a78bfa",
    image: "/dr-luca-albuquerque.jpg",
  },
  {
    name: "Dra. Victoria Santana",
    role: "Cirurgiã-Dentista",
    text: "O app facilitou muito o meu dia a dia. Gestão mais organizada, atendimento mais ágil e sobra mais tempo para focar nos pacientes.",
    accent: "#34d399",
    image: "/dra-victoria-santana.jpg",
  },
  {
    name: "Dr. Guilherme Tavares",
    role: "Endodontista",
    text: "É incrível encontrar uma ferramenta que realmente atende às demandas do dia a dia de um consultório.",
    accent: "#fbbf24",
    image: "/dr-guilherme-tavares-new.jpg",
    imageScale: 1.55,
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

      <div className="relative mx-auto max-w-6xl px-6">
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

        <RevealStagger className="mt-14 grid gap-6 md:grid-cols-2 md:gap-8 lg:gap-10">
          {TESTIMONIALS.map((t) => (
            <RevealItem key={t.name}>
              <figure className="relative flex h-full flex-col justify-between rounded-xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm transition-all hover:border-white/15 hover:bg-white/[0.07] md:p-8">
                {/* Accent line top */}
                <div
                  className="absolute top-0 left-6 right-6 h-px md:left-8 md:right-8"
                  style={{ background: `linear-gradient(90deg, ${t.accent}40, transparent)` }}
                />

                <blockquote className="text-base leading-relaxed text-white/70 md:text-lg md:leading-relaxed">
                  &ldquo;{t.text}&rdquo;
                </blockquote>

                <figcaption className="mt-6 flex items-center gap-3 border-t border-white/10 pt-4 md:mt-8 md:gap-4 md:pt-5">
                  <div className={`relative shrink-0 overflow-hidden rounded-full ring-2 ring-white/10 ${(t as { imageScale?: number }).imageScale ? "h-12 w-12 md:h-14 md:w-14" : "h-10 w-10 md:h-12 md:w-12"}`}>
                    <Image
                      src={t.image}
                      alt=""
                      width={56}
                      height={56}
                      className="object-cover"
                      style={(t as { imageScale?: number }).imageScale != null ? { transform: `scale(${(t as { imageScale: number }).imageScale})` } : undefined}
                      sizes="(min-width: 768px) 56px, 48px"
                    />
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-white md:text-base">{t.name}</p>
                    <p className="text-xs text-white/40 md:text-sm">{t.role}</p>
                  </div>
                </figcaption>
              </figure>
            </RevealItem>
          ))}
        </RevealStagger>

        <Reveal delay={0.2}>
          <p className="mt-10 text-center text-sm text-white/40">
            Dentistas que usam a Vyllo param de usar planilha em, em média, menos de uma semana.
            <br />
            Não porque são obrigados. Porque não faz mais sentido voltar.
          </p>
        </Reveal>
      </div>
    </section>
  )
}
