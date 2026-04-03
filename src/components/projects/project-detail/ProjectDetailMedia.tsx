import Image from "next/image";

import type { Project } from "@/data/projects";
import { cn } from "@/lib/utils";

export type ProjectDetailMediaProps = {
  project: Project;
  className?: string;
};

export function ProjectDetailMedia({ project, className }: ProjectDetailMediaProps) {
  return (
    <div
      className={cn(
        "relative isolate h-full min-h-48 w-full overflow-hidden md:min-h-0",
        className
      )}
    >
      <div
        className={cn(
          "pointer-events-none absolute inset-0 z-[1] bg-linear-to-br opacity-50 md:opacity-40",
          project.placeholderClass
        )}
        aria-hidden
      />
      <Image
        src={project.coverImage.src}
        alt={project.coverImage.alt}
        fill
        sizes="(min-width: 768px) 45vw, 100vw"
        className="object-cover"
        priority
      />
    </div>
  );
}
