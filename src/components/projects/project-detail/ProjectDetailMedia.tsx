import Image from "next/image";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";
import { useTranslations } from "next-intl";

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
  const t = useTranslations("projectDetail");
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const images = [project.coverImage, ...(project.galleryImages ?? [])];
  const activeImage = images[activeImageIndex] ?? project.coverImage;
  const hasMultipleImages = images.length > 1;
  const mediaAspectRatio = `${activeImage.width} / ${activeImage.height}`;
  const goToPreviousImage = () => {
    setActiveImageIndex((current) =>
      current === 0 ? images.length - 1 : current - 1
    );
  };
  const goToNextImage = () => {
    setActiveImageIndex((current) =>
      current === images.length - 1 ? 0 : current + 1
    );
  };

  return (
    <motion.div
      layoutId={mediaLayoutId ?? undefined}
      className={cn(
        "relative isolate flex h-full min-h-48 w-full flex-col items-center justify-center overflow-hidden bg-black/20 p-2 md:min-h-0 md:p-3",
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
      <div
        className="relative z-2 w-full max-w-full shrink overflow-hidden rounded-xl"
        style={{ aspectRatio: mediaAspectRatio }}
      >
        <Image
          src={activeImage.src}
          alt={activeImage.alt}
          fill
          sizes="(min-width: 768px) 45vw, 100vw"
          className="object-contain"
          priority
        />
        {hasMultipleImages ? (
          <>
            <button
              type="button"
              aria-label={t("previousImage")}
              onClick={goToPreviousImage}
              className="absolute left-3 top-1/2 z-3 flex size-9 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-black/45 text-white/90 shadow-lg backdrop-blur-md transition hover:bg-black/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400/60"
            >
              <ChevronLeft className="size-5" aria-hidden />
            </button>
            <button
              type="button"
              aria-label={t("nextImage")}
              onClick={goToNextImage}
              className="absolute right-3 top-1/2 z-3 flex size-9 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-black/45 text-white/90 shadow-lg backdrop-blur-md transition hover:bg-black/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400/60"
            >
              <ChevronRight className="size-5" aria-hidden />
            </button>
            <span className="absolute bottom-3 left-1/2 z-3 -translate-x-1/2 rounded-full border border-white/15 bg-black/45 px-2.5 py-1 text-xs font-medium text-white/85 backdrop-blur-md">
              {t("imagePosition", {
                current: activeImageIndex + 1,
                total: images.length,
              })}
            </span>
          </>
        ) : null}
      </div>
      {hasMultipleImages ? (
        <div className="relative z-2 mt-2 flex max-w-full shrink-0 gap-2 overflow-x-auto pb-1">
          {images.map((image, index) => {
            const active = index === activeImageIndex;
            return (
              <button
                key={`${image.src}-${index}`}
                type="button"
                aria-label={t("showImage", { index: index + 1 })}
                aria-current={active ? "true" : undefined}
                onClick={() => setActiveImageIndex(index)}
                className={cn(
                  "relative size-14 shrink-0 overflow-hidden rounded-lg border bg-white/8 transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400/60",
                  active
                    ? "border-emerald-300/80"
                    : "border-white/15 opacity-70 hover:opacity-100"
                )}
              >
                <Image
                  src={image.src}
                  alt=""
                  fill
                  sizes="56px"
                  className="object-cover"
                />
              </button>
            );
          })}
        </div>
      ) : null}
    </motion.div>
  );
}
