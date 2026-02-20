import type { MetadataRoute } from "next"

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
      },
      // Permitir crawlers de AI explicitamente (GEO — Generative Engine Optimization)
      { userAgent: "GPTBot", allow: "/" },           // ChatGPT / OpenAI
      { userAgent: "OAI-SearchBot", allow: "/" },    // OpenAI Search
      { userAgent: "PerplexityBot", allow: "/" },    // Perplexity
      { userAgent: "ClaudeBot", allow: "/" },        // Claude / Anthropic
      { userAgent: "anthropic-ai", allow: "/" },     // Anthropic
      { userAgent: "Google-Extended", allow: "/" },  // Google Gemini / AI Overviews
      { userAgent: "Applebot-Extended", allow: "/" },// Apple Intelligence
      { userAgent: "cohere-ai", allow: "/" },        // Cohere
      { userAgent: "Bytespider", allow: "/" },       // ByteDance / TikTok
    ],
    sitemap: "https://vyllo.com.br/sitemap.xml",
  }
}
