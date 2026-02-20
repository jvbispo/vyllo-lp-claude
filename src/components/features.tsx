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
} from "lucide-react"
import type { LucideIcon } from "lucide-react"

const ease = [0.21, 0.47, 0.32, 0.98] as const

/* ── Animated mini-illustrations with idle loops ── */

function AgendaVisual() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: "-60px" })

  const hours = ["08:00", "09:00", "10:00", "11:00", "12:00"]
  const appointments = [
    { slot: 0, spans: 1.5, color: "#0066ff", name: "Maria S.", proc: "Limpeza", delay: 0.3 },
    { slot: 1.5, spans: 1, color: "#8b5cf6", name: "Carlos R.", proc: "Restauracao", delay: 0.45 },
    { slot: 3, spans: 1, color: "#10b981", name: "Ana P.", proc: "Avaliacao", delay: 0.6 },
  ]

  return (
    <div ref={ref} className="flex h-full flex-col rounded-lg bg-white p-4">
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
              className={`relative h-6 w-6 rounded-md text-center text-[10px] leading-6 ${d === 3 ? "bg-[#0066ff]/10 font-semibold text-[#0066ff]" : "text-neutral-400"}`}
            >
              {d + 9}
              {/* Pulsing ring on selected day */}
              {d === 3 && (
                <motion.div
                  className="absolute inset-0 rounded-md border border-[#0066ff]/30"
                  animate={{ scale: [1, 1.3, 1], opacity: [0.5, 0, 0.5] }}
                  transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                />
              )}
            </div>
          ))}
        </div>
      </motion.div>

      {/* Time grid */}
      <div className="relative flex min-h-0 flex-1 gap-3">
        <div className="flex flex-col justify-between text-[9px] text-neutral-300">
          {hours.map((h, i) => (
            <motion.span
              key={h}
              className="leading-none"
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ delay: 0.2 + i * 0.05 }}
            >
              {h}
            </motion.span>
          ))}
        </div>

        <div className="relative flex-1">
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

          {/* Current time indicator — slow drift */}
          {inView && (
            <motion.div
              className="absolute left-0 right-0 flex items-center"
              style={{ top: "18%" }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, top: ["18%", "22%", "18%"] }}
              transition={{ opacity: { delay: 0.8, duration: 0.3 }, top: { duration: 12, repeat: Infinity, ease: "easeInOut" } }}
            >
              <div className="h-1.5 w-1.5 rounded-full bg-red-400" />
              <div className="h-px flex-1 bg-red-400/30" />
            </motion.div>
          )}

          {appointments.map((apt) => (
            <motion.div
              key={apt.name}
              className="absolute left-1 right-1 flex flex-col justify-center rounded-md px-2.5"
              style={{
                top: `${(apt.slot / (hours.length - 1)) * 100}%`,
                height: `${(apt.spans / (hours.length - 1)) * 100}%`,
                backgroundColor: `${apt.color}12`,
                borderLeft: `2.5px solid ${apt.color}`,
              }}
              initial={{ opacity: 0, scaleY: 0 }}
              animate={inView ? { opacity: 1, scaleY: 1 } : {}}
              transition={{ delay: apt.delay, duration: 0.4, ease }}
            >
              <span className="text-[10px] font-medium leading-tight" style={{ color: apt.color }}>
                {apt.name}
              </span>
              <span className="text-[8px] leading-tight text-neutral-400">
                {apt.proc}
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

  const toothPath = "M12 2C8 2 6 5 6 8c0 2 1 4 2 6 .5 1 1 3 1 5 0 1 .5 2 1.5 2h3c1 0 1.5-1 1.5-2 0-2 .5-4 1-5 1-2 2-4 2-6 0-3-2-6-6-6z"

  const timelineItems = [
    { label: "Nota clinica", color: "#0066ff", delay: 0.4 },
    { label: "Raio-X adicionado", color: "#8b5cf6", delay: 0.55 },
    { label: "Tratamento iniciado", color: "#10b981", delay: 0.7 },
  ]

  return (
    <div ref={ref} className="relative h-full rounded-lg bg-white p-4">
      <div className="mb-3 flex items-center gap-3">
        <div className="relative">
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
          {/* Breathing glow behind tooth */}
          {inView && (
            <motion.div
              className="absolute inset-0 rounded-full bg-[#8b5cf6]/10 blur-md"
              animate={{ scale: [0.8, 1.2, 0.8], opacity: [0.3, 0.6, 0.3] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            />
          )}
        </div>
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

      <div className="space-y-2">
        {timelineItems.map((item, i) => (
          <motion.div
            key={item.label}
            className="flex items-center gap-2.5 rounded-md p-2"
            style={{ backgroundColor: `${item.color}08` }}
            initial={{ opacity: 0, x: -10 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: item.delay, duration: 0.4, ease }}
          >
            {/* Pulsing dot */}
            <motion.div
              className="h-1.5 w-1.5 rounded-full"
              style={{ backgroundColor: item.color }}
              animate={inView ? { scale: [1, 1.5, 1], opacity: [1, 0.6, 1] } : {}}
              transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut", delay: 1.5 + i * 0.8 }}
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
    { height: 45, color: "#10b981", sway: 5 },
    { height: 65, color: "#10b981", sway: 4 },
    { height: 35, color: "#ef4444", sway: 6 },
    { height: 80, color: "#10b981", sway: 3 },
    { height: 55, color: "#10b981", sway: 5 },
    { height: 70, color: "#10b981", sway: 4 },
  ]

  return (
    <div ref={ref} className="relative h-full rounded-lg bg-white p-4">
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

      <div className="flex h-16 items-end gap-1.5 rounded-lg bg-neutral-50 p-2">
        {bars.map((bar, i) => (
          <motion.div
            key={i}
            className="flex-1 rounded-t"
            style={{ backgroundColor: `${bar.color}25` }}
            initial={{ height: 0 }}
            animate={
              inView
                ? { height: [`${bar.height}%`, `${bar.height + bar.sway}%`, `${bar.height - bar.sway}%`, `${bar.height}%`] }
                : {}
            }
            transition={{
              height: {
                delay: 0.6 + i * 0.08,
                duration: 4 + i * 0.5,
                repeat: Infinity,
                ease: "easeInOut",
              },
            }}
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
      <motion.div
        className="mb-3 flex items-center gap-2 rounded-lg bg-[#22c55e]/10 p-2"
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ delay: 0.2 }}
      >
        <div className="relative">
          <div className="h-6 w-6 rounded-full bg-[#22c55e]/20" />
          {/* Online pulse */}
          {inView && (
            <motion.div
              className="absolute -bottom-0.5 -right-0.5 h-2 w-2 rounded-full bg-[#22c55e]"
              animate={{ scale: [1, 1.4, 1], opacity: [1, 0.5, 1] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            />
          )}
        </div>
        <div>
          <div className="h-2 w-16 rounded bg-neutral-200" />
          <div className="mt-1 h-1.5 w-10 rounded bg-neutral-100" />
        </div>
      </motion.div>

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

      <motion.div
        className="mt-3 flex items-center gap-1.5"
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ delay: 1.0 }}
      >
        {/* Pulsing status dot */}
        <motion.div
          className="h-1.5 w-1.5 rounded-full bg-[#22c55e]"
          animate={inView ? { scale: [1, 1.3, 1], opacity: [1, 0.5, 1] } : {}}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
        />
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
  badge,
  highlightDetailIndex,
}: {
  icon: LucideIcon
  label: string
  title: string
  description: string
  details: string[]
  reverse?: boolean
  accentColor: string
  visual: ReactNode
  badge?: string
  /** Índice (0-based) do detalhe a destacar em azul/cor do bloco */
  highlightDetailIndex?: number
}) {
  const textBlock = (
    <Reveal>
      <div className="mt-4 flex flex-col items-center pb-10 md:mt-0 md:pb-0 md:items-start">
        <div
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg"
          style={{ backgroundColor: `${accentColor}12` }}
        >
          <Icon className="h-5 w-5" style={{ color: accentColor }} />
        </div>
        <div className="mt-3 flex items-center justify-center gap-2 md:justify-start">
          <p className="text-sm font-medium" style={{ color: accentColor }}>
            {label}
          </p>
          {badge && (
            <span className="rounded-full bg-amber-100 px-2 py-0.5 text-[10px] font-semibold text-amber-700">
              {badge}
            </span>
          )}
        </div>
      </div>
      <h3 className="mt-2 text-center text-2xl font-bold tracking-tight text-neutral-900 sm:text-3xl md:text-left">
        {title}
      </h3>
      <p className="mt-4 text-center text-base leading-relaxed text-neutral-500 md:text-left">
        {description}
      </p>
      <ul className="mt-6 flex flex-col space-y-2.5 items-center md:items-stretch">
        {details.map((d, i) => {
          const isHighlight = highlightDetailIndex === i
          const hasMobileBreak = d.includes(" | ")
          const parts = hasMobileBreak ? d.split(" | ") : null
          const detailContent = parts ? (
            <>
              <span>{parts[0]}</span>
              <span className="hidden md:inline"> </span>
              <br className="md:hidden" />
              <span>{parts[1]}</span>
            </>
          ) : (
            d
          )
          return (
            <li
              key={d}
              className={`flex items-start justify-center gap-3 text-center text-sm md:justify-start md:text-left ${
                isHighlight ? "font-semibold" : "text-neutral-600"
              }`}
              style={isHighlight ? { color: accentColor } : undefined}
            >
              <span
                className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full"
                style={{ backgroundColor: accentColor }}
              />
              <span className="min-w-0 flex-1">
                {detailContent}
              </span>
            </li>
          )
        })}
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

  const textWrapper = (
    <div className="py-6 lg:py-0">
      {textBlock}
    </div>
  )

  return (
    <div className="flex flex-col gap-12 md:gap-20 lg:grid lg:items-center lg:grid-cols-2">
      {reverse ? (
        <>
          <div className="lg:order-2">{textWrapper}</div>
          <div className="lg:order-1">{visualBlock}</div>
        </>
      ) : (
        <>
          {textWrapper}
          {visualBlock}
        </>
      )}
    </div>
  )
}

const HIGHLIGHTS = [
  { icon: ClipboardList, label: "Orcamentos", color: "#f59e0b" },
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
          <div className="text-center md:text-left">
            <p className="text-sm font-medium text-vyllo">Funcionalidades</p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-neutral-900 sm:text-4xl">
              Tudo num lugar só. Feito pra quem trabalha sozinho.
            </h2>
            <p className="mt-4 max-w-xl text-base leading-relaxed text-neutral-500 md:max-w-xl">
              Agenda, prontuário, odontograma, financeiro e WhatsApp automático. Sem módulo extra, sem cobrança surpresa, sem precisar de TI.
            </p>
          </div>
        </Reveal>

        <div className="mt-20 space-y-12 md:space-y-36">
          <Feature
            icon={Calendar}
            label="Agenda"
            title="Agenda que trabalha por você"
            description="Clica, confirma e cancela. E o melhor: seus pacientes recebem confirmação no WhatsApp no automático. Chega de ligar um por um."
            details={[
              "Visão semanal e diária de relance",
              "Bloqueie férias e horários sem complicação",
              "200 confirmações automáticas no WhatsApp/mês | já inclusas no plano",
             ]}
            accentColor="#0066ff"
            visual={<AgendaVisual />}
            highlightDetailIndex={2}
          />

          <Feature
            icon={FileText}
            label="Prontuário"
            title="Prontuário completo. No celular, tablet e computador"
            description="Notas clínicas, plano de tratamento com sessões e prioridades, anamnese com modelos personalizados e prontos, orçamentos integrados e fotos antes/depois. Odontograma com multifaces e cores. Marque cada região do dente com precisão. Tudo salvo na nuvem, acessível de qualquer lugar."
            details={[
              "Encontre qualquer registro em segundos",
              "Crie seus modelos de Anamnese ou use os nossos",
              "Fotos antes/depois com Slider Visual",
              "Gere orçamentos de forma simples e rápida",
            ]}
            reverse
            accentColor="#8b5cf6"
            visual={<ProntuarioVisual />}
          />

          <Feature
            icon={DollarSign}
            label="Financeiro"
            title="O financeiro que não mente pra você"
            description="Receitas, despesas, parcelas, recorrentes automáticas. E o que nenhum outro sistema faz: seu lucro real por procedimento (não o faturamento)."
            details={[
              "Dashboard mostra pra onde vai cada real",
              "Lucro real por procedimento, não o faturamento",
              "Baixar Relatórios em PDF ou Planilha",
            ]}
            accentColor="#10b981"
            visual={<FinanceiroVisual />}
          />

          <Feature
            icon={MessageCircle}
            label="WhatsApp"
            title="Paciente confirmado sem você levantar o dedo"
            description="O paciente recebe mensagem automática no WhatsApp pedindo confirmação e lembretes. Sem instalar nada, sem conectar número pessoal, sem pagar por mensagem avulsa. Pro consultório autônomo nosso plano cobre o mês inteiro."
            details={[
              "Lembrete automático 24h antes e no dia do atendimento",
              "Sem conectar seu número pessoal",
              "200 mensagens/mês inclusas, sem custo extra",
            ]}
            reverse
            accentColor="#22c55e"
            visual={<WhatsAppVisual />}
          />
        </div>

        {/* Extra highlights */}
        {/* <RevealStagger className="mt-20 grid gap-4 sm:grid-cols-1 max-w-md mx-auto">
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
        </RevealStagger> */}
      </div>
    </section>
  )
}
