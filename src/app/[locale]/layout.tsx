import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter } from "next/font/google";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";

import Footer from "@/components/Footer";
import { FixedLocaleSwitcher } from "@/components/FixedLocaleSwitcher";
import Navbar from "@/components/Navbar";
import { CustomCursor } from "@/components/CustomCursor";
import FloatingChatbot from "@/components/chatbot/FloatingChatbot";
import { routing } from "@/i18n/routing";
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

  return {
    title: {
      default: t("siteName"),
      template: `%s · ${t("siteName")}`,
    },
    description: t("siteDescription"),
  };
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);
  const messages = await getMessages();

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
        <NextIntlClientProvider messages={messages}>
          <CustomCursor />
          <FixedLocaleSwitcher />
          <Navbar />
          <div className="flex min-h-0 flex-1 flex-col">{children}</div>
          <Footer />
          <FloatingChatbot />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
