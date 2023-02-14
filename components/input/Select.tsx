import styles from "./input.module.scss";
import { ChangeEvent, ReactNode } from "react";

interface InputProps {
  name: string;
  onChange: (e: ChangeEvent<HTMLSelectElement>) => void;
  value: string;
  children: ReactNode;
}

const Select = ({ name, onChange, value, children }: InputProps) => (
  <select
    name={name}
    onChange={onChange}
    value={value}
    className={styles.input}
  >
    {children}
  </select>
);

export default Select;
