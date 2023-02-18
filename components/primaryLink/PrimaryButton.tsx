import styles from "./primaryLink.module.scss";
import classNames from "classnames";

interface PrimaryButtonProps {
  text: string;
  className?: string;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
}

const PrimaryButton = ({
  text,
  className,
  type = "button",
  disabled = false,
}: PrimaryButtonProps) => (
  <button
    disabled={disabled}
    type={type}
    className={classNames(styles.button, className)}
  >
    {text}
  </button>
);

export default PrimaryButton;
