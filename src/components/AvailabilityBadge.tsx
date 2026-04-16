"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import type { AvailabilityStatus } from "@/data/home-profile";

type AvailabilityBadgeProps = {
  status?: AvailabilityStatus;
  className?: string;
};

export function AvailabilityBadge({
  status = "available",
  className,
}: AvailabilityBadgeProps) {
  const reduceMotion = useReducedMotion();
  const t = useTranslations("availability");
  const isAvailable = status === "available";
  const isTraining = status === "training";

  const dotAnimate = isAvailable
    ? reduceMotion
      ? { opacity: 1, scale: 1 }
      : { opacity: [0.75, 1, 0.75], scale: [1, 1.25, 1] }
    : { opacity: 1, scale: 1 };

  const dotTransition = isAvailable && !reduceMotion
    ? { duration: 1.4, repeat: Infinity }
    : undefined;

  return (
    <Badge
      variant="outline"
      className={cn(
        "flex min-w-0 max-w-37 items-center gap-1.5 rounded-full h-auto px-2 py-1 sm:max-w-none sm:gap-2 sm:px-3 sm:py-1.5",
        isAvailable
          ? "border-white/10 bg-white/5 text-white/90"
          : isTraining
            ? "border-sky-500/25 bg-sky-500/10 text-sky-100/85"
            : "border-amber-500/25 bg-amber-500/10 text-amber-100/85",
        className
      )}
      aria-label={
        isAvailable ? t("openLong") : isTraining ? t("trainingLong") : t("closedLong")
      }
    >
      <motion.span
        aria-hidden="true"
        className={cn(
          "h-2.5 w-2.5 shrink-0 rounded-full origin-center",
          isAvailable
            ? "bg-emerald-400 shadow-[0_0_14px_rgba(74,222,128,0.65)]"
            : isTraining
              ? "bg-sky-400 shadow-[0_0_12px_rgba(56,189,248,0.5)]"
              : "bg-amber-400/90 shadow-[0_0_10px_rgba(251,191,36,0.35)]"
        )}
        initial={{ opacity: isAvailable ? 0.85 : 1, scale: 1 }}
        animate={dotAnimate}
        transition={dotTransition}
      />
      <span className="truncate text-xs font-medium sm:text-sm sm:whitespace-nowrap">
        {isAvailable ? t("openLong") : isTraining ? t("trainingLong") : t("closedLong")}
      </span>
    </Badge>
  );
}
