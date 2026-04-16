"use client";

import { X } from "lucide-react";
import { Dialog } from "radix-ui";
import { useState } from "react";
import { useTranslations } from "next-intl";

import { FooterSpotifyMusicIcon } from "@/components/FooterSpotifyMusicIcon";
import { buttonVariants } from "@/components/ui/button";
import {
  getSpotifyPlaylistEmbedSrc,
  isSpotifyPlaylistConfigured,
} from "@/lib/spotify-playlist";
import { cn } from "@/lib/utils";

export function FooterSpotifyPopover() {
  const t = useTranslations("spotify");
  const embedSrc = getSpotifyPlaylistEmbedSrc();
  const hasCustomPlaylist = isSpotifyPlaylistConfigured();
  const [open, setOpen] = useState(false);

  return (
    <Dialog.Root modal={false} open={open} onOpenChange={setOpen}>
      <Dialog.Trigger
        type="button"
        aria-label={t("openPlaylist")}
        aria-expanded={open}
        className={cn(
          buttonVariants({ variant: "ghost", size: "icon" }),
          "relative z-10 size-10 shrink-0 rounded-full border border-white/25 bg-white/8 text-white/90 shadow-sm",
          "hover:border-white/35 hover:bg-white/14 hover:text-white",
          "focus-visible:border-emerald-400/50 focus-visible:ring-2 focus-visible:ring-emerald-400/35 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
        )}
      >
        <FooterSpotifyMusicIcon />
      </Dialog.Trigger>
      <Dialog.Portal forceMount>
        <Dialog.Content
          forceMount
          onOpenAutoFocus={(e) => e.preventDefault()}
          onInteractOutside={(e) => e.preventDefault()}
          className={cn(
            "fixed z-100 w-[min(22rem,calc(100vw-1.25rem))] overflow-hidden rounded-2xl border border-white/12 bg-background/98 p-3 shadow-2xl backdrop-blur-xl outline-none",
            "left-auto right-3 top-1/2 max-h-[min(85vh,580px)] -translate-y-1/2 sm:right-5",
            "max-sm:top-auto max-sm:bottom-[calc(env(safe-area-inset-bottom,0px)+4.75rem)] max-sm:max-h-[min(52vh,440px)] max-sm:translate-y-0",
            "data-[state=closed]:pointer-events-none data-[state=closed]:opacity-0 data-[state=open]:opacity-100",
            "data-[state=closed]:scale-95 data-[state=open]:scale-100",
            "transition-[opacity,transform] duration-150 ease-out"
          )}
        >
          <Dialog.Title className="sr-only">{t("dialogTitle")}</Dialog.Title>
          <Dialog.Description className="sr-only">
            {t("dialogDescription")}
          </Dialog.Description>

          <div className="mb-2 flex items-center justify-between gap-2">
            <span className="text-[0.65rem] font-semibold uppercase tracking-wider text-white/45">
              {t("brand")}
            </span>
            <Dialog.Close
              type="button"
              className={cn(
                buttonVariants({ variant: "ghost", size: "icon" }),
                "size-8 shrink-0 rounded-full border border-white/10 text-white/75 hover:bg-white/10 hover:text-white"
              )}
              aria-label={t("closePlayer")}
            >
              <X className="size-4" aria-hidden />
            </Dialog.Close>
          </div>

          {!hasCustomPlaylist ? (
            <p className="mb-2 rounded-lg bg-white/5 px-2 py-1.5 text-center text-[0.65rem] leading-snug text-white/50">
              {t("defaultHint")}
            </p>
          ) : null}

          <iframe
            title={t("iframeTitle")}
            src={embedSrc}
            width="100%"
            height={352}
            loading="lazy"
            className="rounded-xl border-0 bg-black"
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
          />
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
