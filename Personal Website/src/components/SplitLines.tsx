import React from "react";
import { motion } from "motion/react";
import { maskedLine, viewportOnce } from "../lib/motion";
import styles from "./SplitLines.module.css";

type Props = {
  /** One string per visual line — line breaks are authored, never guessed. */
  lines: string[];
  className?: string;
  /** Seconds before the first line moves. */
  delay?: number;
  /** Seconds between consecutive lines. */
  each?: number;
  /** Animate on mount instead of on scroll. Use for above-the-fold headings. */
  immediate?: boolean;
  as?: "h1" | "h2" | "h3" | "p";
};

/**
 * Display type that slides up out of its own mask, one line at a time.
 *
 * Each line sits in an overflow-hidden wrapper, so the type appears to be
 * revealed by the page rather than flown in over it. The whole phrase is
 * exposed to assistive tech as a single string via aria-label; the animated
 * spans are hidden from it.
 */
export const SplitLines: React.FC<Props> = ({
  lines,
  className,
  delay = 0,
  each = 0.09,
  immediate = false,
  as: Tag = "h2",
}) => {
  const animation = immediate
    ? { initial: "hidden" as const, animate: "visible" as const }
    : { initial: "hidden" as const, whileInView: "visible" as const, viewport: viewportOnce };

  return (
    <Tag className={className} aria-label={lines.join(" ")}>
      {lines.map((line, i) => (
        <span key={i} className={styles.mask} aria-hidden="true">
          <motion.span
            className={styles.line}
            variants={maskedLine}
            transition={{ delay: delay + i * each }}
            {...animation}
          >
            {line}
          </motion.span>
        </span>
      ))}
    </Tag>
  );
};

export default SplitLines;
