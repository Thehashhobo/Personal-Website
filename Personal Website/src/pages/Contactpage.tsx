import React from 'react';
import styles from './Contactpage.module.css'; 
import Form from '../components/ContactForm'
import '../typography.css';


const Contactpage: React.FC = () => {
  return (
    <>
      <div className={styles["contact-container"]}>
        <div className={styles["greet-container"]}>
          <span className={styles["emoji"]}> &#128075;</span>
          <h1 className={styles["title"]}>Lets Chat!</h1>
        </div>
      {/* Hero Section */}
      <Form />
      </div>
    </>
  );
};

export default Contactpage;
