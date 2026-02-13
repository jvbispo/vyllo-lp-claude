"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { Check } from "lucide-react"
import { Reveal } from "./motion"

const ease = [0.21, 0.47, 0.32, 0.98] as const

const CHECKS = [
  "Atende em um ou mais consultorios",
  "Quer seus dados organizados num lugar so",
  "Esta cansado de interfaces dos anos 2000",
  "Quer saber exatamente quanto faturou no mes",
  "Nao quer pagar R$200/mes por features que nao usa",
  "Quer um sistema que funcione no celular",
]

function CheckItem({ text, index, inView }: { text: string; index: number; inView: boolean }) {
  return (
    <motion.li
      className="flex items-center gap-3"
      initial={{ opacity: 0, x: -12 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ delay: 0.15 + index * 0.08, duration: 0.4, ease }}
    >
      <motion.div
        className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-vyllo/10"
        initial={{ scale: 0 }}
        animate={inView ? { scale: 1 } : {}}
        transition={{ delay: 0.2 + index * 0.08, type: "spring", stiffness: 400, damping: 20 }}
      >
        <Check className="h-3.5 w-3.5 text-vyllo" />
      </motion.div>
      <span className="text-base text-neutral-600">{text}</span>
    </motion.li>
  )
}

export function ForYou() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: "-80px" })

  return (
    <section className="relative py-24 md:py-36">
      <div ref={ref} className="relative mx-auto max-w-5xl px-6">
        <div className="mx-auto max-w-2xl">
          <Reveal>
            <h2 className="text-3xl font-bold tracking-tight text-neutral-900 sm:text-4xl">
              O Vyllo e para voce se...
            </h2>
            <p className="mt-3 text-base text-neutral-500">
              Se voce se identificou com pelo menos dois itens, o Vyllo foi feito pra voce.
            </p>
          </Reveal>

          <ul className="mt-10 space-y-4">
            {CHECKS.map((text, i) => (
              <CheckItem key={text} text={text} index={i} inView={inView} />
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
