import { Reveal } from "./motion"
import { Check, X, Minus } from "lucide-react"

type CellValue = true | false | "partial" | string

const ROWS: {
  feature: string
  vyllo: CellValue
  codental: CellValue
  capim: CellValue
  do_: CellValue
}[] = [
  { feature: "Agenda visual", vyllo: true, codental: true, capim: true, do_: true },
  { feature: "Odontograma interativo", vyllo: true, codental: true, capim: "partial", do_: "partial" },
  { feature: "Plano de tratamento", vyllo: true, codental: true, capim: true, do_: true },
  { feature: "Timeline do paciente", vyllo: true, codental: false, capim: false, do_: false },
  { feature: "Orcamentos integrados", vyllo: true, codental: true, capim: true, do_: false },
  { feature: "Financeiro completo", vyllo: true, codental: true, capim: true, do_: "partial" },
  { feature: "Recibos em PDF", vyllo: true, codental: false, capim: false, do_: false },
  { feature: "WhatsApp incluso", vyllo: true, codental: "R$0,07/msg", capim: true, do_: true },
  { feature: "Interface moderna", vyllo: true, codental: false, capim: "partial", do_: false },
  { feature: "A partir de", vyllo: "R$59/mes", codental: "R$79,90", capim: "R$99,90", do_: "R$55" },
]

function CellIcon({ value }: { value: CellValue }) {
  if (value === true) {
    return (
      <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-vyllo/10">
        <Check className="h-3 w-3 text-vyllo" />
      </span>
    )
  }
  if (value === false) {
    return <X className="h-4 w-4 text-neutral-300" />
  }
  if (value === "partial") {
    return <Minus className="h-4 w-4 text-neutral-400" />
  }
  return <span className="text-sm text-neutral-600">{value}</span>
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
            Comparativo honesto
          </h2>
          <p className="mt-3 text-base text-neutral-500">
            Voce decide. Colocamos lado a lado.
          </p>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="mt-12 overflow-x-auto rounded-xl border border-neutral-200/60 bg-white shadow-[0_4px_24px_rgba(0,102,255,0.05),0_1px_3px_rgba(0,0,0,0.04)]">
            <table className="w-full min-w-[600px]">
              <thead>
                <tr className="border-b border-neutral-100">
                  <th className="py-3.5 px-5 text-left text-sm font-medium text-neutral-400">
                    Funcionalidade
                  </th>
                  <th className="py-3.5 px-4 text-center">
                    <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-vyllo">
                      <span className="h-1.5 w-1.5 rounded-full bg-vyllo" />
                      Vyllo
                    </span>
                  </th>
                  <th className="py-3.5 px-4 text-center text-sm text-neutral-400">
                    Codental
                  </th>
                  <th className="py-3.5 px-4 text-center text-sm text-neutral-400">
                    Capim
                  </th>
                  <th className="py-3.5 px-4 text-center text-sm text-neutral-400">
                    D.O.
                  </th>
                </tr>
              </thead>
              <tbody>
                {ROWS.map((row, i) => (
                  <tr
                    key={row.feature}
                    className={i < ROWS.length - 1 ? "border-b border-neutral-50" : ""}
                  >
                    <td className="py-3 px-5 text-sm text-neutral-700">
                      {row.feature}
                    </td>
                    <td className="py-3 px-4 text-center bg-vyllo/[0.02]">
                      <div className="flex justify-center">
                        <CellIcon value={row.vyllo} />
                      </div>
                    </td>
                    <td className="py-3 px-4 text-center">
                      <div className="flex justify-center">
                        <CellIcon value={row.codental} />
                      </div>
                    </td>
                    <td className="py-3 px-4 text-center">
                      <div className="flex justify-center">
                        <CellIcon value={row.capim} />
                      </div>
                    </td>
                    <td className="py-3 px-4 text-center">
                      <div className="flex justify-center">
                        <CellIcon value={row.do_} />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
