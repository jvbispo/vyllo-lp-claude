"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Reveal } from "./motion"
import { ChevronDown } from "lucide-react"

const FAQS = [
  {
    question: "Preciso instalar alguma coisa?",
    answer:
      "Nao. O Vyllo funciona 100% no navegador — computador, tablet ou celular. Tambem da pra instalar como app no celular, direto da tela inicial, sem precisar de loja.",
  },
  {
    question: "Funciona bem no celular?",
    answer:
      "Sim. A interface foi pensada pra mobile desde o inicio. Da pra agendar, registrar nota clinica e consultar prontuario direto do celular, entre um paciente e outro.",
  },
  {
    question: "O teste gratis tem limitacao?",
    answer:
      "Nao. Nos 14 dias voce tem acesso a tudo. Sem restricao e sem cartao de credito.",
  },
  {
    question: "E se eu mudar de consultorio?",
    answer:
      "Seus dados vao com voce. O Vyllo e vinculado a voce, nao ao consultorio. Mude de clinica, adicione um novo local e continue de onde parou — pacientes, prontuarios e financeiro intactos.",
  },
  {
    question: "Consigo importar meus pacientes?",
    answer:
      "No momento o cadastro e manual, mas rapido. Importacao via planilha esta no roadmap.",
  },
  {
    question: "Meus dados ficam seguros?",
    answer:
      "Sim. Criptografia, servidores no Brasil e backups automaticos. Seus dados sao seus.",
  },
  {
    question: "Posso usar em mais de um consultorio?",
    answer:
      "Sim. Cadastre os locais onde voce atende, cada um com procedimentos, precos e horarios proprios. Agenda e financeiro separados por local, prontuario unificado.",
  },
  {
    question: "Da pra usar durante o atendimento?",
    answer:
      "Sim. O prontuario abre rapido, a nota clinica salva automaticamente, e o odontograma funciona por toque. Foi pensado pra voce usar na cadeira, nao so no escritorio.",
  },
  {
    question: "Como funciona o suporte?",
    answer:
      "Direto por WhatsApp com resposta rapida. Equipe pequena e atenciosa. Sem robo, sem fila.",
  },
  {
    question: "Posso cancelar a qualquer momento?",
    answer:
      "Sim, sem multa. Voce mantem o acesso ate o fim do periodo pago.",
  },
  {
    question: "Vao ter novas funcionalidades?",
    answer:
      "Sim. Lancamos atualizacoes frequentes baseadas no feedback dos dentistas. Confirmacao automatica por WhatsApp e a proxima.",
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
            Perguntas frequentes
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
