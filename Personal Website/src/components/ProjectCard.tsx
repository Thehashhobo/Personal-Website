import React from "react";
import { motion } from "motion/react";
import type { Project } from "../data/projects";
import { CATEGORY_LABEL } from "../data/projects";
import ProjectMedia from "./ProjectMedia";
import { rise } from "../lib/motion";
import styles from "./ProjectCard.module.css";

type Props = { project: Project; index: string };

/**
 * Compact work card for the home page grid.
 *
 * The image scales inside a fixed well on hover while the well itself holds
 * still, so neighbouring cards never shift — the old design scaled the whole
 * card by 1.1 and pushed the grid around.
 *
 * Work with no public URL keeps the same shape but renders as a plain block,
 * so nothing invites a click that goes nowhere.
 */
const ProjectCard: React.FC<Props> = ({ project, index }) => {
  const external = project.link?.startsWith("http");

  const body = (
    <>
      <div className={styles.well}>
        <ProjectMedia project={project} size="md" />
        {project.metric && (
          <span className={styles.metric}>
            <strong>{project.metric.value}</strong>
            <span>{project.metric.label}</span>
          </span>
        )}
      </div>

      <div className={styles.meta}>
        <span className={styles.index}>{index}</span>
        <span className={styles.category}>{CATEGORY_LABEL[project.category]}</span>
      </div>

      <h3 className={styles.title}>{project.title}</h3>
      <p className={styles.tagline}>{project.tagline}</p>

      <ul className={styles.stack}>
        {project.technologies.slice(0, 4).map((tech) => (
          <li key={tech}>{tech}</li>
        ))}
      </ul>
    </>
  );

  return (
    <motion.article variants={rise} className={styles.card}>
      {project.link ? (
        <a
          className={styles.link}
          href={project.link}
          target={external ? "_blank" : undefined}
          rel={external ? "noopener noreferrer" : undefined}
        >
          {body}
        </a>
      ) : (
        <div className={styles.link}>{body}</div>
      )}
    </motion.article>
  );
};

export default ProjectCard;
