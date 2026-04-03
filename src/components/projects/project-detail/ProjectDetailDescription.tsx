import * as React from "react";

import { cn } from "@/lib/utils";

export type ProjectDetailDescriptionProps =
  React.ComponentPropsWithoutRef<"p">;

export const ProjectDetailDescription = React.forwardRef<
  HTMLParagraphElement,
  ProjectDetailDescriptionProps
>(function ProjectDetailDescription({ className, ...props }, ref) {
  return (
    <p
      ref={ref}
      className={cn(
        "mt-4 text-sm leading-relaxed text-white/65 sm:text-[0.9375rem]",
        className
      )}
      {...props}
    />
  );
});
