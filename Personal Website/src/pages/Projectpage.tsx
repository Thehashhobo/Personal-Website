import React, { useEffect } from 'react';
import styles from './Projectpage.module.css'; 
import AnimatedCard from "../components/AnimatedCard";
import { useSpring, animated} from 'react-spring';
import { useInView } from 'react-intersection-observer';
import '../typography.css';
import c1 from '../assets/C11.webp';
import c2 from '../assets/C21.webp';
import c3 from '../assets/C31.webp';
import c4 from '../assets/C4.webp';
import c5 from '../assets/C5.webp';
import c6 from '../assets/C6.webp';

const CurrentProjects = [
  {
    title: "Double Dating App (In Development)",
    description: "Conceptualized and developed a cross-platform dating application focused on connecting users through double date experiences. Showcasing both entrepreneurial initiative and full-stack technical execution.",
    image: c6,
    technologies: ["React Native", "Typescript", "Expo", "SupaBase", "PostgresSql" ],
    points: ["Led product validation through targeted user surveys to identify key pain points and desires, transforming insights into actionable features. Combined user-centric design with scalable architecture to create a compelling MVP.",
      "Building a scalable, feature-rich mobile application using React Native, TypeScript, and Supabase. Implementing real-time chat, dynamic double-profile matching algorithms, and modular architecture optimized for performance and growth.", 
      "Integrated third-party APIs (e.g., Stream Chat) to accelerate development and efficiently deliver a functional MVP.",
      "Applied Agile development practices to rapidly identify high-priority features, iterate on user feedback, and deliver functional updates efficiently within short development cycles."],
    link: "https://github.com/Thehashhobo/DuoDate",
    disable: false
  },
];

const Contracts = [
  {
    title: "Yacht Services Website",
    description: "A website built from the ground up to drive sales for an emerging yacht management company, showcasing an entrepreneurial mindset by enhancing outreach and streamlining the booking process for maximum client engagement.",
    image: c1,
    technologies: ["Node", "React", "typescript", "HTML", "CSS"],
    points: ["Collaborated closely with client to translate design requirements into a functional site. Increasing Business traffic by 17%", "Designed and developed a responsive marketing webpage for a yacht management company, enhancing online presence and client acquisition using React, TypeScript, Node.js, and AntDesign UI library.", "Deployed and hosted the site on Netlify, ensuring a CI/CD workflow for seamless updates and version control."],
    link: "https://oceanwavevip.com/",
    disable: false,
  }
];

const PProjects = [
  {
    title: "Recipe Data Analyzer",
    description: "A data analysis project built from the ground up, focused on extracting and structuring online data for efficient storage and retrieval. Designed with a product-focused mindset, the project included exploratory data analysis (EDA) to uncover key insights, identify data quality issues, and lay the foundation for model development.",
    image: c2,
    technologies: ["Python", "Jupyter", "SQL", "Pandas", ],
    points: ["Developed a web scraper using Python and BeautifulSoup to collect, Clean and serialize recipe data from variouswebsites for analysis.", "Designed and executed complex SQL queries to extract, analyze, and optimize data insights, leveraging efficient indexing, joins, and subqueries for high-performance lookups.", "Performed EDA using Pandas, Seaborn, and Matplotlib to analyze ingredient trends. Identified data quality issues that impacted modeling, preprocessing data and engineered features for future improvements."],
    link: "https://github.com/Thehashhobo/Recipe-Data-Analysis",
    disable: false,
  },
  {
    title: "Cell Growth Simulation",
    description: "A web-based interactive cell simulation engineered to push browser performance limits through a highly optimized reactive state-based architecture and rendering approach. Designed to efficiently manage and render 100 million interactive cells, this project tackles complex technical optimization challenges, and real-time state updates for seamless performance at scale.",
    image: c3,
    technologies: ["Algorithm Design", "TypeScript", "Graphics Rendering" ],
    points: ["Developed an interactive web simulation capable of handling up to 10 million cells, demonstrating large-scale data optimization.", "Implemented a granular rendering approach and a reactive state architecture, reducing redundant computations and enabling large-scale, real-time updates."],
    link: "https://thehashhobo.github.io/Cell-Growth-Simulation/",
    extraLink: "https://thehashhobo.github.io/Cell-Growth-Simulation-V2/",
    disable: false,
  }
];

const AProjects = [
  {
    title: "Pet adoption site",
    description: "Led a team of four developers to build a full-stack web application from scratch, driving development with Agile methodologies. Organized weekly meetings to align goals, address challenges, and ensure progress. Took initiative in decision-making, balancing technical execution with user needs for a scalable product.",
    image: c4,
    technologies: ["JavaScript", "Django", "React", "SQL", "Agile"],
    points: ["Developed a full-stack web application with 15 distinct pages using Agile methodologies, enabling users to post, search,filter, and apply for pet adoptions.", "Employed Django REST Framework for a scalable back end; integrated React for efficient frontend rendering.", "Deployed the back end on Heroku and front end on Netlify, gaining hands-on experience with CI/CD pipelines."],
    link: "https://barnyard-buddies.netlify.app/",
    disable: false,
  },
  {
    title: "Collarboration Platform",
    description: "UofTeams is a collaborative platform designed to connect University of Toronto students by enabling them to create and engage with time-sensitive posts for extracurricular opportunities. Through strong teamwork and communication, the platform was built using OOP principles to ensure modularity and scalability.",
    image: c5,
    technologies: ["Java"],
    points: ["Designed and implemented a modular architecture following OOP principles, ensuring scalability and ease of feature expansion."],
    link: "https://github.com/CSC207-2022F-UofT/course-project-uofteams",
    disable: false,
  }
];





const Projectpage: React.FC = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  const [wiggleStyle, wiggleApi] = useSpring(() => ({
    from: { rotate: 0 },
    config: { tension: 300, friction: 10 },
  }));

  useEffect(() => {
    if (inView) {
      wiggleApi.start({
        to: async (next) => {
          // Little wiggle movement
          await next({ rotate: 5 });
          await next({ rotate: -5 });
          await next({ rotate: 3 });
          await next({ rotate: -3 });
          await next({ rotate: 0 });
        },
      });
    }
  }, [inView, wiggleApi]);

  const lineSpring = useSpring({
    width: inView ? '60%' : '0%',
    config: { duration: 500 },
  });

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>My Projects</h2>

      <div className={styles.subtitleContainer} ref={ref}>
        <animated.h3 className={styles.subtitle} style={wiggleStyle}>
          Current Projects
        </animated.h3>
        <animated.hr className={styles.line} style={lineSpring} />
      </div>

      <div className={styles.grid}>
        {CurrentProjects.map((project, index) => (
          <AnimatedCard
            key={index}
            title={project.title}
            description={project.description}
            image={project.image}
            technologies={project.technologies}
            points={project.points}
            link={project.link}
            disable={project.disable}
          />
        ))}
      </div>

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
            technologies={project.technologies}
            points={project.points}
            link={project.link}
            disable={project.disable}
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
            technologies={project.technologies}
            points={project.points}
            link={project.link}
            extraLink={project.extraLink}
            disable={project.disable}
          />
        ))}
      </div>
      <div className={styles.subtitleContainer}>
        <h3 className={styles.subtitle}>Academic Works</h3>
        <hr className={styles.line} />
      </div>
      <div className={styles.grid}>
        {AProjects.map((project, index) => (
          <AnimatedCard
            key={index}
            title={project.title}
            description={project.description}
            image={project.image}
            technologies={project.technologies}
            points={project.points}
            link={project.link}
            disable={project.disable}
          />
        ))}
      </div>
    </div>
  );
};

export default Projectpage;
