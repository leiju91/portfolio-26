import "./globals.css";
import { Geist, Geist_Mono, Inter } from "next/font/google";
import { getLocale, getTranslations } from "next-intl/server";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { GradientPillFrame } from "@/components/ui/gradient-pill-frame";
import { cn } from "@/lib/utils";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });
const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});
const OTTER_IMAGE = "/Loutre_mignonne_avec_un_saumon.png";

export default async function GlobalNotFound() {
  const locale = await getLocale();
  const t = await getTranslations({ locale, namespace: "notFound" });
  const homeHref = `/${locale === "en" ? "en" : "fr"}`;

  return (
    <html
      lang={locale}
      suppressHydrationWarning
      className={cn(
        "dark h-full antialiased",
        geistSans.variable,
        geistMono.variable,
        "font-sans",
        inter.variable
      )}
    >
      <body
        suppressHydrationWarning
        className="flex min-h-full flex-col bg-background text-foreground"
      >
        <main
          id="not-found"
          className="flex flex-1 flex-col px-6 pb-10 pt-28"
          tabIndex={-1}
        >
          <div className="flex flex-1 flex-col items-center justify-center text-center">
            <p className="text-sm font-medium tracking-wide text-violet-400">
              {t("code")}
            </p>

            <div className="relative mt-6 shrink-0">
              <Avatar
                size="lg"
                className="border border-white/15 bg-linear-to-br from-muted to-background sm:data-[size=lg]:size-12"
              >
                <AvatarImage src={OTTER_IMAGE} alt={t("otterAlt")} />
                <AvatarFallback className="bg-linear-to-br from-muted to-background font-semibold text-white/90">
                  {t("code")}
                </AvatarFallback>
              </Avatar>
            </div>

            <h1 className="mt-6 text-xl font-bold tracking-tight text-white sm:text-2xl">
              {t("title")}
            </h1>
            <p className="mt-3 max-w-md text-sm text-white/70 sm:text-base">
              {t("body")}
            </p>

            <GradientPillFrame className="mt-8 w-fit">
              <Button asChild variant="navGlass" size="navPill">
                <a href={homeHref}>{t("home")}</a>
              </Button>
            </GradientPillFrame>
          </div>
        </main>
      </body>
    </html>
  );
}
