import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

export type ProjectDetailLayoutProps = {
  media: ReactNode;
  aside: ReactNode;
  className?: string;
};

export function ProjectDetailLayout({
  media,
  aside,
  className,
}: ProjectDetailLayoutProps) {
  return (
    <div
      className={cn(
        "grid max-h-[min(94vh,980px)] overflow-hidden rounded-2xl border border-white/10 bg-card/30 shadow-2xl md:h-[min(88vh,42rem)] md:grid-cols-[minmax(0,1.35fr)_minmax(18rem,0.9fr)]",
        className
      )}
    >
      <div className="relative min-h-48 overflow-hidden border-b border-white/10 md:min-h-0 md:border-r md:border-b-0">
        {media}
      </div>
      <div className="min-h-0 min-w-0 overflow-y-auto [-webkit-overflow-scrolling:touch]">
        {aside}
      </div>
    </div>
  );
}
