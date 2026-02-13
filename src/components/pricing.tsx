"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Reveal, CountUp } from "./motion"
import {
  Check,
  ArrowRight,
  Calendar,
  FileText,
  DollarSign,
  MapPin,
  MessageCircle,
  RefreshCw,
  ClipboardList,
  BarChart3,
  Stethoscope,
  Zap,
} from "lucide-react"
import type { LucideIcon } from "lucide-react"

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

const FEATURES_WITH_ICONS: { label: string; icon: LucideIcon; desc: string }[] = [
  { label: "Agenda completa", icon: Calendar, desc: "Visualizacao diaria, semanal e mensal" },
  { label: "Prontuario digital", icon: Stethoscope, desc: "Odontograma, notas e timeline" },
  { label: "Plano de tratamento", icon: ClipboardList, desc: "Itens, status e acompanhamento" },
  { label: "Orcamentos", icon: FileText, desc: "Integrados ao plano de tratamento" },
  { label: "Financeiro completo", icon: DollarSign, desc: "Receitas, despesas e relatorios" },
  { label: "Multiplos locais", icon: MapPin, desc: "Gerencie varias clinicas" },
  { label: "Relatorios", icon: BarChart3, desc: "Faturamento e metricas" },
  { label: "WhatsApp", icon: MessageCircle, desc: "Suporte direto e rapido" },
  { label: "Atualizacoes", icon: RefreshCw, desc: "Novas funcionalidades sem custo" },
]

/* ── Shared: Cycle Selector ──── */

function CycleSelector({
  cycle,
  setCycle,
  dark = false,
}: {
  cycle: Cycle
  setCycle: (c: Cycle) => void
  dark?: boolean
}) {
  return (
    <div className={`flex rounded-lg p-1 ${dark ? "bg-white/10" : "bg-neutral-100"}`}>
      {CYCLES.map((c) => (
        <button
          key={c.id}
          onClick={() => setCycle(c.id)}
          className="relative flex-1 rounded-md px-3 py-2 text-sm transition-colors"
          style={{ color: cycle === c.id ? (dark ? "#fff" : "#0a0a0a") : (dark ? "rgba(255,255,255,0.5)" : "#737373") }}
        >
          {cycle === c.id && (
            <motion.div
              layoutId="pricing-tab"
              className={`absolute inset-0 rounded-md shadow-sm ${dark ? "bg-white/15" : "bg-white"}`}
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

/* ── Shared: Animated Price ──── */

function AnimatedPrice({ selected, dark = false }: { selected: typeof CYCLES[number]; dark?: boolean }) {
  return (
    <div>
      <div className="flex items-baseline gap-1">
        <span className={`text-sm ${dark ? "text-white/40" : "text-neutral-400"}`}>R$</span>
        <AnimatePresence mode="wait">
          <motion.span
            key={selected.perMonth}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.2 }}
            className={`text-5xl font-bold tracking-tight ${dark ? "text-white" : "text-neutral-900"}`}
          >
            {selected.perMonth}
          </motion.span>
        </AnimatePresence>
        <span className={dark ? "text-white/40" : "text-neutral-400"}>/mes</span>
      </div>
      {selected.id !== "monthly" && (
        <p className={`mt-1 text-sm ${dark ? "text-white/40" : "text-neutral-400"}`}>
          R$ {selected.price} a cada {selected.id === "semiannual" ? "6 meses" : "12 meses"}
        </p>
      )}
    </div>
  )
}

/* ── Shared: Stats ──── */

function Stats({ dark = false }: { dark?: boolean }) {
  return (
    <div className="mx-auto mt-16 grid max-w-lg grid-cols-3 gap-8 text-center">
      <div>
        <CountUp target={14} className={`text-2xl font-bold ${dark ? "text-white" : "text-neutral-900"}`} />
        <p className={`mt-1 text-xs ${dark ? "text-white/40" : "text-neutral-400"}`}>dias gratis</p>
      </div>
      <div>
        <CountUp target={5} className={`text-2xl font-bold ${dark ? "text-white" : "text-neutral-900"}`} suffix=" min" />
        <p className={`mt-1 text-xs ${dark ? "text-white/40" : "text-neutral-400"}`}>para configurar</p>
      </div>
      <div>
        <CountUp target={0} prefix="R$ " className={`text-2xl font-bold ${dark ? "text-white" : "text-neutral-900"}`} />
        <p className={`mt-1 text-xs ${dark ? "text-white/40" : "text-neutral-400"}`}>taxas escondidas</p>
      </div>
    </div>
  )
}

/* ══════════════════════════════════════════════════════
   CURRENT — Original version
   ══════════════════════════════════════════════════════ */

function PricingCurrent() {
  const [cycle, setCycle] = useState<Cycle>("semiannual")
  const selected = CYCLES.find((c) => c.id === cycle)!

  return (
    <section id="precos" className="relative overflow-hidden border-y border-neutral-200/60 bg-white py-24 md:py-36">
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
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-vyllo/30 to-transparent" />

              <div className="grid gap-10 md:grid-cols-[1fr_1px_1fr]">
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

                  <div className="mt-6">
                    <CycleSelector cycle={cycle} setCycle={setCycle} />
                  </div>

                  <div className="mt-8">
                    <AnimatedPrice selected={selected} />
                  </div>

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

                <div className="hidden bg-neutral-100 md:block" />

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

        <Reveal delay={0.2}>
          <Stats />
        </Reveal>
      </div>
    </section>
  )
}

/* ══════════════════════════════════════════════════════
   OPTION A — Dark premium + glassmorphism
   ══════════════════════════════════════════════════════ */

function PricingA() {
  const [cycle, setCycle] = useState<Cycle>("semiannual")
  const selected = CYCLES.find((c) => c.id === cycle)!

  return (
    <section id="precos" className="relative overflow-hidden bg-[#0a1628] py-24 md:py-36">
      {/* Grid accent */}
      <div
        className="pointer-events-none absolute inset-0 grid-accent"
        style={{
          maskImage: "radial-gradient(ellipse 50% 50% at 50% 50%, #000 20%, transparent 75%)",
          WebkitMaskImage: "radial-gradient(ellipse 50% 50% at 50% 50%, #000 20%, transparent 75%)",
        }}
      />

      {/* Mesh gradients */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-0 left-1/2 h-[500px] w-[600px] -translate-x-1/2 -translate-y-1/4 rounded-full bg-[radial-gradient(circle,rgba(0,102,255,0.20)_0%,transparent_55%)] blur-3xl" />
        <div className="absolute bottom-0 right-[20%] h-[300px] w-[400px] rounded-full bg-[radial-gradient(circle,rgba(139,92,246,0.10)_0%,transparent_55%)] blur-3xl" />
      </div>

      {/* Dividers */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-vyllo/20 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-vyllo/20 to-transparent" />

      <div className="relative mx-auto max-w-5xl px-6">
        <Reveal>
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Um plano. Tudo incluso.
            </h2>
            <p className="mt-3 text-base text-white/50">
              Comece gratis por 14 dias. Sem cartao de credito.
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="mx-auto mt-14 max-w-3xl">
            {/* Glow behind card */}
            <div className="relative">
              <div className="pointer-events-none absolute -inset-6 rounded-3xl bg-[radial-gradient(ellipse_60%_50%_at_50%_40%,rgba(0,102,255,0.25)_0%,transparent_65%)] blur-xl" />

              {/* Glassmorphic card */}
              <div className="relative rounded-xl border border-white/10 bg-white/[0.06] p-8 shadow-2xl shadow-black/20 backdrop-blur-md md:p-10">
                <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-vyllo/40 to-transparent" />

                <div className="grid gap-10 md:grid-cols-[1fr_1px_1fr]">
                  {/* Left */}
                  <div>
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-lg font-semibold text-white">Profissional</h3>
                        <p className="text-sm text-white/40">Tudo que voce precisa</p>
                      </div>
                      <div className="flex h-8 w-8 items-center justify-center rounded-md bg-vyllo shadow-lg shadow-vyllo/30">
                        <span className="text-xs font-bold text-white">V</span>
                      </div>
                    </div>

                    <div className="mt-6">
                      <CycleSelector cycle={cycle} setCycle={setCycle} dark />
                    </div>

                    <div className="mt-8">
                      <AnimatedPrice selected={selected} dark />
                    </div>

                    <a
                      href={`${APP_URL}/auth/registro`}
                      className="group mt-8 flex w-full items-center justify-center gap-2 rounded-lg bg-white py-3 text-sm font-medium text-neutral-900 shadow-lg shadow-white/10 transition-all hover:bg-neutral-100 hover:shadow-xl hover:shadow-white/15 active:scale-[0.98]"
                    >
                      Comecar teste gratis
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                    </a>
                    <p className="mt-3 text-center text-xs text-white/30">
                      14 dias gratis. Sem cartao. Cancele quando quiser.
                    </p>
                  </div>

                  {/* Divider */}
                  <div className="hidden bg-white/10 md:block" />

                  {/* Right */}
                  <div className="flex flex-col justify-center border-t border-white/10 pt-6 md:border-t-0 md:pt-0">
                    <p className="mb-4 text-sm font-medium text-white">Incluso no plano:</p>
                    <ul className="grid gap-2.5 sm:grid-cols-2 md:grid-cols-1 lg:gap-3">
                      {INCLUDED.map((item) => (
                        <li key={item} className="flex items-center gap-3 text-sm text-white/60">
                          <Check className="h-4 w-4 shrink-0 text-emerald-400" />
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

        <Reveal delay={0.2}>
          <Stats dark />
        </Reveal>
      </div>
    </section>
  )
}

/* ══════════════════════════════════════════════════════
   OPTION B — Bento grid features
   ══════════════════════════════════════════════════════ */

function PricingB() {
  const [cycle, setCycle] = useState<Cycle>("semiannual")
  const selected = CYCLES.find((c) => c.id === cycle)!

  return (
    <section id="precos" className="relative overflow-hidden border-y border-neutral-200/60 bg-[#fafafa] py-24 md:py-36">
      <div
        className="pointer-events-none absolute inset-0 grid-lines-light"
        style={{
          maskImage: "radial-gradient(ellipse 60% 60% at 50% 40%, #000 20%, transparent 75%)",
          WebkitMaskImage: "radial-gradient(ellipse 60% 60% at 50% 40%, #000 20%, transparent 75%)",
        }}
      />

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

        {/* Pricing card — full width */}
        <Reveal delay={0.1}>
          <div className="mx-auto mt-14 max-w-2xl">
            <div className="rounded-xl border border-neutral-200/60 bg-white p-8 shadow-[0_8px_40px_rgba(0,102,255,0.08),0_2px_6px_rgba(0,0,0,0.04)] md:p-10">
              <div className="flex flex-col items-center text-center">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-vyllo">
                  <span className="text-sm font-bold text-white">V</span>
                </div>
                <h3 className="mt-3 text-xl font-semibold text-neutral-900">Profissional</h3>
                <p className="text-sm text-neutral-400">Tudo que voce precisa para sua clinica</p>

                <div className="mt-6 w-full max-w-xs">
                  <CycleSelector cycle={cycle} setCycle={setCycle} />
                </div>

                <div className="mt-6">
                  <AnimatedPrice selected={selected} />
                </div>

                <a
                  href={`${APP_URL}/auth/registro`}
                  className="group mt-6 flex w-full max-w-xs items-center justify-center gap-2 rounded-lg bg-vyllo py-3 text-sm font-medium text-white shadow-md shadow-vyllo/20 transition-all hover:bg-[#0052cc] hover:shadow-lg hover:shadow-vyllo/25 active:scale-[0.98]"
                >
                  Comecar teste gratis
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </a>
                <p className="mt-2 text-xs text-neutral-400">
                  14 dias gratis. Sem cartao. Cancele quando quiser.
                </p>
              </div>
            </div>
          </div>
        </Reveal>

        {/* Bento grid of features */}
        <Reveal delay={0.15}>
          <div className="mx-auto mt-10 max-w-4xl">
            <p className="mb-5 text-center text-sm font-medium text-neutral-500">Tudo incluso no plano:</p>
            <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
              {FEATURES_WITH_ICONS.map((f) => (
                <div
                  key={f.label}
                  className="group rounded-xl border border-neutral-200/60 bg-white p-4 transition-all hover:border-vyllo/20 hover:shadow-md hover:shadow-vyllo/5"
                >
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-vyllo/8 transition-colors group-hover:bg-vyllo/12">
                    <f.icon className="h-4 w-4 text-vyllo" />
                  </div>
                  <p className="mt-2.5 text-sm font-medium text-neutral-900">{f.label}</p>
                  <p className="mt-0.5 text-xs text-neutral-400">{f.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.2}>
          <Stats />
        </Reveal>
      </div>
    </section>
  )
}

/* ══════════════════════════════════════════════════════
   OPTION C — Statement minimalista
   ══════════════════════════════════════════════════════ */

function PricingC() {
  const [cycle, setCycle] = useState<Cycle>("semiannual")
  const selected = CYCLES.find((c) => c.id === cycle)!

  return (
    <section id="precos" className="relative overflow-hidden py-24 md:py-36" style={{
      background: "linear-gradient(135deg, #f0f4ff 0%, #fafafa 40%, #f5f0ff 100%)",
    }}>
      {/* Soft blobs */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-[10%] left-[15%] h-[400px] w-[400px] rounded-full bg-[radial-gradient(circle,rgba(0,102,255,0.08)_0%,transparent_60%)] blur-3xl" />
        <div className="absolute bottom-[10%] right-[15%] h-[300px] w-[300px] rounded-full bg-[radial-gradient(circle,rgba(139,92,246,0.06)_0%,transparent_60%)] blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-5xl px-6">
        <Reveal>
          <div className="flex flex-col items-center text-center">
            <p className="text-sm font-medium text-vyllo">Plano Profissional</p>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-neutral-900 sm:text-4xl md:text-5xl">
              Um plano. Tudo incluso.
            </h2>

            <div className="mt-8 w-full max-w-xs">
              <CycleSelector cycle={cycle} setCycle={setCycle} />
            </div>

            {/* Giant price */}
            <div className="mt-8 flex items-baseline gap-2">
              <span className="text-lg text-neutral-400">R$</span>
              <AnimatePresence mode="wait">
                <motion.span
                  key={selected.perMonth}
                  initial={{ opacity: 0, y: -16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 16 }}
                  transition={{ duration: 0.2 }}
                  className="text-7xl font-bold tracking-tighter text-neutral-900 md:text-8xl"
                >
                  {selected.perMonth}
                </motion.span>
              </AnimatePresence>
              <span className="text-lg text-neutral-400">/mes</span>
            </div>
            {selected.id !== "monthly" && (
              <p className="mt-2 text-sm text-neutral-400">
                R$ {selected.price} a cada {selected.id === "semiannual" ? "6 meses" : "12 meses"}
              </p>
            )}

            {/* CTA */}
            <div className="mt-8 flex flex-col items-center gap-3">
              <div className="relative inline-flex">
                <div className="absolute -inset-1 rounded-xl bg-gradient-to-r from-[#0066ff] to-[#8b5cf6] opacity-20 blur-lg" />
                <a
                  href={`${APP_URL}/auth/registro`}
                  className="group relative inline-flex items-center gap-2 rounded-lg bg-vyllo px-8 py-3.5 text-sm font-medium text-white shadow-lg shadow-vyllo/20 transition-all hover:bg-[#0052cc] hover:shadow-xl hover:shadow-vyllo/25 active:scale-[0.98]"
                >
                  Comecar teste gratis
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </a>
              </div>
              <p className="text-xs text-neutral-400">
                14 dias gratis. Sem cartao. Cancele quando quiser.
              </p>
            </div>
          </div>
        </Reveal>

        {/* Features as floating pills */}
        <Reveal delay={0.15}>
          <div className="mx-auto mt-14 flex max-w-3xl flex-wrap items-center justify-center gap-2.5">
            {INCLUDED.map((item) => (
              <span
                key={item}
                className="inline-flex items-center gap-2 rounded-full border border-neutral-200/80 bg-white/80 px-4 py-2 text-sm text-neutral-600 shadow-sm backdrop-blur-sm transition-all hover:border-vyllo/30 hover:shadow-md"
              >
                <Check className="h-3.5 w-3.5 text-vyllo" />
                {item}
              </span>
            ))}
          </div>
        </Reveal>

        <Reveal delay={0.2}>
          <Stats />
        </Reveal>
      </div>
    </section>
  )
}

/* ══════════════════════════════════════════════════════
   MAIN — Version switcher
   ══════════════════════════════════════════════════════ */

type Version = "current" | "A" | "B" | "C"

const VERSIONS: { id: Version; label: string; desc: string }[] = [
  { id: "current", label: "Atual", desc: "Card branco" },
  { id: "A", label: "A", desc: "Dark glass" },
  { id: "B", label: "B", desc: "Bento grid" },
  { id: "C", label: "C", desc: "Statement" },
]

export function Pricing() {
  const [version, setVersion] = useState<Version>("current")

  return (
    <>
      {/* Floating version switcher */}
      <div className="sticky top-16 z-40 flex justify-center py-2">
        <div className="inline-flex items-center gap-1 rounded-full border border-neutral-200 bg-white/90 px-2 py-1 shadow-lg backdrop-blur-md">
          <span className="px-2 text-xs font-medium text-neutral-500">Pricing:</span>
          {VERSIONS.map((v) => (
            <button
              key={v.id}
              onClick={() => setVersion(v.id)}
              className={`rounded-full px-3 py-1 text-xs font-medium transition-all ${
                version === v.id
                  ? "bg-vyllo text-white shadow-sm"
                  : "text-neutral-500 hover:bg-neutral-100"
              }`}
              title={v.desc}
            >
              {v.label}
            </button>
          ))}
        </div>
      </div>

      {version === "current" && <PricingCurrent />}
      {version === "A" && <PricingA />}
      {version === "B" && <PricingB />}
      {version === "C" && <PricingC />}
    </>
  )
}
