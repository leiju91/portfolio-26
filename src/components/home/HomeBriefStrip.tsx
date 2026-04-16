"use client";

import { motion } from "framer-motion";
import { Briefcase, MapPin, Monitor, Sparkles } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import type { ReactElement } from "react";
import { useEffect, useMemo, useState } from "react";
import { useLocale, useTranslations } from "next-intl";

import { cn } from "@/lib/utils";

import type { HomeMotionReadyProps } from "./types";

const easeOut = [0.22, 1, 0.36, 1] as const;

const iconClassSm =
  "size-[1.125rem] shrink-0 sm:size-5 sm:min-h-5 sm:min-w-5";

type BriefLine = {
  Icon: LucideIcon;
  iconColor: string;
  messageKey: "brief1" | "brief2" | "brief3" | "brief4";
};

const briefLines: BriefLine[] = [
  {
    Icon: Briefcase,
    iconColor: "text-emerald-400/85",
    messageKey: "brief1",
  },
  {
    Icon: MapPin,
    iconColor: "text-sky-400/85",
    messageKey: "brief2",
  },
  {
    Icon: Monitor,
    iconColor: "text-violet-400/85",
    messageKey: "brief3",
  },
  {
    Icon: Sparkles,
    iconColor: "text-amber-300/85",
    messageKey: "brief4",
  },
];

const MINUTE_IN_MS = 60_000;
const DAY_IN_MS = 86_400_000;

type DurationParts = {
  months: number;
  days: number;
  hours: number;
  minutes: number;
};

function parseAvailabilityDate(rawDate: string | undefined): Date | null {
  if (!rawDate) {
    return null;
  }

  const trimmed = rawDate.trim();
  if (!trimmed) {
    return null;
  }

  const parsed = new Date(trimmed);
  if (Number.isNaN(parsed.getTime())) {
    return null;
  }

  return parsed;
}

function getDurationParts(from: Date, to: Date): DurationParts {
  if (to.getTime() <= from.getTime()) {
    return { months: 0, days: 0, hours: 0, minutes: 0 };
  }

  const cursor = new Date(from);
  let months = 0;

  while (true) {
    const nextMonth = new Date(cursor);
    nextMonth.setMonth(nextMonth.getMonth() + 1);
    if (nextMonth.getTime() > to.getTime()) {
      break;
    }
    cursor.setMonth(cursor.getMonth() + 1);
    months += 1;
  }

  const remainingMs = to.getTime() - cursor.getTime();
  const days = Math.floor(remainingMs / DAY_IN_MS);
  const afterDaysMs = remainingMs - days * DAY_IN_MS;
  const hours = Math.floor(afterDaysMs / 3_600_000);
  const afterHoursMs = afterDaysMs - hours * 3_600_000;
  const minutes = Math.floor(afterHoursMs / MINUTE_IN_MS);

  return { months, days, hours, minutes };
}

function formatDuration(locale: string, parts: DurationParts, joinWord: string): string {
  const formatUnit = (value: number, unit: "month" | "day" | "hour" | "minute") =>
    new Intl.NumberFormat(locale, {
      style: "unit",
      unit,
      unitDisplay: "long",
    }).format(value);

  const chunks: string[] = [];

  if (parts.months > 0) {
    chunks.push(formatUnit(parts.months, "month"));
  }
  if (parts.days > 0) {
    chunks.push(formatUnit(parts.days, "day"));
  }
  if (parts.hours > 0) {
    chunks.push(formatUnit(parts.hours, "hour"));
  }
  if (parts.minutes > 0) {
    chunks.push(formatUnit(parts.minutes, "minute"));
  }

  const compact = chunks.slice(0, 2);
  if (compact.length === 0) {
    return formatUnit(0, "minute");
  }
  if (compact.length === 1) {
    return compact[0];
  }

  return `${compact[0]} ${joinWord} ${compact[1]}`;
}

export function HomeBriefStrip({
  hydrated,
}: HomeMotionReadyProps): ReactElement {
  const t = useTranslations("home");
  const locale = useLocale();
  const [now, setNow] = useState(() => new Date());
  const availableFrom = useMemo(
    () => parseAvailabilityDate(process.env.NEXT_PUBLIC_AVAILABLE_FROM),
    []
  );

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      setNow(new Date());
    }, MINUTE_IN_MS);

    return () => window.clearInterval(intervalId);
  }, []);

  const availabilityText = useMemo(() => {
    if (!availableFrom) {
      return t("brief4");
    }

    if (availableFrom.getTime() <= now.getTime()) {
      return t("brief4OnDate");
    }

    const duration = getDurationParts(now, availableFrom);
    const countdown = formatDuration(locale, duration, t("countdownJoin"));
    return t("brief4In", { countdown });
  }, [availableFrom, locale, now, t]);

  return (
    <motion.section
      className="mt-10 flex w-full min-w-0 flex-col items-center sm:mt-32"
      initial={{ opacity: 0, y: 16 }}
      animate={hydrated ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
      transition={{ duration: 0.45, delay: 0.3, ease: easeOut }}
      aria-label={t("briefAria")}
    >
      <div className="w-full max-w-sm sm:hidden">
        <p className="mb-3 text-center text-[0.62rem] font-medium uppercase tracking-wider text-white/35">
          {t("briefHeading")}
        </p>
        <ul className="flex flex-col gap-3 text-[0.7rem] leading-snug text-white/60">
          {briefLines.map(({ Icon, iconColor, messageKey }) => (
            <li key={messageKey} className="flex items-start gap-2.5">
              <Icon
                className={cn("mt-0.5 size-4 shrink-0", iconColor)}
                aria-hidden
              />
              <span>{messageKey === "brief4" ? availabilityText : t(messageKey)}</span>
            </li>
          ))}
        </ul>
      </div>

      <div
        className="-mx-1 hidden w-full max-w-full overflow-x-auto overscroll-x-contain pb-1 [scrollbar-width:thin] sm:block [&::-webkit-scrollbar]:h-1 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-white/15"
      >
        <div className="inline-flex min-w-max flex-nowrap items-center gap-x-1.5 px-1 text-[0.62rem] leading-none text-white/55 sm:gap-x-2.5 sm:text-[0.7rem]">
          <span className="shrink-0 font-medium uppercase tracking-wider text-white/35">
            {t("briefHeading")}
          </span>
          <span className="shrink-0 text-white/20" aria-hidden>
            ·
          </span>
          {briefLines.map(({ Icon, iconColor, messageKey }, i) => (
            <span key={messageKey} className="contents">
              <span className="flex shrink-0 items-center gap-1.5">
                <Icon
                  className={cn(iconClassSm, iconColor)}
                  aria-hidden
                />
                <span className="whitespace-nowrap">
                  {messageKey === "brief4" ? availabilityText : t(messageKey)}
                </span>
              </span>
              {i < briefLines.length - 1 ? (
                <span className="shrink-0 text-white/20" aria-hidden>
                  ·
                </span>
              ) : null}
            </span>
          ))}
        </div>
      </div>
    </motion.section>
  );
}
