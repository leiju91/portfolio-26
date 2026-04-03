import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

export type ProjectDetailAsideProps = {
  children: ReactNode;
  className?: string;
};

export function ProjectDetailAside({ children, className }: ProjectDetailAsideProps) {
  return (
    <aside
      className={cn(
        "flex min-h-0 flex-col bg-background/88 p-6 sm:p-8 md:rounded-r-2xl",
        className
      )}
    >
      {children}
    </aside>
  );
}
