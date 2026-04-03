"use client";

/** Current year from the browser clock; suppressHydrationWarning avoids noise if static HTML was built in a previous year. */
export function FooterYear() {
  const year = new Date().getFullYear();
  return (
    <time
      dateTime={String(year)}
      suppressHydrationWarning
      className="tabular-nums"
    >
      {year}
    </time>
  );
}
