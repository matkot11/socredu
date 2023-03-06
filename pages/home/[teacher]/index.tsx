import styles from "@/views/teacher/teacher.module.scss";
import { GetStaticPaths, GetStaticProps } from "next";
import dbConnect from "@/utils/dbConnect";
import Teacher from "@/models/Teacher";
import User from "@/models/User";
import Image from "next/image";
import MainTemplate from "@/templates/mainTemplate/MainTemplate";
import Rating from "@/components/rating/Rating";
import Category from "@/views/teacher/components/category/Category";
import { categories } from "@/data/categories";
import { useFormik } from "formik";
import BookForm from "@/views/teacher/components/bookForm/BookForm";
import { useError } from "@/hooks/useError";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import BookedLesson from "@/models/BookedLesson";

interface TeacherProps {
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
  bookedLessons: {
    when: Date;
  }[];
}

const TeacherInfo = ({ teacher, bookedLessons }: TeacherProps) => {
  const { dispatchError } = useError();
  const session = useSession();
  const router = useRouter();

  const formik = useFormik({
    initialValues: {
      date: "",
      time: "",
      learn: "",
    },
    onSubmit: async (values) => {
      if (!teacher) return;
      try {
        const response = await axios.post("/api/bookLesson/bookLesson", {
          teacherId: teacher.id,
          // @ts-ignore
          studentEmail: session.data?.user?.email,
          date: values.date,
          time: values.time,
          about: values.learn,
          price: teacher.price,
        });

        await router.push(`/home/${teacher.id}/${response.data.paymentId}`);
      } catch (error: any) {
        dispatchError(error.response.data.message);
      }
    },
  });

  if (!teacher) return;

  return (
    <MainTemplate>
      <div className={styles.wrapper}>
        <div className={styles.leftWrapper}>
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
              <Rating rating={teacher.rating.toFixed(1).toString()} />
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
        <div className={styles.rightWrapper}>
          <h3 className={styles.header}>Book a lesson with me</h3>
          <BookForm
            formik={formik}
            days={teacher.days}
            bookedLessons={bookedLessons.map((lesson) => lesson.when)}
          />
        </div>
      </div>
    </MainTemplate>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  await dbConnect();
  const teachers = await Teacher.find();

  return {
    paths: teachers.map((teacher) => ({
      params: {
        teacher: teacher._id.toString(),
      },
    })),
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const teacherParam = params?.teacher;

  await dbConnect();
  const teacher = await Teacher.findOne({
    _id: teacherParam,
  }).populate("user", "name image email", User);

  const bookedLessons = await BookedLesson.find({ teacher: teacher._id });

  return {
    props: {
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
      bookedLessons: bookedLessons.map((lesson) => ({
        when: lesson.when.toString(),
      })),
    },
  };
};

export default TeacherInfo;
