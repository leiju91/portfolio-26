const FALLBACK_SITE_URL = "http://localhost:3000";

export const supportedLocales = ["fr", "en"] as const;
export type SupportedLocale = (typeof supportedLocales)[number];

export function getSiteUrl(): string {
  return (process.env.NEXT_PUBLIC_SITE_URL ?? FALLBACK_SITE_URL).replace(/\/$/, "");
}

export function localizedPath(locale: SupportedLocale, path = "/"): string {
  if (path === "/") return `/${locale}`;
  return `/${locale}${path.startsWith("/") ? path : `/${path}`}`;
}

export function localizedAlternates(path = "/"): Record<string, string> {
  return {
    fr: localizedPath("fr", path),
    en: localizedPath("en", path),
    "x-default": localizedPath("fr", path),
  };
}
