import styles from "@/styles/category.module.scss";
import { GetStaticPaths, GetStaticProps } from "next";
import Teacher from "@/models/Teacher";
import User from "@/models/User";
import { TeacherInterface } from "@/types";
import TeacherCard from "@/components/teacherCard/TeacherCard";
import MainTemplate from "@/templates/mainTemplate/MainTemplate";
import Search from "@/components/search/Search";
import { categories } from "@/views/home/data/categories";
import { useRouter } from "next/router";
import Header from "@/components/header/Header";
import dbConnect from "@/utils/dbConnect";

interface CategoryProps {
  teachers: TeacherInterface[];
}

const Category = ({ teachers }: CategoryProps) => {
  const router = useRouter();
  const { category } = router.query;

  if (!teachers) return;

  return (
    <MainTemplate
      color="purple"
      content={
        <div className={styles.contentWrapper}>
          <Search />
        </div>
      }
    >
      <Header
        text={
          teachers.length > 1
            ? categories.find(({ name }) => name === category)?.display
            : `Couldn't find any ${category} teachers`
        }
      />
      <div className={styles.teachersWrapper}>
        {teachers.map((teacher) => (
          <TeacherCard key={teacher.id} teacher={teacher} />
        ))}
      </div>
    </MainTemplate>
  );
};

export const getStaticPaths: GetStaticPaths = () => {
  return {
    paths: categories.map((category) => ({
      params: {
        category: category.name,
      },
    })),
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const category = params?.category;

  await dbConnect();

  const teachers = await Teacher.find({ categories: category }).populate(
    "user",
    "name image",
    User,
  );

  return {
    props: {
      teachers: teachers.map((teacher) => ({
        id: teacher._id.toString(),
        name: teacher.user.name,
        image: teacher.user.image,
        about: teacher.about,
        rating: teacher.rating,
        price: teacher.price,
        categories: teacher.categories,
      })),
    },
    revalidate: 300,
  };
};

export default Category;
