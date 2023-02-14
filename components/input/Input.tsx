import styles from "./input.module.scss";
import { ChangeEvent } from "react";

interface InputProps {
  name: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  value: string;
  type?: string;
}

const Input = ({ name, onChange, value, type = "text" }: InputProps) => (
  <input
    name={name}
    onChange={onChange}
    value={value}
    type={type}
    className={styles.input}
  />
);

export default Input;
