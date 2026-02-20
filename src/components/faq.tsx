"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Reveal } from "./motion"
import { ChevronDown } from "lucide-react"

const FAQS = [
  {
    question: "Serve pra quem atende em mais de um consultório?",
    answer:
      "Sim. Cadastre múltiplos locais, cada um com procedimentos, preços e convênios próprios. Agenda e financeiro consolidam tudo.",
  },
  {
    question: "Funciona no celular?",
    answer:
      "Sim. 100% no celular e também no computador. A maioria dos nossos dentistas usa no celular entre pacientes.",
  },
  {
    question: "Meus dados ficam seguros?",
    answer:
      "Criptografia, armazenamento AWS, LGPD. Mesmo padrão de bancos digitais.",
  },
  {
    question: "Posso cancelar quando quiser?",
    answer:
      "Sim. Sem multa, sem ligar, sem \"reunião de retenção\". Você clica em cancelar e acabou.",
  },
  {
    question: "O que são as 200 confirmações?",
    answer:
      "Todo mês você tem 200 mensagens automáticas de confirmação de consulta via WhatsApp. Para consultórios autônomos, cobre tranquilamente o mês.",
  },
  {
    question: "Já uso outro sistema. E agora?",
    answer:
      "Teste 15 dias sem cancelar o outro. Compare na prática. Se preferir a Vyllo, a gente te ajuda na migração.",
  },
  {
    question: "E depois dos 15 dias?",
    answer:
      "Você decide se assina. Sem cobrança automática. Se não assinar, perde as features premium mas mantém a Calculadora de Lucro pra sempre.",
  },
  {
    question: "Vai ter inteligência artificial?",
    answer:
      "Sim. Estamos construindo uma IA que agenda, confirma e responde seus pacientes no WhatsApp 24/7. Quem assina agora terá acesso prioritário e condições que não vamos repetir.",
  },
]

function FaqItem({
  question,
  answer,
  open,
  onToggle,
}: {
  question: string
  answer: string
  open: boolean
  onToggle: () => void
}) {
  return (
    <div className="border-b border-neutral-100 last:border-0">
      <button
        onClick={onToggle}
        className="flex w-full items-center justify-between py-5 text-left"
      >
        <span className="text-base font-medium text-neutral-900 pr-4">
          {question}
        </span>
        <motion.div
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
        >
          <ChevronDown className="h-4 w-4 shrink-0 text-neutral-400" />
        </motion.div>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{
              height: { type: "spring", stiffness: 500, damping: 40, restDelta: 0.01 },
              opacity: { duration: 0.2 },
            }}
            className="overflow-hidden"
          >
            <p className="pb-5 text-sm leading-relaxed text-neutral-500">{answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export function Faq() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  return (
    <section id="faq" className="relative py-24 md:py-36 bg-gradient-to-b from-[#faf8ff] to-[#fafafa]">
      <div className="mx-auto max-w-2xl px-6">
        <Reveal>
          <h2 className="text-3xl font-bold tracking-tight text-neutral-900 sm:text-4xl">
            Antes de testar, você provavelmente quer saber:
          </h2>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="mt-12">
            {FAQS.map((faq, i) => (
              <FaqItem
                key={i}
                question={faq.question}
                answer={faq.answer}
                open={openIndex === i}
                onToggle={() => setOpenIndex(openIndex === i ? null : i)}
              />
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  )
}
