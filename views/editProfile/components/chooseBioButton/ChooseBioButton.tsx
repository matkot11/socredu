import styles from "./chooseBioButton.module.scss";
import classNames from "classnames";

interface ChooseBioButtonProps {
  text: string;
  onClick: () => void;
  isStudentEdit: boolean;
}

const ChooseBioButton = ({
  text,
  onClick,
  isStudentEdit,
}: ChooseBioButtonProps) => (
  <button
    onClick={onClick}
    className={classNames(styles.button, isStudentEdit ? styles.student : "")}
  >
    {text}
  </button>
);

export default ChooseBioButton;
