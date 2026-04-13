import type { MetadataRoute } from "next";

import { getSiteUrl, localizedPath, supportedLocales } from "@/lib/seo";

const SITE_PATHS = ["/", "/projects", "/skills"] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = getSiteUrl();
  const lastModified = new Date();

  return supportedLocales.flatMap((locale) =>
    SITE_PATHS.map((path) => ({
      url: `${siteUrl}${localizedPath(locale, path)}`,
      lastModified,
      changeFrequency: "weekly" as const,
      priority: path === "/" ? 1 : 0.8,
    }))
  );
}
