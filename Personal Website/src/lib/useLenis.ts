import { useEffect } from "react";
import Lenis from "lenis";

let instance: Lenis | null = null;

/** Scroll to an absolute offset (or element) through Lenis, if it is running. */
export function scrollTo(target: number | string | HTMLElement, offset = 0) {
  if (instance) instance.scrollTo(target, { offset, duration: 1.2 });
  else if (typeof target === "number") window.scrollTo({ top: target });
}

/** Jump to the top with no animation. Used on route change. */
export function resetScroll() {
  if (instance) instance.scrollTo(0, { immediate: true });
  window.scrollTo(0, 0);
  document.documentElement.scrollTop = 0;
  document.body.scrollTop = 0;
}

export function stopScroll() { instance?.stop(); }
export function startScroll() { instance?.start(); }

/**
 * Mounts a single global Lenis instance driving inertial scrolling.
 *
 * Skipped entirely when the visitor asks for reduced motion — hijacking the
 * scroll is exactly the kind of thing that setting exists to prevent.
 */
export function useSmoothScroll() {
  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    const lenis = new Lenis({
      duration: 1.05,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      touchMultiplier: 1.6,
    });
    instance = lenis;

    let frame = 0;
    const raf = (time: number) => {
      lenis.raf(time);
      frame = requestAnimationFrame(raf);
    };
    frame = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(frame);
      lenis.destroy();
      instance = null;
    };
  }, []);
}
