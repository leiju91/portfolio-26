import { ProjectTechChip } from "@/components/projects/project-detail/ProjectTechChip";
import { cn } from "@/lib/utils";

export type ProjectCardTechPreviewProps = {
  technologies: string[];
  /** Nombre max de tuiles visibles avant "+N". */
  maxVisible?: number;
  className?: string;
};

export function ProjectCardTechPreview({
  technologies,
  maxVisible = 3,
  className,
}: ProjectCardTechPreviewProps) {
  if (technologies.length === 0) {
    return null;
  }

  const visible = technologies.slice(0, maxVisible);
  const extra = technologies.length - visible.length;

  return (
    <div className={cn("mt-2 flex flex-wrap items-center gap-1", className)}>
      {visible.map((tech, index) => (
        <ProjectTechChip key={`${tech}-${index}`} label={tech} size="sm" />
      ))}
      {extra > 0 ? (
        <span className="px-0.5 text-[0.6rem] font-medium tabular-nums text-white/45">
          +{extra}
        </span>
      ) : null}
    </div>
  );
}
