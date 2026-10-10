# Projektkontext für KI-Assistenten

Statische, zweisprachige (DE/EN) Website für eine Hebamme. Gebaut mit Astro, Tailwind v4,
Svelte 5 (nur für interaktive Inseln) und TypeScript. Fokus: schlank, barrierearm, datensparsam.

> Hinweis: `CLAUDE.md` ist ein Symlink auf diese Datei – es gibt nur eine Quelle der Wahrheit.

## Development

Dev-Server im Hintergrund starten:

```
astro dev --background
```

Verwalten mit `astro dev stop`, `astro dev status`, `astro dev logs`.

Vor Abschluss einer Änderung immer prüfen:

```
npm run check   # astro check (TypeScript/Astro-Diagnostik) – muss 0 Fehler zeigen
npm run build   # statischer Build nach dist/
```

## Architektur & Konventionen

### Stack-Hinweise
- **`@astrojs/svelte` muss zu Astro 7 passen** (v9.x). Version 7.2.x verlangt Astro 5 –
  nicht herabstufen. Peer-Dependencies vor dem Hinzufügen von Paketen prüfen.
- **Registry:** Projektlokale `.npmrc` nutzt die öffentliche npm-Registry
  (`registry.npmjs.org`) und `ignore-scripts=false` (sharp braucht Install-Scripts).
  Nicht entfernen – ein evtl. globales `~/.npmrc` kann auf einen anderen Mirror zeigen.
- **Fonts** lokal via Fontsource (`@fontsource-variable/*`), keine externen Google-Fonts-Requests
  (Datenschutz).

### Design-System
- Warme OKLCH-Palette in `src/styles/global.css` (Akzent Terrakotta, Sekundär Salbeigrün,
  Flächen Creme). Immer die CSS-Tokens (`var(--color-*)`) nutzen, keine hartcodierten Farben.
- Dark Mode über `.dark`-Klasse (Toggle setzt Cookie + localStorage). Das FOUC-freie
  Inline-Script im `BaseLayout` setzt `.dark` vor dem ersten Paint – nicht per
  `prefers-color-scheme` allein.
- Schriften: Überschriften `--font-serif` (Fraunces), Fließtext `--font-sans` (Nunito).
- Überschriften haben global `overflow-wrap/word-break/hyphens` – nötig für lange deutsche
  Komposita (z. B. „Schwangerschaftsbetreuung"), damit sie nicht aus Karten laufen.

### i18n
- Deutsch ist Default-Locale **ohne** URL-Prefix, Englisch unter `/en/`.
- Übersetzungen in `src/i18n/de.ts` (Referenz für alle Keys) und `src/i18n/en.ts`.
  Neue Keys **zuerst** in `de.ts`, dann `en.ts` – der Typ leitet sich von `de` ab.
- Pfade **immer** über `localePath()` / `switchLocalePath()` aus `src/i18n/utils.ts` bauen,
  nie hartcodiert. Diese Helfer sind **base-aware** (siehe unten).
- Seiteninhalte liegen in geteilten `*Content.astro`-Komponenten, die DE- und EN-Routen
  gemeinsam nutzen (keine Duplikate pro Sprache).

### GitHub Pages / base-Pfad (WICHTIG)
- Deployment als Projekt-Seite: Live unter `https://zerkruemler03.github.io/hebamme_pauline/`.
- `astro.config.mjs` setzt `site` + `base: '/hebamme_pauline'`.
- **Jeder absolute interne Pfad muss den `base` berücksichtigen.** `localePath()` tut das
  automatisch über `import.meta.env.BASE_URL`. Hartcodierte Pfade (Favicon, 404-Link,
  Inline-Redirect-Script) müssen `base` manuell voranstellen.
- **Bei späterer eigener Domain:** `base` entfernen und `site` auf die Domain setzen,
  zusätzlich `public/CNAME` anlegen.
- Deployment via `.github/workflows/deploy.yml` (Auto-Build bei Push auf `master`).
  `public/.nojekyll` verhindert, dass Pages den `_astro`-Ordner ignoriert.

### Datenschutz (nicht aufweichen)
- **Click-to-load:** Social-/Maps-Verlinkungen sind reine `<a>`-Links, keine eingebetteten
  iframes/Plugins. Daten gehen erst beim Klick an Meta/Google. Keine automatisch ladenden
  Einbettungen hinzufügen.
- Externe Links tragen `rel="noopener noreferrer"` und werden mit dem Pfeil-Icon
  (`<Icon name="arrow-up-right" />`) gekennzeichnet.
- Datenschutztext ist sachlich-juristisch gehalten (DSGVO-/GDPR-Artikel). Keine Datensammlung
  durch die Seite selbst – nur Server-Logs des Hosters.

### Komponenten-Hinweise
- Wiederverwendete SVGs in `src/components/Icon.astro` zentralisieren (nicht inline duplizieren).
  Neues Icon = Eintrag im `IconName`-Typ + `paths`-Objekt.
- Kontaktdaten/externe Links zentral in `src/data/site.ts`.

## Dokumentation

Astro-Doku: https://docs.astro.build

Vor verwandten Aufgaben konsultieren:
- [Routing / Seiten / Middleware](https://docs.astro.build/en/guides/routing/)
- [Astro-Komponenten](https://docs.astro.build/en/basics/astro-components/)
- [Framework-Komponenten (Svelte etc.)](https://docs.astro.build/en/guides/framework-components/)
- [Content Collections](https://docs.astro.build/en/guides/content-collections/)
- [Styling / Tailwind](https://docs.astro.build/en/guides/styling/)
- [Internationalisierung](https://docs.astro.build/en/guides/internationalization/)
