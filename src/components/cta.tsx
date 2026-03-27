"use client"

import { Reveal } from "./motion"
import { ArrowRight, Check } from "lucide-react"
import { useRefParam } from "@/hooks/use-ref-param"

export function Cta() {
  const { registroUrl } = useRefParam()
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

      <div className="relative mx-auto max-w-3xl px-6">
        <Reveal>
          <div className="flex flex-col items-center text-center">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl md:text-5xl">
              Você estudou anos pra cuidar de dente.
            </h2>
            <p className="mt-2 text-2xl font-bold tracking-tight text-white/60 sm:text-3xl">
              Não deveria passar horas tentando entender suas próprias finanças.
            </p>

            <div className="mt-8 max-w-lg text-base leading-relaxed text-neutral-400">
              <p>
                Todo mês que passa com a planilha é mais um mês sem saber o lucro real.
                Mais um paciente que pagou e você não lançou.
                Mais um procedimento feito sem saber se valia a pena.
              </p>
              <p className="mt-4">
                A Vyllo não resolve tudo. Mas resolve isso.
              </p>
              <p className="mt-2 text-white/60 font-medium">
                Agenda, prontuário e financeiro que conversam entre si — automático, desde o primeiro atendimento.
              </p>
            </div>

            <div className="relative mt-10 inline-flex">
              <div className="absolute -inset-2 rounded-xl bg-white/20 blur-xl" />
              <a
                href={registroUrl}
                className="group relative inline-flex items-center gap-2 rounded-lg bg-white px-8 py-4 text-base font-medium text-neutral-900 shadow-lg shadow-white/10 transition-all hover:bg-neutral-100 hover:shadow-xl hover:shadow-white/15 active:scale-[0.98]"
              >
                Começar agora — grátis por 15 dias
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </a>
            </div>

            <p className="mt-4 text-sm text-neutral-500">
              Sem cartão de crédito. Sem contrato. Cancela quando quiser.
            </p>
            <p className="mt-1 text-sm text-amber-500/80">
              Preço de lançamento: R$63,90/mês — trava esse valor ao assinar hoje.
            </p>

            {/* Trust badges */}
            <div className="mt-10 flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
              {[
                "Feita pra dentista autônomo",
                "Suporte humano incluso",
                "Seus dados são seus — exporta quando quiser",
                "Nota fiscal emitida todo mês",
              ].map((item) => (
                <span key={item} className="inline-flex items-center gap-1.5 text-xs text-neutral-500">
                  <Check className="h-3 w-3 text-emerald-400" />
                  {item}
                </span>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
