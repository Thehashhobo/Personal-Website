import React, { useMemo, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import type { Category } from "../data/projects";
import { CATEGORY_LABEL, FEATURED, INDEXED, PROJECTS, numberOf } from "../data/projects";
import FeaturedProject from "../components/FeaturedProject";
import ProjectRow from "../components/ProjectRow";
import Reveal from "../components/Reveal";
import Rule from "../components/Rule";
import SectionHead from "../components/SectionHead";
import SplitLines from "../components/SplitLines";
import { EASE_OUT } from "../lib/motion";
import styles from "./Projects.module.css";

type Filter = "all" | Category;

/** Only offer filters that actually match something in the index. */
const FILTERS: Filter[] = ["all", "current", "contract", "personal", "academic"];

const Projects: React.FC = () => {
  const [filter, setFilter] = useState<Filter>("all");

  const counts = useMemo(() => {
    const map = { all: INDEXED.length } as Record<Filter, number>;
    for (const f of FILTERS) {
      if (f !== "all") map[f] = INDEXED.filter((p) => p.category === f).length;
    }
    return map;
  }, []);

  const visible = useMemo(
    () => (filter === "all" ? INDEXED : INDEXED.filter((p) => p.category === filter)),
    [filter]
  );

  return (
    <>
      <header className={`shell ${styles.masthead}`}>
        <div className={styles.mastheadMeta}>
          <span>Work</span>
          <span>
            {PROJECTS.length} projects · {FEATURED.length} featured
          </span>
        </div>
        <SplitLines
          as="h1"
          immediate
          className={styles.mastheadTitle}
          lines={["Products I have", "scoped, built", "and shipped."]}
          delay={0.15}
        />
      </header>

      {/* ---- Featured case studies ---------------------------------------- */}
      <section className="shell" aria-labelledby="featured-heading">
        <h2 id="featured-heading" className="label">
          Featured
        </h2>
        <Rule tone="strong" />
        {FEATURED.map((project, i) => (
          <FeaturedProject
            key={project.id}
            project={project}
            index={numberOf(project)}
            flipped={i % 2 === 1}
          />
        ))}
      </section>

      {/* ---- Filterable index ---------------------------------------------- */}
      <section className="section shell" aria-labelledby="index-heading">
        <SectionHead
          index="—"
          label="Index"
          lines={["Everything else"]}
          note="Client platforms, personal builds and university projects. Each row links straight to the live site or the repository."
        />
        <h2 id="index-heading" className={styles.srOnly}>
          Project index
        </h2>

        <Reveal className={styles.filters}>
          <div role="group" aria-label="Filter projects by category">
            {FILTERS.map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`${styles.filter} ${filter === f ? styles.filterActive : ""}`}
                aria-pressed={filter === f}
                disabled={counts[f] === 0}
              >
                {f === "all" ? "All" : CATEGORY_LABEL[f]}
                <sup>{counts[f]}</sup>
                {filter === f && (
                  <motion.span
                    layoutId="filter-underline"
                    className={styles.filterUnderline}
                    transition={{ duration: 0.45, ease: EASE_OUT }}
                  />
                )}
              </button>
            ))}
          </div>
        </Reveal>

        <motion.ul layout className={styles.index}>
          <AnimatePresence mode="popLayout" initial={false}>
            {visible.map((project) => (
              <motion.li
                key={project.id}
                layout
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.4, ease: EASE_OUT }}
              >
                <ProjectRow project={project} index={numberOf(project)} />
              </motion.li>
            ))}
          </AnimatePresence>
        </motion.ul>
      </section>
    </>
  );
};

export default Projects;
