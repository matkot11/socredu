import styles from "./textarea.module.scss";
import { ChangeEvent } from "react";
import classNames from "classnames";

interface TextareaProps {
  name: string;
  onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  value: string;
  className?: string;
}

const Textarea = ({ name, onChange, value, className = "" }: TextareaProps) => (
  <textarea
    name={name}
    onChange={onChange}
    value={value}
    className={classNames(styles.textarea, className)}
  />
);

export default Textarea;
