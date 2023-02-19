import styles from "./input.module.scss";
import { ChangeEvent } from "react";
import classNames from "classnames";

interface InputProps {
  name: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  value: string;
  type?: string;
  placeholder?: string;
  className?: string;
}

const Input = ({
  name,
  onChange,
  value,
  type = "text",
  placeholder = "",
  className = "",
}: InputProps) => (
  <input
    name={name}
    onChange={onChange}
    value={value}
    type={type}
    placeholder={placeholder}
    className={classNames(styles.input, className)}
  />
);

export default Input;
