import * as React from "react";

import { cn } from "@/lib/utils";

export type ProjectDetailTitleProps = React.ComponentPropsWithoutRef<"h2">;

export const ProjectDetailTitle = React.forwardRef<
  HTMLHeadingElement,
  ProjectDetailTitleProps
>(function ProjectDetailTitle({ className, ...props }, ref) {
  return (
    <h2
      ref={ref}
      className={cn(
        "text-balance text-xl font-semibold tracking-tight text-white sm:text-2xl",
        className
      )}
      {...props}
    />
  );
});
