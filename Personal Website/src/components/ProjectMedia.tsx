import React from "react";
import { motion, type MotionStyle } from "motion/react";
import type { Project } from "../data/projects";
import styles from "./ProjectMedia.module.css";

type Props = {
  project: Project;
  /**
   * Parallax offset from the caller. Applied to photography only — callers
   * over-scale the image so the drift never uncovers an edge, and drifting
   * type against a fixed well would just read as a rendering fault.
   */
  style?: MotionStyle;
  /** Pass "" to mark the media decorative, as the cursor plate does. */
  alt?: string;
  /** Plate typography scales with the well it sits in. */
  size?: "sm" | "md" | "lg";
};

/**
 * Artwork for a project well.
 *
 * Commercial work has no screenshot to show and no URL to open, but it still
 * has to occupy the well — borrowing another project's image would be a lie,
 * and an empty well reads as a broken asset. Projects without `image` render a
 * typographic plate built from `plate` instead.
 */
const ProjectMedia: React.FC<Props> = ({ project, style, alt, size = "md" }) => {
  if (project.image) {
    return (
      <motion.img
        src={project.image}
        alt={alt ?? `${project.title} — project preview`}
        style={style}
        loading="lazy"
      />
    );
  }

  const mark = project.plate?.mark ?? project.title;
  const note = project.plate?.note ?? "No public demo";
  const decorative = alt === "";

  return (
    <span
      className={`${styles.plate} ${styles[size]}`}
      role={decorative ? "presentation" : "img"}
      aria-label={decorative ? undefined : `${project.title} — ${note}`}
    >
      <span className={styles.mark} aria-hidden="true">
        {mark}
      </span>
      <span className={styles.note} aria-hidden="true">
        {note}
      </span>
    </span>
  );
};

export default ProjectMedia;
