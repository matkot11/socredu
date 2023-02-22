import styles from "./accountButton.module.scss";
import Link from "next/link";
import ChevronRight from "@/assets/icons/ChevronRight";
import { ReactNode } from "react";

interface AccountButtonProps {
  name: string;
  icon: ReactNode;
  onClick: () => void;
}

const AccountButton = ({ name, icon, onClick }: AccountButtonProps) => (
  <button onClick={onClick} className={styles.wrapper}>
    <div className={styles.leftWrapper}>
      {icon}
      <span className={styles.text}>{name}</span>
    </div>
    <ChevronRight className={styles.icon} />
  </button>
);

export default AccountButton;
