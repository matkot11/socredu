import styles from "./secondaryButton.module.scss";

interface SecondaryButtonProps {
  text: string;
}

const SecondaryButton = ({ text }: SecondaryButtonProps) => (
  <button className={styles.button}>{text}</button>
);

export default SecondaryButton;
