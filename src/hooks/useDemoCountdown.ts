"use client";

import { useEffect, useState } from "react";
import { usePrefersReducedMotion } from "./usePrefersReducedMotion";

/**
 * Illustrative countdown for the page's mock UI. Ticks at 1 Hz, wraps back to
 * `wrapTo`, stops under reduced motion and while the tab is hidden.
 */
export function useDemoCountdown(start: number, wrapTo: number): number {
  const [left, setLeft] = useState(start);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    if (reduced) return;
    let id: ReturnType<typeof setInterval> | null = null;
    const run = () => {
      if (id !== null) clearInterval(id);
      id = null;
      if (document.visibilityState !== "visible") return;
      id = setInterval(() => setLeft((s) => (s > 0 ? s - 1 : wrapTo)), 1000);
    };
    run();
    document.addEventListener("visibilitychange", run);
    return () => {
      document.removeEventListener("visibilitychange", run);
      if (id !== null) clearInterval(id);
    };
  }, [reduced, wrapTo]);

  return left;
}
