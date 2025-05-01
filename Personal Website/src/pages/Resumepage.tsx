import React from "react";
import styles from "./Resumepage.module.css";

const resumeUrl = `${import.meta.env.BASE_URL}Junan_Wang_Swe.pdf`; // Dynamically adjust path


const Resumepage: React.FC = () => {
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>My Résumé</h2>

      {/* Embedded PDF Viewer */}
      <iframe src={resumeUrl} className={styles.pdfViewer} title="Resume PDF"></iframe>

      {/* Download Button */}
      <a href={resumeUrl} download="Junan_Wang_Swe_1.pdf" className={styles.downloadButton}>
        Download Résumé
      </a>
    </div>
  );
};

export default Resumepage;
