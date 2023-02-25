import styles from "./input.module.scss";
import { ChangeEvent, KeyboardEvent } from "react";
import classNames from "classnames";

interface InputProps {
  name: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  value?: string;
  type?: string;
  placeholder?: string;
  className?: string;
  onKeyDown?: (e: KeyboardEvent<HTMLInputElement>) => void;
}

const Input = ({
  name,
  onChange,
  value,
  type = "text",
  placeholder = "",
  className = "",
  onKeyDown,
}: InputProps) => (
  <input
    name={name}
    onKeyDown={onKeyDown}
    onChange={onChange}
    value={value}
    type={type}
    placeholder={placeholder}
    className={classNames(styles.input, className)}
  />
);

export default Input;
