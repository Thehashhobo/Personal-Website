import React, { useRef, useState } from "react";
import { AnimatePresence, motion, useMotionValue, useSpring } from "motion/react";
import type { Project } from "../data/projects";
import ProjectMedia from "./ProjectMedia";
import { EASE_OUT } from "../lib/motion";
import styles from "./ProjectRow.module.css";

type Props = { project: Project; index: string };

/**
 * One line of the work index.
 *
 * The row is pure type; the artwork only appears as a small plate that trails
 * the cursor while hovering. Tracking the pointer through motion values (not
 * React state) keeps the follow at 60fps — a re-render per mousemove would
 * not. The plate is suppressed on coarse pointers, where there is no cursor
 * to follow and the row simply highlights instead.
 */
const ProjectRow: React.FC<Props> = ({ project, index }) => {
  const [hovered, setHovered] = useState(false);
  const rowRef = useRef<HTMLAnchorElement>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  // A soft spring makes the plate lag the cursor, which reads as weight.
  const px = useSpring(x, { stiffness: 260, damping: 32, mass: 0.6 });
  const py = useSpring(y, { stiffness: 260, damping: 32, mass: 0.6 });

  const handleMove = (e: React.MouseEvent) => {
    const rect = rowRef.current?.getBoundingClientRect();
    if (!rect) return;
    x.set(e.clientX - rect.left);
    y.set(e.clientY - rect.top);
  };

  const external = project.link?.startsWith("http");

  return (
    <a
      ref={rowRef}
      className={styles.row}
      href={project.link}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onMouseMove={handleMove}
    >
      <span className={styles.index}>{index}</span>

      <span className={styles.title}>{project.title}</span>

      <span className={styles.tagline}>{project.tagline}</span>

      <span className={styles.stack}>
        {project.technologies.slice(0, 3).join(" · ")}
      </span>

      <span className={styles.chevron} aria-hidden="true">
        <svg viewBox="0 0 16 16" width="14" height="14">
          <path
            d="M3 13L13 3M13 3H5.5M13 3v7.5"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.4"
            strokeLinecap="square"
          />
        </svg>
      </span>

      <AnimatePresence>
        {hovered && (
          <motion.span
            className={styles.plate}
            style={{ x: px, y: py }}
            initial={{ opacity: 0, scale: 0.86 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.92 }}
            transition={{ duration: 0.4, ease: EASE_OUT }}
            aria-hidden="true"
          >
            <ProjectMedia project={project} alt="" size="sm" />
          </motion.span>
        )}
      </AnimatePresence>
    </a>
  );
};

export default ProjectRow;
