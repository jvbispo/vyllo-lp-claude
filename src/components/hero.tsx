"use client"

import { motion, useInView, useScroll, useTransform } from "framer-motion"
import { ArrowRight } from "lucide-react"
import { useRef, type ReactNode } from "react"

const APP_URL = "https://app.vyllo.com.br"

const ease = [0.21, 0.47, 0.32, 0.98] as const

/* ── Animated Dashboard ─────────────────────────────── */

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.3 } },
}

const STAT_CARDS = [
  { accent: "bg-[#0066ff]/15" },
  { accent: "bg-violet-100" },
  { accent: "bg-emerald-100" },
  { accent: "bg-amber-100" },
]

function AnimatedDashboard() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-80px" })

  return (
    <motion.div
      ref={ref}
      variants={containerVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      className="relative overflow-hidden rounded-xl border border-neutral-200/60 bg-white shadow-[0_25px_50px_-12px_rgba(0,102,255,0.15),0_10px_20px_-5px_rgba(0,0,0,0.08)]"
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
        className="flex items-center gap-2 border-b border-neutral-100 bg-neutral-50/80 px-4 py-2.5"
        initial={{ opacity: 0, scaleX: 0.8 }}
        animate={isInView ? { opacity: 1, scaleX: 1 } : {}}
        transition={{ duration: 0.5, ease }}
        style={{ transformOrigin: "left center" }}
      >
        <div className="flex gap-1.5">
          {["bg-red-300/60", "bg-amber-300/60", "bg-emerald-300/60"].map((c, i) => (
            <motion.div
              key={i}
              className={`h-2.5 w-2.5 rounded-full ${c}`}
              initial={{ scale: 0 }}
              animate={isInView ? { scale: 1 } : {}}
              transition={{ delay: 0.5 + i * 0.1, type: "spring", stiffness: 500 }}
            />
          ))}
        </div>
        <div className="mx-auto">
          <motion.div
            className="rounded-md border border-neutral-200 bg-white px-3 py-1 text-[11px] text-neutral-400"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.8, duration: 0.4 }}
          >
            app.vyllo.com.br
          </motion.div>
        </div>
      </motion.div>

      {/* Dashboard content */}
      <div className="relative aspect-[16/9] bg-gradient-to-b from-white to-neutral-50/50">
        <div className="absolute inset-0 p-4 md:p-6">
          <div className="flex h-full gap-4">
            {/* Sidebar */}
            <motion.div
              className="hidden w-44 shrink-0 border-r border-neutral-100 pr-4 md:block"
              initial={{ opacity: 0, x: -30 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.4, ease }}
            >
              <div className="mb-6 flex items-center gap-2">
                <motion.div
                  className="h-5 w-5 rounded bg-[#0066ff]/15"
                  initial={{ rotate: -90, scale: 0 }}
                  animate={isInView ? { rotate: 0, scale: 1 } : {}}
                  transition={{ delay: 0.6, type: "spring", stiffness: 500 }}
                />
                <div className="h-3.5 w-14 rounded bg-neutral-200/80" />
              </div>
              <div className="space-y-2.5">
                {["w-full bg-[#0066ff]/10", "w-3/4 bg-neutral-100", "w-5/6 bg-neutral-100", "w-2/3 bg-neutral-100", "w-4/5 bg-neutral-100"].map((cls, i) => (
                  <motion.div
                    key={i}
                    className={`h-3.5 rounded ${cls}`}
                    initial={{ opacity: 0, x: -10 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: 0.7 + i * 0.05, duration: 0.3 }}
                  />
                ))}
              </div>
            </motion.div>

            {/* Main content */}
            <div className="flex-1 space-y-4">
              {/* Stat cards */}
              <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
                {STAT_CARDS.map((card, i) => (
                  <motion.div
                    key={i}
                    className="rounded-lg border border-neutral-100 p-3"
                    initial={{ opacity: 0, y: -20, scale: 0.9 }}
                    animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
                    transition={{ delay: 0.5 + i * 0.1, duration: 0.5, ease }}
                  >
                    <div className="mb-2 h-2.5 w-12 rounded bg-neutral-200/60" />
                    <div className={`h-5 w-10 rounded ${card.accent}`} />
                  </motion.div>
                ))}
              </div>

              {/* Table + Chart */}
              <div className="grid flex-1 grid-cols-1 gap-3 md:grid-cols-3">
                <motion.div
                  className="col-span-2 rounded-lg border border-neutral-100 p-4"
                  initial={{ opacity: 0, scale: 0.85 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ delay: 0.8, duration: 0.6, ease }}
                >
                  <div className="mb-4 h-3 w-20 rounded bg-neutral-200/60" />
                  <div className="space-y-2.5">
                    {[1, 2, 3, 4].map((i) => (
                      <motion.div
                        key={i}
                        className="flex items-center gap-3"
                        initial={{ opacity: 0, x: 20 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ delay: 1.0 + i * 0.08, duration: 0.4, ease }}
                      >
                        <div className="h-7 w-7 rounded-full bg-gradient-to-br from-[#0066ff]/10 to-[#0066ff]/5" />
                        <div className="flex-1">
                          <div className="h-2.5 w-1/3 rounded bg-neutral-100" />
                        </div>
                        <div className={`h-4 w-14 rounded-full ${i === 1 ? "bg-emerald-100" : i === 2 ? "bg-[#0066ff]/8" : "bg-neutral-100"}`} />
                      </motion.div>
                    ))}
                  </div>
                </motion.div>

                <motion.div
                  className="rounded-lg border border-neutral-100 p-4"
                  initial={{ opacity: 0, scale: 0.85 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ delay: 0.9, duration: 0.6, ease }}
                >
                  <div className="mb-4 h-3 w-16 rounded bg-neutral-200/60" />
                  {/* Animated chart bars */}
                  <div className="flex h-20 items-end gap-1.5 rounded-lg bg-gradient-to-b from-[#0066ff]/5 to-transparent p-2">
                    {[40, 65, 45, 80, 55, 70, 50].map((height, i) => (
                      <motion.div
                        key={i}
                        className="flex-1 rounded-t bg-[#0066ff]/15"
                        initial={{ height: 0 }}
                        animate={isInView ? { height: `${height}%` } : {}}
                        transition={{ delay: 1.4 + i * 0.08, duration: 0.6, ease }}
                      />
                    ))}
                  </div>
                  <div className="mt-3 space-y-2">
                    <div className="h-2.5 w-full rounded bg-neutral-100" />
                    <div className="h-2.5 w-2/3 rounded bg-neutral-100" />
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

/* ── Scroll-linked 3D Perspective ─────────────────────── */

function PerspectiveDashboard({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  })

  const rotateX = useTransform(scrollYProgress, [0, 0.4], [10, 0])
  const scale = useTransform(scrollYProgress, [0, 0.4], [0.94, 1])
  const opacity = useTransform(scrollYProgress, [0, 0.2], [0.5, 1])

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 32 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.9, delay: 0.25, ease }}
      className="relative mt-20"
      style={{ perspective: "1200px" }}
    >
      <motion.div
        style={{
          rotateX,
          scale,
          opacity,
          transformOrigin: "center bottom",
        }}
      >
        {children}
      </motion.div>
    </motion.div>
  )
}

/* ── Hero Section ───────────────────────────────────── */

export function Hero() {
  return (
    <section className="relative overflow-hidden pt-28 pb-20 md:pt-40 md:pb-32">
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

      <div className="relative mx-auto max-w-5xl px-6">
        <div className="max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease }}
            className="inline-flex items-center gap-2 rounded-full border border-vyllo/15 bg-vyllo/5 px-3.5 py-1.5"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-vyllo" />
            <span className="text-xs font-medium text-vyllo">Software para clinicas odontologicas</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.05, ease }}
            className="mt-6 text-4xl font-bold leading-[1.08] tracking-tight text-neutral-900 sm:text-5xl md:text-6xl"
          >
            Agenda, prontuario e financeiro
            <br className="hidden sm:block" />
            <span className="bg-gradient-to-r from-[#0066ff] to-[#8b5cf6] bg-clip-text text-transparent">em um so lugar.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease }}
            className="mt-6 max-w-xl text-lg leading-relaxed text-neutral-500"
          >
            Pensado para dentistas que querem atender, nao administrar.
            Integrado, rapido e sem complexidade.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15, ease }}
            className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center"
          >
            <div className="relative inline-flex">
              <div className="absolute -inset-1 rounded-xl bg-gradient-to-r from-[#0066ff] to-[#8b5cf6] opacity-20 blur-lg transition-opacity group-hover:opacity-30" />
              <a
                href={`${APP_URL}/auth/registro`}
                className="group relative inline-flex items-center justify-center gap-2 rounded-lg bg-vyllo px-6 py-3 text-sm font-medium text-white shadow-lg shadow-vyllo/20 transition-all hover:bg-[#0052cc] hover:shadow-xl hover:shadow-vyllo/25 active:scale-[0.98]"
              >
                Comecar teste gratis
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </a>
            </div>
            <span className="text-sm text-neutral-400">
              14 dias gratis. Sem cartao.
            </span>
          </motion.div>
        </div>

        {/* Product screenshot with scroll-linked 3D perspective */}
        <PerspectiveDashboard>
          {/* Glow behind mockup */}
          <div className="absolute -inset-12 rounded-3xl bg-[radial-gradient(ellipse_60%_50%_at_50%_40%,rgba(0,102,255,0.18)_0%,transparent_65%)] blur-xl" />

          <div className="relative">
            <AnimatedDashboard />
          </div>
        </PerspectiveDashboard>
      </div>
    </section>
  )
}
