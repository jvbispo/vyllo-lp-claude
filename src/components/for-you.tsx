"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { Check, X } from "lucide-react"
import { Reveal } from "./motion"

const ease = [0.21, 0.47, 0.32, 0.98] as const

const CHECKS = [
  "Você é dentista autônomo com 1 a 3 cadeiras",
  "Você trabalha sozinho ou com uma auxiliar",
  "Você quer saber exatamente quanto está lucrando — não chutando",
  "Você usa planilha, papel ou sistemas que não conversam entre si",
  "Você está cansado de terminar o atendimento e ainda ter que lançar dado em outro lugar",
  "Você quer controle financeiro sem precisar de contador pra entender o próprio negócio",
  "Você quer um sistema que cresce com você — sem complicação desde o primeiro dia",
]

const ANTI_CHECKS = [
  "Você tem clínica com mais de 5 dentistas — a Vyllo ainda não é feita para essa escala",
  "Você está bem com a planilha e não quer mudar nada — respeito, sério",
  "Você precisa de integração com convênio de grandes operadoras — ainda não temos",
]

function CheckItem({ text, index, inView }: { text: string; index: number; inView: boolean }) {
  return (
    <motion.li
      className="flex items-start gap-3"
      initial={{ opacity: 0, x: -12 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ delay: 0.15 + index * 0.08, duration: 0.4, ease }}
    >
      <motion.div
        className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-vyllo/10"
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

function AntiCheckItem({ text, index, inView }: { text: string; index: number; inView: boolean }) {
  return (
    <motion.li
      className="flex items-start gap-3"
      initial={{ opacity: 0, x: -12 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ delay: 0.6 + index * 0.08, duration: 0.4, ease }}
    >
      <motion.div
        className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-red-50"
        initial={{ scale: 0 }}
        animate={inView ? { scale: 1 } : {}}
        transition={{ delay: 0.65 + index * 0.08, type: "spring", stiffness: 400, damping: 20 }}
      >
        <X className="h-3.5 w-3.5 text-red-400" />
      </motion.div>
      <span className="text-base text-neutral-500">{text}</span>
    </motion.li>
  )
}

export function ForYou() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: "-80px" })

  return (
    <section className="relative py-12 md:py-28">
      <div ref={ref} className="relative mx-auto max-w-5xl px-6">
        <div className="mx-auto max-w-2xl">
          <Reveal>
            <h2 className="text-2xl text-center md:text-left font-bold tracking-tight text-neutral-900 sm:text-4xl">
              A Vyllo foi feita pra você se...
            </h2>
          </Reveal>

          <ul className="mt-10 space-y-4">
            {CHECKS.map((text, i) => (
              <CheckItem key={text} text={text} index={i} inView={inView} />
            ))}
          </ul>

          <Reveal delay={0.5}>
            <h3 className="mt-12 text-lg font-semibold text-neutral-700">
              Não é pra você se:
            </h3>
          </Reveal>

          <ul className="mt-4 space-y-4">
            {ANTI_CHECKS.map((text, i) => (
              <AntiCheckItem key={text} text={text} index={i} inView={inView} />
            ))}
          </ul>

          <Reveal delay={0.8}>
            <p className="mt-8 text-sm font-medium text-neutral-500 italic">
              A Vyllo é especialista em dentista autônomo.
              Não tentamos ser tudo pra todo mundo.
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
