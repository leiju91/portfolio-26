"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { HomeBriefStrip } from "@/components/home/HomeBriefStrip";
import { HomeProfileBadge } from "@/components/home/HomeProfileBadge";

const easeOut = [0.22, 1, 0.36, 1] as const;

const titleContainer = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.11, delayChildren: 0.04 },
  },
};

const titleLine = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.62, ease: easeOut },
  },
};

export default function HomePage() {
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setHydrated(true);
  }, []);

  return (
    <main
      id="home"
      className="flex min-h-screen flex-col px-6 pb-10 pt-28"
    >
      <div className="flex flex-1 flex-col items-center justify-center">
        <header className="flex w-full min-w-0 flex-col items-center text-center">
          <motion.h1
            className="text-balance text-3xl font-semibold tracking-tight text-white sm:text-4xl"
            variants={titleContainer}
            initial="hidden"
            animate={hydrated ? "visible" : "hidden"}
          >
            <motion.span
              variants={titleLine}
              className="inline-block bg-linear-to-r from-white via-white to-white/75 bg-clip-text text-transparent"
            >
              Creative Web Developer
            </motion.span>{" "}
            <motion.span
              variants={titleLine}
              className="inline-block font-normal text-white/40"
              aria-hidden
            >
              |
            </motion.span>{" "}
            <motion.span variants={titleLine} className="inline-block text-white/90">
              Design &amp; Code <span aria-hidden>💻🎨</span>
            </motion.span>
          </motion.h1>

          <HomeProfileBadge hydrated={hydrated} />
          <HomeBriefStrip hydrated={hydrated} />
        </header>
      </div>
    </main>
  );
}
