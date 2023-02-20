import styles from "./teacherCard.module.scss";
import { TeacherInterface } from "@/types";
import Image from "next/image";
import Rating from "@/components/rating/Rating";
import Link from "next/link";

interface TeacherCardProps {
  teacher: TeacherInterface;
}

const TeacherCard = ({ teacher }: TeacherCardProps) => {
  const getCategories = () => {
    const categoriesSet = new Set();
    for (const subject of teacher.subjects) {
      categoriesSet.add(
        subject.category.charAt(0).toUpperCase() + subject.category.slice(1),
      );
    }

    if (
      categoriesSet.size > 1 &&
      `${Array.from(categoriesSet).slice(0, 2).join(", ")}...`.length > 13
    )
      return `${Array.from(categoriesSet).slice(0, 2).join(", ")}...`;

    if (categoriesSet.size > 1)
      return `${Array.from(categoriesSet).slice(0, 2).join(", ")}...`;

    return categoriesSet.values().next().value;
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
        <span className={styles.categories}>{getCategories()}</span>
        <Rating rating={teacher.rating} />
        <span className={styles.name}>{getShortenText(teacher.name)}</span>
        <span className={styles.price}>£{teacher.price}/h</span>
      </div>
    </Link>
  );
};

export default TeacherCard;
