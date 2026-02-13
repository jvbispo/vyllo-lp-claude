"use client"

import { motion, useInView } from "framer-motion"
import { useRef, type ReactNode } from "react"
import { Reveal, RevealStagger, RevealItem } from "./motion"
import {
  Calendar,
  FileText,
  DollarSign,
  MessageCircle,
  ClipboardList,
  ReceiptText,
} from "lucide-react"
import type { LucideIcon } from "lucide-react"

const ease = [0.21, 0.47, 0.32, 0.98] as const

/* ── Animated mini-illustrations ─────────────────── */

function AgendaVisual() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: "-60px" })

  const hours = ["08:00", "09:00", "10:00", "11:00", "12:00"]
  const appointments = [
    { top: "0%", height: "28%", color: "#0066ff", name: "Maria S.", delay: 0.3 },
    { top: "32%", height: "20%", color: "#8b5cf6", name: "Carlos R.", delay: 0.45 },
    { top: "56%", height: "24%", color: "#10b981", name: "Ana P.", delay: 0.6 },
  ]

  return (
    <div ref={ref} className="relative h-full rounded-lg bg-white p-4">
      {/* Header */}
      <motion.div
        className="mb-3 flex items-center justify-between"
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 0.4 }}
      >
        <div className="h-2.5 w-16 rounded bg-neutral-200" />
        <div className="flex gap-1">
          {[1, 2, 3, 4, 5].map((d) => (
            <div
              key={d}
              className={`h-6 w-6 rounded-md text-center text-[10px] leading-6 ${d === 3 ? "bg-[#0066ff]/10 font-semibold text-[#0066ff]" : "text-neutral-400"}`}
            >
              {d + 9}
            </div>
          ))}
        </div>
      </motion.div>

      {/* Time grid */}
      <div className="relative flex flex-1 gap-2">
        {/* Hours column */}
        <div className="flex flex-col justify-between text-[9px] text-neutral-300">
          {hours.map((h, i) => (
            <motion.span
              key={h}
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ delay: 0.2 + i * 0.05 }}
            >
              {h}
            </motion.span>
          ))}
        </div>

        {/* Grid + appointments */}
        <div className="relative flex-1">
          {/* Grid lines */}
          {hours.map((_, i) => (
            <motion.div
              key={i}
              className="absolute left-0 right-0 h-px bg-neutral-100"
              style={{ top: `${(i / (hours.length - 1)) * 100}%` }}
              initial={{ scaleX: 0 }}
              animate={inView ? { scaleX: 1 } : {}}
              transition={{ delay: 0.1 + i * 0.04, duration: 0.4 }}
            />
          ))}

          {/* Appointment blocks */}
          {appointments.map((apt) => (
            <motion.div
              key={apt.name}
              className="absolute left-1 right-1 rounded-md px-2 py-1"
              style={{
                top: apt.top,
                height: apt.height,
                backgroundColor: `${apt.color}12`,
                borderLeft: `2px solid ${apt.color}`,
              }}
              initial={{ opacity: 0, scaleY: 0 }}
              animate={inView ? { opacity: 1, scaleY: 1 } : {}}
              transition={{ delay: apt.delay, duration: 0.4, ease }}
            >
              <span className="text-[10px] font-medium" style={{ color: apt.color }}>
                {apt.name}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}

function ProntuarioVisual() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: "-60px" })

  /* Simple tooth path (molar shape) */
  const toothPath = "M12 2C8 2 6 5 6 8c0 2 1 4 2 6 .5 1 1 3 1 5 0 1 .5 2 1.5 2h3c1 0 1.5-1 1.5-2 0-2 .5-4 1-5 1-2 2-4 2-6 0-3-2-6-6-6z"

  const timelineItems = [
    { label: "Nota clinica", color: "#0066ff", delay: 0.4 },
    { label: "Raio-X adicionado", color: "#8b5cf6", delay: 0.55 },
    { label: "Tratamento iniciado", color: "#10b981", delay: 0.7 },
  ]

  return (
    <div ref={ref} className="relative h-full rounded-lg bg-white p-4">
      {/* Tooth with drawing animation */}
      <div className="mb-3 flex items-center gap-3">
        <motion.svg
          viewBox="0 0 24 24"
          className="h-10 w-10"
          fill="none"
          stroke="#8b5cf6"
          strokeWidth={1.5}
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <motion.path
            d={toothPath}
            initial={{ pathLength: 0, opacity: 0 }}
            animate={inView ? { pathLength: 1, opacity: 1 } : {}}
            transition={{ delay: 0.2, duration: 1.2, ease }}
          />
        </motion.svg>
        <div>
          <motion.div
            className="h-2.5 w-20 rounded bg-neutral-200"
            initial={{ scaleX: 0 }}
            animate={inView ? { scaleX: 1 } : {}}
            transition={{ delay: 0.3, duration: 0.4 }}
            style={{ transformOrigin: "left" }}
          />
          <motion.div
            className="mt-1.5 h-2 w-14 rounded bg-neutral-100"
            initial={{ scaleX: 0 }}
            animate={inView ? { scaleX: 1 } : {}}
            transition={{ delay: 0.4, duration: 0.4 }}
            style={{ transformOrigin: "left" }}
          />
        </div>
      </div>

      {/* Mini timeline */}
      <div className="space-y-2">
        {timelineItems.map((item) => (
          <motion.div
            key={item.label}
            className="flex items-center gap-2.5 rounded-md p-2"
            style={{ backgroundColor: `${item.color}08` }}
            initial={{ opacity: 0, x: -10 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: item.delay, duration: 0.4, ease }}
          >
            <div
              className="h-1.5 w-1.5 rounded-full"
              style={{ backgroundColor: item.color }}
            />
            <span className="text-[10px] text-neutral-600">{item.label}</span>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

function FinanceiroVisual() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: "-60px" })

  const bars = [
    { height: 45, color: "#10b981" },
    { height: 65, color: "#10b981" },
    { height: 35, color: "#ef4444" },
    { height: 80, color: "#10b981" },
    { height: 55, color: "#10b981" },
    { height: 70, color: "#10b981" },
  ]

  return (
    <div ref={ref} className="relative h-full rounded-lg bg-white p-4">
      {/* Summary cards */}
      <div className="mb-3 grid grid-cols-2 gap-2">
        <motion.div
          className="rounded-md bg-emerald-50 p-2"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ delay: 0.3, duration: 0.4 }}
        >
          <div className="text-[9px] text-emerald-600">Receitas</div>
          <motion.div
            className="text-sm font-bold text-emerald-700"
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.5 }}
          >
            R$ 12.450
          </motion.div>
        </motion.div>
        <motion.div
          className="rounded-md bg-red-50 p-2"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ delay: 0.4, duration: 0.4 }}
        >
          <div className="text-[9px] text-red-500">Despesas</div>
          <motion.div
            className="text-sm font-bold text-red-600"
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.6 }}
          >
            R$ 3.200
          </motion.div>
        </motion.div>
      </div>

      {/* Chart */}
      <div className="flex h-16 items-end gap-1.5 rounded-lg bg-neutral-50 p-2">
        {bars.map((bar, i) => (
          <motion.div
            key={i}
            className="flex-1 rounded-t"
            style={{ backgroundColor: `${bar.color}25` }}
            initial={{ height: 0 }}
            animate={inView ? { height: `${bar.height}%` } : {}}
            transition={{ delay: 0.6 + i * 0.08, duration: 0.5, ease }}
          />
        ))}
      </div>
    </div>
  )
}

function WhatsAppVisual() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: "-60px" })

  const messages = [
    { text: "Lembrete: consulta amanha as 14h", sent: true, delay: 0.3 },
    { text: "Confirmado!", sent: false, delay: 0.7 },
  ]

  return (
    <div ref={ref} className="relative h-full rounded-lg bg-white p-4">
      {/* WhatsApp-style header */}
      <motion.div
        className="mb-3 flex items-center gap-2 rounded-lg bg-[#22c55e]/10 p-2"
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ delay: 0.2 }}
      >
        <div className="h-6 w-6 rounded-full bg-[#22c55e]/20" />
        <div>
          <div className="h-2 w-16 rounded bg-neutral-200" />
          <div className="mt-1 h-1.5 w-10 rounded bg-neutral-100" />
        </div>
      </motion.div>

      {/* Messages */}
      <div className="space-y-2">
        {messages.map((msg) => (
          <motion.div
            key={msg.text}
            className={`max-w-[85%] rounded-lg px-3 py-2 ${
              msg.sent
                ? "ml-auto bg-[#22c55e]/10 text-right"
                : "bg-neutral-100"
            }`}
            initial={{ opacity: 0, scale: 0.8, y: 10 }}
            animate={inView ? { opacity: 1, scale: 1, y: 0 } : {}}
            transition={{ delay: msg.delay, duration: 0.4, type: "spring", stiffness: 300 }}
          >
            <span className="text-[10px] text-neutral-600">{msg.text}</span>
          </motion.div>
        ))}
      </div>

      {/* Status indicator */}
      <motion.div
        className="mt-3 flex items-center gap-1.5"
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ delay: 1.0 }}
      >
        <div className="h-1.5 w-1.5 rounded-full bg-[#22c55e]" />
        <span className="text-[9px] text-[#22c55e] font-medium">Confirmado automaticamente</span>
      </motion.div>
    </div>
  )
}

/* ── Feature block ───────────────────────────────── */

function Feature({
  icon: Icon,
  label,
  title,
  description,
  details,
  reverse,
  accentColor,
  visual,
}: {
  icon: LucideIcon
  label: string
  title: string
  description: string
  details: string[]
  reverse?: boolean
  accentColor: string
  visual: ReactNode
}) {
  const textBlock = (
    <Reveal>
      <div
        className="flex h-10 w-10 items-center justify-center rounded-lg"
        style={{ backgroundColor: `${accentColor}12` }}
      >
        <Icon className="h-5 w-5" style={{ color: accentColor }} />
      </div>
      <p className="mt-4 text-sm font-medium" style={{ color: accentColor }}>
        {label}
      </p>
      <h3 className="mt-2 text-2xl font-bold tracking-tight text-neutral-900 sm:text-3xl">
        {title}
      </h3>
      <p className="mt-4 text-base leading-relaxed text-neutral-500">
        {description}
      </p>
      <ul className="mt-6 space-y-2.5">
        {details.map((d) => (
          <li key={d} className="flex items-start gap-3 text-sm text-neutral-600">
            <span
              className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full"
              style={{ backgroundColor: accentColor }}
            />
            {d}
          </li>
        ))}
      </ul>
    </Reveal>
  )

  const visualBlock = (
    <Reveal delay={0.1}>
      <div className="relative overflow-hidden rounded-xl border border-neutral-200 bg-neutral-50 shadow-sm">
        {/* Top accent line */}
        <div
          className="absolute top-0 left-0 h-1 w-full"
          style={{ background: `linear-gradient(90deg, ${accentColor}40, ${accentColor}10)` }}
        />
        <div className="aspect-[4/3] p-1">
          {visual}
        </div>
      </div>
    </Reveal>
  )

  return (
    <div className="grid items-center gap-12 md:gap-20 lg:grid-cols-2">
      {reverse ? (
        <>
          <div className="lg:order-2">{textBlock}</div>
          <div className="lg:order-1">{visualBlock}</div>
        </>
      ) : (
        <>
          {textBlock}
          {visualBlock}
        </>
      )}
    </div>
  )
}

const HIGHLIGHTS = [
  { icon: ClipboardList, label: "Orcamentos", color: "#f59e0b" },
  { icon: ReceiptText, label: "Recibos PDF", color: "#8b5cf6" },
]

export function Features() {
  return (
    <section id="funcionalidades" className="relative py-24 md:py-36 bg-gradient-to-b from-[#f0f5ff] to-[#fafafa]">
      {/* Grid lines with fade mask */}
      <div
        className="pointer-events-none absolute inset-0 grid-lines-light"
        style={{
          maskImage: "radial-gradient(ellipse 70% 60% at 50% 50%, #000 40%, transparent 90%)",
          WebkitMaskImage: "radial-gradient(ellipse 70% 60% at 50% 50%, #000 40%, transparent 90%)",
        }}
      />

      <div className="relative mx-auto max-w-5xl px-6">
        <Reveal>
          <p className="text-sm font-medium text-vyllo">Funcionalidades</p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-neutral-900 sm:text-4xl">
            Tudo integrado. Nada a mais.
          </h2>
          <p className="mt-4 max-w-xl text-base leading-relaxed text-neutral-500">
            Da agenda ao financeiro, cada modulo conversa com o outro. Sem apps
            desconectados, sem retrabalho.
          </p>
        </Reveal>

        <div className="mt-20 space-y-28 md:space-y-36">
          <Feature
            icon={Calendar}
            label="Agenda"
            title="Agenda visual, agendamento rapido."
            description="Visualize a semana inteira, bloqueie horarios e agende com procedimentos pre-configurados. Tudo em dois cliques."
            details={[
              "Visualizacao por dia e semana",
              "Bloqueio de horarios e intervalos",
              "Procedimentos e duracoes pre-configurados",
            ]}
            accentColor="#0066ff"
            visual={<AgendaVisual />}
          />

          <Feature
            icon={FileText}
            label="Prontuario"
            title="Historico completo de cada paciente."
            description="Notas clinicas, odontograma interativo, plano de tratamento e anamnese. Timeline visual com tudo que aconteceu."
            details={[
              "Odontograma interativo com timeline",
              "Plano de tratamento rastreavel",
              "Anamnese com templates personalizaveis",
            ]}
            reverse
            accentColor="#8b5cf6"
            visual={<ProntuarioVisual />}
          />

          <Feature
            icon={DollarSign}
            label="Financeiro"
            title="Controle real do dinheiro."
            description="Receitas, despesas, parcelas e maquininhas de cartao. Recibos em PDF e relatorios por periodo."
            details={[
              "Receitas e despesas com categorias",
              "Recibos em PDF automaticos",
              "Relatorios de faturamento detalhados",
            ]}
            accentColor="#10b981"
            visual={<FinanceiroVisual />}
          />

          <Feature
            icon={MessageCircle}
            label="WhatsApp"
            title="Confirmacao automatica, menos faltas."
            description="Lembrete D-1 por WhatsApp. Paciente confirma com um toque. Menos cadeiras vazias, mais previsibilidade."
            details={[
              "Envio automatico um dia antes",
              "Confirmacao com um clique",
              "Integrado com a agenda",
            ]}
            reverse
            accentColor="#22c55e"
            visual={<WhatsAppVisual />}
          />
        </div>

        {/* Extra highlights */}
        <RevealStagger className="mt-20 grid gap-4 sm:grid-cols-2">
          {HIGHLIGHTS.map((h) => (
            <RevealItem key={h.label}>
              <div className="flex items-center gap-4 rounded-xl border border-neutral-200 bg-white p-5 transition-all hover:shadow-md">
                <div
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg"
                  style={{ backgroundColor: `${h.color}12` }}
                >
                  <h.icon className="h-5 w-5" style={{ color: h.color }} />
                </div>
                <div>
                  <p className="text-sm font-semibold text-neutral-900">{h.label}</p>
                  <p className="text-xs text-neutral-400">Incluso no plano</p>
                </div>
              </div>
            </RevealItem>
          ))}
        </RevealStagger>
      </div>
    </section>
  )
}
