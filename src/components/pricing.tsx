"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Reveal, CountUp } from "./motion"
import { Check, ArrowRight } from "lucide-react"

const APP_URL = "https://app.vyllo.com.br"

type Cycle = "monthly" | "semiannual" | "annual"

const CYCLES: {
  id: Cycle
  label: string
  price: number
  perMonth: number
  tag: string | null
}[] = [
  { id: "monthly", label: "Mensal", price: 59, perMonth: 59, tag: null },
  { id: "semiannual", label: "Semestral", price: 294, perMonth: 49, tag: "-17%" },
  { id: "annual", label: "Anual", price: 468, perMonth: 39, tag: "-34%" },
]

const INCLUDED = [
  "Agenda completa",
  "Prontuario com odontograma",
  "Plano de tratamento",
  "Orcamentos integrados",
  "Anamnese personalizavel",
  "Financeiro completo",
  "Relatorios de faturamento",
  "Multiplos locais",
  "Suporte por WhatsApp",
  "Atualizacoes sem custo",
]

export function Pricing() {
  const [cycle, setCycle] = useState<Cycle>("semiannual")
  const selected = CYCLES.find((c) => c.id === cycle)!

  return (
    <section id="precos" className="relative overflow-hidden border-y border-neutral-200/60 bg-white py-24 md:py-36">
      {/* Spotlight glow centered on the card */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_40%_50%_at_50%_50%,rgba(0,102,255,0.07)_0%,transparent_70%)]" />

      <div className="relative mx-auto max-w-5xl px-6">
        <Reveal>
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight text-neutral-900 sm:text-4xl">
              Um plano. Tudo incluso.
            </h2>
            <p className="mt-3 text-base text-neutral-500">
              Comece gratis por 14 dias. Sem cartao de credito.
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="mx-auto mt-14 max-w-3xl">
            <div className="relative rounded-xl bg-gradient-to-b from-[#0066ff]/20 via-neutral-200/40 to-neutral-200/20 p-px shadow-[0_8px_40px_rgba(0,102,255,0.10),0_2px_6px_rgba(0,0,0,0.04)]">
            <div className="rounded-[calc(0.75rem-1px)] bg-white p-8 md:p-10">
              {/* Top accent gradient */}
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-vyllo/30 to-transparent" />

              <div className="grid gap-10 md:grid-cols-[1fr_1px_1fr]">
                {/* Left: plan info + price + CTA */}
                <div>
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-lg font-semibold text-neutral-900">Profissional</h3>
                      <p className="text-sm text-neutral-400">Tudo que voce precisa</p>
                    </div>
                    <div className="flex h-8 w-8 items-center justify-center rounded-md bg-vyllo">
                      <span className="text-xs font-bold text-white">V</span>
                    </div>
                  </div>

                  {/* Animated cycle selector */}
                  <div className="mt-6 flex rounded-lg bg-neutral-100 p-1">
                    {CYCLES.map((c) => (
                      <button
                        key={c.id}
                        onClick={() => setCycle(c.id)}
                        className="relative flex-1 rounded-md px-3 py-2 text-sm transition-colors"
                        style={{ color: cycle === c.id ? "#0a0a0a" : "#737373" }}
                      >
                        {cycle === c.id && (
                          <motion.div
                            layoutId="pricing-tab"
                            className="absolute inset-0 rounded-md bg-white shadow-sm"
                            transition={{ type: "spring", stiffness: 380, damping: 30 }}
                          />
                        )}
                        <span className="relative z-10 font-medium">
                          {c.label}
                          {c.tag && cycle === c.id && (
                            <span className="ml-1 text-xs font-semibold text-emerald-500">{c.tag}</span>
                          )}
                        </span>
                      </button>
                    ))}
                  </div>

                  {/* Price with animation */}
                  <div className="mt-8">
                    <div className="flex items-baseline gap-1">
                      <span className="text-sm text-neutral-400">R$</span>
                      <AnimatePresence mode="wait">
                        <motion.span
                          key={selected.perMonth}
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 10 }}
                          transition={{ duration: 0.2 }}
                          className="text-5xl font-bold tracking-tight text-neutral-900"
                        >
                          {selected.perMonth}
                        </motion.span>
                      </AnimatePresence>
                      <span className="text-neutral-400">/mes</span>
                    </div>
                    {cycle !== "monthly" && (
                      <p className="mt-1 text-sm text-neutral-400">
                        R$ {selected.price} a cada {cycle === "semiannual" ? "6 meses" : "12 meses"}
                      </p>
                    )}
                  </div>

                  {/* CTA */}
                  <a
                    href={`${APP_URL}/auth/registro`}
                    className="group mt-8 flex w-full items-center justify-center gap-2 rounded-lg bg-vyllo py-3 text-sm font-medium text-white shadow-md shadow-vyllo/20 transition-all hover:bg-[#0052cc] hover:shadow-lg hover:shadow-vyllo/25 active:scale-[0.98]"
                  >
                    Comecar teste gratis
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                  </a>
                  <p className="mt-3 text-center text-xs text-neutral-400">
                    14 dias gratis. Sem cartao. Cancele quando quiser.
                  </p>
                </div>

                {/* Divider */}
                <div className="hidden bg-neutral-100 md:block" />

                {/* Right: features list */}
                <div className="flex flex-col justify-center border-t border-neutral-100 pt-6 md:border-t-0 md:pt-0">
                  <p className="mb-4 text-sm font-medium text-neutral-900">Incluso no plano:</p>
                  <ul className="grid gap-2.5 sm:grid-cols-2 md:grid-cols-1 lg:gap-3">
                    {INCLUDED.map((item) => (
                      <li key={item} className="flex items-center gap-3 text-sm text-neutral-600">
                        <Check className="h-4 w-4 shrink-0 text-vyllo" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
            </div>
          </div>
        </Reveal>

        {/* Stats below pricing */}
        <Reveal delay={0.2}>
          <div className="mx-auto mt-16 grid max-w-lg grid-cols-3 gap-8 text-center">
            <div>
              <CountUp target={14} className="text-2xl font-bold text-neutral-900" />
              <p className="mt-1 text-xs text-neutral-400">dias gratis</p>
            </div>
            <div>
              <CountUp target={5} className="text-2xl font-bold text-neutral-900" suffix=" min" />
              <p className="mt-1 text-xs text-neutral-400">para configurar</p>
            </div>
            <div>
              <CountUp target={0} prefix="R$ " className="text-2xl font-bold text-neutral-900" />
              <p className="mt-1 text-xs text-neutral-400">taxas escondidas</p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
