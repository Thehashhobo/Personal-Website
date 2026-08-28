import React, { useRef } from "react";
import { motion, useScroll, useSpring } from "motion/react";
import { EDUCATION, EXPERIENCE, LANGUAGES, SKILLS, SUMMARY } from "../data/resume";
import { SITE, SOCIALS } from "../data/site";
import ArrowLink from "../components/ArrowLink";
import Reveal, { RevealGroup, RevealItem } from "../components/Reveal";
import RichText from "../components/RichText";
import Rule from "../components/Rule";
import SplitLines from "../components/SplitLines";
import { EASE_OUT, viewportOnce } from "../lib/motion";
import styles from "./Resume.module.css";

/**
 * The résumé as typography rather than an embedded PDF.
 *
 * The old page dropped the raw PDF into an 800px iframe, which was unreadable
 * on a phone and invisible to search. Content lives in data/resume.ts; the PDF
 * remains downloadable and authoritative.
 */
const Resume: React.FC = () => {
  const bodyRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: bodyRef,
    offset: ["start center", "end end"],
  });
  // Spring the raw progress so the rail glides rather than snapping per frame.
  const progress = useSpring(scrollYProgress, { stiffness: 90, damping: 26, restDelta: 0.001 });

  return (
    <>
      <header className={`shell ${styles.masthead}`}>
        <div className={styles.mastheadMeta}>
          <span>Résumé</span>
          <span>{SITE.location}</span>
        </div>

        <SplitLines
          as="h1"
          immediate
          className={styles.mastheadTitle}
          lines={["Jerry Wang"]}
          delay={0.15}
        />

        <motion.div
          className={styles.mastheadFoot}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: EASE_OUT, delay: 0.45 }}
        >
          <p className={styles.summary}>{SUMMARY}</p>

          <div className={styles.mastheadActions}>
            <ArrowLink href={SITE.resume} download={SITE.resumeFilename} variant="solid">
              Download PDF
            </ArrowLink>
            <ArrowLink href={`mailto:${SITE.email}`}>{SITE.email}</ArrowLink>
          </div>
        </motion.div>

        <ul className={styles.contactStrip}>
          <li>
            <a href={SITE.phoneHref}>{SITE.phone}</a>
          </li>
          {SOCIALS.slice(0, 2).map((s) => (
            <li key={s.href}>
              <a href={s.href} target="_blank" rel="noopener noreferrer">
                {s.label}
              </a>
            </li>
          ))}
          <li>{LANGUAGES}</li>
        </ul>
      </header>

      <div className={`shell ${styles.body}`} ref={bodyRef}>
        {/* A hairline that fills as you read. */}
        <div className={styles.rail} aria-hidden="true">
          <motion.span className={styles.railFill} style={{ scaleY: progress }} />
        </div>

        <div className={styles.content}>
          {/* ---- Experience ------------------------------------------------ */}
          <section className={styles.group} aria-labelledby="experience">
            <div className={styles.groupHead}>
              <h2 id="experience" className={styles.groupTitle}>
                Experience
              </h2>
              <Rule />
            </div>

            {EXPERIENCE.map((role) => (
              <Reveal key={`${role.org}-${role.period}`} as="article" className={styles.role}>
                <div className={styles.rolePeriod}>{role.period}</div>

                <div className={styles.roleBody}>
                  <h3 className={styles.roleTitle}>
                    {role.title}
                    <span className={styles.roleOrg}>{role.org}</span>
                  </h3>

                  <RevealGroup as="ul" className={styles.points} each={0.06}>
                    {role.points.map((point, i) => (
                      <RevealItem as="li" key={i}>
                        <span className={styles.bullet} aria-hidden="true" />
                        <span>
                          <RichText text={point} />
                        </span>
                      </RevealItem>
                    ))}
                  </RevealGroup>
                </div>
              </Reveal>
            ))}
          </section>

          {/* ---- Education -------------------------------------------------- */}
          <section className={styles.group} aria-labelledby="education">
            <div className={styles.groupHead}>
              <h2 id="education" className={styles.groupTitle}>
                Education &amp; Certification
              </h2>
              <Rule />
            </div>

            {EDUCATION.map((item) => (
              <Reveal key={item.title} as="article" className={styles.credential}>
                <h3 className={styles.credentialTitle}>{item.title}</h3>
                <span className={styles.credentialOrg}>{item.org}</span>
                <p className={styles.credentialDetail}>{item.detail}</p>
              </Reveal>
            ))}
          </section>

          {/* ---- Skills ----------------------------------------------------- */}
          <section className={styles.group} aria-labelledby="skills">
            <div className={styles.groupHead}>
              <h2 id="skills" className={styles.groupTitle}>
                Core competencies
              </h2>
              <Rule />
            </div>

            <div className={styles.skills}>
              {SKILLS.map((group) => (
                <Reveal key={group.label} className={styles.skillGroup}>
                  <span className={styles.skillLabel}>{group.label}</span>
                  <motion.ul
                    className={styles.skillItems}
                    initial="hidden"
                    whileInView="visible"
                    viewport={viewportOnce}
                    variants={{ visible: { transition: { staggerChildren: 0.04 } } }}
                  >
                    {group.items.map((item) => (
                      <motion.li
                        key={item}
                        variants={{
                          hidden: { opacity: 0, y: 8 },
                          visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE_OUT } },
                        }}
                      >
                        {item}
                      </motion.li>
                    ))}
                  </motion.ul>
                </Reveal>
              ))}
            </div>
          </section>

          <Reveal className={styles.footNote}>
            <Rule tone="strong" />
            <p>
              This page mirrors the PDF. For the formatted original,{" "}
              <a href={SITE.resume} download={SITE.resumeFilename}>
                download it here
              </a>
              .
            </p>
          </Reveal>
        </div>
      </div>
    </>
  );
};

export default Resume;
