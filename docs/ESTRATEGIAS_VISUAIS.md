# Vyllo Landing Page — Estrategias Visuais

Referencia completa das tecnicas visuais usadas na landing page do Vyllo. Este documento serve como guia para futuros projetos e manutencao.

## Stack

- **Next.js 16** (App Router, static generation)
- **React 19** + **Tailwind CSS 4** (`@theme inline`)
- **Framer Motion 12** (animacoes)
- **Lucide React** (icones)
- **Inter** (tipografia)

## Cores

| Token | Valor | Uso |
|-------|-------|-----|
| `--color-vyllo` | `#0066ff` | Cor primaria, CTAs, accents |
| `--color-vyllo-light` | `#e8f1ff` | Backgrounds sutis |
| `#8b5cf6` | Violet | Gradientes secundarios |
| `#10b981` | Emerald | Status positivo, sucesso |
| `#f59e0b` | Amber | Alertas, destaques |
| `#0a1628` | Dark blue | Background de secoes escuras |

## Ritmo Visual — Alternancia de Secoes

A LP alterna entre secoes claras e escuras para criar ritmo visual e manter o engajamento:

```
Hero        — Claro (bg-fafafa + gradientes mesh)
Features    — Claro (bg-fafafa)
Workflow    — ESCURO (bg-[#0a1628])
Comparison  — Claro (bg-white)
Testimonials— ESCURO (bg-[#0a1628])
Pricing     — Claro (bg-white)
FAQ         — Claro (bg-fafafa)
CTA         — ESCURO (bg-[#0a0f1a])
Footer      — Claro
```

## Tecnicas por Categoria

### 1. Grid Lines (Backgrounds Sutis)

Tres variantes criadas via CSS `linear-gradient`:

```css
/* Light — para secoes claras */
.grid-lines-light {
  background-image:
    linear-gradient(rgba(0,0,0,0.03) 1px, transparent 1px),
    linear-gradient(90deg, rgba(0,0,0,0.03) 1px, transparent 1px);
  background-size: 48px 48px;
}

/* Dark — para secoes escuras */
.grid-lines-dark { /* rgba(255,255,255,0.04) */ }

/* Accent — azul tinted para secoes escuras */
.grid-accent { /* rgba(0,102,255,0.06) */ }
```

**Sempre com mask radial** para fade nas bordas:
```css
mask-image: radial-gradient(ellipse 60% 60% at 50% 50%, #000 20%, transparent 75%);
```

### 2. Mesh Gradients (Blobs Atmosfericos)

Circulos grandes com `blur-3xl` para efeito atmosferico:

```html
<div class="absolute h-[700px] w-[700px] rounded-full
  bg-[radial-gradient(circle,rgba(0,102,255,0.18)_0%,transparent_55%)]
  blur-3xl" />
```

- Hero: 3 blobs (azul, violeta, esmeralda)
- Secoes escuras: 2 blobs posicionados em cantos opostos
- Opacidade baixa (0.08-0.18) para subtileza

### 3. Glassmorphism (Secoes Escuras)

Cards em secoes escuras usam:
```
border-white/10 bg-white/5 backdrop-blur-sm
hover:border-white/15 hover:bg-white/[0.07]
```

Texto: `text-white`, `text-white/50`, `text-white/30`, `text-white/70`

### 4. Gradient Dividers

Separadores sutis entre secoes:
```html
<div class="h-px bg-gradient-to-r from-transparent via-vyllo/20 to-transparent" />
```

### 5. Accent Lines

Linhas de destaque no topo de cards:
```html
<div class="absolute top-0 left-0 right-0 h-px
  bg-gradient-to-r from-transparent via-vyllo/30 to-transparent" />
```

### 6. Scan Lines

Overlay sutil em secoes escuras:
```css
.scan-lines {
  background-image: repeating-linear-gradient(
    0deg, transparent, transparent 3px,
    rgba(255,255,255,0.015) 3px, rgba(255,255,255,0.015) 4px
  );
}
```

## Animacoes

### Framer Motion — Patterns Usados

| Pattern | Onde | Descricao |
|---------|------|-----------|
| `useInView` + `once: true` | Features, Pricing | Anima 1x ao entrar na viewport |
| `useInView` sem `once` | Workflow | Reanima toda vez que entra/sai |
| `AnimatePresence mode="wait"` | Hero tabs, Pricing tabs | Transicao suave entre views |
| `layoutId` | Tabs (pricing, hero sidebar) | Tab indicator animado |
| `whileInView` | Reveal, RevealStagger | Utility components |
| `useScroll` + `useTransform` | Hero 3D perspective | Rotacao 3D baseada em scroll |
| `pathLength` | Prontuario (tooth SVG) | Desenho progressivo de SVG |
| Infinite `repeat` | Feature visuals | Pulsos, sway, drift |

### Easing Global

```ts
const ease = [0.21, 0.47, 0.32, 0.98] as const
```
Cubic bezier suave, usado em todas as animacoes.

### Utility Components (motion.tsx)

- **`Reveal`** — Fade + slide up ao entrar na viewport
- **`RevealStagger`** — Container com stagger entre filhos
- **`RevealItem`** — Item dentro de RevealStagger
- **`CountUp`** — Numero que conta de 0 ate alvo (spring)
- **`FloatingElement`** — Float infinito (y oscillation)

### Animacoes em Loop (Idle)

Usadas nos blocos de features para manter a secao "viva":

- **Agenda**: Pulsing ring no dia selecionado + time indicator que desliza
- **Prontuario**: Breathing glow atras do dente + dots pulsando na timeline
- **Financeiro**: Barras que oscilam em altura (sway)
- **WhatsApp**: Online dot pulse + status pulse

### Hero — Dashboard Interativo

Dashboard mockup com 3 views (Agenda, Financeiro, Prontuario):
- Auto-rotacao a cada 4.5s entre views
- Pausa no hover
- Sidebar com nav items clicaveis
- `AnimatePresence mode="wait"` para transicoes entre views
- Cada view tem animacoes de entrada escalonadas (stagger)
- 3D perspective sutil no scroll (`rotateX: 4deg`, `perspective: 2000px`)

### Hero — Beam Line

```css
@keyframes beam {
  0%, 100% { transform: translateX(-100%); }
  50% { transform: translateX(400%); }
}
```
Linha luminosa que percorre o topo da secao.

## Shadows

### Card Principal (Pricing, Dashboard)

```
shadow-[0_25px_50px_-12px_rgba(0,102,255,0.15),
         0_10px_20px_-5px_rgba(0,0,0,0.08)]
```

### CTA Buttons

```
shadow-lg shadow-vyllo/20
hover:shadow-xl hover:shadow-vyllo/25
```

### Gradient Border (Pricing Card)

```html
<div class="bg-gradient-to-b from-[#0066ff]/20 via-neutral-200/40 to-neutral-200/20 p-px">
  <div class="bg-white rounded-[calc(0.75rem-1px)]">
    <!-- content -->
  </div>
</div>
```

## Performance

### Estrategia de Performance

1. **Static Generation** — Toda a LP e pre-renderizada como HTML estatico
2. **Zero API calls** — Nenhuma requisicao ao backend
3. **GPU Animations** — Framer Motion usa `transform` e `opacity` (composited)
4. **Lazy Animations** — `useInView` dispara animacoes apenas quando visivel
5. **CSS-only backgrounds** — Grid lines, gradients, scan lines sao CSS puro
6. **Font: Inter** — `display: swap` para evitar FOIT
7. **SVG icons** — Lucide React tree-shakes, so importa icones usados
8. **No images** — Dashboard mockup e HTML/CSS, nao imagem

### Bundle

- **Framer Motion**: ~30kb gzip (unica lib de animacao)
- **Lucide**: Tree-shaked, apenas icones usados
- **Total First Load**: ~100-120kb gzip (estimado)

### Lighthouse Score Esperado

- Performance: 95+
- Accessibility: 90+
- Best Practices: 100
- SEO: 100

## Responsividade

- **Breakpoints**: `sm:` (640px), `md:` (768px), `lg:` (1024px)
- **Mobile-first**: Componentes projetados para mobile e adaptados para desktop
- **Dashboard interativo**: Sidebar hidden no mobile, tabs visivel em todas as telas
- **Workflow**: Layout vertical no mobile, horizontal no desktop com conectores
- **Pricing**: 1 coluna mobile, 2 colunas desktop (plan info | features list)
- **Features**: Cards empilhados no mobile, grid no desktop

## Tipografia

| Elemento | Mobile | Desktop |
|----------|--------|---------|
| H1 (Hero) | `text-4xl` | `md:text-6xl` |
| H2 (Sections) | `text-3xl` | `sm:text-4xl` |
| Body | `text-base` | `text-lg` |
| Captions | `text-xs` | `text-sm` |

Leading: `leading-[1.08]` em headings, `leading-relaxed` em body.
Tracking: `tracking-tight` em headings.

## SEO

- **Title**: "Vyllo — Software para Clinicas Odontologicas"
- **Meta description**: focada em beneficios + "14 dias gratis"
- **Keywords**: software odontologico, gestao de clinica, dentista, etc.
- **Open Graph**: title, description, type, locale, siteName
- **Twitter Card**: summary_large_image
- **Structured Data**: JSON-LD SoftwareApplication
- **Canonical URL**: https://vyllo.com.br
- **robots.txt** + **sitemap.xml** para indexacao
- **Semantic HTML**: `<section>`, `<nav>`, `<header>`, `<footer>`, `<figure>`, `<blockquote>`
- **Alt text**: logo com alt descritivo
- **lang**: `pt-BR`
