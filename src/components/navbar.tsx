"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { cn } from "@/lib/cn"
import { Menu, X } from "lucide-react"

const NAV_LINKS = [
  { href: "#funcionalidades", label: "Funcionalidades" },
  { href: "#comparativo", label: "Comparativo" },
  { href: "#precos", label: "Planos" },
  { href: "#faq", label: "FAQ" },
]

const CALC_URL = "https://calculadora.vyllo.com.br"

const APP_URL = "https://app.vyllo.com.br"

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-white/90 backdrop-blur-md border-b border-neutral-200"
          : "bg-transparent",
      )}
    >
      <nav className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
        <a href="#" className="flex items-center">
          <Image src="/vyllo-logo.svg" alt="Vyllo" width={400} height={400} className="h-10 w-10 scale-[2.5] origin-left" />
        </a>

        <div className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm text-neutral-500 transition-colors hover:text-neutral-900"
            >
              {link.label}
            </a>
          ))}
        </div>

        <div className="hidden items-center gap-4 md:flex">
          <a
            href={CALC_URL}
            className="text-sm text-neutral-500 transition-colors hover:text-neutral-900"
          >
            Calcule seu Lucro Real →
          </a>
          <a
            href={`${APP_URL}/auth/registro`}
            className="rounded-lg bg-vyllo px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-[#0052cc]"
          >
            Testar grátis 15 dias
          </a>
        </div>

        <button
          className="md:hidden rounded-md p-2 text-neutral-500 hover:text-neutral-900"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Menu"
        >
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>

      {mobileOpen && (
        <div className="border-t border-neutral-100 bg-white px-6 pb-6 pt-4 md:hidden">
          <div className="flex flex-col gap-4">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-base text-neutral-600"
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </a>
            ))}
            <hr className="border-neutral-100" />
            <a
              href={CALC_URL}
              className="text-base text-neutral-500"
            >
              Calcule seu Lucro Real →
            </a>
            <a
              href={`${APP_URL}/auth/registro`}
              className="rounded-lg bg-vyllo px-4 py-3 text-center text-base font-medium text-white"
            >
              Testar grátis 15 dias
            </a>
          </div>
        </div>
      )}
    </header>
  )
}
