import React from "react";
import styles from "./Resumepage.module.css";

const resumeUrl = "/Junan_Wang_Swe.pdf"; // Make sure this file is inside the `public/` folder

const Resumepage: React.FC = () => {
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>My Résumé</h2>

      {/* Embedded PDF Viewer */}
      <iframe src={resumeUrl} className={styles.pdfViewer} title="Resume PDF"></iframe>

      {/* Download Button */}
      <a href={resumeUrl} download="Junan_Wang_Swe.pdf" className={styles.downloadButton}>
        Download Resume
      </a>
    </div>
  );
};

export default Resumepage;
