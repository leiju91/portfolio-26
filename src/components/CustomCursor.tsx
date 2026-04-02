"use client";

import { useEffect, useRef, useState } from "react";

const INTERACTIVE =
  'a, button, [role="button"], input, textarea, select, label[for], summary, [data-cursor-hover]';

export function CustomCursor() {
  const ringRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);

  const targetRef = useRef({ x: 0, y: 0 });
  const ringPosRef = useRef({ x: 0, y: 0 });
  const hoverRef = useRef(false);
  const visibleRef = useRef(false);
  const rafRef = useRef(0);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)");
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (!fine.matches || reduce.matches) return;
    setActive(true);
  }, []);

  useEffect(() => {
    if (!active) return;

    const ringEl = ringRef.current;
    const dotEl = dotRef.current;
    if (!ringEl || !dotEl) return;

    const lerp = 0.18;

    const onMove = (e: MouseEvent) => {
      targetRef.current = { x: e.clientX, y: e.clientY };
      visibleRef.current = true;
      const el = document.elementFromPoint(e.clientX, e.clientY);
      hoverRef.current = !!el?.closest(INTERACTIVE);
    };

    const onLeave = () => {
      visibleRef.current = false;
    };

    const tick = () => {
      const t = targetRef.current;
      const r = ringPosRef.current;
      r.x += (t.x - r.x) * lerp;
      r.y += (t.y - r.y) * lerp;

      const scale = hoverRef.current ? 1.65 : 1;
      const opacity = visibleRef.current ? 1 : 0;

      dotEl.style.opacity = String(opacity);
      ringEl.style.opacity = String(opacity);
      dotEl.style.transform = `translate(${t.x}px, ${t.y}px) translate(-50%, -50%)`;
      ringEl.style.transform = `translate(${r.x}px, ${r.y}px) translate(-50%, -50%) scale(${scale})`;

      rafRef.current = requestAnimationFrame(tick);
    };

    document.body.style.cursor = "none";
    document.body.classList.add("custom-cursor-active");
    window.addEventListener("mousemove", onMove);
    document.documentElement.addEventListener("mouseleave", onLeave);
    rafRef.current = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("mousemove", onMove);
      document.documentElement.removeEventListener("mouseleave", onLeave);
      cancelAnimationFrame(rafRef.current);
      document.body.style.cursor = "";
      document.body.classList.remove("custom-cursor-active");
    };
  }, [active]);

  if (!active) return null;

  return (
    <>
      <div
        ref={ringRef}
        className="custom-cursor-ring pointer-events-none fixed left-0 top-0 z-10050"
        aria-hidden
      />
      <div
        ref={dotRef}
        className="custom-cursor-dot pointer-events-none fixed left-0 top-0 z-10051"
        aria-hidden
      />
    </>
  );
}
