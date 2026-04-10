"use client";

import {
  AnimatePresence,
  LayoutGroup,
  motion,
  useReducedMotion,
} from "framer-motion";
import { ImageIcon, Laptop, Palette, type LucideIcon } from "lucide-react";
import { useMemo, useState } from "react";
import { useTranslations } from "next-intl";

import type { Project, ProjectCategory } from "@/data/projects";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

import { ProjectCardTechPreview } from "./ProjectCardTechPreview";
import { ProjectDetailDialog } from "./project-detail/ProjectDetailDialog";

const easeOut = [0.22, 1, 0.36, 1] as const;

const itemVariants = {
  hidden: { opacity: 0, y: 18, scale: 0.98 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.45, ease: easeOut },
  },
  exit: {
    opacity: 0,
    scale: 0.96,
    transition: { duration: 0.22, ease: easeOut },
  },
};

function spanClasses(p: Project) {
  const col =
    p.colSpan === 1
      ? "col-span-1"
      : p.colSpan === 2
        ? "col-span-2"
        : p.colSpan === 3
          ? "col-span-2 md:col-span-3"
          : "col-span-2 md:col-span-4";
  const row = p.rowSpan === 2 ? "row-span-2" : "row-span-1";
  return cn(col, row);
}

function matchesFilter(
  project: Project,
  active: ProjectCategory | null
): boolean {
  if (active === null) return true;
  return project.categories.includes(active);
}

type BentoCardProps = {
  project: Project;
  onOpenProject: (project: Project) => void;
  openProjectLabel: (title: string) => string;
  placeholderLabel: string;
};

function BentoCard({
  project,
  onOpenProject,
  openProjectLabel,
  placeholderLabel,
}: BentoCardProps) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.button
      type="button"
      layout={!reduceMotion}
      variants={itemVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      whileHover={
        reduceMotion
          ? undefined
          : {
              scale: 1.02,
              y: -4,
              transition: { type: "spring", stiffness: 420, damping: 28 },
            }
      }
      whileTap={
        reduceMotion ? undefined : { scale: 0.99, transition: { duration: 0.15 } }
      }
      onClick={() => onOpenProject(project)}
      aria-label={openProjectLabel(project.title)}
      className={cn(
        "group relative flex min-h-34 w-full cursor-pointer flex-col overflow-hidden rounded-2xl border border-white/10 bg-background/72 text-left shadow-lg backdrop-blur-xl outline-none md:min-h-0",
        "focus-visible:ring-2 focus-visible:ring-emerald-400/50 focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        spanClasses(project)
      )}
    >
      <div
        className={cn(
          "pointer-events-none absolute inset-0 bg-linear-to-br opacity-90",
          project.placeholderClass
        )}
        aria-hidden
      />
      <div className="relative flex min-h-28 flex-1 flex-col p-4 md:min-h-0">
        <div
          className={cn(
            "mb-3 flex flex-1 flex-col items-center justify-center gap-2 rounded-xl border border-dashed border-white/18 bg-white/6 px-3 py-6 text-center backdrop-blur-sm",
            project.rowSpan === 2 && "min-h-40 md:min-h-0"
          )}
        >
          <ImageIcon
            className="size-9 text-white/45 transition-colors group-hover:text-white/60"
            strokeWidth={1.25}
            aria-hidden
          />
          <span className="text-[0.65rem] font-medium uppercase tracking-widest text-white/40">
            {placeholderLabel}
          </span>
        </div>
        <header className="mt-auto space-y-1">
          <span className="block text-sm font-semibold text-white/95">
            {project.title}
          </span>
          <p className="text-xs leading-relaxed text-white/55">{project.summary}</p>
          <ProjectCardTechPreview
            technologies={project.technologies}
            maxVisible={project.colSpan >= 2 ? 4 : 3}
          />
        </header>
      </div>
    </motion.button>
  );
}

export function ProjectsBentoGallery({ items }: { items: Project[] }) {
  const tGallery = useTranslations("projectsGallery");
  const [activeCategory, setActiveCategory] = useState<ProjectCategory | null>(
    null
  );
  const [dialogProject, setDialogProject] = useState<Project | null>(null);

  const filters: {
    id: ProjectCategory;
    label: string;
    icon: LucideIcon;
  }[] = useMemo(
    () => [
      { id: "code", label: tGallery("categoryCode"), icon: Laptop },
      { id: "design", label: tGallery("categoryDesign"), icon: Palette },
    ],
    [tGallery]
  );

  const filtered = useMemo(
    () => items.filter((p) => matchesFilter(p, activeCategory)),
    [items, activeCategory]
  );

  const toggleCategory = (id: ProjectCategory) => {
    setActiveCategory((current) => (current === id ? null : id));
  };

  const dialogOpen = dialogProject !== null;

  const openProjectLabel = (title: string) =>
    tGallery("openProject", { title });

  return (
    <div className="flex flex-col gap-6">
      <ProjectDetailDialog
        project={dialogProject}
        open={dialogOpen}
        onOpenChange={(next) => {
          if (!next) setDialogProject(null);
        }}
      />

      <div
        className="flex flex-wrap items-center justify-center gap-2"
        role="toolbar"
        aria-label={tGallery("filterToolbar")}
      >
        {filters.map(({ id, label, icon: Icon }) => {
          const pressed = activeCategory === id;
          return (
            <Button
              key={id}
              type="button"
              variant="navGlass"
              size="sm"
              aria-pressed={pressed}
              onClick={() => toggleCategory(id)}
              className={cn(
                "h-10 gap-2 rounded-full px-4 text-white/85",
                pressed &&
                  "border-emerald-400/35 bg-linear-to-r from-emerald-400/18 via-cyan-400/12 to-fuchsia-400/18 text-white shadow-[0_0_20px_-8px_rgba(52,211,153,0.45)]"
              )}
            >
              <Icon className="size-4 opacity-90" aria-hidden />
              {label}
            </Button>
          );
        })}
      </div>

      <LayoutGroup>
        <div className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4 md:auto-rows-[minmax(9rem,auto)]">
          <AnimatePresence mode="popLayout" initial={false}>
            {filtered.map((project) => (
              <BentoCard
                key={project.id}
                project={project}
                onOpenProject={setDialogProject}
                openProjectLabel={openProjectLabel}
                placeholderLabel={tGallery("placeholder")}
              />
            ))}
          </AnimatePresence>
        </div>
      </LayoutGroup>
    </div>
  );
}
