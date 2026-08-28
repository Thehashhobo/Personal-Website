import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import type { Project } from "../data/projects";
import { CATEGORY_LABEL } from "../data/projects";
import ArrowLink from "./ArrowLink";
import ProjectMedia from "./ProjectMedia";
import Rule from "./Rule";
import { RevealGroup, RevealItem } from "./Reveal";
import styles from "./FeaturedProject.module.css";

type Props = { project: Project; index: string; flipped?: boolean };

/**
 * Full case-study block for a featured project.
 *
 * The image sits in a fixed-ratio well and drifts slightly slower than the
 * page as the block passes through the viewport. The offset is deliberately
 * small (7%) — enough to feel alive, not enough to read as a gimmick — and
 * the image is over-scaled to 114% so the drift never exposes an edge.
 */
const FeaturedProject: React.FC<Props> = ({ project, index, flipped }) => {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const imageY = useTransform(scrollYProgress, [0, 1], ["-7%", "7%"]);

  return (
    <article ref={ref} className={`${styles.block} ${flipped ? styles.flipped : ""}`}>
      <div className={styles.media}>
        <motion.div
          className={styles.well}
          initial={{ clipPath: "inset(12% 0% 12% 0%)" }}
          whileInView={{ clipPath: "inset(0% 0% 0% 0%)" }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        >
          <ProjectMedia project={project} style={{ y: imageY }} size="lg" />
        </motion.div>
      </div>

      <RevealGroup className={styles.body} each={0.06}>
        <RevealItem>
          <div className={styles.eyebrow}>
            <span>{index}</span>
            <Rule />
            <span>{CATEGORY_LABEL[project.category]}</span>
          </div>
        </RevealItem>

        <RevealItem>
          <h3 className={styles.title}>{project.title}</h3>
        </RevealItem>

        {(project.metric || project.role) && (
          <RevealItem>
            <div className={styles.stats}>
              {project.metric && (
                <span className={styles.metric}>
                  <strong>{project.metric.value}</strong>
                  {project.metric.label}
                </span>
              )}
              {project.role && <span className={styles.role}>{project.role}</span>}
            </div>
          </RevealItem>
        )}

        <RevealItem>
          <p className={styles.description}>{project.description}</p>
        </RevealItem>

        <RevealItem>
          <ul className={styles.points}>
            {project.points.slice(0, 3).map((point, i) => (
              <li key={i}>
                <span className={styles.bullet} aria-hidden="true" />
                {point}
              </li>
            ))}
          </ul>
        </RevealItem>

        <RevealItem>
          <ul className={styles.stack}>
            {project.technologies.map((tech) => (
              <li key={tech}>{tech}</li>
            ))}
          </ul>
        </RevealItem>

        <RevealItem>
          <div className={styles.actions}>
            {/* Work without a public URL points at the résumé rather than nowhere. */}
            {project.link ? (
              <ArrowLink href={project.link} variant="solid">
                View project
              </ArrowLink>
            ) : (
              <ArrowLink to="/resume" variant="solid">
                Read the full role
              </ArrowLink>
            )}
            {project.extraLink && (
              <ArrowLink href={project.extraLink}>{project.extraLinkLabel ?? "Also see"}</ArrowLink>
            )}
          </div>
        </RevealItem>
      </RevealGroup>
    </article>
  );
};

export default FeaturedProject;
