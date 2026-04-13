import Image from "next/image";
import { motion } from "framer-motion";

import type { Project } from "@/data/projects";
import { cn } from "@/lib/utils";

export type ProjectDetailMediaProps = {
  project: Project;
  className?: string;
  mediaLayoutId?: string | null;
};

export function ProjectDetailMedia({
  project,
  className,
  mediaLayoutId,
}: ProjectDetailMediaProps) {
  return (
    <motion.div
      layoutId={mediaLayoutId ?? undefined}
      className={cn(
        "relative isolate h-full min-h-48 w-full overflow-hidden md:min-h-0",
        className
      )}
    >
      <div
        className={cn(
          "pointer-events-none absolute inset-0 z-1 bg-linear-to-br opacity-50 md:opacity-40",
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
    </motion.div>
  );
}
