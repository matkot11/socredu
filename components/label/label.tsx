import styles from "./label.module.scss";
import { ReactElement } from "react";
import classNames from "classnames";

interface LabelProps {
  htmlFor: string;
  label: string;
  children: ReactElement;
  className?: string;
  textClassName?: string;
}

const Label = ({
  htmlFor,
  label,
  children,
  className = "",
  textClassName = "",
}: LabelProps) => (
  <label htmlFor={htmlFor} className={classNames(styles.label, className)}>
    <span className={classNames(styles.text, textClassName)}>{label}</span>
    {children}
  </label>
);

export default Label;
