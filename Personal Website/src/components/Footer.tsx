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
            Powered and secured by <Link href="https://www.netlify.com" target="_blank">Netlify</Link>
            </Text>
        </Space>
        <Space direction="vertical" align="center">
          <Text strong>Call</Text>
          <Text>123-456-7890</Text>
        </Space>
        <Space direction="vertical" align="center">
          <Text strong>Write</Text>
          <Text>info@mysite.com</Text>
        </Space>
        <Space direction="vertical" align="center">
          <Text strong>Follow</Text>
          <Space size="large">
            <Link href="#" aria-label="LinkedIn"><LinkedinFilled style={{ fontSize: 24 }} /></Link>
            <Link href="#" aria-label="GitHub"><GithubFilled style={{ fontSize: 24 }} /></Link>
            <Link href="#" aria-label="Instagram"><InstagramFilled style={{ fontSize: 24 }} /></Link>
            <Link href="#" aria-label="Facebook"><FacebookFilled style={{ fontSize: 24 }} /></Link>
          </Space>
        </Space>
      </Space>
    </Footer>
  );
};

export default AppFooter;
