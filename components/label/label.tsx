import styles from "./label.module.scss";
import { ReactElement } from "react";

interface LabelProps {
  label: string;
  children: ReactElement;
}

const Label = ({ label, children }: LabelProps) => (
  <label className={styles.label}>
    <span className={styles.text}>{label}</span>
    {children}
  </label>
);

export default Label;
