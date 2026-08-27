import React from "react";
import { HashRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence, MotionConfig, motion } from "motion/react";
import Nav from "./components/Nav";
import Footer from "./components/Footer";
import ChatDock from "./components/ChatDock";
import Home from "./pages/Home";
import Projects from "./pages/Projects";
import Resume from "./pages/Resume";
import Contact from "./pages/Contact";
import { resetScroll, useSmoothScroll } from "./lib/useLenis";
import { pageTransition } from "./lib/motion";

/**
 * Routes wrapped in a cross-fade.
 *
 * AnimatePresence needs a stable key per route and an explicit `location`,
 * otherwise the outgoing tree re-renders with the new match and the exit
 * animation plays against the wrong content. `mode="wait"` keeps the two pages
 * from overlapping, which matters because both are full-bleed.
 *
 * Scroll is reset in onExitComplete rather than on pathname change: resetting
 * eagerly would yank the outgoing page to the top while it is still visible.
 */
const AnimatedRoutes: React.FC = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait" initial={false} onExitComplete={resetScroll}>
      <motion.main
        key={location.pathname}
        variants={pageTransition}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        <Routes location={location}>
          <Route path="/" element={<Home />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/resume" element={<Resume />} />
          <Route path="/contact" element={<Contact />} />
          {/* Anything unrecognised lands on the index rather than a blank page. */}
          <Route path="*" element={<Home />} />
        </Routes>
      </motion.main>
    </AnimatePresence>
  );
};

const Shell: React.FC = () => {
  useSmoothScroll();

  return (
    <>
      <Nav />
      <AnimatedRoutes />
      <Footer />
      <ChatDock />
    </>
  );
};

/**
 * `reducedMotion="user"` makes every motion component honour the OS setting,
 * so individual components never have to check it themselves.
 */
const App: React.FC = () => (
  <MotionConfig reducedMotion="user">
    <Router>
      <Shell />
    </Router>
  </MotionConfig>
);

export default App;
