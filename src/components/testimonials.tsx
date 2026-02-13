import { RevealStagger, RevealItem, Reveal } from "./motion"

const TESTIMONIALS = [
  {
    name: "Dra. Camila R.",
    role: "Ortodontista — Belo Horizonte",
    text: "Finalmente um sistema que nao parece ter sido feito nos anos 2000. A interface e limpa, rapida e faz sentido para o dia a dia.",
    accent: "#0066ff",
  },
  {
    name: "Dr. Lucas M.",
    role: "Clinico Geral — Sao Paulo",
    text: "O prontuario com timeline mudou minha rotina. Tenho tudo do paciente em um lugar so, sem ficar alternando entre apps.",
    accent: "#8b5cf6",
  },
  {
    name: "Dra. Patricia S.",
    role: "Endodontista — Curitiba",
    text: "Mandei mensagem no WhatsApp e me responderam em minutos. Isso faz toda a diferenca quando voce esta no meio de um atendimento.",
    accent: "#10b981",
  },
]

export function Testimonials() {
  return (
    <section className="relative overflow-hidden border-y border-neutral-200/60 bg-white py-24 md:py-32">
      {/* Warm gradient background */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_0%,rgba(0,102,255,0.06)_0%,transparent_60%)]" />
      <div className="pointer-events-none absolute bottom-0 right-0 h-[400px] w-[400px] rounded-full bg-[radial-gradient(circle,rgba(139,92,246,0.05)_0%,transparent_60%)] blur-3xl" />

      <div className="relative mx-auto max-w-5xl px-6">
        <Reveal>
          <h2 className="text-3xl font-bold tracking-tight text-neutral-900 sm:text-4xl">
            O que dentistas dizem
          </h2>
          <p className="mt-3 text-base text-neutral-500">
            Feedback real de quem usa o Vyllo no consultorio.
          </p>
        </Reveal>

        <RevealStagger className="mt-14 grid gap-6 md:grid-cols-3">
          {TESTIMONIALS.map((t) => (
            <RevealItem key={t.name}>
              <figure className="relative flex h-full flex-col justify-between rounded-xl border border-neutral-200/60 bg-white p-6 shadow-[0_4px_20px_rgba(0,102,255,0.04),0_1px_3px_rgba(0,0,0,0.03)] transition-all hover:border-neutral-200 hover:shadow-[0_8px_32px_rgba(0,102,255,0.08),0_2px_6px_rgba(0,0,0,0.05)]">
                {/* Accent line top */}
                <div
                  className="absolute top-0 left-6 right-6 h-px"
                  style={{ background: `linear-gradient(90deg, ${t.accent}30, transparent)` }}
                />

                <blockquote className="text-base leading-relaxed text-neutral-600">
                  &ldquo;{t.text}&rdquo;
                </blockquote>

                <figcaption className="mt-6 flex items-center gap-3 border-t border-neutral-50 pt-4">
                  <div
                    className="flex h-9 w-9 items-center justify-center rounded-full text-xs font-semibold text-white"
                    style={{ backgroundColor: t.accent }}
                  >
                    {t.name.charAt(0)}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-neutral-900">{t.name}</p>
                    <p className="text-xs text-neutral-400">{t.role}</p>
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
