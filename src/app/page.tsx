import dynamic from "next/dynamic"
import { Navbar } from "@/components/navbar"
import { Hero } from "@/components/hero"
import { FAQS } from "@/data/faq"

const Workflow = dynamic(() => import("@/components/workflow").then((m) => ({ default: m.Workflow })), { ssr: true })
const Features = dynamic(() => import("@/components/features").then((m) => ({ default: m.Features })), { ssr: true })
const Testimonials = dynamic(() => import("@/components/testimonials").then((m) => ({ default: m.Testimonials })), { ssr: true })
const Comparison = dynamic(() => import("@/components/comparison").then((m) => ({ default: m.Comparison })), { ssr: true })
const ForYou = dynamic(() => import("@/components/for-you").then((m) => ({ default: m.ForYou })), { ssr: true })
const Pricing = dynamic(() => import("@/components/pricing").then((m) => ({ default: m.Pricing })), { ssr: true })
const Faq = dynamic(() => import("@/components/faq").then((m) => ({ default: m.Faq })), { ssr: true })
const Cta = dynamic(() => import("@/components/cta").then((m) => ({ default: m.Cta })), { ssr: true })
const Footer = dynamic(() => import("@/components/footer").then((m) => ({ default: m.Footer })), { ssr: true })

const schemaOrg = {
  organization: {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": "https://vyllo.com.br/#organization",
    name: "Vyllo",
    url: "https://vyllo.com.br",
    description:
      "Vyllo é uma empresa brasileira de software de gestão para dentistas autônomos. O sistema inclui agenda online, prontuário eletrônico com odontograma, confirmação automática de consultas via WhatsApp e dashboard financeiro com lucro real por procedimento.",
    areaServed: {
      "@type": "Country",
      name: "Brasil",
    },
    inLanguage: "pt-BR",
    knowsAbout: [
      "Software de gestão odontológica",
      "Prontuário eletrônico para dentistas",
      "Odontograma digital",
      "Confirmação automática de consultas via WhatsApp",
      "Gestão financeira para consultórios odontológicos",
      "Lucro real por procedimento odontológico",
      "Agenda online para dentistas autônomos",
    ],
  },
  software: {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "@id": "https://vyllo.com.br/#software",
    name: "Vyllo",
    alternateName: "Vyllo — Sistema de Gestão Odontológica para Dentistas Autônomos",
    applicationCategory: "BusinessApplication",
    applicationSubCategory: "Dental Practice Management Software",
    operatingSystem: "Web, Android, iOS",
    browserRequirements: "Requires JavaScript and HTML5",
    inLanguage: "pt-BR",
    url: "https://vyllo.com.br",
    description:
      "Vyllo é o software de gestão para dentistas autônomos no Brasil. Funcionalidades: agenda com visão semanal e diária, confirmação automática de consultas via WhatsApp (200 mensagens por mês inclusas no plano sem custo extra), prontuário eletrônico completo com odontograma multifaces e cores, plano de tratamento com sessões e prioridades, anamnese com modelos personalizáveis, orçamentos integrados ao prontuário, fotos antes e depois com slider visual, dashboard financeiro com receitas, despesas, parcelas e recorrentes, e o único cálculo de lucro real por procedimento do mercado — não apenas faturamento. Suporta múltiplos consultórios. Funciona no celular, tablet e computador. Plano único de R$ 79,90 por mês, trial de 15 dias grátis sem cartão de crédito, cancele quando quiser sem multa.",
    featureList: [
      "Agenda com visão semanal e diária",
      "Confirmação automática de consultas via WhatsApp",
      "200 mensagens WhatsApp por mês inclusas no plano",
      "Lembrete automático 24 horas antes da consulta",
      "Prontuário eletrônico completo",
      "Odontograma digital com multifaces e cores",
      "Plano de tratamento com sessões e prioridades",
      "Anamnese personalizável com modelos prontos",
      "Orçamentos integrados ao prontuário",
      "Fotos antes e depois com slider visual",
      "Timeline do histórico do paciente",
      "Dashboard financeiro com receitas e despesas",
      "Lucro real por procedimento (exclusivo no mercado)",
      "Relatórios exportáveis em PDF e planilha",
      "Suporte a múltiplos consultórios",
      "Bloqueio de horários e férias",
      "Trial de 15 dias grátis sem cartão de crédito",
    ],
    audience: {
      "@type": "Audience",
      audienceType: "Dentistas autônomos e consultórios odontológicos de pequeno porte no Brasil",
      geographicArea: {
        "@type": "Country",
        name: "Brasil",
      },
    },
    offers: {
      "@type": "Offer",
      price: "79.90",
      priceCurrency: "BRL",
      priceValidUntil: "2026-12-31",
      availability: "https://schema.org/InStock",
      description:
        "Plano único: R$ 79,90/mês. Inclui todos os módulos (agenda, prontuário, financeiro, WhatsApp), 200 confirmações automáticas via WhatsApp por mês, suporte a múltiplos consultórios, sem módulo extra, sem cobrança surpresa. Cancele quando quiser, sem multa, sem reunião de retenção. Trial de 15 dias grátis sem cartão de crédito.",
      seller: {
        "@type": "Organization",
        "@id": "https://vyllo.com.br/#organization",
        name: "Vyllo",
      },
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "5",
      ratingCount: "4",
      bestRating: "5",
      worstRating: "1",
    },
    review: [
      {
        "@type": "Review",
        reviewRating: { "@type": "Rating", ratingValue: "5", bestRating: "5" },
        author: { "@type": "Person", name: "Dra. Larissa Luduvice", jobTitle: "Periodontista" },
        reviewBody:
          "Vi na Vyllo algo que sentia falta no sistema que usava. Facilidade de uso e completude encantam. Alguns minutinhos no fim do dia e ganhei muito mais controle financeiro.",
      },
      {
        "@type": "Review",
        reviewRating: { "@type": "Rating", ratingValue: "5", bestRating: "5" },
        author: { "@type": "Person", name: "Dr. Luca Albuquerque", jobTitle: "Clínico-Geral" },
        reviewBody:
          "É você bater o olho e ver como está o consultório. Não dá erro, não tem fórmula, é um facilitador que cumpre muito mais do que promete.",
      },
      {
        "@type": "Review",
        reviewRating: { "@type": "Rating", ratingValue: "5", bestRating: "5" },
        author: { "@type": "Person", name: "Dra. Victoria Santana", jobTitle: "Cirurgiã-Dentista" },
        reviewBody:
          "O app facilitou muito o meu dia a dia. Gestão mais organizada, atendimento mais ágil e sobra mais tempo para focar nos pacientes.",
      },
      {
        "@type": "Review",
        reviewRating: { "@type": "Rating", ratingValue: "5", bestRating: "5" },
        author: { "@type": "Person", name: "Dr. Guilherme Tavares", jobTitle: "Endodontista" },
        reviewBody:
          "É incrível encontrar uma ferramenta que realmente atende às demandas do dia a dia de um consultório.",
      },
    ],
  },
  faq: {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQS.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
  },
  website: {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": "https://vyllo.com.br/#website",
    url: "https://vyllo.com.br",
    name: "Vyllo",
    description: "Software de gestão para dentistas autônomos no Brasil",
    inLanguage: "pt-BR",
    publisher: {
      "@id": "https://vyllo.com.br/#organization",
    },
  },
}

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaOrg.website) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaOrg.organization) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaOrg.software) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaOrg.faq) }}
      />
      <Navbar />
      <main>
        <Hero />
        <Workflow />
        <Features />
        <Testimonials />
        <Comparison />
        <ForYou />
        <Pricing />
        <Faq />
        <Cta />
      </main>
      <Footer />
    </>
  )
}
