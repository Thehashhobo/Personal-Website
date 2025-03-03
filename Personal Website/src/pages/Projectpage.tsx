import React from 'react';
import styles from './Projectpage.module.css'; 
import AnimatedCard from "../components/AnimatedCard";
import '../typography.css';
import c1_1 from '../assets/C11.png';
import c1_2 from '../assets/C11.png';
const Contracts = [
  {
    title: "Recipe Analyzer",
    description: "A website built from the ground up to drive sales for an emerging yacht management company, showcasing an entrepreneurial mindset by enhancing outreach and streamlining the booking process for maximum client engagement.",
    image: c1_1,
    image2: c1_2,
    technologies: ["Node", "React", "typescript", "HTML", "CSS"],
    points: ["Collaborated closely with client to translate design requirements into a functional site. Increasing Business traffic by 17%", "Designed and developed a responsive marketing webpage for a yacht management company, enhancing online presence and client acquisition using React, TypeScript, Node.js, and AntDesign UI library.", "Deployed and hosted the site on Netlify, ensuring a CI/CD workflow for seamless updates and version control."],
    link: "https://your-recipe-project.com",
  }
];

const PProjects = [
  {
    title: "Recipe Analyzer",
    description: "A website built from the ground up to drive sales for an emerging yacht management company, showcasing an entrepreneurial mindset by enhancing outreach and streamlining the booking process for maximum client engagement.",
    image: c1_1,
    image2: c1_2,
    technologies: ["Node", "React", "typescript", "HTML", "CSS"],
    points: ["Collaborated closely with client to translate design requirements into a functional site. Increasing Business traffic by 17%", "Designed and developed a responsive marketing webpage for a yacht management company, enhancing online presence and client acquisition using React, TypeScript, Node.js, and AntDesign UI library.", "Deployed and hosted the site on Netlify, ensuring a CI/CD workflow for seamless updates and version control."],
    link: "https://your-recipe-project.com",
  }
];

const Projectpage: React.FC = () => {
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>My Projects</h2>
      <div className={styles.subtitleContainer}>
        <h3 className={styles.subtitle}>Contract Work</h3>
        <hr className={styles.line} />
      </div>
      <div className={styles.grid}>
        {Contracts.map((project, index) => (
          <AnimatedCard
            key={index}
            title={project.title}
            description={project.description}
            image={project.image}
            image2={project.image2}
            technologies={project.technologies}
            points={project.points}
            link={project.link}
          />
        ))}
      </div>
      <div className={styles.subtitleContainer}>
        <h3 className={styles.subtitle}>Personal Projects</h3>
        <hr className={styles.line} />
      </div>
      <div className={styles.grid}>
        {PProjects.map((project, index) => (
          <AnimatedCard
            key={index}
            title={project.title}
            description={project.description}
            image={project.image}
            image2={project.image2}
            technologies={project.technologies}
            points={project.points}
            link={project.link}
          />
        ))}
      </div>
    </div>
  );
};

export default Projectpage;
