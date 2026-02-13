import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
})

export const metadata: Metadata = {
  title: "Vyllo — Software para Clínicas Odontológicas",
  description:
    "Agenda, prontuário, financeiro e confirmações automáticas em um só lugar. Pensado para dentistas que querem trabalhar, não administrar. 14 dias grátis.",
  metadataBase: new URL("https://vyllo.com.br"),
  alternates: {
    canonical: "/",
  },
  keywords: [
    "software odontológico",
    "gestão de clínica",
    "dentista",
    "prontuário digital",
    "agenda odontológica",
    "odontograma",
    "plano de tratamento",
    "financeiro clínica",
    "software para dentista",
    "gestão odontológica",
    "clínica odontológica",
  ],
  openGraph: {
    title: "Vyllo — Sua clínica, tudo em um lugar",
    description:
      "Agenda, prontuário, financeiro e confirmações automáticas. Pensado para dentistas. 14 dias grátis.",
    type: "website",
    locale: "pt_BR",
    siteName: "Vyllo",
    url: "https://vyllo.com.br",
  },
  twitter: {
    card: "summary_large_image",
    title: "Vyllo — Software para Clínicas Odontológicas",
    description:
      "Agenda, prontuário e financeiro em um só lugar. 14 dias grátis.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR" className={inter.variable}>
      <body className="antialiased">{children}</body>
    </html>
  )
}
