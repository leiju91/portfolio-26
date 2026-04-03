"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import type { ReactElement } from "react";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { GradientPillFrame } from "@/components/ui/gradient-pill-frame";
import { homeProfile } from "@/data/home-profile";
import { cn } from "@/lib/utils";

import type { HomeMotionReadyProps } from "./types";

const easeOut = [0.22, 1, 0.36, 1] as const;

function initialsFromName(name: string): string {
  return (
    name
      .split(/\s+/)
      .filter(Boolean)
      .map((w) => w[0]?.toUpperCase() ?? "")
      .join("")
      .slice(0, 2) || "?"
  );
}

export function HomeProfileBadge({
  hydrated,
}: HomeMotionReadyProps): ReactElement {
  const { avatarSrc, name, title, openToWork } = homeProfile;
  const profileInitials = initialsFromName(name);

  const off = { opacity: 0, y: 18 };
  const on = { opacity: 1, y: 0 };

  return (
    <motion.div
      className="mt-16 flex w-full flex-col items-center sm:mt-24"
      initial={off}
      animate={hydrated ? on : off}
      transition={{ duration: 0.55, delay: 0.06, ease: easeOut }}
    >
      <motion.div
        className="flex w-full flex-col items-center text-center"
        initial={{ scale: 0.94, opacity: 0 }}
        animate={
          hydrated ? { scale: 1, opacity: 1 } : { scale: 0.94, opacity: 0 }
        }
        transition={{
          type: "spring",
          stiffness: 260,
          damping: 24,
          delay: 0.14,
        }}
      >
        <div className="relative shrink-0">
          <Avatar
            size="xl"
            className="border border-white/15 bg-linear-to-br from-muted to-background"
          >
            {avatarSrc ? (
              <AvatarImage src={avatarSrc} alt={`${name} profile photo`} />
            ) : null}
            <AvatarFallback className="grid place-items-center bg-linear-to-br from-muted to-background font-semibold text-white/90">
              {profileInitials}
            </AvatarFallback>
          </Avatar>
          <span
            className={cn(
              "absolute right-1 bottom-1 z-10 size-4 rounded-full border border-white/20 ring-2 ring-background sm:right-1.5 sm:bottom-1.5 sm:size-5",
              openToWork
                ? "bg-emerald-400 shadow-[0_0_12px_rgba(74,222,128,0.55)]"
                : "bg-red-500 shadow-[0_0_12px_rgba(239,68,68,0.55)]"
            )}
            title={openToWork ? "Available for work" : "Not available for work"}
            aria-label={
              openToWork ? "Available for work" : "Not available for work"
            }
          />
        </div>

        <p className="mt-6 text-xl font-bold tracking-tight text-white sm:text-2xl">
          {name}
        </p>
        <p className="mt-2 text-sm font-semibold text-violet-400 sm:text-[0.95rem]">
          {title}
        </p>

        <GradientPillFrame className="mt-6 w-fit">
          <Button asChild variant="navGlass" size="navPill">
            <Link href="/projects">View projects</Link>
          </Button>
        </GradientPillFrame>
      </motion.div>
    </motion.div>
  );
}
