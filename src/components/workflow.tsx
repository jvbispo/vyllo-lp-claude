"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { ClipboardList, DollarSign, FileText, HelpCircle, Smartphone, ArrowLeftRight, Frown } from "lucide-react"
import type { LucideIcon } from "lucide-react"

const ease = [0.21, 0.47, 0.32, 0.98] as const

const PAIN_POINTS: {
  icon: LucideIcon
  text: string
  color: string
}[] = [
  {
    icon: ClipboardList,
    text: "Você anota o agendamento numa planilha (ou num caderno mesmo)",
    color: "#60a5fa",
  },
  {
    icon: DollarSign,
    text: "Paciente pagou, mas você não atualizou o financeiro ainda",
    color: "#f59e0b",
  },
  {
    icon: FileText,
    text: "Prontuário em papel, ou num sistema que não fala com a agenda",
    color: "#a78bfa",
  },
  {
    icon: HelpCircle,
    text: "Você tem uma noção de quanto fatura, mas não sabe quanto lucra",
    color: "#f43f5e",
  },
  {
    icon: Smartphone,
    text: "Você termina o atendimento e ainda precisa lançar a receita manualmente",
    color: "#34d399",
  },
  {
    icon: ArrowLeftRight,
    text: "Sua agenda, prontuário e financeiro são três sistemas que não conversam entre si",
    color: "#06b6d4",
  },
  {
    icon: Frown,
    text: "Você só descobre que o paciente não pagou quando a conta não fecha no mês",
    color: "#fbbf24",
  },
]

function PainItem({
  item,
  index,
  inView,
}: {
  item: (typeof PAIN_POINTS)[number]
  index: number
  inView: boolean
}) {
  return (
    <motion.div
      className="flex items-start gap-4"
      initial={{ opacity: 0, x: -16 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ delay: 0.15 + index * 0.08, duration: 0.5, ease }}
    >
      <div
        className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/5 shadow-lg shadow-black/20 backdrop-blur-sm"
      >
        <div
          className="absolute inset-0 rounded-xl opacity-20 blur-lg"
          style={{ backgroundColor: item.color }}
        />
        <item.icon className="relative h-5 w-5" style={{ color: item.color }} />
      </div>
      <p className="pt-2 text-[15px] leading-snug text-white/70">{item.text}</p>
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

      <div ref={ref} className="relative mx-auto max-w-3xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease }}
          className="text-center"
        >
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Isso parece o seu dia a dia?
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base text-white/50">
            Você trabalha a semana inteira, a agenda está cheia — e no final do mês você ainda não sabe exatamente quanto entrou, quanto saiu e o que sobrou.
          </p>
          <p className="mt-2 text-sm text-white/40">
            Se algum desses soa familiar, você veio ao lugar certo:
          </p>
        </motion.div>

        {/* Pain points list */}
        <div className="mt-12 flex flex-col gap-5">
          {PAIN_POINTS.map((item, i) => (
            <PainItem
              key={item.text}
              item={item}
              index={i}
              inView={isInView}
            />
          ))}
        </div>

        {/* Bottom callout */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8, duration: 0.6, ease }}
          className="mt-12 rounded-2xl border border-white/10 bg-white/5 px-6 py-5 text-center backdrop-blur-sm"
        >
          <p className="text-sm font-medium text-white/80">
            Se você respondeu sim pra dois ou mais itens acima:
          </p>
          <p className="mt-1 text-sm text-white/50">
            O problema não é você. É que você nunca teve um sistema feito pra funcionar junto.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
