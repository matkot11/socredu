import styles from "./logo.module.scss";
import classNames from "classnames";
import Link from "next/link";
import { useSession } from "next-auth/react";

interface LogoProps {
  color: "white" | "black";
  letterColor: "light-blue" | "purple";
}

const Logo = ({ color, letterColor }: LogoProps) => {
  const session = useSession();
  const getHomePath = () => {
    return session.status === "authenticated" ? "/home" : "/";
  };

  return (
    <Link
      href={getHomePath()}
      className={classNames(styles.logo, styles[`color-${color}`])}
    >
      S
      <span
        className={classNames(styles.logo, styles[`letter-${letterColor}`])}
      >
        O
      </span>
      CREDU.
    </Link>
  );
};

export default Logo;
