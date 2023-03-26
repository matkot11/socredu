import styles from "./teacherProfile.module.scss";
import Image from "next/image";
import Rating from "@/components/rating/Rating";
import Category from "@/views/teacher/components/category/Category";
import { categories } from "@/data/categories";

interface TeacherProfileProps {
  teacher: {
    id: string;
    name: string;
    image: string;
    about: string;
    rating: number[];
    price: number;
    categories: string[];
    topics: string[];
    days: {
      day: string;
      available: boolean;
      from: string;
      to: string;
    }[];
  };
}

const TeacherProfile = ({ teacher }: TeacherProfileProps) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.imageBorderWrapper}>
        <div className={styles.imageWrapper}>
          <Image
            className={styles.image}
            src={teacher.image}
            alt={teacher.name}
            quality={100}
            fill
          />
        </div>
      </div>
      <div className={styles.infoWrapper}>
        <div>
          <span className={styles.name}>{teacher.name}</span>
          <Rating rating={teacher.rating} />
        </div>
        <span className={styles.price}>Price/h £{teacher.price}</span>
      </div>
      <h3 className={styles.header}>About me</h3>
      <p className={styles.paragraph}>{teacher.about}</p>
      <h3 className={styles.header}>Category</h3>
      <div className={styles.categoriesWrapper}>
        {teacher.categories.map((category) => (
          <Category
            key={category}
            category={
              categories.find(({ name }) => name === category)?.display ||
              category
            }
          />
        ))}
      </div>
      <h3 className={styles.header}>Topics</h3>
      <div className={styles.categoriesWrapper}>
        {teacher.topics.map((topic) => (
          <Category key={topic} category={topic} />
        ))}
      </div>
    </div>
  );
};

export default TeacherProfile;
