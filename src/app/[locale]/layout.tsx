import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter } from "next/font/google";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";

import Footer from "@/components/Footer";
import { FixedLocaleSwitcher } from "@/components/FixedLocaleSwitcher";
import { LocaleSwitcher } from "@/components/LocaleSwitcher";
import Navbar from "@/components/Navbar";
import { CustomCursor } from "@/components/CustomCursor";
import FloatingChatbot from "@/components/chatbot/FloatingChatbot";
import { routing } from "@/i18n/routing";
import { getSiteUrl, localizedAlternates, supportedLocales } from "@/lib/seo";
import { cn } from "@/lib/utils";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

type Props = Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>;

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata(props: Props): Promise<Metadata> {
  const { locale } = await props.params;
  const t = await getTranslations({ locale, namespace: "meta" });
  const ogLocale = locale === "fr" ? "fr_FR" : "en_US";
  const alternateLocales = supportedLocales
    .filter((item) => item !== locale)
    .map((item) => (item === "fr" ? "fr_FR" : "en_US"));

  return {
    metadataBase: new URL(getSiteUrl()),
    title: {
      default: t("siteName"),
      template: `%s · ${t("siteName")}`,
    },
    description: t("siteDescription"),
    alternates: {
      canonical: `/${locale}`,
      languages: localizedAlternates("/"),
    },
    openGraph: {
      type: "website",
      locale: ogLocale,
      alternateLocale: alternateLocales,
      siteName: t("siteName"),
      title: t("siteName"),
      description: t("siteDescription"),
      url: `/${locale}`,
      images: [{ url: "/avatar.webp" }],
    },
    twitter: {
      card: "summary_large_image",
      title: t("siteName"),
      description: t("siteDescription"),
      images: ["/avatar.webp"],
    },
  };
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);
  const messages = await getMessages();
  const tNav = await getTranslations({ locale, namespace: "nav" });

  return (
    <html
      lang={locale}
      suppressHydrationWarning
      className={cn(
        "dark h-full",
        "antialiased",
        geistSans.variable,
        geistMono.variable,
        "font-sans",
        inter.variable
      )}
    >
      <body
        className="flex min-h-full flex-col bg-background text-foreground"
        suppressHydrationWarning
      >
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-120 focus:rounded-md focus:bg-black focus:px-3 focus:py-2 focus:text-sm focus:font-medium focus:text-white"
        >
          {tNav("skipToContent")}
        </a>
        <NextIntlClientProvider messages={messages}>
          <CustomCursor />
          <FixedLocaleSwitcher />
          <Navbar />
          <div className="flex min-h-0 flex-1 flex-col">{children}</div>
          <div className="flex justify-center px-6 pb-6 sm:hidden">
            <LocaleSwitcher />
          </div>
          <Footer />
          <FloatingChatbot />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
