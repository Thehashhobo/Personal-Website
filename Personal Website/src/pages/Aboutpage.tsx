import React, { useEffect, useState } from "react";
import { useSpring, animated } from "@react-spring/web";
import { Link } from "react-router-dom";
import styles from "./Aboutpage.module.css";
import ProfileCard from "../components/BioCard"; // Import the Profile Card component
import my_photo from "../assets/My_photo.webp"; // Import your image

const Aboutpage: React.FC = () => {
  const [hasLoaded, setHasLoaded] = useState(false);

  useEffect(() => {
    setHasLoaded(true);
  }, []);

  // 🎨 Slide-in from the LEFT for card-container
  const cardAnimation = useSpring({
    transform: hasLoaded ? "translateX(0%)" : "translateX(-100%)",
    opacity: hasLoaded ? 1 : 0,
    config: { tension: 100, friction: 20 }, // Smooth easing
  });

  // 🎨 Slide-in from the RIGHT for text-container
  const textAnimation = useSpring({
    transform: hasLoaded ? "translateX(0%)" : "translateX(100%)",
    opacity: hasLoaded ? 1 : 0,
    config: { tension: 100, friction: 20 }, // Smooth easing
  });

  return (
    <div className={styles["about-container"]}>
      {/* Background Sections */}
      <div className={styles["about-left"]}></div>
      <div className={styles["about-right"]}></div>

      <div className={styles["hero-container"]}>
        {/* Animated Card Container */}
        <animated.div style={cardAnimation} className={styles["card-container"]}>
          <ProfileCard 
            image={my_photo} 
            name="Jerry Wang" 
            role="Software Developer" 
          />
        </animated.div>

        {/* Animated Text Container */}
        <animated.div style={textAnimation} className={styles["text-container"]}>
          <h1 className={styles["title"]}>Hello</h1>
          <h2 className={styles["subtitle"]}>Here's who I am & what I do</h2>
          <div className={styles["button-container"]}>
            <Link to="/resume" className={styles["custom-button"]}>Résumé</Link>
            <Link to="/projects" className={styles["custom-button-alt"]}>Projects</Link>
          </div>
          <p className={styles["description"]}>
            I'm a Computer Science, Statistics and Economics student at the University of Toronto (St. George), graduating in June 2025. 
            With a strong passion for technology and finance, I specialize in full-stack development, bringing ideas to life through code. 
            I have extensive experience working on freelance and personal projects—check them out in the Projects section! <strong>If you need a website built, 
            feel free to reach out.</strong>
          </p>
        </animated.div>
      </div>
    </div>
  );
};

export default Aboutpage;
