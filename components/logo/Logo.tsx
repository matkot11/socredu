import styles from "./logo.module.scss";
import classNames from "classnames";
import Link from "next/link";

interface LogoProps {
  color: "white" | "black";
  letterColor: "light-blue" | "purple";
}

const Logo = ({ color, letterColor }: LogoProps) => (
  <Link href="/" className={classNames(styles.logo, styles[`color-${color}`])}>
    S
    <span className={classNames(styles.logo, styles[`letter-${letterColor}`])}>
      O
    </span>
    CREDU.
  </Link>
);

export default Logo;
