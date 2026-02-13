"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { Calendar, Stethoscope, FileText, DollarSign } from "lucide-react"
import type { LucideIcon } from "lucide-react"

const ease = [0.21, 0.47, 0.32, 0.98] as const

const STEPS: {
  icon: LucideIcon
  label: string
  description: string
  color: string
}[] = [
  {
    icon: Calendar,
    label: "Agende",
    description: "Paciente marca ou voce encaixa na agenda.",
    color: "#60a5fa",
  },
  {
    icon: Stethoscope,
    label: "Atenda",
    description: "Prontuario aberto. Registre em tempo real.",
    color: "#a78bfa",
  },
  {
    icon: FileText,
    label: "Registre",
    description: "Plano, orcamento e notas em um clique.",
    color: "#34d399",
  },
  {
    icon: DollarSign,
    label: "Cobre",
    description: "Lancamento automatico. Financeiro na hora.",
    color: "#fbbf24",
  },
]

function Step({
  step,
  index,
  inView,
}: {
  step: (typeof STEPS)[number]
  index: number
  inView: boolean
}) {
  return (
    <motion.div
      className="flex flex-1 flex-col items-center text-center"
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: 0.2 + index * 0.15, duration: 0.5, ease }}
    >
      {/* Icon circle */}
      <motion.div
        className="relative flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-white/5 shadow-lg shadow-black/20 backdrop-blur-sm"
        initial={{ scale: 0.5 }}
        animate={inView ? { scale: 1 } : {}}
        transition={{ delay: 0.2 + index * 0.15, type: "spring", stiffness: 300, damping: 20 }}
      >
        <div
          className="absolute inset-0 rounded-2xl opacity-20 blur-xl"
          style={{ backgroundColor: step.color }}
        />
        <step.icon className="relative h-6 w-6" style={{ color: step.color }} />
      </motion.div>

      {/* Step number */}
      <span className="mt-4 text-[11px] font-semibold tracking-wider text-white/30">0{index + 1}</span>
      <h3 className="mt-1 text-base font-semibold text-white">{step.label}</h3>
      <p className="mt-1.5 max-w-[180px] text-sm leading-snug text-white/50">{step.description}</p>
    </motion.div>
  )
}

function Connector({ inView, delay }: { inView: boolean; delay: number }) {
  return (
    <div className="hidden w-12 shrink-0 items-center pt-7 md:flex lg:w-16">
      <div className="relative h-px w-full bg-white/10">
        <motion.div
          className="absolute inset-y-0 left-0 bg-gradient-to-r from-white/30 to-white/5"
          initial={{ width: "0%" }}
          animate={inView ? { width: "100%" } : {}}
          transition={{ delay, duration: 0.8, ease }}
        />
        <motion.div
          className="absolute top-1/2 h-1.5 w-1.5 -translate-y-1/2 rounded-full bg-white/40"
          initial={{ left: "0%", opacity: 0 }}
          animate={inView ? { left: ["0%", "100%"], opacity: [0, 1, 1, 0] } : {}}
          transition={{ delay: delay + 0.3, duration: 0.8, ease }}
        />
      </div>
    </div>
  )
}

/* Mobile: vertical steps with connecting vertical line */
function MobileStep({
  step,
  index,
  inView,
  isLast,
}: {
  step: (typeof STEPS)[number]
  index: number
  inView: boolean
  isLast: boolean
}) {
  return (
    <motion.div
      className="flex gap-4"
      initial={{ opacity: 0, x: -16 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ delay: 0.2 + index * 0.12, duration: 0.5, ease }}
    >
      {/* Left: icon + vertical line */}
      <div className="flex flex-col items-center">
        <div
          className="relative flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/5 shadow-lg shadow-black/20 backdrop-blur-sm"
        >
          <div
            className="absolute inset-0 rounded-xl opacity-20 blur-lg"
            style={{ backgroundColor: step.color }}
          />
          <step.icon className="relative h-5 w-5" style={{ color: step.color }} />
        </div>
        {!isLast && (
          <div className="relative mt-2 h-full w-px bg-white/10">
            <motion.div
              className="absolute inset-x-0 top-0 bg-gradient-to-b from-white/20 to-transparent"
              initial={{ height: 0 }}
              animate={inView ? { height: "100%" } : {}}
              transition={{ delay: 0.4 + index * 0.15, duration: 0.6, ease }}
            />
          </div>
        )}
      </div>

      {/* Right: text */}
      <div className="pb-8">
        <span className="text-[11px] font-semibold tracking-wider text-white/30">0{index + 1}</span>
        <h3 className="text-base font-semibold text-white">{step.label}</h3>
        <p className="mt-1 text-sm leading-snug text-white/50">{step.description}</p>
      </div>
    </motion.div>
  )
}

export function Workflow() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { margin: "-100px" })

  return (
    <section className="relative overflow-hidden bg-[#0a1628] py-24 md:py-36">
      {/* Grid lines */}
      <div
        className="pointer-events-none absolute inset-0 grid-accent"
        style={{
          maskImage: "radial-gradient(ellipse 60% 60% at 50% 50%, #000 20%, transparent 75%)",
          WebkitMaskImage: "radial-gradient(ellipse 60% 60% at 50% 50%, #000 20%, transparent 75%)",
        }}
      />

      {/* Mesh gradients */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-0 left-1/2 h-[500px] w-[700px] -translate-x-1/2 -translate-y-1/4 rounded-full bg-[radial-gradient(circle,rgba(0,102,255,0.15)_0%,transparent_55%)] blur-3xl" />
        <div className="absolute bottom-0 right-[15%] h-[300px] w-[400px] rounded-full bg-[radial-gradient(circle,rgba(139,92,246,0.10)_0%,transparent_55%)] blur-3xl" />
      </div>

      {/* Gradient dividers */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-vyllo/20 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-vyllo/20 to-transparent" />

      <div ref={ref} className="relative mx-auto max-w-5xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease }}
          className="text-center"
        >
          <p className="text-sm font-medium text-vyllo">Como funciona</p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Da agenda ao financeiro em 4 passos.
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-base text-white/50">
            Um fluxo simples que conecta tudo. Sem retrabalho, sem app separado.
          </p>
        </motion.div>

        {/* Desktop layout: horizontal steps with connectors */}
        <div className="mt-16 hidden items-start md:flex">
          {STEPS.map((step, i) => (
            <div key={step.label} className="contents">
              <Step step={step} index={i} inView={isInView} />
              {i < STEPS.length - 1 && (
                <Connector inView={isInView} delay={0.5 + i * 0.2} />
              )}
            </div>
          ))}
        </div>

        {/* Mobile layout: vertical timeline */}
        <div className="mt-12 md:hidden">
          {STEPS.map((step, i) => (
            <MobileStep
              key={step.label}
              step={step}
              index={i}
              inView={isInView}
              isLast={i === STEPS.length - 1}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
