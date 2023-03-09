import styles from "./lessonsCard.module.scss";
import { LessonInterface } from "@/types";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import Image from "next/image";
import Clock from "@/assets/icons/Clock";
import { format, getHours } from "date-fns";

interface LessonsCardProps {
  lesson: LessonInterface;
}

const LessonsCard = ({ lesson }: LessonsCardProps) => {
  const session = useSession();
  const [isStudent, setIsStudent] = useState(false);

  const getDate = () => {
    const date = format(new Date(lesson.when), "PP");
    const time = format(new Date(lesson.when), "p");
    return `${date}, ${time}`;
  };

  useEffect(() => {
    // @ts-ignore
    if (session?.data?.user?.email === lesson.student.email) {
      setIsStudent(true);
    }
  }, [session, lesson.student.email]);

  return (
    <div className={styles.wrapper}>
      <div className={styles.headerWrapper}>
        <span className={styles.header}>
          Lesson with{" "}
          <span className={styles.purple}>
            {isStudent ? lesson.teacher.name : lesson.student.name}
          </span>
        </span>
        <div className={styles.imageWrapper}>
          <Image
            src={isStudent ? lesson.teacher.image : lesson.student.image}
            alt="Profile image"
            fill
            className={styles.image}
          />
        </div>
      </div>
      <p className={styles.about}>{lesson.about}</p>
      <div className={styles.timeWrapper}>
        <Clock className={styles.icon} />
        <span className={styles.time}>{getDate()}</span>
      </div>
    </div>
  );
};

export default LessonsCard;
