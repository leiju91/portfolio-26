"use client";

import { AnimatePresence, motion } from "framer-motion";
import {
  Briefcase,
  ChevronLeft,
  ChevronRight,
  GraduationCap,
  Languages,
  Sparkles,
} from "lucide-react";
import type { ReactElement } from "react";
import { useCallback, useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";

import type { LanguageSkill, SkillsTimelineEntry } from "@/data/skills";
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
  metaType,
}: {
  entry: SkillsTimelineEntry;
  accentClassName: string;
  metaType: "work" | "education";
}): ReactElement {
  const t = useTranslations("skillsPage");
  const dash = "—";

  return (
    <article
      className={cn(
        "relative flex h-full min-h-104 overflow-hidden rounded-2xl border border-white/10 bg-card/55 p-5 shadow-sm backdrop-blur-sm",
        "before:absolute before:inset-y-3 before:left-0 before:w-1 before:rounded-full before:content-['']",
        accentClassName
      )}
    >
      <div className="flex h-full w-full flex-col pl-3">
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
        {metaType === "work" ? (
          <p className="mt-1 text-xs text-white/50">
            {t("contract", { value: entry.contractType ?? dash })}
          </p>
        ) : (
          <p className="mt-1 text-xs text-white/50">
            {t("level", { value: entry.level ?? dash })}
          </p>
        )}
        {entry.summary ? (
          <p className="mt-3 text-sm leading-relaxed text-white/55">{entry.summary}</p>
        ) : null}

        <div className="mt-auto pt-4">
          <p className="text-[0.65rem] font-medium uppercase tracking-wider text-white/38">
            {t("skillsHeading")}
          </p>
          <ul
            className="mt-2 flex flex-wrap gap-2"
            aria-label={t("skillsAria", { title: entry.title })}
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
  metaType,
}: {
  title: string;
  Icon: typeof Briefcase;
  entries: SkillsTimelineEntry[];
  accentClassName: string;
  iconClassName: string;
  metaType: "work" | "education";
}): ReactElement {
  const t = useTranslations("skillsPage");
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
      className="flex h-full flex-col gap-4 rounded-2xl outline-none focus-visible:ring-2 focus-visible:ring-white/25 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
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
              aria-label={t("prevSlide", { title })}
              onClick={() => go(-1)}
            >
              <ChevronLeft className="size-4 text-white/90" aria-hidden />
            </Button>
            <Button
              type="button"
              variant="outline"
              size="icon"
              className="size-9 shrink-0 rounded-full border-white/10 bg-transparent hover:bg-white/10"
              aria-label={t("nextSlide", { title })}
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
            aria-label={t("slidePosition", {
              current: index + 1,
              total: count,
            })}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.28, ease: easeOut }}
            className="h-full w-full"
          >
            <SkillEntryCard
              entry={entry}
              accentClassName={accentClassName}
              metaType={metaType}
            />
          </motion.div>
        </AnimatePresence>
      </div>

      {count > 1 ? (
        <div
          className="flex justify-center gap-1.5 pt-1"
          role="tablist"
          aria-label={t("dotsAria", { title })}
        >
          {entries.map((e, i) => (
            <button
              key={e.id}
              type="button"
              role="tab"
              aria-selected={i === index}
              aria-label={t("showEntry", { title: e.title })}
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
  languages: LanguageSkill[];
  hobbies: string[];
};

export function SkillsBoard({
  workExperience: work,
  education,
  languages,
  hobbies,
}: SkillsBoardProps): ReactElement {
  const t = useTranslations("skillsPage");

  return (
    <>
      <section className="mx-auto flex min-h-[calc(100svh-9rem)] w-full max-w-5xl snap-start scroll-mt-28 flex-col justify-center">
        <motion.header
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: easeOut }}
          className="mb-10 w-full"
        >
          <h1 className="sr-only">{t("headingSr")}</h1>
          <p className="text-center text-sm text-white/55 sm:text-base">
            {t("boardIntro")}
          </p>
        </motion.header>

        <div className="grid gap-10 lg:grid-cols-2 lg:items-stretch lg:gap-12">
          <SliderColumn
            title={t("jobs")}
            Icon={Briefcase}
            entries={work}
            accentClassName="before:bg-emerald-400/75"
            iconClassName="text-emerald-400/90"
            metaType="work"
          />
          <SliderColumn
            title={t("education")}
            Icon={GraduationCap}
            entries={education}
            accentClassName="before:bg-violet-400/75"
            iconClassName="text-violet-400/90"
            metaType="education"
          />
        </div>
      </section>

      <motion.section
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: easeOut, delay: 0.08 }}
        className="mx-auto mt-16 grid min-h-[calc(100svh-9rem)] w-full max-w-5xl snap-start scroll-mt-28 content-center gap-5 md:grid-cols-2"
        aria-label={t("langHobbiesAria")}
      >
        <article className="relative overflow-hidden rounded-2xl border border-white/10 bg-card/55 p-5 shadow-sm backdrop-blur-sm">
          <div className="mb-4 flex items-center gap-2.5">
            <span className="grid size-9 place-items-center rounded-xl border border-white/10 bg-white/5 text-cyan-300/90">
              <Languages className="size-4.5" strokeWidth={2} aria-hidden />
            </span>
            <h2 className="text-lg font-semibold tracking-tight text-white sm:text-xl">
              {t("languages")}
            </h2>
          </div>
          <ul className="space-y-2.5" aria-label={t("languagesListAria")}>
            {languages.map((language, i) => (
              <motion.li
                key={language.id}
                initial={{ opacity: 0, y: 6 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.65 }}
                transition={{ duration: 0.24, delay: i * 0.05, ease: easeOut }}
                className="flex items-center justify-between rounded-xl border border-white/10 bg-white/[0.035] px-3 py-2.5"
              >
                <span className="text-sm text-white/88">{language.name}</span>
                <Badge
                  variant="secondary"
                  className="h-6 rounded-full border border-cyan-300/25 bg-cyan-300/10 px-2.5 text-[0.7rem] font-semibold text-cyan-100"
                >
                  {language.level}
                </Badge>
              </motion.li>
            ))}
          </ul>
        </article>

        <article className="relative overflow-hidden rounded-2xl border border-white/10 bg-card/55 p-5 shadow-sm backdrop-blur-sm">
          <div className="mb-4 flex items-center gap-2.5">
            <span className="grid size-9 place-items-center rounded-xl border border-white/10 bg-white/5 text-fuchsia-300/90">
              <Sparkles className="size-4.5" strokeWidth={2} aria-hidden />
            </span>
            <h2 className="text-lg font-semibold tracking-tight text-white sm:text-xl">
              {t("hobbies")}
            </h2>
          </div>
          <ul className="flex flex-wrap gap-2" aria-label={t("hobbiesListAria")}>
            {hobbies.map((hobby, i) => (
              <motion.li
                key={hobby}
                initial={{ opacity: 0, y: 6 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.65 }}
                transition={{ duration: 0.24, delay: i * 0.04, ease: easeOut }}
              >
                <Badge
                  variant="secondary"
                  className="h-7 rounded-full border border-white/12 bg-white/7 px-3 text-xs font-medium text-white/88 hover:bg-white/10"
                >
                  {hobby}
                </Badge>
              </motion.li>
            ))}
          </ul>
        </article>
      </motion.section>
    </>
  );
}
