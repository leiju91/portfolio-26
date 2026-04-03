"use client";

import { AudioLines } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";

const COLORS = [
  "rgb(52, 211, 153)",
  "rgb(34, 211, 238)",
  "rgb(232, 121, 249)",
  "rgb(52, 211, 153)",
] as const;

export function FooterSpotifyMusicIcon() {
  const reduceMotion = useReducedMotion();

  return (
    <motion.span
      className="inline-flex will-change-[color,transform]"
      aria-hidden
      initial={false}
      animate={
        reduceMotion
          ? { color: COLORS[0], scale: 1 }
          : {
              color: [...COLORS],
              scale: [1, 1.08, 1],
            }
      }
      transition={
        reduceMotion
          ? undefined
          : {
              color: {
                duration: 5.5,
                repeat: Infinity,
                ease: "linear",
              },
              scale: {
                duration: 2.2,
                repeat: Infinity,
                ease: [0.45, 0, 0.55, 1],
              },
            }
      }
    >
      <AudioLines className="size-5" stroke="currentColor" strokeWidth={2} />
    </motion.span>
  );
}
