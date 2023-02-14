import styles from "./primaryLink.module.scss";
import classNames from "classnames";

interface PrimaryButtonProps {
  text: string;
  className?: string;
}

const PrimaryButton = ({ text, className }: PrimaryButtonProps) => (
  <button className={classNames(styles.button, className)}>{text}</button>
);

export default PrimaryButton;
