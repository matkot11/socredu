import styles from "./mostPopularTeachers.module.scss";
import TeacherCard from "@/components/teacherCard/TeacherCard";
import { TeacherInterface } from "@/types";

interface MostPopularTeachersProps {
  teachers: TeacherInterface[];
}

const MostPopularTeachers = ({ teachers }: MostPopularTeachersProps) => {
  return (
    <div className={styles.wrapper}>
      <span className={styles.header}>Popular</span>
      <div className={styles.teachersWrapper}>
        {teachers.map((teacher) => (
          <TeacherCard key={teacher.id} teacher={teacher} />
        ))}
      </div>
    </div>
  );
};

export default MostPopularTeachers;
