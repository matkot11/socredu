import styles from "./errorMessage.module.scss";
import CloseIcon from "@/assets/icons/Close";
import { useError } from "@/hooks/useError";

interface ErrorMessageProps {
  text: string;
}

const ErrorMessage = ({ text }: ErrorMessageProps) => {
  const { dispatchError } = useError();
  const handleCloseMessage = () => {
    dispatchError("");
  };
  return (
    <div className={styles.wrapper}>
      <p className={styles.text}>{text}</p>
      <button onClick={handleCloseMessage} className={styles.closeButton}>
        <CloseIcon className={styles.close} />
      </button>
    </div>
  );
};

export default ErrorMessage;
