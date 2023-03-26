import styles from "./rating.module.scss";
import Image from "next/image";
import Star from "@/assets/icons/Star.svg";

interface RatingProps {
  rating: number[];
}

const Rating = ({ rating }: RatingProps) => {
  const handleRating = () => {
    const sum = rating.reduce((a, b) => a + b, 0);
    return sum / rating.length;
  };

  return (
    <div className={styles.wrapper}>
      <Image className={styles.star} src={Star} alt="Star" />
      <span className={styles.text}>{handleRating()}</span>
    </div>
  );
};

export default Rating;
