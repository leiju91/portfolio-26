"use client";

import { motion } from "framer-motion";
import { Terminal, Mail, Menu, X } from "lucide-react";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";

import { AvailabilityBadge } from "@/components/AvailabilityBadge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  GradientPillFrame,
  gradientPillInnerSurfaceClassName,
} from "@/components/ui/gradient-pill-frame";
import { Link, usePathname } from "@/i18n/navigation";
import { cn } from "@/lib/utils";
import { homeProfile } from "@/data/home-profile";

export default function Navbar() {
  const pathname = usePathname();
  const t = useTranslations("nav");
  const tHome = useTranslations("home");
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  useEffect(() => {
    const id = window.setTimeout(() => setMobileNavOpen(false), 0);
    return () => window.clearTimeout(id);
  }, [pathname]);

  useEffect(() => {
    if (!mobileNavOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileNavOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [mobileNavOpen]);
  const githubUrl = (process.env.NEXT_PUBLIC_GITHUB_URL ?? "").trim();
  const contactEmailPlain = (process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? "").trim();
  const mailB64 = (process.env.NEXT_PUBLIC_CONTACT_EMAIL_B64 ?? "").trim();

  const resolvedEmail = (() => {
    if (contactEmailPlain.includes("@")) return contactEmailPlain;
    if (!mailB64) return null;
    try {
      const email = atob(mailB64).trim();
      return email.includes("@") ? email : null;
    } catch {
      return null;
    }
  })();

  const handleEmailClick = () => {
    if (!resolvedEmail) return;
    window.location.href = `mailto:${resolvedEmail}`;
  };

  const profileInitials =
    homeProfile.name
      .split(/\s+/)
      .filter(Boolean)
      .map((w) => w[0]?.toUpperCase() ?? "")
      .join("")
      .slice(0, 2) || "?";

  const photoAlt = tHome("profilePhotoAlt", { name: homeProfile.name });

  return (
    <motion.nav
      initial={{ y: -10, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      className="fixed top-6 left-1/2 z-50 w-[calc(100%-1.5rem)] max-w-3xl -translate-x-1/2"
      aria-label={t("ariaMain")}
    >
      <div className="relative w-full">
        <GradientPillFrame>
          <div
            className={cn(
              gradientPillInnerSurfaceClassName,
              "flex items-center justify-between gap-2 px-3 py-2 sm:gap-4 sm:px-4"
            )}
          >
            <div className="flex min-w-0 items-center gap-3">
              <Avatar
                size="lg"
                className="border border-white/15 bg-linear-to-br from-muted to-background"
              >
                {homeProfile.avatarSrc ? (
                  <AvatarImage
                    src={homeProfile.avatarSrc}
                    alt={photoAlt}
                  />
                ) : null}
                <AvatarFallback className="grid place-items-center text-xs font-semibold text-white/90">
                  {profileInitials}
                </AvatarFallback>
              </Avatar>

              <AvailabilityBadge available={homeProfile.openToWork} />
            </div>

            <div className="hidden items-center gap-1 sm:flex">
              <Button
                asChild
                variant="ghost"
                className="h-9 rounded-full px-4 text-white/80 hover:bg-white/10 hover:text-white"
              >
                <Link
                  href="/"
                  aria-current={pathname === "/" ? "page" : undefined}
                >
                  {t("home")}
                </Link>
              </Button>
              <Button
                asChild
                variant="ghost"
                className="h-9 rounded-full px-4 text-white/80 hover:bg-white/10 hover:text-white"
              >
                <Link
                  href="/projects"
                  aria-current={
                    pathname === "/projects" ? "page" : undefined
                  }
                >
                  {t("projects")}
                </Link>
              </Button>
              <Button
                asChild
                variant="ghost"
                className="h-9 rounded-full px-4 text-white/80 hover:bg-white/10 hover:text-white"
              >
                <Link
                  href="/skills"
                  aria-current={pathname === "/skills" ? "page" : undefined}
                >
                  {t("skills")}
                </Link>
              </Button>
            </div>

            <div className="flex items-center gap-1 sm:gap-2">
              <Button
                type="button"
                variant="outline"
                size="icon"
                className="h-9 w-9 shrink-0 rounded-full border-white/10 bg-transparent hover:bg-white/10 sm:hidden"
                aria-expanded={mobileNavOpen}
                aria-controls="nav-mobile-links"
                aria-label={mobileNavOpen ? t("closeMenu") : t("openMenu")}
                onClick={() => setMobileNavOpen((open) => !open)}
              >
                {mobileNavOpen ? (
                  <X size={18} className="text-white/90" aria-hidden />
                ) : (
                  <Menu size={18} className="text-white/90" aria-hidden />
                )}
              </Button>
              {githubUrl ? (
                <Button
                  asChild
                  variant="outline"
                  size="icon"
                  className="h-9 w-9 rounded-full border-white/10 bg-transparent hover:bg-white/10"
                >
                  <a
                    href={githubUrl}
                    target="_blank"
                    rel="noreferrer noopener"
                    aria-label={t("github")}
                  >
                    <Terminal size={18} className="text-white/90" />
                  </a>
                </Button>
              ) : (
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  disabled
                  title={t("githubEnvHint")}
                  aria-label={t("githubDisabled")}
                  className="h-9 w-9 rounded-full border-white/10 bg-transparent opacity-50"
                >
                  <Terminal size={18} className="text-white/90" />
                </Button>
              )}
              <Button
                variant="outline"
                size="icon"
                aria-label={t("email")}
                disabled={!resolvedEmail}
                title={
                  resolvedEmail ? undefined : t("emailEnvHint")
                }
                className="h-9 w-9 rounded-full border-white/10 bg-transparent hover:bg-white/10 disabled:opacity-50"
                onClick={handleEmailClick}
              >
                <Mail size={18} className="text-white/90" />
              </Button>
            </div>
          </div>
        </GradientPillFrame>

        {mobileNavOpen ? (
          <>
            <button
              type="button"
              className="fixed inset-0 z-40 bg-black/45 sm:hidden"
              aria-label={t("closeMenu")}
              onClick={() => setMobileNavOpen(false)}
            />
            <div
              id="nav-mobile-links"
              className="absolute right-0 top-[calc(100%+0.5rem)] z-50 flex w-[min(17rem,calc(100vw-2rem))] flex-col gap-0.5 rounded-2xl border border-white/10 bg-background/96 p-2 shadow-xl backdrop-blur-xl sm:hidden"
              role="menu"
            >
            <Button
              asChild
              variant="ghost"
              className={cn(
                "h-11 w-full justify-start rounded-xl px-4 text-white/80 hover:bg-white/10 hover:text-white",
                pathname === "/" && "bg-white/10 text-white"
              )}
            >
              <Link
                href="/"
                aria-current={pathname === "/" ? "page" : undefined}
                role="menuitem"
              >
                {t("home")}
              </Link>
            </Button>
            <Button
              asChild
              variant="ghost"
              className={cn(
                "h-11 w-full justify-start rounded-xl px-4 text-white/80 hover:bg-white/10 hover:text-white",
                pathname === "/projects" && "bg-white/10 text-white"
              )}
            >
              <Link
                href="/projects"
                aria-current={pathname === "/projects" ? "page" : undefined}
                role="menuitem"
              >
                {t("projects")}
              </Link>
            </Button>
            <Button
              asChild
              variant="ghost"
              className={cn(
                "h-11 w-full justify-start rounded-xl px-4 text-white/80 hover:bg-white/10 hover:text-white",
                pathname === "/skills" && "bg-white/10 text-white"
              )}
            >
              <Link
                href="/skills"
                aria-current={pathname === "/skills" ? "page" : undefined}
                role="menuitem"
              >
                {t("skills")}
              </Link>
            </Button>
            </div>
          </>
        ) : null}
      </div>
    </motion.nav>
  );
}
