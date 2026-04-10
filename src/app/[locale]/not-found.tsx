import { getLocale, getTranslations, setRequestLocale } from "next-intl/server";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { GradientPillFrame } from "@/components/ui/gradient-pill-frame";
import { Link } from "@/i18n/navigation";

const OTTER_IMAGE = "/Loutre_mignonne_avec_un_saumon.png";

export default async function NotFound() {
  const locale = await getLocale();
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "notFound" });

  return (
    <main id="not-found" className="flex flex-1 flex-col px-6 pb-10 pt-28">
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
            <Link href="/">{t("home")}</Link>
          </Button>
        </GradientPillFrame>
      </div>
    </main>
  );
}
