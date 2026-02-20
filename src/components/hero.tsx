"use client"

import { useState, useEffect } from "react"
import { motion, useInView, AnimatePresence } from "framer-motion"
import { ArrowRight, Calendar, FileText, DollarSign, Home, Users, Settings, TrendingUp, TrendingDown } from "lucide-react"
import Image from "next/image"
import { useRef, type ReactNode } from "react"

const APP_URL = "https://app.vyllo.com.br"
const CALC_URL = "https://calculadora.vyllo.com.br"

const ease = [0.21, 0.47, 0.32, 0.98] as const

/* ── Interactive Dashboard ──────────────────────────── */

type View = "agenda" | "financeiro" | "prontuario"

const VIEWS: { id: View; label: string; icon: typeof Calendar }[] = [
  { id: "agenda", label: "Agenda", icon: Calendar },
  { id: "financeiro", label: "Financeiro", icon: DollarSign },
  { id: "prontuario", label: "Prontuario", icon: FileText },
]

const SIDEBAR_ITEMS = [
  { icon: Home, label: "Inicio", active: false },
  { icon: Calendar, label: "Agenda", active: false },
  { icon: Users, label: "Pacientes", active: false },
  { icon: FileText, label: "Prontuario", active: false },
  { icon: DollarSign, label: "Financeiro", active: false },
  { icon: Settings, label: "Config", active: false },
]

/* ── Agenda View ──── */

const HOURS = ["08:00", "09:00", "10:00", "11:00", "12:00", "13:00", "14:00"]
const WEEKDAYS = ["Seg", "Ter", "Qua", "Qui", "Sex"]

const APPOINTMENTS = [
  { day: 0, start: 0, duration: 1, name: "Maria S.", proc: "Limpeza", color: "#0066ff" },
  { day: 0, start: 2, duration: 2, name: "Joao P.", proc: "Canal", color: "#8b5cf6" },
  { day: 1, start: 1, duration: 1, name: "Ana C.", proc: "Restauracao", color: "#0066ff" },
  { day: 1, start: 3, duration: 1, name: "Carlos R.", proc: "Extracao", color: "#f59e0b" },
  { day: 2, start: 0, duration: 1, name: "Patricia L.", proc: "Clareamento", color: "#10b981" },
  { day: 2, start: 2, duration: 1, name: "Lucas M.", proc: "Consulta", color: "#0066ff" },
  { day: 3, start: 1, duration: 2, name: "Fernanda B.", proc: "Ortodontia", color: "#8b5cf6" },
  { day: 4, start: 0, duration: 1, name: "Ricardo A.", proc: "Limpeza", color: "#10b981" },
  { day: 4, start: 3, duration: 1, name: "Camila D.", proc: "Avaliacao", color: "#0066ff" },
]

function AgendaView() {
  return (
    <div className="flex h-full min-w-0 flex-col overflow-hidden">
      {/* Header with weekdays */}
      <div className="flex border-b border-neutral-100 pb-2">
        <div className="w-10 shrink-0" />
        {WEEKDAYS.map((d, i) => (
          <div key={d} className="flex-1 text-center">
            <span className="text-[9px] font-medium text-neutral-400 md:text-[10px]">{d}</span>
            <div className={`mx-auto mt-0.5 flex h-5 w-5 items-center justify-center rounded-full text-[9px] font-semibold md:h-6 md:w-6 md:text-[10px] ${i === 2 ? "bg-vyllo text-white" : "text-neutral-600"}`}>
              {10 + i}
            </div>
          </div>
        ))}
      </div>

      {/* Time grid — uses CSS grid for responsive row heights */}
      <div className="relative mt-1 flex flex-1 overflow-hidden">
        {/* Hour labels */}
        <div className="w-10 shrink-0">
          {HOURS.map((h) => (
            <div key={h} className="flex h-8 items-start md:h-10">
              <span className="text-[8px] text-neutral-300 md:text-[9px]">{h}</span>
            </div>
          ))}
        </div>

        {/* Day columns */}
        <div className="flex flex-1">
          {WEEKDAYS.map((_, dayIdx) => (
            <div key={dayIdx} className="relative flex-1 border-l border-neutral-50">
              {HOURS.map((_, hi) => (
                <div key={hi} className="h-8 border-b border-dashed border-neutral-50 md:h-10" />
              ))}
              {/* Appointments — positioned with CSS calc for responsive row height */}
              {APPOINTMENTS.filter((a) => a.day === dayIdx).map((apt, i) => (
                <motion.div
                  key={i}
                  className="agenda-apt absolute inset-x-0.5 overflow-hidden rounded px-1 py-0.5 md:rounded-md md:px-1.5"
                  style={{
                    ["--apt-start" as string]: apt.start,
                    ["--apt-dur" as string]: apt.duration,
                    backgroundColor: `${apt.color}15`,
                    borderLeft: `2px solid ${apt.color}`,
                  }}
                  initial={{ opacity: 0, scaleY: 0 }}
                  animate={{ opacity: 1, scaleY: 1 }}
                  transition={{ delay: 0.1 + i * 0.06, duration: 0.3, ease }}
                >
                  <p className="truncate text-[7px] font-medium md:text-[8px]" style={{ color: apt.color }}>{apt.name}</p>
                  <p className="hidden truncate text-[7px] text-neutral-400 md:block">{apt.proc}</p>
                </motion.div>
              ))}
            </div>
          ))}
        </div>

        {/* Current time indicator */}
        <motion.div
          className="absolute left-10 right-0 flex items-center"
          style={{ top: "72px" }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.4 }}
        >
          <div className="h-2 w-2 -translate-x-1 rounded-full bg-red-400" />
          <div className="h-px flex-1 bg-red-400/50" />
        </motion.div>
      </div>
    </div>
  )
}

/* ── Financeiro View ──── */

const METRIC_CARDS = [
  { label: "Receita", value: "R$ 12.450", change: "+18%", up: true, color: "#10b981" },
  { label: "Despesas", value: "R$ 3.280", change: "+5%", up: true, color: "#ef4444" },
  { label: "Lucro", value: "R$ 9.170", change: "+24%", up: true, color: "#0066ff" },
  { label: "A receber", value: "R$ 4.200", change: "-8%", up: false, color: "#f59e0b" },
]

const TRANSACTIONS = [
  { name: "Maria Silva", desc: "Limpeza", value: "+R$ 280", type: "income" as const },
  { name: "Aluguel Sala", desc: "Despesa fixa", value: "-R$ 1.500", type: "expense" as const },
  { name: "Joao Pedro", desc: "Canal + Coroa", value: "+R$ 1.800", type: "income" as const },
  { name: "Patricia Lima", desc: "Clareamento", value: "+R$ 650", type: "income" as const },
  { name: "Material", desc: "Resina composta", value: "-R$ 340", type: "expense" as const },
]

function FinanceiroView() {
  return (
    <div className="flex h-full min-w-0 flex-col gap-3 overflow-hidden">
      {/* Metric cards */}
      <div className="grid grid-cols-2 gap-2 md:grid-cols-4">
        {METRIC_CARDS.map((m, i) => (
          <motion.div
            key={m.label}
            className="rounded-lg border border-neutral-100 bg-white p-2 md:p-2.5"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 + i * 0.08, duration: 0.3, ease }}
          >
            <p className="text-[8px] text-neutral-400 md:text-[9px]">{m.label}</p>
            <p className="mt-0.5 text-[11px] font-bold text-neutral-800 md:text-xs">{m.value}</p>
            <div className="mt-0.5 flex items-center gap-0.5">
              {m.up ? (
                <TrendingUp className="h-2.5 w-2.5" style={{ color: m.color }} />
              ) : (
                <TrendingDown className="h-2.5 w-2.5" style={{ color: m.color }} />
              )}
              <span className="text-[8px] font-medium" style={{ color: m.color }}>{m.change}</span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Chart area */}
      <motion.div
        className="rounded-lg border border-neutral-100 bg-white p-2.5 md:p-3"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.4 }}
      >
        <div className="mb-2 flex items-center justify-between">
          <span className="text-[9px] font-medium text-neutral-600 md:text-[10px]">Faturamento mensal</span>
          <span className="text-[8px] text-neutral-400">Fev 2026</span>
        </div>
        <div className="flex h-14 items-end gap-1 md:h-16">
          {[35, 52, 45, 68, 58, 72, 65, 80, 70, 85, 78, 90].map((h, i) => (
            <motion.div
              key={i}
              className="flex-1 rounded-t"
              style={{ backgroundColor: i >= 10 ? "#0066ff" : `rgba(0,102,255,${0.15 + i * 0.05})` }}
              initial={{ height: 0 }}
              animate={{ height: `${h}%` }}
              transition={{ delay: 0.4 + i * 0.04, duration: 0.5, ease }}
            />
          ))}
        </div>
        <div className="mt-1.5 flex justify-between">
          {["Jan", "", "", "Abr", "", "", "Jul", "", "", "Out", "", "Dez"].map((m, i) => (
            <span key={i} className="flex-1 text-center text-[7px] text-neutral-300">{m}</span>
          ))}
        </div>
      </motion.div>

      {/* Transaction list */}
      <div className="flex-1 space-y-1 overflow-hidden">
        {TRANSACTIONS.map((t, i) => (
          <motion.div
            key={i}
            className="flex items-center gap-2 rounded-md px-2 py-1.5 transition-colors hover:bg-neutral-50"
            initial={{ opacity: 0, x: 12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 + i * 0.06, duration: 0.3, ease }}
          >
            <div className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full ${t.type === "income" ? "bg-emerald-50" : "bg-red-50"}`}>
              {t.type === "income" ? (
                <TrendingUp className="h-3 w-3 text-emerald-500" />
              ) : (
                <TrendingDown className="h-3 w-3 text-red-400" />
              )}
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-[9px] font-medium text-neutral-700 md:text-[10px]">{t.name}</p>
              <p className="truncate text-[7px] text-neutral-400 md:text-[8px]">{t.desc}</p>
            </div>
            <span className={`shrink-0 text-[9px] font-semibold md:text-[10px] ${t.type === "income" ? "text-emerald-600" : "text-red-500"}`}>
              {t.value}
            </span>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

/* ── Prontuario View ──── */

const TIMELINE_ITEMS = [
  { date: "12 Fev", type: "Nota clinica", desc: "Restauracao dente 36 — resina composta", color: "#0066ff" },
  { date: "05 Fev", type: "Orcamento", desc: "Tratamento ortodontico — R$ 4.500", color: "#8b5cf6" },
  { date: "28 Jan", type: "Plano", desc: "Plano de tratamento atualizado — 5 itens", color: "#10b981" },
  { date: "20 Jan", type: "Nota clinica", desc: "Avaliacao inicial + radiografia panoramica", color: "#0066ff" },
  { date: "15 Jan", type: "Anamnese", desc: "Anamnese preenchida — sem alergias", color: "#f59e0b" },
]

function ProntuarioView() {
  return (
    <div className="flex h-full min-w-0 flex-col gap-3 overflow-hidden">
      {/* Patient header */}
      <motion.div
        className="flex items-center gap-2.5 rounded-lg border border-neutral-100 bg-white p-2.5 md:p-3"
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.05, duration: 0.3, ease }}
      >
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-vyllo to-[#8b5cf6] text-[10px] font-bold text-white md:h-9 md:w-9">
          MS
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-[10px] font-semibold text-neutral-800 md:text-[11px]">Maria Silva</p>
          <p className="text-[8px] text-neutral-400 md:text-[9px]">32 anos — Ortodontia em andamento</p>
        </div>
        <div className="hidden items-center gap-1.5 md:flex">
          <div className="rounded-full bg-emerald-50 px-2 py-0.5 text-[8px] font-medium text-emerald-600">Ativo</div>
        </div>
      </motion.div>

      {/* Clinical note */}
      <motion.div
        className="rounded-lg border border-neutral-100 bg-white p-2.5 md:p-3"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.15, duration: 0.3 }}
      >
        <div className="mb-2 flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <div className="flex h-4 w-4 items-center justify-center rounded bg-vyllo/10">
              <FileText className="h-2.5 w-2.5 text-vyllo" />
            </div>
            <span className="text-[9px] font-medium text-neutral-600 md:text-[10px]">Nota clinica — Dente 36</span>
          </div>
          <span className="text-[8px] text-neutral-400">12 Fev 2026</span>
        </div>
        <div className="space-y-1.5">
          <motion.p
            className="line-clamp-3 text-[8px] leading-relaxed text-neutral-500 md:text-[9px]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.25, duration: 0.3 }}
          >
            Restauracao classe II MOD em resina composta. Anestesia infiltrativa, isolamento absoluto. Acido fosforico 37% por 15s em esmalte, adesivo aplicado em 2 camadas.
          </motion.p>
          <div className="flex items-center gap-2">
            <motion.div
              className="flex items-center gap-1 rounded border border-neutral-100 px-1.5 py-0.5"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.35, duration: 0.2 }}
            >
              <div className="h-3 w-4 rounded-sm bg-neutral-200" />
              <span className="text-[7px] text-neutral-400 md:text-[8px]">foto_pre.jpg</span>
            </motion.div>
            <motion.div
              className="flex items-center gap-1 rounded border border-neutral-100 px-1.5 py-0.5"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4, duration: 0.2 }}
            >
              <div className="h-3 w-4 rounded-sm bg-neutral-200" />
              <span className="text-[7px] text-neutral-400 md:text-[8px]">foto_pos.jpg</span>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Timeline */}
      <div className="flex-1 space-y-0 overflow-hidden">
        <p className="mb-1.5 text-[9px] font-medium text-neutral-600 md:text-[10px]">Timeline</p>
        {TIMELINE_ITEMS.map((item, i) => (
          <motion.div
            key={i}
            className="flex gap-2 py-1"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.35 + i * 0.07, duration: 0.3, ease }}
          >
            {/* Timeline dot + line */}
            <div className="flex flex-col items-center">
              <div className="mt-1 h-2 w-2 shrink-0 rounded-full" style={{ backgroundColor: item.color }} />
              {i < TIMELINE_ITEMS.length - 1 && <div className="mt-0.5 h-full w-px bg-neutral-100" />}
            </div>
            <div className="min-w-0 pb-2">
              <div className="flex items-center gap-1.5">
                <span className="text-[8px] font-semibold text-neutral-500 md:text-[9px]">{item.date}</span>
                <span className="rounded-full px-1.5 py-px text-[7px] font-medium text-white md:text-[8px]" style={{ backgroundColor: item.color }}>
                  {item.type}
                </span>
              </div>
              <p className="mt-0.5 truncate text-[8px] text-neutral-500 md:text-[9px]">{item.desc}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

/* ── Main Interactive Dashboard ──── */

const AUTO_ROTATE_MS = 4500

function InteractiveDashboard() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-80px" })
  const [activeView, setActiveView] = useState<View>("agenda")
  const [isHovered, setIsHovered] = useState(false)

  // Auto-rotate views
  useEffect(() => {
    if (!isInView || isHovered) return
    const timer = setInterval(() => {
      setActiveView((prev) => {
        const idx = VIEWS.findIndex((v) => v.id === prev)
        return VIEWS[(idx + 1) % VIEWS.length].id
      })
    }, AUTO_ROTATE_MS)
    return () => clearInterval(timer)
  }, [isInView, isHovered])

  const activeSidebarIndex = activeView === "agenda" ? 1 : activeView === "prontuario" ? 3 : 4

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : {}}
      transition={{ duration: 0.6, ease }}
      className="relative overflow-hidden rounded-xl border border-neutral-200/60 bg-white shadow-[0_25px_50px_-12px_rgba(0,102,255,0.15),0_10px_20px_-5px_rgba(0,0,0,0.08)]"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Animated top accent line */}
      <motion.div
        className="absolute top-0 left-0 h-px bg-gradient-to-r from-transparent via-[#0066ff]/40 to-transparent"
        initial={{ width: "0%", left: "50%", x: "-50%" }}
        animate={isInView ? { width: "100%", left: "0%", x: "0%" } : {}}
        transition={{ delay: 0.2, duration: 1.2, ease }}
      />

      {/* Browser bar */}
      <motion.div
        className="flex items-center gap-2 border-b border-neutral-100 bg-neutral-50/80 px-3 py-2 md:px-4 md:py-2.5"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: 0.5, ease }}
      >
        <div className="flex gap-1.5">
          {["bg-red-300/60", "bg-amber-300/60", "bg-emerald-300/60"].map((c, i) => (
            <motion.div
              key={i}
              className={`h-2 w-2 rounded-full md:h-2.5 md:w-2.5 ${c}`}
              initial={{ scale: 0 }}
              animate={isInView ? { scale: 1 } : {}}
              transition={{ delay: 0.3 + i * 0.1, type: "spring", stiffness: 500 }}
            />
          ))}
        </div>
        <div className="mx-auto">
          <motion.div
            className="rounded-md border border-neutral-200 bg-white px-2.5 py-0.5 text-[10px] text-neutral-400 md:px-3 md:py-1 md:text-[11px]"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.6, duration: 0.4 }}
          >
            app.vyllo.com.br
          </motion.div>
        </div>
      </motion.div>

      {/* Dashboard content */}
      <div className="relative h-[340px] overflow-hidden bg-gradient-to-b from-[#f8f9fa] to-white">
        <div className="flex h-full">
          {/* Sidebar — desktop only */}
          <motion.div
            className="hidden w-40 shrink-0 border-r border-neutral-100 bg-white p-3 md:block lg:w-44"
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.3, ease }}
          >
            {/* Logo area */}
            <div className="mb-4 flex items-center">
              <Image src="/vyllo-logo.svg" alt="Vyllo" width={200} height={200} className="h-5 w-5 scale-[2] origin-left" />
            </div>

            {/* Nav items */}
            <div className="space-y-0.5">
              {SIDEBAR_ITEMS.map((item, i) => {
                const isActive = i === activeSidebarIndex
                return (
                  <motion.button
                    key={item.label}
                    className={`flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-left transition-colors ${
                      isActive ? "bg-vyllo/8 text-vyllo" : "text-neutral-500 hover:bg-neutral-50"
                    }`}
                    initial={{ opacity: 0, x: -8 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: 0.4 + i * 0.04, duration: 0.3 }}
                    onClick={() => {
                      if (i === 1) setActiveView("agenda")
                      else if (i === 3) setActiveView("prontuario")
                      else if (i === 4) setActiveView("financeiro")
                    }}
                  >
                    <item.icon className="h-3.5 w-3.5" />
                    <span className="text-[10px] font-medium">{item.label}</span>
                    {isActive && (
                      <motion.div layoutId="sidebar-active" className="ml-auto h-1 w-1 rounded-full bg-vyllo" />
                    )}
                  </motion.button>
                )
              })}
            </div>

            {/* Mini user at bottom */}
            <div className="mt-6 flex items-center gap-2 border-t border-neutral-100 pt-3">
              <div className="h-5 w-5 rounded-full bg-gradient-to-br from-vyllo/20 to-violet-200" />
              <div>
                <div className="h-2 w-14 rounded bg-neutral-200/80" />
                <div className="mt-1 h-1.5 w-10 rounded bg-neutral-100" />
              </div>
            </div>
          </motion.div>

          {/* Main content area */}
          <div className="flex-1 overflow-hidden p-3 md:p-4">
            {/* View tabs — mobile + header */}
            <motion.div
              className="mb-3 flex items-center gap-1"
              initial={{ opacity: 0, y: -8 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.4, duration: 0.3 }}
            >
              {VIEWS.map((v) => (
                <button
                  key={v.id}
                  onClick={() => setActiveView(v.id)}
                  className={`relative flex items-center gap-1 rounded-md px-2 py-1 text-[9px] font-medium transition-colors md:px-2.5 md:text-[10px] ${
                    activeView === v.id ? "text-vyllo" : "text-neutral-400 hover:text-neutral-600"
                  }`}
                >
                  {activeView === v.id && (
                    <motion.div
                      layoutId="view-tab"
                      className="absolute inset-0 rounded-md bg-vyllo/8"
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    />
                  )}
                  <v.icon className="relative h-3 w-3" />
                  <span className="relative">{v.label}</span>
                </button>
              ))}

              {/* Auto-rotate indicator */}
              <div className="ml-auto flex items-center gap-1">
                {!isHovered && (
                  <motion.div
                    className="h-1 w-1 rounded-full bg-vyllo/40"
                    animate={{ opacity: [0.3, 1, 0.3] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                )}
              </div>
            </motion.div>

            {/* View content with animation */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeView}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.25, ease }}
                className="h-[270px] overflow-hidden md:h-[280px]"
              >
                {activeView === "agenda" && <AgendaView />}
                {activeView === "financeiro" && <FinanceiroView />}
                {activeView === "prontuario" && <ProntuarioView />}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

/* ── Dashboard Wrapper ─────────────────────────────── */

function DashboardWrapper({ children }: { children: ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay: 0.25, ease }}
      className="relative mt-6 xl:mt-0"
    >
      {children}
    </motion.div>
  )
}

/* ── Hero Section ───────────────────────────────────── */

export function Hero() {
  return (
    <section className="relative overflow-hidden pt-20 pb-20 md:pt-30 md:pb-32">
      {/* Animated beam line at top */}
      <div className="pointer-events-none absolute top-0 left-0 right-0 h-px overflow-hidden">
        <div className="h-full w-1/3 bg-gradient-to-r from-transparent via-vyllo/50 to-transparent animate-[beam_4s_ease-in-out_infinite]" />
      </div>

      {/* Rich mesh gradient background — blurred blobs for atmospheric feel */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-[200px] right-[10%] h-[700px] w-[700px] rounded-full bg-[radial-gradient(circle,rgba(0,102,255,0.18)_0%,transparent_55%)] blur-3xl" />
        <div className="absolute top-[20%] -left-[100px] h-[500px] w-[500px] rounded-full bg-[radial-gradient(circle,rgba(139,92,246,0.12)_0%,transparent_55%)] blur-3xl" />
        <div className="absolute bottom-[10%] left-[40%] h-[400px] w-[400px] rounded-full bg-[radial-gradient(circle,rgba(16,185,129,0.10)_0%,transparent_55%)] blur-3xl" />
      </div>

      {/* Grid lines with fade mask */}
      <div
        className="pointer-events-none absolute inset-0 grid-lines-light"
        style={{
          maskImage: "radial-gradient(ellipse 60% 60% at 50% 40%, #000 20%, transparent 75%)",
          WebkitMaskImage: "radial-gradient(ellipse 60% 60% at 50% 40%, #000 20%, transparent 75%)",
        }}
      />

      <div className="relative mx-auto max-w-5xl px-6 grid grid-cols-1 xl:max-w-7xl xl:grid-cols-[5fr_7fr] xl:gap-12 xl:items-start">
        {/* 1) Headline + parágrafo — mobile: primeiro; desktop: coluna esquerda, topo */}
        <div className="min-w-0 xl:col-start-1 xl:row-start-1">
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.07, ease }}
            className="mt-6 md:mt-4 text-4xl font-bold leading-[1.08] tracking-tight text-neutral-900 sm:text-5xl md:text-5xl"
          >
            Quanto dinheiro seu consultório{" "}
            <br className="hidden sm:block" />
            <span className="bg-gradient-to-r from-[#0066ff] to-[#8b5cf6] bg-clip-text text-transparent">perdeu este mês?</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.12, ease }}
            className="mt-6 max-w-xl text-lg leading-relaxed text-neutral-500"
          >
            67% dos dentistas autônomos no Brasil não usam nenhum sistema de gestão. Dos que usam, quase nenhum sabe o lucro real de cada procedimento.
          </motion.p>
        </div>

        {/* 2) Dashboard — mobile: entre parágrafo e botão; desktop: coluna direita */}
        <div className="mt-4 min-w-0 overflow-hidden xl:col-start-2 xl:row-start-1 xl:row-span-2 xl:mt-0">
        <DashboardWrapper>
          {/* Glow behind mockup */}
          <div className="absolute -inset-12 rounded-3xl bg-[radial-gradient(ellipse_60%_50%_at_50%_40%,rgba(0,102,255,0.18)_0%,transparent_65%)] blur-xl" />

          <div className="relative">
            <InteractiveDashboard />
          </div>
        </DashboardWrapper>
        </div>

        {/* 3) CTAs — mobile: depois do dashboard; desktop: coluna esquerda, abaixo do texto */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.17, ease }}
          className="mt-4 flex min-w-0 flex-col gap-3 md:mt-10 xl:col-start-1 xl:row-start-2 xl:mt-2"
        >
          <div className="relative inline-flex">
            <div className="absolute -inset-1 rounded-xl bg-gradient-to-r from-[#0066ff] to-[#8b5cf6] opacity-20 blur-lg transition-opacity group-hover:opacity-30" />
            <a
              href={`${APP_URL}/auth/registro`}
              className="group relative inline-flex items-center justify-center gap-2 rounded-lg bg-vyllo px-6 py-3 text-sm font-medium text-white shadow-lg shadow-vyllo/20 transition-all hover:bg-[#0052cc] hover:shadow-xl hover:shadow-vyllo/25 active:scale-[0.98]"
            >
              Testar grátis por 15 dias
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </a>
          </div>
          <div className="flex flex-wrap items-center gap-x-3 gap-y-4 sm:gap-y-3 md:mt-12">
            <span className="text-md font-medium text-neutral-800">
              A Vyllo resolve os dois problemas, e custa <span className="text-vyllo">menos que um kit de resina.</span>
            </span>
            <span className="text-sm text-neutral-500">
              Não quer testar ainda? Descubra seu lucro real por procedimento, é grátis.
            </span>
            <a
              href={CALC_URL}
              className="inline-flex items-center gap-1.5 rounded-md border border-neutral-200/80 bg-transparent px-3 py-1.5 text-xs font-medium text-neutral-500 transition-colors hover:border-vyllo/30 hover:text-vyllo"
            >
              Ir para calculadora de Lucro
              <ArrowRight className="h-3 w-3" />
            </a>
          </div>
          <span className="text-sm text-neutral-400">
            Sem cartão · 200 confirmações WhatsApp inclusas · Pronto em 5 min
          </span>
        </motion.div>
      </div>
    </section>
  )
}
