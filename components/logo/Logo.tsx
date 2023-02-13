import styles from "./logo.module.scss";
import classNames from "classnames";

interface LogoProps {
  color: "white" | "black";
  letterColor: "light-blue" | "purple";
}

const Logo = ({ color, letterColor }: LogoProps) => (
  <h1 className={classNames(styles.logo, styles[`color-${color}`])}>
    S
    <span className={classNames(styles.logo, styles[`letter-${letterColor}`])}>
      O
    </span>
    CREDU.
  </h1>
);

export default Logo;
