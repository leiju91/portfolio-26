import { cn } from "@/lib/utils";

import { ProjectTechChip } from "./ProjectTechChip";

export type ProjectDetailTechStackProps = {
  technologies: string[];
  className?: string;
};

export function ProjectDetailTechStack({
  technologies,
  className,
}: ProjectDetailTechStackProps) {
  if (technologies.length === 0) {
    return null;
  }

  return (
    <div className={cn("mt-4 border-b border-white/10 pb-4", className)}>
      <p className="mb-2 text-[0.7rem] font-semibold uppercase tracking-wider text-white/45">
        Stack
      </p>
      <ul
        className="flex flex-wrap gap-2"
        aria-label="Technologies utilisées sur ce projet"
      >
        {technologies.map((tech, index) => (
          <li key={`${tech}-${index}`}>
            <ProjectTechChip label={tech} size="default" />
          </li>
        ))}
      </ul>
    </div>
  );
}
