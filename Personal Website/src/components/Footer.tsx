import React from "react";
import { Layout, Typography, Space } from "antd";
import { LinkedinFilled, GithubFilled, InstagramFilled, FacebookFilled } from "@ant-design/icons";
import styles from "./footer.module.css"; // Import CSS module

const { Footer } = Layout;
const { Text, Link } = Typography;

const AppFooter: React.FC = () => {
  return (
    <Footer className={styles.footer}>
      <Space  align="center" className={styles.footerContent}>
        <Space direction="vertical" size="small" className={styles.footerCopyright}>
            <Text>© {new Date().getFullYear()} by Jerry W.</Text>
            <Text>
            Powered and secured by <Link href="https://pages.github.com/" target="_blank">Github Pages</Link>
            </Text>
        </Space>
        <Space direction="vertical" align="center">
          <Text strong>Call</Text>
          <Text>778-251-6946</Text>
        </Space>
        <Space direction="vertical" align="center">
          <Text strong>Write</Text>
          <Text>Jerryja2015@gmail.com</Text>
        </Space>
        <Space direction="vertical" align="center">
          <Text strong>Follow</Text>
          <Space size="large">
            <Link href="https://www.linkedin.com/in/jerry-wang-a763571a0/" aria-label="LinkedIn"><LinkedinFilled style={{ fontSize: 24 }} /></Link>
            <Link href="https://github.com/Thehashhobo" aria-label="GitHub"><GithubFilled style={{ fontSize: 24 }} /></Link>
            <Link href="https://www.instagram.com/jerry_w_02/" aria-label="Instagram"><InstagramFilled style={{ fontSize: 24 }} /></Link>
            <Link href="https://www.facebook.com/profile.php?id=100016401705344" aria-label="Facebook"><FacebookFilled style={{ fontSize: 24 }} /></Link>
          </Space>
        </Space>
      </Space>
    </Footer>
  );
};

export default AppFooter;
