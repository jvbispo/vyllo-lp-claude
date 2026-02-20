import Image from "next/image"

const WHATSAPP_URL = "https://wa.me/5579999348279"

export function Footer() {
  return (
    <footer className="border-t border-neutral-200 py-12">
      <div className="mx-auto max-w-5xl px-6">
        <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
          <div>
            <a href="#" className="flex items-center">
              <Image src="/vyllo-logo.svg" alt="Vyllo" width={400} height={400} className="h-8 w-8 scale-[2.5] origin-left" />
            </a>
            <p className="mt-3 max-w-xs text-sm text-neutral-400">
              Software de gestao para dentistas.
            </p>
          </div>

          <div className="flex gap-16">
            <div>
              <p className="text-sm font-medium text-neutral-900">Produto</p>
              <ul className="mt-3 space-y-2">
                <li>
                  <a href="#funcionalidades" className="text-sm text-neutral-400 transition-colors hover:text-neutral-600">
                    Funcionalidades
                  </a>
                </li>
                <li>
                  <a href="#precos" className="text-sm text-neutral-400 transition-colors hover:text-neutral-600">
                    Planos
                  </a>
                </li>
                <li>
                  <a href="#faq" className="text-sm text-neutral-400 transition-colors hover:text-neutral-600">
                    FAQ
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <p className="text-sm font-medium text-neutral-900">Contato</p>
              <ul className="mt-3 space-y-2">
                <li>
                  <a
                    href={WHATSAPP_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-neutral-400 transition-colors hover:text-neutral-600"
                  >
                    WhatsApp
                  </a>
                </li>
                <li>
                  <a
                    href="mailto:contato@vyllo.com.br"
                    className="text-sm text-neutral-400 transition-colors hover:text-neutral-600"
                  >
                    Email
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-12 border-t border-neutral-100 pt-8">
          <p className="text-xs text-neutral-300">
            &copy; {new Date().getFullYear()} Vyllo. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  )
}
