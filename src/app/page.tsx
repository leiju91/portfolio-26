"use client";

import { useEffect, useState } from "react";
import { HomeBriefStrip } from "@/components/home/HomeBriefStrip";
import { HomeProfileBadge } from "@/components/home/HomeProfileBadge";

export default function HomePage() {
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setHydrated(true);
  }, []);

  return (
    <main
      id="home"
      className="flex flex-1 flex-col px-6 pb-10 pt-28"
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
