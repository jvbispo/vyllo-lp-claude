import { Navbar } from "@/components/navbar"
import { Hero } from "@/components/hero"
import { Workflow } from "@/components/workflow"
import { Features } from "@/components/features"
import { Testimonials } from "@/components/testimonials"
import { Comparison } from "@/components/comparison"
import { Pricing } from "@/components/pricing"
import { Faq } from "@/components/faq"
import { Cta } from "@/components/cta"
import { Footer } from "@/components/footer"

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Vyllo",
  applicationCategory: "BusinessApplication",
  operatingSystem: "Web",
  description:
    "Software de gestao para dentistas. Agenda, prontuario e financeiro no seu bolso. Leve seus pacientes e dados para qualquer consultorio.",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "BRL",
    description: "14 dias gratis, sem cartao de credito",
  },
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "5",
    ratingCount: "3",
  },
}

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Navbar />
      <main>
        <Hero />
        <Workflow />
        <Features />
        <Testimonials />
        <Comparison />
        <Pricing />
        <Faq />
        <Cta />
      </main>
      <Footer />
    </>
  )
}
