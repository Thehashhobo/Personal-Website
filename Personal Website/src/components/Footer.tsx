import React from "react";
import { Link } from "react-router-dom";
import { motion } from "motion/react";
import { NAV, SITE, SOCIALS } from "../data/site";
import { viewportOnce, EASE_OUT } from "../lib/motion";
import styles from "./Footer.module.css";

const YEAR = new Date().getFullYear();

/**
 * Inverted closing block. The oversized mail link is the page's last and
 * loudest call to action; everything below it is quiet metadata.
 */
const Footer: React.FC = () => (
  <footer className={styles.footer}>
    <div className={styles.inner}>
      <div className={styles.callout}>
        <span className={styles.label}>Get in touch</span>
        {/* The mask carries the scroll trigger. The link starts at y:110%,
            which parks it entirely outside the mask's overflow — zero clipped
            area, so IntersectionObserver never calls it visible and the reveal
            never fires. The mask itself is never clipped. */}
        <motion.span
          className={styles.mailMask}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
        >
          <motion.a
            href={`mailto:${SITE.email}`}
            className={styles.mail}
            variants={{
              hidden: { y: "110%" },
              visible: { y: "0%", transition: { duration: 1, ease: EASE_OUT } },
            }}
          >
            {SITE.email}
          </motion.a>
        </motion.span>
      </div>

      <div className={styles.columns}>
        <div className={styles.col}>
          <span className={styles.label}>Index</span>
          <ul>
            {NAV.map((item) => (
              <li key={item.to}>
                <Link to={item.to} className={styles.item}>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className={styles.col}>
          <span className={styles.label}>Elsewhere</span>
          <ul>
            {SOCIALS.map((s) => (
              <li key={s.href}>
                <a href={s.href} target="_blank" rel="noopener noreferrer" className={styles.item}>
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className={styles.col}>
          <span className={styles.label}>Direct</span>
          <ul>
            <li>
              <a href={SITE.phoneHref} className={styles.item}>
                {SITE.phone}
              </a>
            </li>
            <li>
              <a href={SITE.resume} download={SITE.resumeFilename} className={styles.item}>
                Résumé (PDF)
              </a>
            </li>
          </ul>
        </div>

        <div className={styles.col}>
          <span className={styles.label}>Based in</span>
          <ul>
            <li className={styles.item}>{SITE.location}</li>
            <li className={styles.item}>English &amp; Mandarin</li>
            <li className={styles.item}>Intermediate French</li>
          </ul>
        </div>
      </div>

      <div className={styles.baseline}>
        <span>
          © {YEAR} {SITE.name}
        </span>
        <span>
          Built with React and Vite · Hosted on{" "}
          <a href="https://pages.github.com/" target="_blank" rel="noopener noreferrer">
            GitHub Pages
          </a>
        </span>
      </div>
    </div>
  </footer>
);

export default Footer;
