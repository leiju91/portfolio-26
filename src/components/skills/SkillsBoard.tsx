"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Briefcase, ChevronLeft, ChevronRight, GraduationCap } from "lucide-react";
import type { ReactElement } from "react";
import { useCallback, useEffect, useRef, useState } from "react";

import type { SkillsTimelineEntry } from "@/data/skills";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const easeOut = [0.22, 1, 0.36, 1] as const;

const slideVariants = {
  enter: (dir: number) => ({
    x: dir > 0 ? 28 : -28,
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (dir: number) => ({
    x: dir > 0 ? -28 : 28,
    opacity: 0,
  }),
};

function SkillEntryCard({
  entry,
  accentClassName,
}: {
  entry: SkillsTimelineEntry;
  accentClassName: string;
}): ReactElement {
  return (
    <article
      className={cn(
        "relative overflow-hidden rounded-2xl border border-white/10 bg-card/55 p-5 shadow-sm backdrop-blur-sm",
        "before:absolute before:inset-y-3 before:left-0 before:w-1 before:rounded-full before:content-['']",
        accentClassName
      )}
    >
      <div className="pl-3">
        <p className="text-[0.65rem] font-medium uppercase tracking-wider text-white/40">
          {entry.period}
        </p>
        <h3 className="mt-1 text-base font-semibold tracking-tight text-white sm:text-lg">
          {entry.title}
        </h3>
        <p className="mt-0.5 text-sm text-white/65">
          {entry.organization}
          {entry.location ? (
            <span className="text-white/40"> · {entry.location}</span>
          ) : null}
        </p>
        {entry.summary ? (
          <p className="mt-3 text-sm leading-relaxed text-white/55">{entry.summary}</p>
        ) : null}

        <div className="mt-4">
          <p className="text-[0.65rem] font-medium uppercase tracking-wider text-white/38">
            Compétences
          </p>
          <ul
            className="mt-2 flex flex-wrap gap-2"
            aria-label={`Compétences : ${entry.title}`}
          >
            {entry.skills.map((skill) => (
              <li key={skill}>
                <Badge
                  variant="secondary"
                  className="h-6 rounded-full border border-white/10 bg-white/6 px-2.5 text-[0.7rem] font-medium text-white/88 hover:bg-white/8"
                >
                  {skill}
                </Badge>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </article>
  );
}

function SliderColumn({
  title,
  Icon,
  entries,
  accentClassName,
  iconClassName,
}: {
  title: string;
  Icon: typeof Briefcase;
  entries: SkillsTimelineEntry[];
  accentClassName: string;
  iconClassName: string;
}): ReactElement {
  const count = entries.length;
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);

  const go = useCallback(
    (delta: -1 | 1) => {
      if (count <= 1) return;
      setDirection(delta);
      setIndex((i) => (i + delta + count) % count);
    },
    [count]
  );

  useEffect(() => {
    const el = sectionRef.current;
    if (!el || count <= 1) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (!el.contains(document.activeElement) && document.activeElement !== el)
        return;
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        go(-1);
      }
      if (e.key === "ArrowRight") {
        e.preventDefault();
        go(1);
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [count, go]);

  const entry = entries[index] ?? entries[0];

  return (
    <section
      ref={sectionRef}
      tabIndex={0}
      className="flex flex-col gap-4 outline-none focus-visible:ring-2 focus-visible:ring-white/25 focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded-2xl"
      aria-label={title}
      aria-roledescription="carousel"
    >
      <div className="flex flex-wrap items-center justify-between gap-3 pb-1">
        <div className="flex items-center gap-2.5">
          <span
            className={cn(
              "grid size-9 shrink-0 place-items-center rounded-xl border border-white/10 bg-white/5",
              iconClassName
            )}
          >
            <Icon className="size-4.5" strokeWidth={2} aria-hidden />
          </span>
          <h2 className="text-lg font-semibold tracking-tight text-white sm:text-xl">
            {title}
          </h2>
        </div>

        {count > 1 ? (
          <div className="flex items-center gap-1.5">
            <span
              className="mr-1 tabular-nums text-xs text-white/45"
              aria-live="polite"
            >
              {index + 1} / {count}
            </span>
            <Button
              type="button"
              variant="outline"
              size="icon"
              className="size-9 shrink-0 rounded-full border-white/10 bg-transparent hover:bg-white/10"
              aria-label={`${title} — slide précédente`}
              onClick={() => go(-1)}
            >
              <ChevronLeft className="size-4 text-white/90" aria-hidden />
            </Button>
            <Button
              type="button"
              variant="outline"
              size="icon"
              className="size-9 shrink-0 rounded-full border-white/10 bg-transparent hover:bg-white/10"
              aria-label={`${title} — slide suivante`}
              onClick={() => go(1)}
            >
              <ChevronRight className="size-4 text-white/90" aria-hidden />
            </Button>
          </div>
        ) : null}
      </div>

      <div className="overflow-x-clip">
        <AnimatePresence initial={false} custom={direction} mode="wait">
          <motion.div
            key={entry.id}
            role="group"
            aria-roledescription="slide"
            aria-label={`${index + 1} sur ${count}`}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.28, ease: easeOut }}
            className="w-full"
          >
            <SkillEntryCard
              entry={entry}
              accentClassName={accentClassName}
            />
          </motion.div>
        </AnimatePresence>
      </div>

      {count > 1 ? (
        <div
          className="flex justify-center gap-1.5 pt-1"
          role="tablist"
          aria-label={`Repères ${title}`}
        >
          {entries.map((e, i) => (
            <button
              key={e.id}
              type="button"
              role="tab"
              aria-selected={i === index}
              aria-label={`Afficher ${e.title}`}
              className={cn(
                "h-2 rounded-full transition-all duration-200",
                i === index
                  ? "w-6 bg-white/55"
                  : "w-2 bg-white/20 hover:bg-white/35"
              )}
              onClick={() => {
                if (i === index) return;
                setDirection(i > index ? 1 : -1);
                setIndex(i);
              }}
            />
          ))}
        </div>
      ) : null}
    </section>
  );
}

type SkillsBoardProps = {
  workExperience: SkillsTimelineEntry[];
  education: SkillsTimelineEntry[];
};

export function SkillsBoard({
  workExperience: work,
  education,
}: SkillsBoardProps): ReactElement {
  return (
    <>
      <motion.header
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: easeOut }}
        className="mx-auto mb-10 max-w-3xl text-center"
      >
        <h1 className="text-2xl font-semibold tracking-tight text-white sm:text-3xl">
          Compétences & parcours
        </h1>
        <p className="mt-2 text-sm text-white/55 sm:text-base">
          Une expérience et une formation à la fois — fais défiler avec les flèches
          ou les points.
        </p>
      </motion.header>

      <div className="mx-auto grid max-w-5xl gap-10 lg:grid-cols-2 lg:gap-12 lg:items-start">
        <SliderColumn
          title="Emplois"
          Icon={Briefcase}
          entries={work}
          accentClassName="before:bg-emerald-400/75"
          iconClassName="text-emerald-400/90"
        />
        <SliderColumn
          title="Formations"
          Icon={GraduationCap}
          entries={education}
          accentClassName="before:bg-violet-400/75"
          iconClassName="text-violet-400/90"
        />
      </div>
    </>
  );
}
