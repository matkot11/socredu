import styles from "./teacherCard.module.scss";
import { TeacherInterface } from "@/types";
import Image from "next/image";
import Rating from "@/components/rating/Rating";
import Link from "next/link";
import { categories } from "@/views/home/data/categories";

interface TeacherCardProps {
  teacher: TeacherInterface;
}

const TeacherCard = ({ teacher }: TeacherCardProps) => {
  const getCategoryObject = (categoryName: string) => {
    return categories.find(({ name }) => name === categoryName);
  };
  const getCategories = (): string => {
    if (teacher.categories.length > 1)
      return `${getCategoryObject(teacher.categories[0])?.display}, ${
        getCategoryObject(teacher.categories[1])?.display
      }...`;

    return getCategoryObject(teacher.categories[0])?.display || "";
  };

  const getShortenText = (text: string) => {
    if (text.length > 13) return text.slice(0, 13) + "...";
    return text;
  };

  return (
    <Link href={`/home/${teacher.id}`} className={styles.wrapper}>
      <div className={styles.imageWrapper}>
        <Image
          className={styles.image}
          src={teacher.image}
          alt={teacher.name}
          fill
        />
      </div>
      <div className={styles.textWrapper}>
        <span className={styles.categories}>
          {getShortenText(getCategories())}
        </span>
        <Rating rating={teacher.rating.toFixed(1)} />
        <span className={styles.name}>{getShortenText(teacher.name)}</span>
        <span className={styles.price}>£{teacher.price}/h</span>
      </div>
    </Link>
  );
};

export default TeacherCard;
