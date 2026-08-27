import type { Transition, Variants } from "motion/react";

/**
 * House motion language.
 *
 * One curve (expo-out) and three durations do almost all the work — the
 * "fluidity" of the site comes from everything sharing the same deceleration,
 * not from each component inventing its own spring.
 */

export const EASE_OUT = [0.16, 1, 0.3, 1] as const;
export const EASE_IN_OUT = [0.65, 0, 0.35, 1] as const;

export const transition = {
  fast: { duration: 0.35, ease: EASE_OUT },
  base: { duration: 0.75, ease: EASE_OUT },
  slow: { duration: 1.1, ease: EASE_OUT },
} satisfies Record<string, Transition>;

/** Viewport config shared by every scroll reveal, so nothing pops in early. */
export const viewportOnce = { once: true, amount: 0.25, margin: "0px 0px -12% 0px" };

/** Rise + fade. The default entrance for any block of content. */
export const rise: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: transition.base },
};

/** Parent that walks its children in one after another. */
export const stagger = (each = 0.07, delay = 0): Variants => ({
  hidden: {},
  visible: { transition: { staggerChildren: each, delayChildren: delay } },
});

/**
 * A single line of display type sliding up out of its own overflow-hidden
 * mask. Pair with `.mask { overflow: hidden }` on the wrapping element.
 */
export const maskedLine: Variants = {
  hidden: { y: "110%" },
  visible: { y: "0%", transition: { duration: 1, ease: EASE_OUT } },
};

/** A rule that draws itself from left to right. */
export const drawLine: Variants = {
  hidden: { scaleX: 0 },
  visible: { scaleX: 1, transition: { duration: 1.1, ease: EASE_OUT } },
};

/** Route-level cross-fade. Short, because it blocks perceived navigation. */
export const pageTransition: Variants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE_OUT } },
  exit: { opacity: 0, y: -8, transition: { duration: 0.3, ease: EASE_IN_OUT } },
};
