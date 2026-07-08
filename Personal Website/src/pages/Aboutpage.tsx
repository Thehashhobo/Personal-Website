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
            role="" 
          />
        </animated.div>

        {/* Animated Text Container */}
        <animated.div style={textAnimation} className={styles["text-container"]}>
          <h1 className={styles["title"]}>Hello</h1>
          <h2 className={styles["subtitle"]}>Here's who I am & what I do</h2>
          <div className={styles["button-container"]}>
            <Link to="/Resume" className={styles["custom-button"]}>Résumé</Link>
            <Link to="/Projects" className={styles["custom-button-alt"]}>Projects</Link>
          </div>
          <p className={styles["description"]}>
University of Toronto graduate (Computer Science, Statistics, & Economics) <strong>combining full-stack development experience with a strategic focus on tech-finance project management.</strong> Proven track record of delivering end-to-end full-time and personal projects. Skilled at translating complex business requirements into technical execution, managing cross-functional alignment, and driving product lifecycles.
          </p>
        </animated.div>
      </div>
    </div>
  );
};

export default Aboutpage;
