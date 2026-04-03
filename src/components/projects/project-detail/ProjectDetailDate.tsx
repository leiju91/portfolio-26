import { Calendar } from "lucide-react";

import { cn } from "@/lib/utils";

export type ProjectDetailDateProps = {
  /** ISO 8601 date string, e.g. `2025-03-15` */
  isoDate: string;
  className?: string;
};

const formatter = new Intl.DateTimeFormat("fr-FR", {
  day: "numeric",
  month: "long",
  year: "numeric",
});

export function ProjectDetailDate({ isoDate, className }: ProjectDetailDateProps) {
  const date = new Date(isoDate);
  const label = Number.isNaN(date.getTime()) ? isoDate : formatter.format(date);

  return (
    <div
      className={cn("flex items-center gap-2 text-sm text-white/55", className)}
    >
      <Calendar className="size-4 shrink-0 text-emerald-400/80" aria-hidden />
      <time dateTime={isoDate}>{label}</time>
    </div>
  );
}
