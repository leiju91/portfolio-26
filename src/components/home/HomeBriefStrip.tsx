"use client";

import { motion } from "framer-motion";
import { Briefcase, MapPin, Monitor, Sparkles } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import type { ReactElement } from "react";

import { cn } from "@/lib/utils";

import type { HomeMotionReadyProps } from "./types";

const easeOut = [0.22, 1, 0.36, 1] as const;

const iconClassSm =
  "size-[1.125rem] shrink-0 sm:size-5 sm:min-h-5 sm:min-w-5";

type BriefLine = {
  Icon: LucideIcon;
  iconColor: string;
  text: string;
};

const briefLines: BriefLine[] = [
  {
    Icon: Briefcase,
    iconColor: "text-emerald-400/85",
    text: "Dev front / creative",
  },
  {
    Icon: MapPin,
    iconColor: "text-sky-400/85",
    text: "Moselle, France & Luxembourg · remote / hybrid",
  },
  {
    Icon: Monitor,
    iconColor: "text-violet-400/85",
    text: "Drupal, WP, React"
  },
  {
    Icon: Sparkles,
    iconColor: "text-amber-300/85",
    text: "Availability: TBD",
  },
];

export function HomeBriefStrip({
  hydrated,
}: HomeMotionReadyProps): ReactElement {
  return (
    <motion.section
      className="mt-24 flex w-full min-w-0 flex-col items-center sm:mt-32"
      initial={{ opacity: 0, y: 16 }}
      animate={hydrated ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
      transition={{ duration: 0.45, delay: 0.3, ease: easeOut }}
      aria-label="In brief"
    >
      {/* Mobile: stacked lines */}
      <div className="w-full max-w-sm sm:hidden">
        <p className="mb-3 text-center text-[0.62rem] font-medium uppercase tracking-wider text-white/35">
          In brief
        </p>
        <ul className="flex flex-col gap-3 text-[0.7rem] leading-snug text-white/60">
          {briefLines.map(({ Icon, iconColor, text }) => (
            <li key={text} className="flex items-start gap-2.5">
              <Icon
                className={cn("mt-0.5 size-4 shrink-0", iconColor)}
                aria-hidden
              />
              <span>{text}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* ≥ sm: horizontal scroll strip */}
      <div
        className="-mx-1 hidden w-full max-w-full overflow-x-auto overscroll-x-contain pb-1 [scrollbar-width:thin] sm:block [&::-webkit-scrollbar]:h-1 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-white/15"
      >
        <div className="inline-flex min-w-max flex-nowrap items-center gap-x-1.5 px-1 text-[0.62rem] leading-none text-white/55 sm:gap-x-2.5 sm:text-[0.7rem]">
          <span className="shrink-0 font-medium uppercase tracking-wider text-white/35">
            In brief
          </span>
          <span className="shrink-0 text-white/20" aria-hidden>
            ·
          </span>
          {briefLines.map(({ Icon, iconColor, text }, i) => (
            <span key={text} className="contents">
              <span className="flex shrink-0 items-center gap-1.5">
                <Icon
                  className={cn(iconClassSm, iconColor)}
                  aria-hidden
                />
                <span className="whitespace-nowrap">{text}</span>
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
