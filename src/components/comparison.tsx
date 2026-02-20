import Image from "next/image"
import { Reveal } from "./motion"
import { Check, X, Minus } from "lucide-react"

type CellValue = true | false | "partial" | string

const ROWS: {
  feature: string
  vyllo: CellValue
  tradicional: CellValue
  economico: CellValue
  fintech: CellValue
  grandes: CellValue
}[] = [
  { feature: "Preço/mês", vyllo: "R$79,90", tradicional: "R$139+", economico: "R$90+", fintech: "R$120+", grandes: "R$150+" },
  { feature: "Agenda visual", vyllo: true, tradicional: true, economico: true, fintech: true, grandes: true },
  { feature: "Prontuário completo", vyllo: true, tradicional: true, economico: true, fintech: true, grandes: true },
  { feature: "Odontograma multifaces", vyllo: true, tradicional: "Básico", economico: "Básico", fintech: "Básico", grandes: "Avançado" },
  { feature: "Plano de tratamento", vyllo: true, tradicional: true, economico: true, fintech: true, grandes: true },
  { feature: "Anamnese personalizável", vyllo: true, tradicional: true, economico: false, fintech: true, grandes: true },
  { feature: "Fotos antes/depois", vyllo: true, tradicional: true, economico: false, fintech: false, grandes: true },
  { feature: "Dashboard financeiro", vyllo: true, tradicional: "Básico", economico: "Básico", fintech: true, grandes: true },
  { feature: "Lucro real por procedimento", vyllo: "✅ Exclusivo", tradicional: false, economico: false, fintech: false, grandes: false },
  { feature: "WhatsApp automático incluso", vyllo: "✅ 200/mês", tradicional: "Pago à parte", economico: "Cobra por msg", fintech: true, grandes: true },
  { feature: "App mobile que funciona", vyllo: true, tradicional: true, economico: true, fintech: "⚠ Nota 3.0", grandes: true },
  { feature: "Cancela sem drama", vyllo: true, tradicional: "partial", economico: true, fintech: false, grandes: false },
  { feature: "Trial sem cartão", vyllo: "15 dias", tradicional: "7 dias", economico: "7 dias", fintech: "7 dias", grandes: "Só demo" },
  { feature: "Feito para autônomos", vyllo: true, tradicional: false, economico: false, fintech: false, grandes: false },
]

function CellIcon({ value }: { value: CellValue }) {
  if (value === true) {
    return (
      <span className="inline-flex h-4 w-4 items-center justify-center rounded-full bg-vyllo/10 md:h-5 md:w-5">
        <Check className="h-2.5 w-2.5 text-vyllo md:h-3 md:w-3" />
      </span>
    )
  }
  if (value === false) {
    return <X className="h-3 w-3 text-neutral-300 md:h-4 md:w-4" />
  }
  if (value === "partial") {
    return <Minus className="h-3 w-3 text-neutral-400 md:h-4 md:w-4" />
  }
  return <span className="text-[11px] text-neutral-600 md:text-sm">{value}</span>
}

export function Comparison() {
  return (
    <section id="comparativo" className="relative py-24 md:py-36">
      {/* Grid lines with fade mask */}
      <div
        className="pointer-events-none absolute inset-0 grid-lines-light"
        style={{
          maskImage: "radial-gradient(ellipse 60% 50% at 50% 50%, #000 30%, transparent 80%)",
          WebkitMaskImage: "radial-gradient(ellipse 60% 50% at 50% 50%, #000 30%, transparent 80%)",
        }}
      />

      <div className="relative mx-auto max-w-5xl px-6">
        <Reveal>
          <h2 className="text-3xl font-bold tracking-tight text-neutral-900 sm:text-4xl">
            Compare. A gente não tem medo de tabela.
          </h2>
          <p className="mt-3 text-base text-neutral-500">
            Pesquisamos os preços e funcionalidades dos principais sistemas do mercado. Tiramos os nomes, mas você provavelmente reconhece.
          </p>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="mt-8 overflow-x-auto rounded-xl border border-neutral-200/60 bg-white shadow-[0_4px_24px_rgba(0,102,255,0.05),0_1px_3px_rgba(0,0,0,0.04)] md:mt-12">
            <table className="w-full min-w-[560px] md:min-w-[700px]">
              <thead>
                <tr className="border-b border-neutral-100">
                  <th className="py-2 px-2 text-left text-xs font-medium text-neutral-400 md:py-3.5 md:px-5 md:text-sm">
                    Funcionalidade
                  </th>
                  <th className="py-2 px-1.5 text-center md:py-3.5 md:px-4">
                    <span className="inline-flex items-center justify-center gap-1.5 text-xs font-semibold text-vyllo md:gap-2 md:text-sm">
                      <Image src="/o%20(4).png" alt="" width={20} height={20} className="h-4 w-4 shrink-0 md:h-5 md:w-5" aria-hidden />
                      Vyllo
                    </span>
                  </th>
                  <th className="py-2 px-1.5 text-center text-xs text-neutral-400 md:py-3.5 md:px-4 md:text-sm">
                    O Tradicional
                  </th>
                  <th className="py-2 px-1.5 text-center text-xs text-neutral-400 md:py-3.5 md:px-4 md:text-sm">
                    O Econômico
                  </th>
                  <th className="py-2 px-1.5 text-center text-xs text-neutral-400 md:py-3.5 md:px-4 md:text-sm">
                    O da Fintech
                  </th>
                  <th className="py-2 px-1.5 text-center text-xs text-neutral-400 md:py-3.5 md:px-4 md:text-sm">
                    O das Grandes Clínicas
                  </th>
                </tr>
              </thead>
              <tbody>
                {ROWS.map((row, i) => (
                  <tr
                    key={row.feature}
                    className={i < ROWS.length - 1 ? "border-b border-neutral-50" : ""}
                  >
                    <td className="py-2 px-2 text-xs text-neutral-700 md:py-3 md:px-5 md:text-sm">
                      {row.feature}
                    </td>
                    <td className="py-2 px-1.5 text-center bg-vyllo/[0.02] md:py-3 md:px-4">
                      <div className="flex justify-center">
                        <CellIcon value={row.vyllo} />
                      </div>
                    </td>
                    <td className="py-2 px-1.5 text-center md:py-3 md:px-4">
                      <div className="flex justify-center">
                        <CellIcon value={row.tradicional} />
                      </div>
                    </td>
                    <td className="py-2 px-1.5 text-center md:py-3 md:px-4">
                      <div className="flex justify-center">
                        <CellIcon value={row.economico} />
                      </div>
                    </td>
                    <td className="py-2 px-1.5 text-center md:py-3 md:px-4">
                      <div className="flex justify-center">
                        <CellIcon value={row.fintech} />
                      </div>
                    </td>
                    <td className="py-2 px-1.5 text-center md:py-3 md:px-4">
                      <div className="flex justify-center">
                        <CellIcon value={row.grandes} />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Reveal>

        <Reveal delay={0.15}>
          <div className="mt-10 rounded-xl border border-vyllo/20 bg-vyllo/5 px-6 py-5">
            <ul className="list-none space-y-2 text-sm leading-relaxed text-vyllo">
              <li>Não estamos contra ninguém.</li>
              <li>Mas achamos que o dentista que trabalha sozinho não deveria pagar preço de clínica grande.</li>
              <li>Nem ficar preso em contrato.</li>
              <li>Nem precisar de reunião pra cancelar.</li>
            </ul>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
