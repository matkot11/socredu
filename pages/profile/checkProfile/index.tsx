import styles from "@/views/checkProfile/checkProfile.module.scss";
import MainTemplate from "@/templates/mainTemplate/MainTemplate";
import { getSession, useSession } from "next-auth/react";
import ChooseBioButton from "@/views/editProfile/components/chooseBioButton/ChooseBioButton";
import { useState } from "react";
import { GetServerSideProps } from "next";
import dbConnect from "@/utils/dbConnect";
import User from "@/models/User";
import Teacher from "@/models/Teacher";
import Student from "@/models/Student";
import TeacherProfile from "@/views/checkProfile/components/teacherProfile/TeacherProfile";
import StudentProfile from "@/views/checkProfile/components/studentProfile/StudentProfile";
import Link from "next/link";
import ChevronRight from "@/assets/icons/ChevronRight";

interface CheckProfileProps {
  student: {
    about: string;
    name: string;
    image: string;
  };
  teacher: {
    id: string;
    name: string;
    image: string;
    about: string;
    rating: number;
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

const CheckProfile = ({ student, teacher }: CheckProfileProps) => {
  const session = useSession();
  const [isStudentProfile, setIsStudentProfile] = useState(true);

  const getName = (): string => {
    const fullName = session.data?.user?.name?.split(" ");
    return fullName?.[0] || "";
  };

  if (!session.data) return;
  return (
    <MainTemplate>
      <div className={styles.wrapper}>
        <div>
          <div className={styles.subHeaderWrapper}>
            <span className={styles.nameSubHeader}>
              Welcome
              <span className={styles.nameSubHeaderPurple}> {getName()}!</span>
            </span>
            <span className={styles.subHeader}>
              {isStudentProfile
                ? "See how your profile will look like for other users."
                : "See how your profile will look like for your students."}
            </span>
          </div>
          <div className={styles.buttonWrapper}>
            <ChooseBioButton
              text="Student"
              isStudentEdit={isStudentProfile}
              onClick={() => setIsStudentProfile(true)}
            />
            <ChooseBioButton
              text="Teacher"
              isStudentEdit={!isStudentProfile}
              onClick={() => setIsStudentProfile(false)}
            />
          </div>
        </div>
        <div className={styles.rightWrapper}>
          {isStudentProfile ? (
            <StudentProfile student={student} />
          ) : (
            <TeacherProfile teacher={teacher} />
          )}
          <Link className={styles.link} href="/profile/editProfile">
            <span>Edit Profile</span>
            <ChevronRight className={styles.icon} />
          </Link>
        </div>
      </div>
    </MainTemplate>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context);

  await dbConnect();
  // @ts-ignore
  const student = await Student.findOne({ user: session?.user?.id }).populate(
    "user",
    "name image",
    User,
  );
  // @ts-ignore
  const teacher = await Teacher.findOne({ user: session?.user?.id }).populate(
    "user",
    "name image",
    User,
  );

  return {
    props: {
      student: {
        about: student.about,
        image: student.user.image,
        name: student.user.name,
      },
      teacher: {
        id: teacher._id.toString(),
        name: teacher.user.name,
        image: teacher.user.image,
        about: teacher.about,
        rating: teacher.rating,
        price: teacher.price,
        categories: teacher.categories,
        topics: teacher.topics,
        days: JSON.parse(JSON.stringify(teacher.days)),
      },
    },
  };
};

export default CheckProfile;
