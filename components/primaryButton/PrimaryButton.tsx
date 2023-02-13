import styles from "./primaryButton.module.scss";

interface PrimaryButtonProps {
  text: string;
}

const PrimaryButton = ({ text }: PrimaryButtonProps) => (
  <button className={styles.button}>{text}</button>
);

export default PrimaryButton;
