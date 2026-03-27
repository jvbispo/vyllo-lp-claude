"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { Calendar, MessageCircle, Activity, DollarSign, BarChart3, ArrowRight } from "lucide-react"
import type { LucideIcon } from "lucide-react"
import { useRefParam } from "@/hooks/use-ref-param"

const ease = [0.21, 0.47, 0.32, 0.98] as const

const STEPS: {
  icon: LucideIcon
  number: string
  title: string
  description: string
  color: string
}[] = [
  {
    icon: Calendar,
    number: "01",
    title: "Você agenda o paciente",
    description:
      "Cria o horário, escolhe o procedimento, define o plano de tratamento se for um caso de múltiplas sessões (ortodontia, implante, etc.). Pode bloquear horários de almoço, reunião ou folga diretamente na agenda.",
    color: "#0066ff",
  },
  {
    icon: MessageCircle,
    number: "02",
    title: "O sistema confirma no dia anterior",
    description:
      "WhatsApp automático pro paciente na véspera. Você não precisa fazer nada. O status na agenda muda conforme o paciente confirma: pendente, confirmado.",
    color: "#8b5cf6",
  },
  {
    icon: Activity,
    number: "03",
    title: "Na hora do atendimento, você acompanha em tempo real",
    description:
      'O paciente chegou? Clica "chegou". Começou? "Atendendo". Terminou? "Concluído" — e é nesse clique que a mágica acontece.',
    color: "#10b981",
  },
  {
    icon: DollarSign,
    number: "04",
    title: "O financeiro é registrado automaticamente",
    description:
      "Ao marcar como concluído, a Vyllo já lança a receita no financeiro vinculada ao tratamento. Você registra o pagamento (à vista, parcelado, convênio) — e o sistema atualiza as contas a receber do paciente automaticamente.",
    color: "#f59e0b",
  },
  {
    icon: BarChart3,
    number: "05",
    title: "O dashboard mostra o lucro real",
    description:
      "Quanto você faturou hoje. Quanto ainda vai receber. Qual procedimento dá mais lucro. Se você está perto da sua meta mensal. Tudo atualizado em tempo real, sem você tocar em nada.",
    color: "#f43f5e",
  },
]

/* ── Desktop: horizontal timeline ── */
function DesktopStep({
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
    <div className="flex flex-1 items-start">
      <motion.div
        className="flex flex-col items-center text-center"
        initial={{ opacity: 0, y: 24 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: 0.2 + index * 0.15, duration: 0.5, ease }}
      >
        {/* Icon */}
        <div
          className="relative flex h-14 w-14 items-center justify-center rounded-2xl border shadow-lg"
          style={{
            borderColor: `${step.color}30`,
            backgroundColor: `${step.color}10`,
            boxShadow: `0 4px 20px ${step.color}15`,
          }}
        >
          <step.icon className="h-6 w-6" style={{ color: step.color }} />
        </div>

        <span
          className="mt-4 text-xs font-bold tracking-wider"
          style={{ color: step.color }}
        >
          PASSO {step.number}
        </span>
        <h3 className="mt-1 max-w-[200px] text-sm font-semibold text-neutral-900">
          {step.title}
        </h3>
        <p className="mt-2 max-w-[220px] text-[13px] leading-relaxed text-neutral-500">
          {step.description}
        </p>
      </motion.div>

      {/* Arrow connector */}
      {!isLast && (
        <motion.div
          className="flex shrink-0 items-center px-2 pt-6"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={inView ? { opacity: 0.3, scale: 1 } : {}}
          transition={{ delay: 0.4 + index * 0.15, duration: 0.4, ease }}
        >
          <ArrowRight className="h-4 w-4 text-neutral-300" />
        </motion.div>
      )}
    </div>
  )
}

/* ── Mobile: vertical timeline ── */
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
      transition={{ delay: 0.15 + index * 0.1, duration: 0.5, ease }}
    >
      {/* Left: icon + vertical line */}
      <div className="flex flex-col items-center">
        <div
          className="relative flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border shadow-md"
          style={{
            borderColor: `${step.color}30`,
            backgroundColor: `${step.color}10`,
          }}
        >
          <step.icon className="h-5 w-5" style={{ color: step.color }} />
        </div>
        {!isLast && (
          <div className="mt-2 h-full w-px bg-neutral-200" />
        )}
      </div>

      {/* Right: text */}
      <div className="pb-8">
        <span
          className="text-[11px] font-bold tracking-wider"
          style={{ color: step.color }}
        >
          PASSO {step.number}
        </span>
        <h3 className="text-base font-semibold text-neutral-900">{step.title}</h3>
        <p className="mt-1 text-sm leading-relaxed text-neutral-500">
          {step.description}
        </p>
      </div>
    </motion.div>
  )
}

export function Features() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { margin: "-100px" })
  const { registroUrl } = useRefParam()

  return (
    <section id="funcionalidades" className="relative bg-white py-24 md:py-32">
      <div ref={ref} className="mx-auto max-w-6xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease }}
          className="text-center"
        >
          <h2 className="text-3xl font-bold tracking-tight text-neutral-900 sm:text-4xl">
            Como funciona na prática
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base text-neutral-500">
            Não são módulos separados que você precisa preencher um a um.
            É um fluxo. Uma coisa leva à outra.
          </p>
        </motion.div>

        {/* Desktop: horizontal */}
        <div className="mt-16 hidden items-start lg:flex">
          {STEPS.map((step, i) => (
            <DesktopStep
              key={step.number}
              step={step}
              index={i}
              inView={isInView}
              isLast={i === STEPS.length - 1}
            />
          ))}
        </div>

        {/* Mobile: vertical */}
        <div className="mt-12 lg:hidden">
          {STEPS.map((step, i) => (
            <MobileStep
              key={step.number}
              step={step}
              index={i}
              inView={isInView}
              isLast={i === STEPS.length - 1}
            />
          ))}
        </div>

        {/* Bottom callout + CTA */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 1, duration: 0.6, ease }}
          className="mt-14 text-center"
        >
          <p className="text-base font-medium text-neutral-700">
            Sem lançamento duplo. Sem copiar dado de um sistema pro outro.
          </p>
          <p className="text-base text-neutral-500">
            Uma ação. Tudo atualizado.
          </p>
          <a
            href={registroUrl}
            className="mt-6 inline-flex items-center gap-2 rounded-lg bg-vyllo px-6 py-3 text-sm font-medium text-white shadow-lg shadow-vyllo/20 transition-all hover:bg-[#0052cc] hover:shadow-xl active:scale-[0.98]"
          >
            Ver como funciona na prática — teste grátis por 15 dias
            <ArrowRight className="h-4 w-4" />
          </a>
        </motion.div>
      </div>
    </section>
  )
}
