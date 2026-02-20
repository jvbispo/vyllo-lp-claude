import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
})

export const metadata: Metadata = {
  title: "Vyllo — Software para Dentista Autônomo | Agenda, WhatsApp e Lucro Real",
  description:
    "Sistema de gestão para dentista autônomo: agenda com confirmação automática no WhatsApp (200 mensagens/mês inclusas), prontuário com odontograma multifaces, anamnese, orçamentos e o único software com lucro real por procedimento — não só faturamento. R$ 79,90/mês. Trial de 15 dias grátis, sem cartão.",
  metadataBase: new URL("https://vyllo.com.br"),
  icons: {
    icon: "apple-touch-icon.png",
    shortcut: "apple-touch-icon.png",
    apple: "apple-touch-icon.png",
  },
  alternates: {
    canonical: "/",
  },
  keywords: [
    // Intenção primária
    "software para dentista",
    "sistema para dentista",
    "software odontológico",
    "sistema odontológico",
    "sistema de gestão odontológica",
    // Audiência específica
    "software para dentista autônomo",
    "sistema para dentista autônomo",
    "dentista autônomo",
    "consultório odontológico autônomo",
    "gestão para dentista autônomo",
    // Funcionalidades com intenção de busca
    "confirmação de consulta whatsapp dentista",
    "confirmação automática whatsapp odontologia",
    "agenda para dentista",
    "agenda odontológica online",
    "prontuário digital dentista",
    "prontuário eletrônico odontológico",
    "odontograma digital",
    "odontograma online",
    "anamnese odontológica digital",
    "plano de tratamento odontológico",
    "orçamento odontológico",
    // Diferencial financeiro
    "lucro real por procedimento dentista",
    "gestão financeira para dentista",
    "dashboard financeiro odontológico",
    "financeiro dentista",
    // Comparação / alternativa
    "software odontológico barato",
    "alternativa clinicorp",
    "alternativa dental office",
    // Genérico mas relevante
    "software odontológico brasil",
    "app para dentista",
    "vyllo",
  ],
  openGraph: {
    title: "Vyllo — O software do dentista que quer atender, não administrar",
    description:
      "Agenda com WhatsApp automático (200/mês incluso), prontuário com odontograma multifaces e o único sistema com lucro real por procedimento. Para quem trabalha sozinho. R$ 79,90/mês. Trial de 15 dias grátis, sem cartão.",
    type: "website",
    locale: "pt_BR",
    siteName: "Vyllo",
    url: "https://vyllo.com.br",
  },
  twitter: {
    card: "summary_large_image",
    title: "Vyllo — Software para Dentista Autônomo",
    description:
      "Agenda com WhatsApp automático (200/mês incluso), prontuário com odontograma e o único com lucro real por procedimento. 15 dias grátis, sem cartão.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
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
