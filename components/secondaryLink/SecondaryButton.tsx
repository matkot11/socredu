import styles from "./secondaryLink.module.scss";
import classNames from "classnames";

interface SecondaryButtonProps {
  type?: "submit" | "reset" | "button" | undefined;
  text: string;
  className?: string;
}

const SecondaryButton = ({ type, text, className }: SecondaryButtonProps) => (
  <button type={type} className={classNames(styles.button, className)}>
    {text}
  </button>
);

export default SecondaryButton;
