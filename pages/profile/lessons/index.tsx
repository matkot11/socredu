import styles from "@/views/lessons/lessons.module.scss";
import MainTemplate from "@/templates/mainTemplate/MainTemplate";
import { GetServerSideProps } from "next";
import dbConnect from "@/utils/dbConnect";
import { getServerSession } from "next-auth";
import authOptions from "@/pages/api/auth/[...nextauth]";
import User from "@/models/User";
import BookedLesson from "@/models/BookedLesson";
import Teacher from "@/models/Teacher";
import { useSession } from "next-auth/react";
import MainButton from "@/views/lessons/components/mainButton/MainButton";
import { useState } from "react";
import LessonsCards from "@/views/lessons/components/lessonsCards/LessonsCards";
import { LessonInterface } from "@/types";
import { isFuture, isPast, isToday } from "date-fns";

interface LessonsProps {
  lessons: LessonInterface[];
}

const Lessons = ({ lessons }: LessonsProps) => {
  const session = useSession();
  const [selectedRange, setSelectedRange] = useState<
    "recent" | "today" | "upcoming"
  >("today");

  const getName = (name: string) => {
    return name.split(" ")[0];
  };

  const getRecentLessons = () => {
    return lessons.filter((lesson) => isPast(new Date(lesson.when)));
  };
  const getTodayLessons = () => {
    return lessons.filter((lesson) => isToday(new Date(lesson.when)));
  };
  const getFutureLessons = () => {
    return lessons.filter((lesson) => isFuture(new Date(lesson.when)));
  };

  return (
    <MainTemplate>
      <div className={styles.wrapper}>
        <div className={styles.innerWrapper}>
          <h3 className={styles.header}>
            Hi {getName(session?.data?.user?.name || "")}!
          </h3>
          <p className={styles.subHeader}>
            Here you can check all info about your booked lessons.
          </p>
          <MainButton
            selectedButton={selectedRange}
            setSelectedRange={setSelectedRange}
          />
        </div>
        {selectedRange === "recent" && (
          <LessonsCards lessons={getRecentLessons()} date="Past lessons" />
        )}
        {selectedRange === "today" && (
          <LessonsCards lessons={getTodayLessons()} date="Today's lessons" />
        )}
        {selectedRange === "upcoming" && (
          <LessonsCards lessons={getFutureLessons()} date="Future lessons" />
        )}
      </div>
    </MainTemplate>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  await dbConnect();

  const userSession = await getServerSession(
    context.req,
    context.res,
    authOptions,
  );

  // @ts-ignore
  const user = await User.findOne({ email: userSession?.user?.email });
  const studentLessons = await BookedLesson.find({
    student: user._id,
  }).populate([
    {
      path: "student",
      model: "User",
      select: "name email image",
    },
    {
      path: "teacher",
      model: "Teacher",
      select: "user",
      populate: {
        path: "user",
        model: "User",
        select: "name email image",
      },
    },
  ]);
  const teacher = await Teacher.findOne({ user: user._id });
  const teacherLessons = await BookedLesson.find({
    teacher: teacher._id,
  }).populate([
    {
      path: "teacher",
      model: "Teacher",
      select: "user",
      populate: {
        path: "user",
        model: "User",
        select: "name email image",
      },
    },
    {
      path: "student",
      model: "User",
      select: "name email image",
    },
  ]);

  const lessons = [...studentLessons, ...teacherLessons];

  return {
    props: {
      lessons: lessons.map((lesson) => ({
        id: lesson._id.toString(),
        when: lesson.when.toString(),
        about: lesson.about,
        paid: lesson.paid,
        student: {
          id: lesson.student._id.toString(),
          name: lesson.student.name,
          email: lesson.student.email,
          image: lesson.student.image,
        },
        teacher: {
          id: lesson.teacher.user._id.toString(),
          name: lesson.teacher.user.name,
          email: lesson.student.email,
          image: lesson.teacher.user.image,
        },
      })),
    },
  };
};

export default Lessons;
