import styles from "./header.module.scss";

interface HeaderProps {
  text: string | undefined;
}

const Header = ({ text }: HeaderProps) => (
  <h3 className={styles.header}>{text}</h3>
);

export default Header;
