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

export default function Home() {
  return (
    <>
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
