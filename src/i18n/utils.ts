import { de } from './de';
import { en } from './en';

export const defaultLocale = 'de' as const;
export const locales = ['de', 'en'] as const;
export type Locale = (typeof locales)[number];

const dictionaries = { de, en } as const;

/** Alle Uebersetzungsschluessel (abgeleitet vom deutschen Default-Dictionary). */
export type TranslationKey = keyof typeof de;

const localeSet = new Set<string>(locales);

/**
 * Base-Pfad, unter dem die Seite ausgeliefert wird (z. B. '/hebamme_pauline'
 * auf GitHub Pages, '' bei eigener Domain). Astro stellt ihn als
 * import.meta.env.BASE_URL bereit – inklusive fuehrendem UND abschliessendem '/'.
 * Wir normalisieren ihn auf einen Praefix OHNE abschliessenden Slash: '' oder '/base'.
 */
const BASE = import.meta.env.BASE_URL.replace(/\/$/, '');

/** Entfernt den Base-Praefix von einem Pfad, damit die Locale-Logik sauber greift. */
function stripBase(pathname: string): string {
  if (BASE && pathname.startsWith(BASE)) {
    const rest = pathname.slice(BASE.length);
    return rest === '' ? '/' : rest;
  }
  return pathname;
}

/**
 * Ermittelt die Locale aus dem URL-Pfad (base-tolerant).
 * `/en/...` -> 'en', alles andere -> 'de' (Default ohne Prefix).
 */
export function getLocaleFromPath(pathname: string): Locale {
  const segment = stripBase(pathname).split('/')[1];
  return localeSet.has(segment) ? (segment as Locale) : defaultLocale;
}

/**
 * Baut einen fertigen href INKLUSIVE Base-Praefix.
 * Default-Locale (de) ohne Locale-Prefix, en mit '/en'.
 * Beispiel (base '/hebamme_pauline'):
 *   localePath('/wissenswertes', 'de') -> '/hebamme_pauline/wissenswertes'
 *   localePath('/wissenswertes', 'en') -> '/hebamme_pauline/en/wissenswertes'
 */
export function localePath(path: string, locale: Locale): string {
  const clean = path.startsWith('/') ? path : `/${path}`;
  const localized =
    locale === defaultLocale
      ? clean
      : `/${locale}${clean === '/' ? '' : clean}`;
  // Base voranstellen; doppelte Slashes vermeiden.
  const withBase = `${BASE}${localized}`;
  return withBase === '' ? '/' : withBase;
}

/**
 * Gibt den aequivalenten href in der anderen Sprache zurueck (inkl. Base).
 */
export function switchLocalePath(pathname: string, newLocale: Locale): string {
  const stripped = stripBase(pathname);
  const currentLocale = getLocaleFromPath(pathname);
  let basePath = stripped;

  if (currentLocale !== defaultLocale) {
    const prefix = `/${currentLocale}`;
    basePath = stripped === prefix ? '/' : stripped.slice(prefix.length) || '/';
  }

  return localePath(basePath, newLocale);
}

/**
 * Liefert eine typsichere Uebersetzungsfunktion fuer die gegebene Locale.
 * Fehlende Schluessel fallen auf das deutsche Default-Dictionary zurueck.
 */
export function useTranslations(locale: Locale) {
  const dict = dictionaries[locale];
  return function t(key: TranslationKey): string {
    return (dict as Record<TranslationKey, string>)[key] ?? de[key];
  };
}
