"use client";

import { useLocale, useTranslations } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { cn } from "@/lib/utils";

export function LocaleSwitcher({ className }: { className?: string }) {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const t = useTranslations("nav");

  return (
    <div
      className={cn("flex items-center rounded-full border border-white/10 bg-white/5 p-0.5", className)}
      role="group"
      aria-label={t("langSwitcher")}
    >
      {routing.locales.map((loc) => {
        const active = loc === locale;
        return (
          <button
            key={loc}
            type="button"
            onClick={() => router.replace(pathname, { locale: loc })}
            className={cn(
              "rounded-full px-2.5 py-1 text-[0.7rem] font-medium transition-colors sm:px-3 sm:text-xs",
              active
                ? "bg-white/15 text-white"
                : "text-white/50 hover:bg-white/8 hover:text-white/80"
            )}
            aria-pressed={active}
            lang={loc}
          >
            {loc === "fr" ? t("langFr") : t("langEn")}
          </button>
        );
      })}
    </div>
  );
}
