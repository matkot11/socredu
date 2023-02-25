import styles from "./input.module.scss";
import { ChangeEvent, ReactNode } from "react";
import classNames from "classnames";

interface InputProps {
  name: string;
  onChange: (e: ChangeEvent<HTMLSelectElement>) => void;
  children: ReactNode;
  disabled?: boolean;
  className?: string;
}

const Select = ({
  name,
  onChange,
  children,
  disabled = false,
  className = "",
}: InputProps) => (
  <select
    disabled={disabled}
    name={name}
    onChange={onChange}
    className={classNames(styles.input, className)}
  >
    {children}
  </select>
);

export default Select;
