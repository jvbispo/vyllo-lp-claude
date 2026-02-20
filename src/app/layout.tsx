import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
})

export const metadata: Metadata = {
  title: "Vyllo — Software para Dentistas",
  description:
    "Agenda, prontuário e financeiro no seu bolso. Leve seus pacientes e dados para qualquer consultório. Pensado para dentistas autônomos. 14 dias grátis.",
  metadataBase: new URL("https://vyllo.com.br"),
  alternates: {
    canonical: "/",
  },
  keywords: [
    "software para dentista",
    "software odontológico",
    "dentista autônomo",
    "prontuário digital",
    "agenda odontológica",
    "odontograma",
    "plano de tratamento",
    "financeiro dentista",
    "gestão odontológica",
    "sistema para dentista",
    "consultório odontológico",
  ],
  openGraph: {
    title: "Vyllo — Seu consultório no bolso",
    description:
      "Agenda, prontuário e financeiro onde você for. O sistema do dentista que quer atender, não administrar. 14 dias grátis.",
    type: "website",
    locale: "pt_BR",
    siteName: "Vyllo",
    url: "https://vyllo.com.br",
  },
  twitter: {
    card: "summary_large_image",
    title: "Vyllo — Software para Dentistas",
    description:
      "Agenda, prontuário e financeiro no seu bolso. 14 dias grátis.",
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
    <html lang="pt-BR" className={inter.variable} suppressHydrationWarning>
      <body className="antialiased" suppressHydrationWarning>{children}</body>
    </html>
  )
}
