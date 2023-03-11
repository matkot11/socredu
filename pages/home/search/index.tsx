import styles from "@/styles/category.module.scss";
import { GetServerSideProps, GetStaticPaths, GetStaticProps } from "next";
import Teacher from "@/models/Teacher";
import User from "@/models/User";
import { TeacherInterface } from "@/types";
import TeacherCard from "@/components/teacherCard/TeacherCard";
import MainTemplate from "@/templates/mainTemplate/MainTemplate";
import { useRouter } from "next/router";
import Header from "@/components/header/Header";
import dbConnect from "@/utils/dbConnect";
import { categories } from "@/data/categories";
import Search from "@/components/search/Search";

interface SearchViewProps {
  teachers: TeacherInterface[];
}

const SearchView = ({ teachers }: SearchViewProps) => {
  const router = useRouter();

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
          teachers.length > 0
            ? `Results for ${router.query.search}`
            : `Nothing found for ${router.query.search}`
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

export const getServerSideProps: GetServerSideProps = async (context) => {
  const search: string = context.query.search as string;
  await dbConnect();

  const teachers = await Teacher.find().populate("user", "name image", User);

  const filteredTeachers = teachers.filter(
    (teacher) =>
      teacher.user.name.toLowerCase().includes(search.toLowerCase()) ||
      teacher.categories.includes(search.toLowerCase()) ||
      teacher.topics.includes(search.toLowerCase()),
  );

  return {
    props: {
      teachers: filteredTeachers.map((teacher) => ({
        id: teacher._id.toString(),
        name: teacher.user.name,
        image: teacher.user.image,
        about: teacher.about,
        rating: teacher.rating,
        price: teacher.price,
        categories: teacher.categories,
      })),
    },
  };
};

export default SearchView;
