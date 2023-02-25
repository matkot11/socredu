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

interface EditProfileProps {
  about: string;
}

const EditProfile = ({ about }: EditProfileProps) => {
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
        <div className={styles.leftWrapper}>
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
          <StudentBio image={session.data.user?.image || ""} about={about} />
        ) : (
          <TeacherBio />
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
  return {
    props: {
      about: student.about,
    },
  };
};

export default EditProfile;
