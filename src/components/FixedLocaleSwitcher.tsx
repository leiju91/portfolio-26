"use client";

import { LocaleSwitcher } from "@/components/LocaleSwitcher";

/**
 * Hors de la nav — coin supérieur droit, aligné verticalement avec la pill (~top-6).
 */
export function FixedLocaleSwitcher() {
  return (
    <div
      className="pointer-events-auto fixed top-6 right-6 z-50 hidden sm:block"
      data-fixed-locale-switcher
    >
      <LocaleSwitcher />
    </div>
  );
}
