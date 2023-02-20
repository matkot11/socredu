import styles from "./rating.module.scss";
import Image from "next/image";
import Star from "@/assets/icons/Star.svg";

interface RatingProps {
  rating: number;
}

const Rating = ({ rating }: RatingProps) => (
  <div className={styles.wrapper}>
    <Image className={styles.star} src={Star} alt="Star" />
    <span className={styles.text}>{rating}</span>
  </div>
);

export default Rating;
