import styles from "./secondaryButton.module.scss";
import classNames from "classnames";

interface SecondaryButtonProps {
  text: string;
  className?: string;
}

const SecondaryButton = ({ text, className }: SecondaryButtonProps) => (
  <button className={classNames(styles.button, className)}>{text}</button>
);

export default SecondaryButton;
