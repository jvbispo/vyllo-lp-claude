/**
 * Analytics helpers — Google Analytics 4 + Meta Pixel
 * Eventos da landing page Vyllo.
 */

declare global {
  interface Window {
    gtag: (...args: unknown[]) => void
    fbq: (...args: unknown[]) => void
  }
}

function gtag(event: string, params?: Record<string, string | number>) {
  if (typeof window !== "undefined" && typeof window.gtag === "function") {
    window.gtag("event", event, params)
  }
}

function fbq(event: string, params?: Record<string, unknown>) {
  if (typeof window !== "undefined" && typeof window.fbq === "function") {
    window.fbq("track", event, params)
  }
}

export const analytics = {
  /**
   * Clicou em "Testar grátis" — principal conversão da LP.
   * source: onde o botão estava (hero, navbar, pricing, features)
   */
  trialCTAClicked(source: "hero" | "navbar" | "pricing" | "features") {
    gtag("trial_cta_clicked", { source })
    // Meta: Lead = intenção de se cadastrar
    fbq("Lead", { content_name: "trial_cta", source })
  },

  /**
   * Clicou em "Ir para calculadora" vindo da LP.
   */
  calculatorCTAClicked(source: "hero" | "navbar") {
    gtag("calculator_cta_clicked", { source })
  },

  /**
   * Clicou em "Login" / "Entrar".
   */
  loginClicked() {
    gtag("login_clicked")
  },
}
