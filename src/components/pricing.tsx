"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence, useInView } from "framer-motion"
import { Reveal, CountUp } from "./motion"
import { Check, ArrowRight } from "lucide-react"
import { useRefParam } from "@/hooks/use-ref-param"

const BADGE_STAGGER_DELAY = 0.05
const SPOTLIGHT_LOOP_MS = 46000
const SPOTLIGHT_TICK_MS = 50

type Cycle = "monthly" | "semiannual" | "annual"

const CYCLES: {
  id: Cycle
  label: string
  price: number
  perMonth: number
  displayPrice: string
  tag: string | null
}[] = [
  { id: "monthly", label: "Mensal", price: 79.9, perMonth: 79.9, displayPrice: "79,90", tag: null },
  { id: "semiannual", label: "Semestral", price: 431.4, perMonth: 71.9, displayPrice: "71,90", tag: "-10%" },
  { id: "annual", label: "Anual", price: 766.8, perMonth: 63.9, displayPrice: "63,90", tag: "-20%" },
]

const INCLUDED = [
  "Agenda com confirmação automática no WhatsApp (200 créditos/mês)",
  "Prontuário digital com odontograma multifaces",
  "Anamnese com modelos personalizáveis",
  "Plano de tratamento com prioridades e sessões",
  "Orçamentos integrados",
  "Fotos antes/depois com Slider Visual",
  "Dashboard financeiro com lucro real",
  "Despesas recorrentes automáticas",
  "Relatórios e recibos em PDF",
  "Múltiplos locais de atendimento",
  "Suporte humano via WhatsApp",
  "Calculadora de Lucro grátis pra sempre",
]

function CycleSelector({
  cycle,
  setCycle,
}: {
  cycle: Cycle
  setCycle: (c: Cycle) => void
}) {
  return (
    <div className="flex rounded-lg bg-neutral-100 p-1">
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
              <span className="ml-1 text-xs font-semibold text-emerald-400">{c.tag}</span>
            )}
          </span>
        </button>
      ))}
    </div>
  )
}

function Stats() {
  return (
    <div className="mx-auto mt-16 grid max-w-lg grid-cols-3 gap-8 text-center">
      <div>
        <CountUp target={15} className="text-2xl font-bold text-neutral-900" />
        <p className="mt-1 text-xs text-neutral-400">dias grátis</p>
      </div>
      <div>
        <CountUp target={5} className="text-2xl font-bold text-neutral-900" suffix=" min" />
        <p className="mt-1 text-xs text-neutral-400">pra começar</p>
      </div>
      <div>
        <CountUp target={0} prefix="R$ " className="text-2xl font-bold text-neutral-900" />
        <p className="mt-1 text-xs text-neutral-400">taxas escondidas</p>
      </div>
    </div>
  )
}

const SPOTLIGHT_RADIUS = 1.6

function getHighlightIntensity(progress: number, index: number, total: number): number {
  const spot = progress * total
  const d1 = Math.abs(spot - index)
  const d2 = Math.abs(spot - index - total)
  const d3 = Math.abs(spot - index + total)
  const dist = Math.min(d1, d2, d3)
  return Math.max(0, 1 - dist / SPOTLIGHT_RADIUS)
}

const badgeVariants = {
  hidden: { opacity: 0, y: 10, scale: 0.96 },
  visible: { opacity: 1, y: 0, scale: 1 },
}

function AnimatedBadges() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-80px" })
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    if (!isInView) return
    const delta = SPOTLIGHT_TICK_MS / SPOTLIGHT_LOOP_MS
    const timer = setInterval(() => {
      setProgress((p) => (p >= 1 ? 0 : p + delta))
    }, SPOTLIGHT_TICK_MS)
    return () => clearInterval(timer)
  }, [isInView])

  return (
    <motion.div
      ref={ref}
      className="mx-auto mt-14 flex max-w-3xl flex-wrap items-center justify-center gap-2.5"
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={{
        visible: { transition: { staggerChildren: BADGE_STAGGER_DELAY } },
      }}
    >
      {INCLUDED.map((item, index) => {
        const parts = item.includes(" | ") ? item.split(" | ") : null
        const intensity = isInView ? getHighlightIntensity(progress, index, INCLUDED.length) : 0
        return (
          <motion.span
            key={item}
            variants={badgeVariants}
            transition={{ duration: 0.3, ease: [0.21, 0.47, 0.32, 0.98] }}
            className="inline-flex items-center gap-2 rounded-full border bg-white/80 px-4 py-2 text-center text-sm text-neutral-600 shadow-sm backdrop-blur-sm hover:border-vyllo/30 hover:shadow-[0_0_12px_rgba(0,102,255,0.12)]"
            style={{
              borderColor: `rgba(0,102,255,${0.18 + 0.3 * intensity})`,
              boxShadow: intensity > 0
                ? `0 0 14px rgba(0,102,255,${0.16 * intensity}), 0 0 4px rgba(0,102,255,${0.08 * intensity})`
                : "0 1px 2px 0 rgb(0 0 0 / 0.05)",
              transform: `scale(${1 + 0.03 * intensity})`,
              transition: "border-color 0.2s ease-out, box-shadow 0.2s ease-out, transform 0.2s ease-out",
            }}
          >
            <Check className="h-3.5 w-3.5 shrink-0 text-vyllo" />
            {parts ? (
              <span className="block">
                <span>{parts[0]}</span>
                <br />
                <span>{parts[1]}</span>
              </span>
            ) : (
              item
            )}
          </motion.span>
        )
      })}
    </motion.div>
  )
}

export function Pricing() {
  const [cycle, setCycle] = useState<Cycle>("annual")
  const selected = CYCLES.find((c) => c.id === cycle)!
  const { registroUrl } = useRefParam()

  return (
    <section id="precos" className="relative overflow-hidden py-24 md:py-36" style={{
      background: "linear-gradient(135deg, #f0f4ff 0%, #fafafa 40%, #f5f0ff 100%)",
    }}>
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-[10%] left-[15%] h-[400px] w-[400px] rounded-full bg-[radial-gradient(circle,rgba(0,102,255,0.08)_0%,transparent_60%)] blur-3xl" />
        <div className="absolute bottom-[10%] right-[15%] h-[300px] w-[300px] rounded-full bg-[radial-gradient(circle,rgba(139,92,246,0.06)_0%,transparent_60%)] blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-5xl px-6">
        <Reveal>
          <div className="flex flex-col items-center text-center">
            <div className="inline-flex items-center gap-1.5 rounded-full bg-amber-50 px-3 py-1 text-xs font-semibold text-amber-700 mb-4">
              <span className="h-1.5 w-1.5 rounded-full bg-amber-400" />
              Preço de lançamento
            </div>
            <p className="text-sm font-medium text-vyllo">Vyllo Profissional</p>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-neutral-900 sm:text-4xl md:text-5xl">
              Um plano. Tudo dentro. R$79,90.
            </h2>

            <div className="mt-8 w-full max-w-xs">
              <CycleSelector cycle={cycle} setCycle={setCycle} />
            </div>

            <div className="mt-8 flex items-baseline gap-2">
              <span className="text-lg text-neutral-400">R$</span>
              <AnimatePresence mode="wait">
                <motion.span
                  key={selected.displayPrice}
                  initial={{ opacity: 0, y: -16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 16 }}
                  transition={{ duration: 0.2 }}
                  className="text-7xl font-bold tracking-tighter text-neutral-900 md:text-8xl"
                >
                  {selected.displayPrice}
                </motion.span>
              </AnimatePresence>
              <span className="text-lg text-neutral-400">/mês</span>
            </div>
            {selected.id !== "monthly" && (
              <p className="mt-2 text-sm text-neutral-400">
                R$ {selected.price.toFixed(2).replace(".", ",")} a cada {selected.id === "semiannual" ? "6 meses" : "12 meses"}
              </p>
            )}

            <div className="mt-8 flex flex-col items-center gap-3">
              <div className="relative inline-flex">
                <div className="absolute -inset-1 rounded-xl bg-gradient-to-r from-[#0066ff] to-[#8b5cf6] opacity-20 blur-lg" />
                <a
                  href={registroUrl}
                  className="group relative inline-flex items-center gap-2 rounded-lg bg-vyllo px-8 py-3.5 text-sm font-medium text-white shadow-lg shadow-vyllo/20 transition-all hover:bg-[#0052cc] hover:shadow-xl hover:shadow-vyllo/25 active:scale-[0.98]"
                >
                  Testar grátis por 15 dias
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </a>
              </div>
              <p className="text-xs text-neutral-400">
                Sem cartão. Cancele quando quiser. Sério.
              </p>
            </div>
          </div>
        </Reveal>

        <AnimatedBadges />

        <Reveal delay={0.2}>
          <Stats />
        </Reveal>
      </div>
    </section>
  )
}
