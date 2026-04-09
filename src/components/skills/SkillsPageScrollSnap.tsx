"use client";

import { useEffect } from "react";

const SNAP_CLASSES = ["snap-y", "snap-proximity"] as const;

/**
 * Active le snap sur le scroll global (document), sans conteneur scroll interne
 * — évite la double barre tout en gardant un léger effet narratif sur /skills.
 */
export function SkillsPageScrollSnap(): null {
  useEffect(() => {
    const html = document.documentElement;
    for (const c of SNAP_CLASSES) {
      html.classList.add(c);
    }
    return () => {
      for (const c of SNAP_CLASSES) {
        html.classList.remove(c);
      }
    };
  }, []);

  return null;
}
