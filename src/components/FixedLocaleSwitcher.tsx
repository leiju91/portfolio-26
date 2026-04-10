"use client";

import { LocaleSwitcher } from "@/components/LocaleSwitcher";

/**
 * Hors de la nav — coin supérieur droit, aligné verticalement avec la pill (~top-6).
 */
export function FixedLocaleSwitcher() {
  return (
    <div
      className="pointer-events-auto fixed top-19 right-4 z-50 sm:top-6 sm:right-6"
      data-fixed-locale-switcher
    >
      <LocaleSwitcher />
    </div>
  );
}
