import React from "react";
import { motion } from "motion/react";
import { drawLine, viewportOnce } from "../lib/motion";
import styles from "./Rule.module.css";

type Props = {
  /** Hairline weight. `strong` for section dividers, `inverse` on dark ground. */
  tone?: "default" | "strong" | "inverse";
  delay?: number;
  className?: string;
};

/** A hairline that draws itself left-to-right when it scrolls into view. */
export const Rule: React.FC<Props> = ({ tone = "default", delay = 0, className }) => (
  <motion.span
    aria-hidden="true"
    className={[styles.rule, tone !== "default" ? styles[tone] : "", className].filter(Boolean).join(" ")}
    variants={drawLine}
    initial="hidden"
    whileInView="visible"
    viewport={viewportOnce}
    transition={{ delay }}
  />
);

export default Rule;
