"use client";

import { useEffect, useState } from "react";
import { HomeBriefStrip } from "@/components/home/HomeBriefStrip";
import { HomeProfileBadge } from "@/components/home/HomeProfileBadge";

export default function HomePage() {
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const id = requestAnimationFrame(() => setHydrated(true));
    return () => cancelAnimationFrame(id);
  }, []);

  return (
    <main
      id="main-content"
      className="flex flex-1 flex-col overflow-y-clip px-6 pb-2 pt-20 sm:pb-10 sm:pt-28"
      tabIndex={-1}
    >
      <div className="flex flex-1 flex-col items-center justify-center">
        <header className="flex w-full min-w-0 flex-col items-center text-center">
          <HomeProfileBadge hydrated={hydrated} />
          <HomeBriefStrip hydrated={hydrated} />
        </header>
      </div>
    </main>
  );
}
