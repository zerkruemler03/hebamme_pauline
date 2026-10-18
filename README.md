# Hebamme Pauline – Website

Zweisprachige (Deutsch/Englisch), statische Website

**Live:** https://hebamme-pauline-salva.pages.dev/

## Tech-Stack

- **[Astro](https://astro.build)** – statischer Seitengenerator
- **[Tailwind CSS v4](https://tailwindcss.com)** – Styling über ein warmes OKLCH-Design-System
- **[Svelte 5](https://svelte.dev)** – nur für interaktive Inseln (Theme-Umschalter, Bild-Slider)
- **TypeScript** – durchgängig typisiert
- **[Fontsource](https://fontsource.org)** – Schriften lokal gehostet (Fraunces & Nunito), keine externen Font-Requests
- **pnpm** – Paketmanager
- **Cloudflare Pages** – Hosting (Auto-Deploy bei Push)

## Features

- Zweisprachig (DE/EN)
- Dark-/Light-Mode
- Responsiv mit mobilem Menü
- Bild-Slider (Autowechsel + Navigation)

## Projektstruktur

```
src/
├── assets/
│   ├── icons/
│   ├── slides/
│   ├── logo.png
│   └── karte.png
├── components/
├── data/
│   └── site.ts
├── i18n/
│   ├── de.ts
│   ├── en.ts
│   └── utils.ts
├── layouts/
│   └── BaseLayout.astro
├── pages/
└── styles/
    ├── global.css
    ├── components.css
    └── knowledge.css
```

### pnpm commands

```sh
pnpm install
pnpm dev           
pnpm check          
pnpm build         
pnpm preview        
```

## Deployment

Automatisch über **Cloudflare Pages** bei jedem Push auf `master`:
Cloudflare zieht den Code aus GitHub
