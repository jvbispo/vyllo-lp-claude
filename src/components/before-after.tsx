"use client"

import { motion, useInView, AnimatePresence } from "framer-motion"
import { useRef, useState, useCallback } from "react"
import { X, Check } from "lucide-react"
import Image from "next/image"

const ease = [0.21, 0.47, 0.32, 0.98] as const

const COMPARISONS = [
  {
    before: "Agenda em planilha ou caderno",
    after: "Agenda com status em tempo real: pendente, confirmado, chegou, concluído",
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

/* ── Image Comparison Slider ── */

function ImageSlider({
  beforeSrc,
  afterSrc,
  label,
  className,
}: {
  beforeSrc: string
  afterSrc: string
  label: string
  className?: string
}) {
  const [position, setPosition] = useState(50)
  const containerRef = useRef<HTMLDivElement>(null)
  const isDragging = useRef(false)

  const updatePosition = useCallback((clientX: number) => {
    if (!containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    const x = clientX - rect.left
    const pct = Math.max(0, Math.min(100, (x / rect.width) * 100))
    setPosition(pct)
  }, [])

  const handlePointerDown = useCallback((e: React.PointerEvent) => {
    isDragging.current = true
    ;(e.target as HTMLElement).setPointerCapture(e.pointerId)
    updatePosition(e.clientX)
  }, [updatePosition])

  const handlePointerMove = useCallback((e: React.PointerEvent) => {
    if (!isDragging.current) return
    updatePosition(e.clientX)
  }, [updatePosition])

  const handlePointerUp = useCallback(() => {
    isDragging.current = false
  }, [])

  return (
    <div className={className}>
      <div
        ref={containerRef}
        className="relative aspect-[4/3] w-full cursor-col-resize overflow-hidden rounded-2xl border border-neutral-200 shadow-lg select-none touch-none"
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
      >
        {/* After image (full, behind) */}
        <Image
          src={afterSrc}
          alt="Depois"
          fill
          className="object-cover"
          sizes="(min-width: 768px) 400px, 100vw"
          draggable={false}
        />

        {/* Before image (clipped with clip-path — image stays fixed, only the visible area changes) */}
        <div
          className="absolute inset-0"
          style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}
        >
          <Image
            src={beforeSrc}
            alt="Antes"
            fill
            className="object-cover"
            sizes="(min-width: 768px) 400px, 100vw"
            draggable={false}
          />
        </div>

        {/* Divider line */}
        <div
          className="absolute top-0 bottom-0 z-10 w-0.5 bg-white shadow-[0_0_8px_rgba(0,0,0,0.3)]"
          style={{ left: `${position}%`, transform: "translateX(-50%)" }}
        >
          {/* Handle */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-lg border border-neutral-200">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M4 8L1 5M4 8L1 11M4 8H12M12 8L15 5M12 8L15 11" stroke="#666" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        </div>

        {/* Labels */}
        <span className="absolute top-3 left-3 z-10 rounded-full bg-black/50 px-2.5 py-1 text-[11px] font-medium text-white backdrop-blur-sm">
          Antes
        </span>
        <span className="absolute top-3 right-3 z-10 rounded-full bg-black/50 px-2.5 py-1 text-[11px] font-medium text-white backdrop-blur-sm">
          Depois
        </span>
      </div>
      <p className="mt-2 text-center text-xs text-neutral-400">{label}</p>
    </div>
  )
}

/* ── Mobile Slider with Selector ── */

const MOBILE_SLIDERS = [
  { id: "restauracao", label: "Restauração em Resina", beforeSrc: "/restauracao-antes.jpeg", afterSrc: "/restauracao-depois.jpeg" },
  { id: "harmonizacao", label: "Harmonização Facial", beforeSrc: "/testa-antes.jpeg", afterSrc: "/testa-depois.jpeg" },
]

function MobileSliderWithSelector() {
  const [active, setActive] = useState(0)
  const current = MOBILE_SLIDERS[active]

  return (
    <div className="md:hidden">
      {/* Pill selector */}
      <div className="mx-auto mb-5 flex w-fit rounded-full bg-neutral-100 p-1">
        {MOBILE_SLIDERS.map((s, i) => (
          <button
            key={s.id}
            onClick={() => setActive(i)}
            className={`relative rounded-full px-4 py-1.5 text-xs font-medium transition-colors ${
              active === i
                ? "bg-white text-neutral-900 shadow-sm"
                : "text-neutral-500"
            }`}
          >
            {s.label}
          </button>
        ))}
      </div>

      {/* Slider */}
      <div className="max-w-xs mx-auto">
        <AnimatePresence mode="wait">
          <motion.div
            key={current.id}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.25 }}
          >
            <ImageSlider
              beforeSrc={current.beforeSrc}
              afterSrc={current.afterSrc}
              label={current.label}
            />
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}

/* ── Comparison Row ── */

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

/* ── Main Section ── */

export function BeforeAfter() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { margin: "-100px" })

  return (
    <section className="relative bg-white py-24 md:py-32">
      <div ref={ref} className="mx-auto max-w-6xl px-6">
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

        {/* Image Sliders */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2, duration: 0.6, ease }}
          className="mt-10"
        >
          {/* Desktop: both sliders side by side */}
          <div className="hidden md:grid md:grid-cols-2 md:gap-8">
            <ImageSlider
              beforeSrc="/testa-antes.jpeg"
              afterSrc="/testa-depois.jpeg"
              label="Harmonização Facial"
            />
            <ImageSlider
              beforeSrc="/restauracao-antes.jpeg"
              afterSrc="/restauracao-depois.jpeg"
              label="Restauração em Resina"
            />
          </div>

          {/* Mobile: slider with selector */}
          <MobileSliderWithSelector />

          <p className="mt-4 text-center text-sm text-neutral-500">
            Arraste para comparar — funcionalidade real da Vyllo
          </p>
        </motion.div>

        {/* Headers */}
        <div className="mt-14 hidden grid-cols-2 gap-6 md:grid">
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
