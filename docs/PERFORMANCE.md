# Performance — Landing Vyllo

## Análise rápida

- **Framework**: Next.js 16 (App Router), página estática (`/` pré-renderizada).
- **Fontes**: `next/font` (Inter) com `display: "swap"` — evita FOIT e melhora LCP.
- **Imagens**: Uso de `next/image` em Hero, Navbar, Footer, Comparison, Testimonials — otimização e formatos modernos.
- **Hidratação**: `suppressHydrationWarning` em `<html>` e `<body>` para evitar avisos causados por extensões (ex.: `cz-shortcut-listen`).

## O que foi feito

### Code splitting (below-the-fold)

As seções **abaixo da dobra** (Workflow, Features, Testimonials, Comparison, ForYou, Pricing, Faq, Cta, Footer) passaram a ser carregadas com `next/dynamic` em [src/app/page.tsx](src/app/page.tsx). O HTML continua sendo gerado no servidor (`ssr: true`), mas o JavaScript desses componentes vai em chunks separados e é baixado depois do crítico. Isso reduz o tamanho do bundle inicial e pode melhorar TTI e FCP.

- **Mantidos no bundle inicial**: Navbar, Hero (acima da dobra).
- **Chunks separados**: demais seções.

## GEO (Generated Engine Optimization)

Estrutura pensada para melhorar rank em buscadores e em respostas de IA (GEO):

- **Metadata** ([src/app/layout.tsx](src/app/layout.tsx)): Título e descrição claros com produto, público (dentistas autônomos), benefícios principais e preço/trial. Keywords incluem termos de busca relevantes.
- **JSON-LD** ([src/app/page.tsx](src/app/page.tsx)):
  - **Organization**: nome, URL, descrição da Vyllo.
  - **SoftwareApplication**: nome, categoria, descrição detalhada (agenda, prontuário, financeiro, WhatsApp, odontograma), oferta (R$ 79,90/mês, 15 dias grátis, 200 confirmações WhatsApp), `aggregateRating`.
  - **FAQPage**: perguntas e respostas do FAQ (mesmo conteúdo do componente), em [src/data/faq.ts](src/data/faq.ts), usadas no componente e no schema para evitar duplicação.

Assim, crawlers e modelos de IA conseguem extrair de forma estruturada: o que é o produto, para quem é, quanto custa, trial e avaliações.

## Recomendações opcionais

1. **Métricas**: Rodar Lighthouse (Performance, LCP, FID, CLS) em produção ou em build estático para validar números.
2. **Imagens em /public**: Garantir que fotos (ex.: depoimentos) tenham tamanho adequado; `next/image` já faz resize, mas originais muito grandes aumentam tempo de build.

## Resumo

A página está configurada de forma performática (estática, fontes, imagens, code splitting) e com GEO em mente: metadata rica e schemas Organization, SoftwareApplication e FAQPage para melhor rank em buscadores e em respostas de IA.
