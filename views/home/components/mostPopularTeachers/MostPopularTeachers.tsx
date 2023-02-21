import styles from "./mostPopularTeachers.module.scss";
import TeacherCard from "@/components/teacherCard/TeacherCard";
import { TeacherInterface } from "@/types";
import Header from "@/components/header/Header";

interface MostPopularTeachersProps {
  teachers: TeacherInterface[];
}

const MostPopularTeachers = ({ teachers }: MostPopularTeachersProps) => {
  return (
    <div className={styles.wrapper}>
      <Header text="Popular" />
      <div className={styles.teachersWrapper}>
        {teachers.map((teacher) => (
          <TeacherCard key={teacher.id} teacher={teacher} />
        ))}
      </div>
    </div>
  );
};

export default MostPopularTeachers;
