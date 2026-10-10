# Hebamme Pauline – Website

Zweisprachige (Deutsch/Englisch), statische Website für die Hebamme Pauline Salva
(Betreuungsgebiet rund um Meuselwitz). Fokus: schlank, barrierearm und datensparsam.

**Live:** https://zerkruemler03.github.io/hebamme_pauline/

## Tech-Stack

- **[Astro](https://astro.build)** – statischer Seitengenerator
- **[Tailwind CSS v4](https://tailwindcss.com)** – Styling über ein warmes OKLCH-Design-System
- **[Svelte 5](https://svelte.dev)** – nur für interaktive Inseln (Theme-Umschalter, Bild-Slider)
- **TypeScript** – durchgängig typisiert
- **[Fontsource](https://fontsource.org)** – Schriften lokal gehostet (Fraunces & Nunito), keine externen Font-Requests
- **pnpm** – Paketmanager

## Features

- **Zweisprachig (DE/EN):** Deutsch ist Standard (ohne URL-Präfix), Englisch unter `/en/`.
  Automatische Weiterleitung nach Browsersprache, zusätzlich manueller Umschalter.
- **Dark/Light-Mode:** Umschalter mit Cookie + localStorage, FOUC-frei (kein Flackern beim Laden).
- **Responsiv:** von Smartphone bis großem Monitor, mit mobilem Menü.
- **Bild-Slider:** automatischer Wechsel alle 5 s, Pfeile und Punkt-Navigation
  (respektiert `prefers-reduced-motion`).
- **Datenschutz (click-to-load):** Social-/Maps-Verlinkungen sind reine Links – es werden
  erst beim Klick Daten an Meta bzw. Google übertragen, keine automatisch ladenden Einbettungen.
- **Seiten:** Startseite, Wissenswertes, Impressum, Datenschutzerklärung (je DE + EN) sowie 404.

## Projektstruktur

```
src/
├── assets/            Logo, Betreuungsgebiet-Karte, Slider-Bilder
│   └── slides/        Platzhalter-SVGs – durch echte Fotos ersetzen
├── components/        Astro- & Svelte-Komponenten (Navbar, Footer, Slider, Icon …)
├── data/
│   └── site.ts        Zentrale Kontaktdaten & externe Links
├── i18n/
│   ├── de.ts          Deutsche Texte (Referenz für alle Keys)
│   ├── en.ts          Englische Texte
│   └── utils.ts       i18n-Helfer (base-aware für GitHub Pages)
├── layouts/
│   └── BaseLayout.astro
├── pages/             Routen (DE auf Top-Ebene, EN unter en/)
└── styles/
    └── global.css     Design-System (OKLCH-Tokens, Dark Mode)
```

## Entwicklung

```sh
pnpm install        # Abhängigkeiten installieren
pnpm dev            # Dev-Server auf http://localhost:4321
pnpm check          # astro check – TypeScript/Astro-Diagnostik (muss 0 Fehler zeigen)
pnpm build          # Produktions-Build nach dist/
pnpm preview        # gebaute Seite lokal ansehen
```

> `pnpm` wird über das `packageManager`-Feld in der `package.json` festgelegt.
> Build-Scripts nativer Pakete (`sharp`) sind über `pnpm.onlyBuiltDependencies` freigegeben.

## Deployment

Automatisch via GitHub Actions (`.github/workflows/deploy.yml`) bei jedem Push auf `master`:
Build → Artefakt → GitHub Pages.

- Deployment als **Projekt-Seite**, daher setzt `astro.config.mjs` `base: '/hebamme_pauline'`.
- Jeder interne Pfad berücksichtigt diesen `base` (über `localePath()` bzw. `import.meta.env.BASE_URL`).
- `public/.nojekyll` verhindert, dass Pages den `_astro`-Ordner ignoriert.
