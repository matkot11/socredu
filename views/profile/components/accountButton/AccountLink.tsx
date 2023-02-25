import styles from "./accountButton.module.scss";
import Link from "next/link";
import ChevronRight from "@/assets/icons/ChevronRight";
import { ReactNode } from "react";

interface AccountLinkProps {
  name: string;
  icon: ReactNode;
  href: string;
}

const AccountLink = ({ name, icon, href }: AccountLinkProps) => (
  <Link href={href} className={styles.wrapper}>
    <div className={styles.leftWrapper}>
      {icon}
      <span className={styles.text}>{name}</span>
    </div>
    <ChevronRight className={styles.icon} />
  </Link>
);

export default AccountLink;
