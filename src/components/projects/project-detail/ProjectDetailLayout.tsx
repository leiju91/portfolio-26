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
        "grid overflow-hidden rounded-2xl border border-white/10 bg-card/30 shadow-2xl md:grid-cols-[minmax(0,1.12fr)_minmax(0,1fr)] md:min-h-[min(85vh,38rem)]",
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
