import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import portrait from "../assets/My_photo.webp";
import { FEATURED, PROJECTS, numberOf } from "../data/projects";
import { SKILLS } from "../data/resume";
import { SITE } from "../data/site";
import ArrowLink from "../components/ArrowLink";
import Marquee from "../components/Marquee";
import ProjectCard from "../components/ProjectCard";
import Reveal, { RevealGroup, RevealItem } from "../components/Reveal";
import Rule from "../components/Rule";
import SectionHead from "../components/SectionHead";
import SplitLines from "../components/SplitLines";
import { EASE_OUT, viewportOnce } from "../lib/motion";
import styles from "./Home.module.css";

/** Outcomes, each taken verbatim from a résumé bullet. */
const STATS = [
  { value: "1,000+", label: "assessments graded per term" },
  { value: "5", label: "institutions onboarded" },
  { value: "0.91", label: "AUC on the speech classifier" },
  { value: "5 of 6", label: "supported deals closed" },
];

/** Product practice first, then the stack it is grounded in. */
const STACK = [
  "Discovery", "Requirements", "Roadmap", "Prioritization", "Backlog triage",
  "A/B testing", "Agile / Scrum", "Jira", "SQL", "React", "TypeScript",
  "Node.js", "Python", "Scikit-learn", "AWS", "Google Analytics",
];

const Home: React.FC = () => {
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });

  // The hero settles back as the page takes over, rather than simply leaving.
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const heroFade = useTransform(scrollYProgress, [0, 0.75], [1, 0]);

  return (
    <>
      {/* ---- Hero --------------------------------------------------------- */}
      <section className={styles.hero} ref={heroRef}>
        <motion.div className={`shell ${styles.heroInner}`} style={{ y: heroY, opacity: heroFade }}>
          <motion.div
            className={styles.heroEyebrow}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, ease: EASE_OUT, delay: 0.1 }}
          >
            <span>{SITE.name}</span>
            <Rule />
            <span>{SITE.location}</span>
          </motion.div>

          <SplitLines
            as="h1"
            immediate
            className={styles.heroTitle}
            lines={["Ownership from", "discovery to", "deployment."]}
            delay={0.25}
            each={0.1}
          />

          <div className={styles.heroFoot}>
            <motion.p
              className={styles.heroLead}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease: EASE_OUT, delay: 0.75 }}
            >
              Product Manager for an AI-graded oral assessment platform used by universities. I
              run discovery, set release criteria with the engineers, and build alongside them.
            </motion.p>

            <motion.div
              className={styles.heroActions}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease: EASE_OUT, delay: 0.85 }}
            >
              <ArrowLink to="/projects" variant="solid">
                Selected work
              </ArrowLink>
              <ArrowLink to="/resume">Résumé</ArrowLink>
            </motion.div>
          </div>
        </motion.div>

        <motion.div
          className={styles.heroStatus}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.05 }}
        >
          {/* <span className={styles.pulse} aria-hidden="true" />
          Currently Product Manager at The Bright Doctor */}
        </motion.div>
      </section>

      <Marquee items={STACK} />

      {/* ---- Profile ------------------------------------------------------ */}
      <section className="section shell" id="profile">
        <SectionHead
          index="01"
          label="Profile"
          lines={["Who I am,", "and what I do"]}
        />

        <div className={styles.profile}>
          <div className={styles.portrait}>
            <motion.div
              className={styles.portraitWell}
              initial={{ clipPath: "inset(100% 0 0 0)" }}
              whileInView={{ clipPath: "inset(0% 0 0 0)" }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 1.2, ease: EASE_OUT }}
            >
              <img src={portrait} alt={SITE.name} />
            </motion.div>
            <span className={styles.portraitCaption}>
              {SITE.name} — {SITE.location}
            </span>
          </div>

          <div className={styles.profileBody}>
            <Reveal>
              <p className={styles.profileLead}>
                University of Toronto graduate in Computer Science, Statistics and Economics, now{" "}
                <strong>
                  Product Manager for a B2B AI-graded oral assessment platform that universities use
                  to check the comprehension behind written coursework.
                </strong>{" "}
                I define model release criteria with engineers, contribute to model and application
                development directly, and run technical discovery with non-technical buyers — which
                mostly means turning what instructors actually do into scope a team can build.
              </p>
            </Reveal>

            <RevealGroup className={styles.stats} as="ul" each={0.08}>
              {STATS.map((stat) => (
                <RevealItem as="li" key={stat.label} className={styles.stat}>
                  <span className={styles.statValue}>{stat.value}</span>
                  <span className={styles.statLabel}>{stat.label}</span>
                </RevealItem>
              ))}
            </RevealGroup>
          </div>
        </div>
      </section>

      {/* ---- Selected work ------------------------------------------------ */}
      <section className="section shell" id="work">
        <SectionHead
          index="02"
          label="Selected work"
          lines={["Four projects", "worth your time"]}
          note="The product I run today, a client platform rebuilt around the wrong brief, an app I validated before writing it, and a rendering problem I could not put down."
        />

        <RevealGroup className={styles.workGrid} each={0.1}>
          {FEATURED.map((project) => (
            <ProjectCard key={project.id} project={project} index={numberOf(project)} />
          ))}
        </RevealGroup>

        <Reveal className={styles.workFoot} delay={0.1}>
          <Rule />
          <ArrowLink to="/projects">All {PROJECTS.length} projects</ArrowLink>
        </Reveal>
      </section>

      {/* ---- Capabilities -------------------------------------------------- */}
      <section className="section shell" id="capabilities">
        <SectionHead
          index="03"
          label="Capabilities"
          lines={["What I bring", "to a product team"]}
        />

        <RevealGroup className={styles.capabilities} as="ul" each={0.12}>
          {SKILLS.map((group, i) => (
            <RevealItem as="li" key={group.label} className={styles.capability}>
              <span className={styles.capabilityIndex}>{String(i + 1).padStart(2, "0")}</span>
              <h3 className={styles.capabilityTitle}>{group.label}</h3>
              <ul className={styles.capabilityItems}>
                {group.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </RevealItem>
          ))}
        </RevealGroup>
      </section>

      {/* ---- Contact ------------------------------------------------------- */}
      <section className={`section shell ${styles.cta}`} id="contact">
        <Rule tone="strong" />
        <motion.div
          className={styles.ctaInner}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={viewportOnce}
          transition={{ duration: 0.8 }}
        >
          <SplitLines
            as="h2"
            className={styles.ctaTitle}
            lines={["Have something", "worth building?"]}
          />
          <div className={styles.ctaActions}>
            <ArrowLink to="/contact" variant="solid">
              Start a conversation
            </ArrowLink>
            <ArrowLink href={`mailto:${SITE.email}`}>{SITE.email}</ArrowLink>
          </div>
        </motion.div>
      </section>
    </>
  );
};

export default Home;
