import styles from "./saveButton.module.scss";
import Check from "@/assets/icons/Check";

const SaveButton = () => (
  <button type="submit" className={styles.button}>
    <Check className={styles.icon} />
    Save
  </button>
);

export default SaveButton;
