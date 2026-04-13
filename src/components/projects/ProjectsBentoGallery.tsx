"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  ImageIcon,
  Laptop,
  LayoutGrid,
  Palette,
  type LucideIcon,
} from "lucide-react";
import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type KeyboardEvent,
  type TouchEvent,
} from "react";
import { useTranslations } from "next-intl";

import type { Project, ProjectCategory } from "@/data/projects";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

import { ProjectCardTechPreview } from "./ProjectCardTechPreview";
import { ProjectDetailDialog } from "./project-detail/ProjectDetailDialog";

const easeOut = [0.22, 1, 0.36, 1] as const;

const WHEEL_THRESHOLD = 52;
const WHEEL_LOCK_MS = 480;
const SWIPE_MIN_PX = 72;

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
      initial={false}
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
        "group relative flex w-full max-w-full cursor-pointer flex-col overflow-hidden rounded-2xl border border-white/10 bg-background/72 text-left shadow-lg backdrop-blur-xl outline-none",
        "focus-visible:ring-2 focus-visible:ring-emerald-400/50 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
      )}
    >
      <div
        className={cn(
          "pointer-events-none absolute inset-0 bg-linear-to-br opacity-90",
          project.placeholderClass
        )}
        aria-hidden
      />
      <div className="relative flex min-h-0 flex-1 flex-col p-2.5 sm:p-3.5 lg:p-4">
        <div
          className={cn(
            "mx-auto mb-2 flex aspect-square w-full max-w-60 shrink-0 flex-col items-center justify-center gap-1.5 rounded-xl border border-dashed border-white/18 bg-white/6 p-3 text-center backdrop-blur-sm sm:mb-2.5 sm:max-w-64 sm:gap-2 sm:p-3.5 md:max-w-72 lg:max-w-80"
          )}
        >
          <ImageIcon
            className="size-8 text-white/45 transition-colors group-hover:text-white/60 sm:size-9 md:size-10"
            strokeWidth={1.25}
            aria-hidden
          />
          <span className="text-[0.6rem] font-medium uppercase tracking-widest text-white/40 sm:text-[0.65rem]">
            {placeholderLabel}
          </span>
        </div>
        <header className="mt-auto shrink-0 space-y-0.5">
          <span className="block text-sm font-semibold tracking-tight text-white/95 sm:text-[0.9375rem]">
            {project.title}
          </span>
          <p className="line-clamp-2 text-xs leading-relaxed text-white/55 sm:text-[0.8125rem] sm:leading-snug">
            {project.summary}
          </p>
          <ProjectCardTechPreview
            technologies={project.technologies}
            maxVisible={project.colSpan >= 2 ? 4 : 3}
            className="mt-2 gap-1"
          />
        </header>
      </div>
    </motion.button>
  );
}

export function ProjectsBentoGallery({ items }: { items: Project[] }) {
  const tGallery = useTranslations("projectsGallery");
  const reduceMotion = useReducedMotion();
  const [activeCategory, setActiveCategory] = useState<ProjectCategory | null>(
    null
  );
  const [dialogProject, setDialogProject] = useState<Project | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);

  const activeIndexRef = useRef(activeIndex);
  const filteredRef = useRef<Project[]>([]);
  const dialogOpenRef = useRef(false);
  const wheelAccRef = useRef(0);
  const wheelSignRef = useRef(0);
  const wheelLockUntilRef = useRef(0);
  const touchStartYRef = useRef<number | null>(null);

  const filters: {
    id: ProjectCategory | null;
    label: string;
    icon: LucideIcon;
  }[] = useMemo(
    () => [
      { id: null, label: tGallery("categoryAll"), icon: LayoutGrid },
      { id: "code", label: tGallery("categoryCode"), icon: Laptop },
      { id: "design", label: tGallery("categoryDesign"), icon: Palette },
    ],
    [tGallery]
  );

  const filtered = useMemo(
    () => items.filter((p) => matchesFilter(p, activeCategory)),
    [items, activeCategory]
  );

  const filterKey = useMemo(
    () => filtered.map((p) => p.id).join("\0"),
    [filtered]
  );

  useEffect(() => {
    activeIndexRef.current = activeIndex;
  }, [activeIndex]);

  useEffect(() => {
    filteredRef.current = filtered;
  }, [filtered]);

  useEffect(() => {
    dialogOpenRef.current = dialogProject !== null;
  }, [dialogProject]);

  useEffect(() => {
    setActiveIndex(0);
    wheelAccRef.current = 0;
    wheelSignRef.current = 0;
  }, [activeCategory, filterKey]);

  const goToSlide = useCallback((index: number) => {
    const list = filteredRef.current;
    if (list.length === 0) return;
    const i = Math.min(Math.max(0, index), list.length - 1);
    setActiveIndex(i);
  }, []);

  const goToSlideRef = useRef(goToSlide);
  goToSlideRef.current = goToSlide;

  useEffect(() => {
    if (reduceMotion) return;

    const onWheel = (e: WheelEvent) => {
      if (dialogOpenRef.current) return;

      const root = sectionRef.current;
      if (!root) return;

      const list = filteredRef.current;
      if (list.length <= 1) return;

      const rect = root.getBoundingClientRect();
      const { clientX: cx, clientY: cy } = e;
      if (cx < rect.left || cx > rect.right || cy < rect.top || cy > rect.bottom) {
        return;
      }

      const idx = activeIndexRef.current;
      const last = list.length - 1;
      const atStart = idx <= 0;
      const atEnd = idx >= last;

      if (e.deltaY > 0 && atEnd) return;
      if (e.deltaY < 0 && atStart) return;

      const now = performance.now();
      if (now < wheelLockUntilRef.current) {
        e.preventDefault();
        return;
      }

      e.preventDefault();

      const sign = Math.sign(e.deltaY);
      if (sign !== wheelSignRef.current) {
        wheelAccRef.current = 0;
        wheelSignRef.current = sign;
      }
      wheelAccRef.current += e.deltaY;

      if (wheelAccRef.current > WHEEL_THRESHOLD) {
        wheelAccRef.current = 0;
        wheelSignRef.current = 0;
        goToSlideRef.current(idx + 1);
        wheelLockUntilRef.current = now + WHEEL_LOCK_MS;
      } else if (wheelAccRef.current < -WHEEL_THRESHOLD) {
        wheelAccRef.current = 0;
        wheelSignRef.current = 0;
        goToSlideRef.current(idx - 1);
        wheelLockUntilRef.current = now + WHEEL_LOCK_MS;
      }
    };

    window.addEventListener("wheel", onWheel, { passive: false });
    return () => window.removeEventListener("wheel", onWheel);
  }, [reduceMotion]);

  const onSectionKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (dialogProject !== null) return;
    if (filtered.length <= 1) return;
    const idx = activeIndex;
    if (e.key === "ArrowDown" && idx < filtered.length - 1) {
      e.preventDefault();
      goToSlide(idx + 1);
    } else if (e.key === "ArrowUp" && idx > 0) {
      e.preventDefault();
      goToSlide(idx - 1);
    }
  };

  const onTouchStart = (e: TouchEvent<HTMLDivElement>) => {
    touchStartYRef.current = e.touches[0]?.clientY ?? null;
  };

  const onTouchEnd = (e: TouchEvent<HTMLDivElement>) => {
    if (dialogOpenRef.current || filtered.length <= 1) {
      touchStartYRef.current = null;
      return;
    }
    const y0 = touchStartYRef.current;
    touchStartYRef.current = null;
    if (y0 == null) return;
    const y1 = e.changedTouches[0]?.clientY;
    if (y1 == null) return;
    const dy = y0 - y1;
    if (Math.abs(dy) < SWIPE_MIN_PX) return;
    const idx = activeIndexRef.current;
    const last = filteredRef.current.length - 1;
    if (dy > 0 && idx < last) goToSlide(idx + 1);
    else if (dy < 0 && idx > 0) goToSlide(idx - 1);
  };

  const dialogOpen = dialogProject !== null;

  const openProjectLabel = (title: string) =>
    tGallery("openProject", { title });

  const activeProject = filtered[activeIndex] ?? filtered[0];
  const slideDuration = reduceMotion ? 0.12 : 0.32;

  return (
    <div className="flex min-h-0 flex-1 flex-col gap-4">
      <ProjectDetailDialog
        project={dialogProject}
        open={dialogOpen}
        onOpenChange={(next) => {
          if (!next) setDialogProject(null);
        }}
      />

      <div
        className="flex shrink-0 flex-wrap items-center justify-center gap-2 py-1 sm:gap-2.5 sm:py-2"
        role="toolbar"
        aria-label={tGallery("filterToolbar")}
      >
        {filters.map(({ id, label, icon: Icon }) => {
          const pressed = activeCategory === id;
          return (
            <Button
              key={id ?? "all"}
              type="button"
              variant="navGlass"
              size="sm"
              aria-pressed={pressed}
              onClick={() => setActiveCategory(id)}
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

      {filtered.length === 0 ? (
        <p className="shrink-0 text-center text-sm text-white/55">
          {tGallery("emptyFiltered")}
        </p>
      ) : (
        <div className="flex min-h-0 flex-1 flex-col">
          <div
            ref={sectionRef}
            className={cn(
              "flex min-h-0 flex-1 flex-col touch-pan-x outline-none",
              "py-1 focus-visible:outline-none sm:py-2",
              "focus-within:ring-2 focus-within:ring-emerald-400/35 focus-within:ring-offset-2 focus-within:ring-offset-background"
            )}
            tabIndex={0}
            role="region"
            aria-label={tGallery("scrollRegion")}
            onKeyDown={onSectionKeyDown}
            onTouchStart={onTouchStart}
            onTouchEnd={onTouchEnd}
          >
            <div className="flex min-h-0 flex-1 flex-col items-center justify-center overflow-hidden px-2 py-1 sm:px-4">
              <AnimatePresence mode="wait" initial={false}>
                {activeProject ? (
                  <motion.div
                    key={activeProject.id}
                    className="w-full max-h-full max-w-lg sm:max-w-xl lg:max-w-2xl xl:max-w-3xl"
                    initial={
                      reduceMotion
                        ? { opacity: 0 }
                        : { opacity: 0, y: 28, scale: 0.97 }
                    }
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={
                      reduceMotion
                        ? { opacity: 0 }
                        : { opacity: 0, y: -18, scale: 0.98 }
                    }
                    transition={{ duration: slideDuration, ease: easeOut }}
                  >
                    <BentoCard
                      project={activeProject}
                      onOpenProject={setDialogProject}
                      openProjectLabel={openProjectLabel}
                      placeholderLabel={tGallery("placeholder")}
                    />
                  </motion.div>
                ) : null}
              </AnimatePresence>
            </div>
            <nav
              className="mt-2 flex shrink-0 flex-wrap items-center justify-center gap-2"
              aria-label={tGallery("slideNavigation")}
            >
              {filtered.map((project, i) => {
                const active = i === activeIndex;
                return (
                  <button
                    key={project.id}
                    type="button"
                    aria-current={active ? "true" : undefined}
                    aria-label={tGallery("goToProject", { title: project.title })}
                    onClick={() => goToSlide(i)}
                    className={cn(
                      "size-2.5 rounded-full transition-[transform,background-color] duration-200",
                      active
                        ? "scale-110 bg-emerald-400/90 shadow-[0_0_12px_-2px_rgba(52,211,153,0.6)]"
                        : "bg-white/20 hover:bg-white/35"
                    )}
                  />
                );
              })}
            </nav>
            <p className="mt-2 shrink-0 text-center text-[0.65rem] text-white/35 tabular-nums sm:text-xs sm:text-white/40">
              {activeIndex + 1} / {filtered.length}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
