"use client";

import { useTranslations } from "next-intl";
import { FooterSpotifyPopover } from "@/components/FooterSpotifyPopover";
import { FooterYear } from "@/components/FooterYear";
import { Link } from "@/i18n/navigation";
import { homeProfile } from "@/data/home-profile";

const footerLinkClass =
  "text-sm text-white/55 transition-colors hover:text-white/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/25 focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded-sm";

export default function Footer() {
  const t = useTranslations("footer");
  const tNav = useTranslations("nav");

  return (
    <footer
      className="mt-auto border-t border-white/10 bg-background/80 px-6 py-8 backdrop-blur-sm"
      aria-label={t("aria")}
    >
      <div className="mx-auto grid w-full max-w-5xl grid-cols-1 items-center gap-6 sm:grid-cols-[minmax(0,auto)_1fr_minmax(0,auto)] sm:gap-6">
        <nav
          className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 sm:justify-self-start"
          aria-label={t("navAria")}
        >
          <Link href="/" className={footerLinkClass}>
            {tNav("home")}
          </Link>
          <Link href="/projects" className={footerLinkClass}>
            {tNav("projects")}
          </Link>
          <Link href="/skills" className={footerLinkClass}>
            {tNav("skills")}
          </Link>
        </nav>

        <p className="justify-self-center text-center text-sm text-white/45 sm:px-4">
          <span className="whitespace-nowrap">
            © <FooterYear /> {homeProfile.name}
          </span>
          <span className="mx-1.5 text-white/25" aria-hidden>
            ·
          </span>
          <span className="text-white/35">{t("builtWith")}</span>
        </p>

        <div className="flex justify-center sm:justify-self-end sm:border-l sm:border-white/10 sm:pl-6">
          <FooterSpotifyPopover />
        </div>
      </div>
    </footer>
  );
}
