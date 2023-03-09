import styles from "./lessonsCards.module.scss";
import classNames from "classnames";
import LessonsCard from "@/views/lessons/components/lessonsCard/LessonsCard";
import { LessonInterface } from "@/types";

interface LessonCardsProps {
  date: string;
  lessons: LessonInterface[];
}

const LessonsCards = ({ date, lessons }: LessonCardsProps) => (
  <div
    className={classNames(
      styles.wrapper,
      date === "Past lessons" && styles.gray,
    )}
  >
    <span className={styles.date}>{date}</span>
    <div className={styles.cards}>
      {lessons.length > 0 ? (
        lessons.map((lesson) => <LessonsCard key={lesson.id} lesson={lesson} />)
      ) : (
        <span className={styles.date}>No lessons available</span>
      )}
    </div>
  </div>
);

export default LessonsCards;
