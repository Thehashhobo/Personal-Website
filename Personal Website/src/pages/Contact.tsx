import React from "react";
import { motion } from "motion/react";
import ContactForm from "../components/ContactForm";
import Reveal from "../components/Reveal";
import SplitLines from "../components/SplitLines";
import { SITE, SOCIALS } from "../data/site";
import { EASE_OUT } from "../lib/motion";
import styles from "./Contact.module.css";

const Contact: React.FC = () => (
  <div className={`shell ${styles.page}`}>
    <header className={styles.masthead}>
      <div className={styles.mastheadMeta}>
        <span>Contact</span>
        <span>Usually replies within a day</span>
      </div>

      <SplitLines
        as="h1"
        immediate
        className={styles.title}
        lines={["Tell me what", "you are building."]}
        delay={0.15}
      />
    </header>

    <div className={styles.layout}>
      <motion.aside
        className={styles.aside}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: EASE_OUT, delay: 0.45 }}
      >
        <p className={styles.blurb}>
          A product role, contract work, or a problem you are stuck on — the form reaches me
          directly. If you would rather skip it, everything below works just as well.
        </p>

        <dl className={styles.details}>
          <div>
            <dt>Email</dt>
            <dd>
              <a href={`mailto:${SITE.email}`}>{SITE.email}</a>
            </dd>
          </div>
          <div>
            <dt>Phone</dt>
            <dd>
              <a href={SITE.phoneHref}>{SITE.phone}</a>
            </dd>
          </div>
          <div>
            <dt>Based in</dt>
            <dd>{SITE.location}</dd>
          </div>
          <div>
            <dt>Elsewhere</dt>
            <dd className={styles.socials}>
              {SOCIALS.map((s) => (
                <a key={s.href} href={s.href} target="_blank" rel="noopener noreferrer">
                  {s.label}
                </a>
              ))}
            </dd>
          </div>
        </dl>
      </motion.aside>

      <Reveal className={styles.formWrap} delay={0.15}>
        <ContactForm />
      </Reveal>
    </div>
  </div>
);

export default Contact;
