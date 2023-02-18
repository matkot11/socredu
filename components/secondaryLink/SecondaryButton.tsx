import styles from "./secondaryLink.module.scss";
import classNames from "classnames";

interface SecondaryButtonProps {
  type?: "submit" | "reset" | "button";
  text: string;
  className?: string;
  disabled?: boolean;
}

const SecondaryButton = ({
  type = "button",
  text,
  className,
  disabled = false,
}: SecondaryButtonProps) => (
  <button disabled={disabled} type={type} className={classNames(styles.button, className)}>
    {text}
  </button>
);

export default SecondaryButton;
