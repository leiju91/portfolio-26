import * as React from "react";

import { cn } from "@/lib/utils";

/** Gradient ring frame (same treatment as the navbar). */
export const gradientPillRingClassName =
  "rounded-full p-px bg-linear-to-r from-emerald-400/50 via-cyan-400/30 to-fuchsia-400/40";

/** Inner blurred surface + border; combine with flex / padding for context. */
export const gradientPillInnerSurfaceClassName =
  "rounded-full border border-white/10 bg-background/72 backdrop-blur-xl";

export function GradientPillFrame({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div className={cn(gradientPillRingClassName, className)} {...props} />
  );
}
