import Image from "next/image"
import { Reveal } from "./motion"
import { Check, X, Minus } from "lucide-react"

type CellValue = true | false | "partial" | string

const ROWS: {
  feature: string
  planilha: CellValue
  genericos: CellValue
  vyllo: CellValue
  highlight?: boolean
}[] = [
  { feature: "Agenda com status em tempo real", planilha: false, genericos: "Básico", vyllo: "7 status diferentes" },
  { feature: "Confirmação automática D-1 WhatsApp", planilha: false, genericos: "Alguns têm", vyllo: true },
  { feature: "Prontuário digital vinculado ao paciente", planilha: false, genericos: true, vyllo: "Com timeline e versionamento" },
  { feature: "Plano de tratamento com sessões", planilha: false, genericos: "Parcial", vyllo: "Ortodontia, implante, casos complexos" },
  { feature: "Agenda → prontuário → financeiro automático", planilha: false, genericos: false, vyllo: "Só a Vyllo", highlight: true },
  { feature: "Contas a receber por paciente e por tratamento", planilha: false, genericos: "partial", vyllo: true },
  { feature: "Pagamento vinculado ao tratamento", planilha: false, genericos: false, vyllo: true },
  { feature: "Despesas recorrentes automáticas", planilha: false, genericos: false, vyllo: true },
  { feature: "Relatório de lucro por procedimento", planilha: false, genericos: false, vyllo: "Exclusivo entre sistemas para autônomos" },
  { feature: "Meta mensal com acompanhamento", planilha: false, genericos: false, vyllo: true },
  { feature: "Feito para dentista autônomo (1-3 cadeiras)", planilha: "partial", genericos: "Pra clínica grande", vyllo: true },
  { feature: "Preço", planilha: '"Grátis" (custa seu tempo)', genericos: "R$150-400/mês", vyllo: "R$63,90/mês" },
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
            Vyllo vs. o que você provavelmente usa hoje
          </h2>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="mt-8 overflow-x-auto rounded-xl border border-neutral-200/60 bg-white shadow-[0_4px_24px_rgba(0,102,255,0.05),0_1px_3px_rgba(0,0,0,0.04)] md:mt-12">
            <table className="w-full min-w-[560px] md:min-w-[700px]">
              <thead>
                <tr className="border-b border-neutral-100">
                  <th className="py-2 px-2 text-left text-xs font-medium text-neutral-400 md:py-3.5 md:px-5 md:text-sm">
                    Funcionalidade
                  </th>
                  <th className="py-2 px-1.5 text-center text-xs text-neutral-400 md:py-3.5 md:px-4 md:text-sm">
                    Planilha / Papel
                  </th>
                  <th className="py-2 px-1.5 text-center text-xs text-neutral-400 md:py-3.5 md:px-4 md:text-sm">
                    Sistemas genéricos
                  </th>
                  <th className="py-2 px-1.5 text-center md:py-3.5 md:px-4">
                    <span className="inline-flex items-center justify-center gap-1.5 text-xs font-semibold text-vyllo md:gap-2 md:text-sm">
                      <Image src="/o%20(4).png" alt="" width={20} height={20} className="h-4 w-4 shrink-0 md:h-5 md:w-5" aria-hidden />
                      Vyllo
                    </span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {ROWS.map((row, i) => (
                  <tr
                    key={row.feature}
                    className={`${i < ROWS.length - 1 ? "border-b border-neutral-50" : ""} ${row.highlight ? "bg-vyllo/[0.04]" : ""}`}
                  >
                    <td className={`py-2 px-2 text-xs text-neutral-700 md:py-3 md:px-5 md:text-sm ${row.highlight ? "font-semibold" : ""}`}>
                      {row.feature}
                    </td>
                    <td className="py-2 px-1.5 text-center md:py-3 md:px-4">
                      <div className="flex justify-center">
                        <CellIcon value={row.planilha} />
                      </div>
                    </td>
                    <td className="py-2 px-1.5 text-center md:py-3 md:px-4">
                      <div className="flex justify-center">
                        <CellIcon value={row.genericos} />
                      </div>
                    </td>
                    <td className="py-2 px-1.5 text-center bg-vyllo/[0.02] md:py-3 md:px-4">
                      <div className="flex justify-center">
                        <CellIcon value={row.vyllo} />
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
            <p className="text-sm leading-relaxed text-neutral-600">
              A planilha é grátis. Mas quanto tempo você gasta nela todo mês?
              Multiplica pelo valor da sua hora. Não é tão grátis assim.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
