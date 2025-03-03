import React from 'react';
import { Link } from 'react-router-dom'; 
import styles from './Aboutpage.module.css'; 
import ProfileCard from '../components/BioCard'; // Import the Profile Card component
import my_photo from '../assets/My_photo.png'; 

const Aboutpage: React.FC = () => {
  return (
    <div className={styles['about-container']}>
      {/* Background Sections */}
      <div className={styles['about-left']}></div>
      <div className={styles['about-right']}></div>

      <div className={styles['hero-container']}>
        <div className={styles['card-container']}>
          <ProfileCard 
            image={my_photo} 
            name="Jerry Wang" 
            role="Software Developer" 
          />
        </div>
        <div className={styles['text-container']}>
          <h1 className={styles['title']}>Hello</h1>
          <h2 className={styles['subtitle']}>Heres who I am & what I do</h2>
          <div className={styles['button-container']}>
            <Link to="/resume" className={styles['custom-button']}>Résumé</Link>
            <Link to="/projects" className={styles['custom-button']}>Projects</Link>
          </div>
          <p className={styles['description']}>
          I'm a Computer Science, Statistics and Economics student at the University of Toronto (St. George), graduating in June 2025. 
          With a strong passion for technology and finance, I specialize in full-stack development, bringing ideas to life through code. 
          I have extensive experience working on freelance and personal projects—check them out in the Projects section! If you need a website built, 
          feel free to reach out.
          </p>
        </div>
      </div>

    </div>
  );
};

export default Aboutpage;
