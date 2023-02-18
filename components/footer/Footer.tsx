import styles from "./footer.module.scss";
import Logo from "@/components/logo/Logo";

const Footer = () => (
  <footer className={styles.footer}>
    <Logo color="white" letterColor="purple" />
    <span className={styles.copyright}>&#xA9; 2023 Copyright Mateusz Kocik</span>
  </footer>
);

export default Footer;
