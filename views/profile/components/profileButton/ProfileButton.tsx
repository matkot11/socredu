import styles from "./profileButton.module.scss";
import Image from "next/image";
import ChevronRight from "@/assets/icons/ChevronRight";
import Link from "next/link";

interface ProfileButtonProps {
  image: string;
  name: string;
}

const ProfileButton = ({ image, name }: ProfileButtonProps) => {
  return (
    <Link href="/profile/checkProfile" className={styles.wrapper}>
        <div className={styles.infoWrapper}>
          <div className={styles.imageWrapper}>
            <Image className={styles.image} src={image} alt={name} fill />
          </div>
          <div className={styles.textWrapper}>
            <span className={styles.name}>{name}</span>
            <span className={styles.info}>See profile</span>
          </div>
        </div>
        <ChevronRight className={styles.icon} />
    </Link>
  );
};

export default ProfileButton;
