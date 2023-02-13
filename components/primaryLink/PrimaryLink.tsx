import styles from "./primaryLink.module.scss";
import Link from "next/link";
import classNames from "classnames";

interface PrimaryButtonProps {
  text: string;
  href: string;
  className?: string;
}

const PrimaryLink = ({ text, href, className }: PrimaryButtonProps) => (
  <Link href={href} className={classNames(styles.button, className)}>
    {text}
  </Link>
);

export default PrimaryLink;
