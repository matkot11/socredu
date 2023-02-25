import styles from "@/views/editProfile/editProfile.module.scss";
import MainTemplate from "@/templates/mainTemplate/MainTemplate";
import { getSession, useSession } from "next-auth/react";
import ChooseBioButton from "@/views/editProfile/components/chooseBioButton/ChooseBioButton";
import { useState } from "react";
import StudentBio from "@/views/editProfile/components/studentBio/StudentBio";
import TeacherBio from "@/views/editProfile/components/teacherBio/TeacherBio";
import dbConnect from "@/utils/dbConnect";
import Student from "@/models/Student";
import { GetServerSideProps } from "next";
import Teacher from "@/models/Teacher";

interface EditProfileProps {
  studentAbout: string;
  teacherAbout: string;
  categories: string[];
  topics: string[];
  price: number;
  days: any[];
}

const EditProfile = ({
  studentAbout,
  teacherAbout,
  categories,
  topics,
  price,
  days,
}: EditProfileProps) => {
  const session = useSession();
  const [isStudentEdit, setIsStudentEdit] = useState(true);

  const getName = (): string => {
    const fullName = session.data?.user?.name?.split(" ");
    return fullName?.[0] || "";
  };

  if (!session.data) return;

  return (
    <MainTemplate>
      <div className={styles.wrapper}>
        <div>
          <div className={styles.headerWrapper}>
            <h2 className={styles.header}>EDIT PROFILE</h2>
            <div className={styles.subHeaderWrapper}>
              <span className={styles.nameSubHeader}>
                Welcome
                <span className={styles.nameSubHeaderPurple}>
                  {" "}
                  {getName()}!
                </span>
              </span>
              <span className={styles.subHeader}>
                Manage your personal information here.
              </span>
            </div>
          </div>
          <div className={styles.buttonWrapper}>
            <ChooseBioButton
              text="Student"
              isStudentEdit={isStudentEdit}
              onClick={() => setIsStudentEdit(true)}
            />
            <ChooseBioButton
              text="Teacher"
              isStudentEdit={!isStudentEdit}
              onClick={() => setIsStudentEdit(false)}
            />
          </div>
        </div>
        {isStudentEdit ? (
          <StudentBio
            image={session.data.user?.image || ""}
            about={studentAbout}
          />
        ) : (
          <TeacherBio
            image={session.data.user?.image || ""}
            about={teacherAbout}
            categoriesProp={categories}
            topicsProp={topics}
            priceProp={price}
            daysProp={days}
          />
        )}
      </div>
    </MainTemplate>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  await dbConnect();
  const session = await getSession(context);

  // @ts-ignore
  const student = await Student.findOne({ user: session?.user?.id });
  // @ts-ignore
  const teacher = await Teacher.findOne({ user: session?.user?.id });

  return {
    props: {
      studentAbout: student.about,
      teacherAbout: teacher.about,
      categories: teacher.categories,
      topics: teacher.topics,
      price: teacher.price,
      days: JSON.parse(JSON.stringify(teacher.days)),
    },
  };
};

export default EditProfile;
