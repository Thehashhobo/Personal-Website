import React from "react";
import styles from "./BioCard.module.css"; 
import { LinkedinFilled, GithubFilled, InstagramFilled, FacebookFilled } from '@ant-design/icons';

interface BioCardProps {
  image: string;
  name: string;
  role: string;
}

const BioCard: React.FC<BioCardProps> = ({ image, name, role }) => {
  return (
    <div className={styles.card}>
      {/* Profile Image */}
      <div className={styles.imageContainer}>
        <img src={image} alt={name} className={styles.profileImage} />
      </div>

      <h1 className={styles.name}>{name}</h1>

      {/* Underline */}
      <div className={styles.underline}></div>

      <p className={styles.role}>{role}</p>

      {/* Social Footer with White Background */}
      <div className={styles.socialFooter}>
        <div className={styles.socialIcons}>
          <a href="#" target="_blank"><LinkedinFilled style={{ fontSize: '24px', color: '#000' }} /></a>
          <a href="#" target="_blank"><GithubFilled style={{ fontSize: '24px', color: '#000' }} /></a>
          <a href="#" target="_blank"><InstagramFilled style={{ fontSize: '24px', color: '#000' }} /></a>
          <a href="#" target="_blank"><FacebookFilled style={{ fontSize: '24px', color: '#000' }} /></a>
        </div>
      </div>
    </div>
  );
};

export default BioCard;
