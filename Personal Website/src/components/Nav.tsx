import React, { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react";
import { NAV, SITE, SOCIALS } from "../data/site";
import { EASE_OUT } from "../lib/motion";
import { startScroll, stopScroll } from "../lib/useLenis";
import styles from "./Nav.module.css";

/**
 * Sticky masthead.
 *
 * Two behaviours carry the "fluid" feel: the bar condenses once the page has
 * moved (height, hairline, translucency), and the desktop nav marks the active
 * route with a single underline that travels between items via a shared
 * layoutId rather than fading in place.
 */
const Nav: React.FC = () => {
  const [condensed, setCondensed] = useState(false);
  const [open, setOpen] = useState(false);
  const { scrollY } = useScroll();
  const location = useLocation();

  useMotionValueEvent(scrollY, "change", (y) => setCondensed(y > 24));

  // Close the drawer on navigation.
  useEffect(() => setOpen(false), [location.pathname]);

  // Freeze the page behind the open drawer, and restore on close/unmount.
  // Lenis does not exist under prefers-reduced-motion, so lock the body too
  // rather than relying on stopScroll() alone.
  useEffect(() => {
    if (open) {
      stopScroll();
      document.body.style.overflow = "hidden";
    } else {
      startScroll();
      document.body.style.overflow = "";
    }
    return () => {
      startScroll();
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <>
      <header className={`${styles.bar} ${condensed ? styles.condensed : ""}`}>
        <div className={styles.inner}>
          <Link to="/" className={styles.wordmark} aria-label={`${SITE.name} — home`}>
            <span className={styles.wordmarkFull}>{SITE.name}</span>
            <span className={styles.wordmarkMeta} aria-hidden="true">
              {`Product Manager`}
            </span>
          </Link>

          <nav className={styles.links} aria-label="Primary">
            {NAV.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === "/"}
                className={({ isActive }) => `${styles.navLink} ${isActive ? styles.active : ""}`}
              >
                {({ isActive }) => (
                  <>
                    <span>{item.label}</span>
                    {isActive && (
                      <motion.span
                        layoutId="nav-underline"
                        className={styles.underline}
                        transition={{ duration: 0.5, ease: EASE_OUT }}
                      />
                    )}
                  </>
                )}
              </NavLink>
            ))}
          </nav>

          <button
            className={`${styles.toggle} ${open ? styles.toggleOpen : ""}`}
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="nav-drawer"
            aria-label={open ? "Close menu" : "Open menu"}
          >
            <span aria-hidden="true" />
            <span aria-hidden="true" />
          </button>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            id="nav-drawer"
            className={styles.drawer}
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.6, ease: EASE_OUT }}
          >
            <nav className={styles.drawerLinks} aria-label="Primary, mobile">
              {NAV.map((item, i) => (
                <motion.div
                  key={item.to}
                  initial={{ y: "110%" }}
                  animate={{ y: "0%" }}
                  exit={{ y: "110%", transition: { duration: 0.25, ease: EASE_OUT } }}
                  transition={{ duration: 0.7, ease: EASE_OUT, delay: 0.12 + i * 0.06 }}
                >
                  <NavLink to={item.to} end={item.to === "/"} className={styles.drawerLink}>
                    <span className={styles.drawerIndex}>{String(i + 1).padStart(2, "0")}</span>
                    {item.label}
                  </NavLink>
                </motion.div>
              ))}
            </nav>

            <motion.div
              className={styles.drawerFoot}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, transition: { delay: 0.4, duration: 0.5 } }}
              exit={{ opacity: 0, transition: { duration: 0.2 } }}
            >
              <a href={`mailto:${SITE.email}`} className={styles.drawerMail}>
                {SITE.email}
              </a>
              <ul className={styles.drawerSocials}>
                {SOCIALS.map((s) => (
                  <li key={s.href}>
                    <a href={s.href} target="_blank" rel="noopener noreferrer">
                      {s.label}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Nav;
