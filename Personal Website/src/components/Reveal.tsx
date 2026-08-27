import React from "react";
import { motion } from "motion/react";
import { rise, stagger, viewportOnce, transition } from "../lib/motion";

type Props = {
  children: React.ReactNode;
  /** Seconds to hold before starting. */
  delay?: number;
  /** Distance travelled, in px. */
  y?: number;
  className?: string;
  as?: "div" | "section" | "li" | "ul" | "article" | "header" | "footer";
};

/**
 * The default entrance: a short rise and fade, fired once when the element
 * reaches the viewport. Everything on the site uses the same curve and
 * distance so scrolling feels like one continuous system.
 */
export const Reveal: React.FC<Props> = ({ children, delay = 0, y = 28, className, as = "div" }) => {
  const Tag = motion[as];
  return (
    <Tag
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={viewportOnce}
      transition={{ ...transition.base, delay }}
    >
      {children}
    </Tag>
  );
};

/**
 * Wraps a list whose children should walk in one after another. Children must
 * be <RevealItem> (or any element using the `rise` variants).
 */
export const RevealGroup: React.FC<Props & { each?: number }> = ({
  children,
  className,
  delay = 0,
  each = 0.07,
  as = "div",
}) => {
  const Tag = motion[as];
  return (
    <Tag
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      variants={stagger(each, delay)}
    >
      {children}
    </Tag>
  );
};

export const RevealItem: React.FC<Omit<Props, "delay">> = ({ children, className, as = "div" }) => {
  const Tag = motion[as];
  return (
    <Tag className={className} variants={rise}>
      {children}
    </Tag>
  );
};

export default Reveal;
