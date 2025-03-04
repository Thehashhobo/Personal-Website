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
          <a href="https://www.linkedin.com/in/jerry-wang-a763571a0/" target="_blank"><LinkedinFilled style={{ fontSize: '24px', color: '#000' }} /></a>
          <a href="https://github.com/Thehashhobo" target="_blank"><GithubFilled style={{ fontSize: '24px', color: '#000' }} /></a>
          <a href="https://www.instagram.com/jerry_w_02/" target="_blank"><InstagramFilled style={{ fontSize: '24px', color: '#000' }} /></a>
          <a href="https://www.facebook.com/profile.php?id=100016401705344" target="_blank"><FacebookFilled style={{ fontSize: '24px', color: '#000' }} /></a>
        </div>
      </div>
    </div>
  );
};

export default BioCard;
