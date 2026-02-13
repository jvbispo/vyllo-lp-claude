import { Reveal } from "./motion"
import { ArrowRight } from "lucide-react"

const APP_URL = "https://app.vyllo.com.br"

export function Cta() {
  return (
    <section className="relative overflow-hidden bg-[#0a0f1a] py-24 md:py-32">
      {/* Grid lines with radial fade mask */}
      <div
        className="pointer-events-none absolute inset-0 grid-accent"
        style={{
          maskImage: "radial-gradient(ellipse 70% 70% at 50% 50%, #000 20%, transparent 80%)",
          WebkitMaskImage: "radial-gradient(ellipse 70% 70% at 50% 50%, #000 20%, transparent 80%)",
        }}
      />

      {/* Scan lines overlay */}
      <div className="pointer-events-none absolute inset-0 scan-lines" />

      {/* Stronger mesh gradient */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background: `
            radial-gradient(ellipse 50% 40% at 50% 0%, rgba(0,102,255,0.22) 0%, transparent 70%),
            radial-gradient(ellipse 40% 40% at 80% 80%, rgba(139,92,246,0.12) 0%, transparent 70%)
          `,
        }}
      />

      {/* Gradient line divider at top */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-vyllo/30 to-transparent" />

      <div className="relative mx-auto max-w-5xl px-6">
        <Reveal>
          <div className="flex flex-col items-center text-center">
            <p className="text-sm text-neutral-500 mb-4">
              Chega de planilha, papel e sistema da clinica.
            </p>
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl md:text-5xl">
              Comece a usar o Vyllo hoje.
            </h2>
            <p className="mt-4 max-w-md text-base text-neutral-400">
              14 dias gratis, sem cartao de credito. Configure em 5 minutos
              e descubra como e ter seu consultorio no bolso.
            </p>
            <div className="relative mt-8 inline-flex">
              <div className="absolute -inset-2 rounded-xl bg-white/20 blur-xl" />
              <a
                href={`${APP_URL}/auth/registro`}
                className="group relative inline-flex items-center gap-2 rounded-lg bg-white px-6 py-3 text-sm font-medium text-neutral-900 shadow-lg shadow-white/10 transition-all hover:bg-neutral-100 hover:shadow-xl hover:shadow-white/15 active:scale-[0.98]"
              >
                Comecar teste gratis
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
