import React, { useState } from "react";
import { useSpring, animated } from "@react-spring/web";
import styles from "./AnimatedCard.module.css";

interface AnimatedCardProps {
  title: string;
  description: string;
  image: string;
  image2: string;
  technologies: string[];
  points: string[]; // Bullet points
  link: string;
}

const AnimatedCard: React.FC<AnimatedCardProps> = ({ title, description, image, image2, technologies, points, link }) => {
  const [hovered, setHovered] = useState(false);

  const coverStyle = useSpring({
    transform: hovered ? "translateY(-100%)" : "translateY(0%)",
    opacity: hovered ? 0 : 1,
  });

  return (
    <div 
      className={styles.card} 
      onMouseEnter={() => setHovered(true)} 
      onMouseLeave={() => setHovered(false)}
    >
      {/* Cover Section */}
      <animated.div className={styles.cover} style={coverStyle}>
        <img src={image} alt={title} className={styles.coverImage} />
        <div className={styles.coverContent}>
          <h2>{title}</h2>
          <p className={styles.techList}>{technologies.join(", ")}</p>
        </div>
      </animated.div>

      {/* Revealed Content */}
      <div className={styles.details}>

        <p className={styles.overview}>{description}</p>

        {/* Bullet Points List */}
        {points.length > 0 && (
          <ul className={styles.pointsList}>
            {points.map((point, index) => (
              <li key={index}>{point}</li>
            ))}
          </ul>
        )}

        <a href={link} className={styles.viewButton} target="_blank" rel="noopener noreferrer">
          View Project
        </a>
      </div>
    </div>
  );
};

export default AnimatedCard;
