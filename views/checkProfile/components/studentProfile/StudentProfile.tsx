import styles from "./studentProfile.module.scss";
import Image from "next/image";

interface StudentProfileProps {
  student: {
    about: string;
    name: string;
    image: string;
  };
}

const StudentProfile = ({ student }: StudentProfileProps) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.imageBorderWrapper}>
        <div className={styles.imageWrapper}>
          <Image
            className={styles.image}
            src={student.image}
            alt={student.name}
            quality={100}
            fill
          />
        </div>
      </div>
      <div className={styles.infoWrapper}>
        <div>
          <span className={styles.name}>{student.name}</span>
        </div>
      </div>
      <h3 className={styles.header}>About me</h3>
      <p className={styles.paragraph}>{student.about}</p>
    </div>
  );
};

export default StudentProfile;
