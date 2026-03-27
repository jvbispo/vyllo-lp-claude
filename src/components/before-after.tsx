"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { X, Check } from "lucide-react"

const ease = [0.21, 0.47, 0.32, 0.98] as const

const COMPARISONS = [
  {
    before: "Agenda em planilha ou caderno",
    after: "Agenda com status em tempo real: pendente, confirmado, chegou, atendendo, concluído",
  },
  {
    before: "Confirmar consulta na mão, um a um",
    after: "Confirmação automática via WhatsApp no dia anterior",
  },
  {
    before: "Prontuário em papel ou sistema separado",
    after: "Prontuário vinculado ao paciente, acessível direto da agenda",
  },
  {
    before: "Lançar receita no financeiro depois (quando lembra)",
    after: "Receita registrada automaticamente quando o atendimento é concluído",
  },
  {
    before: '"Quanto esse paciente ainda deve?" — não sabe',
    after: "Contas a receber por paciente e por tratamento, em tempo real",
  },
  {
    before: "Planilha de despesas que ninguém atualiza",
    after: "Despesas recorrentes automáticas todo mês",
  },
  {
    before: '"Esse procedimento vale a pena?" — chute',
    after: "Relatório de lucro por procedimento, sem fórmula",
  },
  {
    before: "Fim do mês = quebra-cabeça financeiro",
    after: "Dashboard com lucro real, recebimentos e meta mensal",
  },
]

function ComparisonRow({
  item,
  index,
  inView,
}: {
  item: (typeof COMPARISONS)[number]
  index: number
  inView: boolean
}) {
  return (
    <motion.div
      className="grid grid-cols-1 gap-3 md:grid-cols-2 md:gap-6"
      initial={{ opacity: 0, y: 12 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: 0.15 + index * 0.08, duration: 0.5, ease }}
    >
      {/* Before */}
      <div className="flex items-start gap-3 rounded-xl border border-neutral-200/60 bg-neutral-50 px-4 py-3">
        <X className="mt-0.5 h-4 w-4 shrink-0 text-neutral-400" />
        <span className="text-sm text-neutral-500">{item.before}</span>
      </div>
      {/* After */}
      <div className="flex items-start gap-3 rounded-xl border border-emerald-200/60 bg-emerald-50/50 px-4 py-3">
        <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500" />
        <span className="text-sm font-medium text-neutral-700">{item.after}</span>
      </div>
    </motion.div>
  )
}

export function BeforeAfter() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { margin: "-100px" })

  return (
    <section className="relative bg-white py-24 md:py-32">
      <div ref={ref} className="mx-auto max-w-4xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease }}
          className="text-center"
        >
          <h2 className="text-3xl font-bold tracking-tight text-neutral-900 sm:text-4xl">
            Como era. Como é agora.
          </h2>
        </motion.div>

        {/* Headers */}
        <div className="mt-12 hidden grid-cols-2 gap-6 md:grid">
          <div className="px-4 text-sm font-semibold uppercase tracking-wider text-neutral-400">
            Antes da Vyllo
          </div>
          <div className="px-4 text-sm font-semibold uppercase tracking-wider text-emerald-600">
            Com a Vyllo
          </div>
        </div>

        {/* Rows */}
        <div className="mt-4 flex flex-col gap-3 md:mt-3">
          {COMPARISONS.map((item, i) => (
            <ComparisonRow key={i} item={item} index={i} inView={isInView} />
          ))}
        </div>

        {/* Bottom quote */}
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 1, duration: 0.6, ease }}
          className="mt-10 text-center text-base font-medium text-neutral-600"
        >
          Uma ação na Vyllo alimenta a próxima. Você atende. O sistema cuida do resto.
        </motion.p>
      </div>
    </section>
  )
}
