import styles from "./fileInput.module.scss";
import ArrowsUpDown from "@/assets/icons/ArrowsUpDown";

interface FileInputProps {
  onChange: (e: any) => void;
  onClick: (e: any) => void;
}

const FileInput = ({ onChange, onClick }: FileInputProps) => (
  <label className={styles.wrapper}>
    <ArrowsUpDown className={styles.icon} /> Change
    <input
      className={styles.imageInputFile}
      type="file"
      accept="image/*"
      onClick={onClick}
      onChange={onChange}
    />
  </label>
);

export default FileInput;
