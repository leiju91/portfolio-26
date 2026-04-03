import { cn } from "@/lib/utils";

export type ProjectTechChipSize = "sm" | "default";

export type ProjectTechChipProps = {
  label: string;
  size?: ProjectTechChipSize;
  className?: string;
};

export function ProjectTechChip({
  label,
  size = "default",
  className,
}: ProjectTechChipProps) {
  return (
    <span
      className={cn(
        "inline-flex shrink-0 items-center rounded-lg border border-white/12 bg-white/6 font-medium text-white/85 backdrop-blur-sm",
        size === "sm" && "px-1.5 py-0.5 text-[0.65rem] leading-none",
        size === "default" && "px-2.5 py-1 text-xs",
        className
      )}
    >
      {label}
    </span>
  );
}
