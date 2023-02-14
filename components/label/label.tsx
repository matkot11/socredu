import styles from "./label.module.scss";
import { ReactElement } from "react";

interface LabelProps {
  htmlFor: string;
  label: string;
  children: ReactElement;
}

const Label = ({ htmlFor, label, children }: LabelProps) => (
  <label htmlFor={htmlFor} className={styles.label}>
    <span className={styles.text}>{label}</span>
    {children}
  </label>
);

export default Label;
