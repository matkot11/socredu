import styles from "./secondaryLink.module.scss";
import classNames from "classnames";
import Link from "next/link";

interface SecondaryButtonProps {
  text: string;
  href: string;
  className?: string;
}

const SecondaryLink = ({ text, href, className }: SecondaryButtonProps) => (
  <Link href={href} className={classNames(styles.button, className)}>
    {text}
  </Link>
);

export default SecondaryLink;
