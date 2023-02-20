import MainTemplate from "@/templates/mainTemplate/MainTemplate";
import { useState } from "react";
import Categories from "@/views/home/components/categories/Categories";
import HomeContent from "@/views/home/components/homeContent/HomeContent";
import MostPopularTeachers from "@/views/home/components/mostPopularTeachers/MostPopularTeachers";
import DbConnect from "@/utils/dbConnect";
import Teacher from "@/models/Teacher";
import User from "@/models/User";
import { TeacherInterface } from "@/types";

interface HomeProps {
  mostPopularTeachers: TeacherInterface[];
}

const Home = ({ mostPopularTeachers }: HomeProps) => {
  const [search, setSearch] = useState("");
  return (
    <MainTemplate
      content={<HomeContent search={search} setSearch={setSearch} />}
    >
      <Categories />
      <MostPopularTeachers teachers={mostPopularTeachers} />
    </MainTemplate>
  );
};

export const getServerSideProps = async () => {
  await DbConnect();

  const teachers = await Teacher.find()
    .populate("user", "name image", User)
    .sort({ rating: -1 })
    .limit(4);

  return {
    props: {
      mostPopularTeachers: teachers.map((teacher) => ({
        id: teacher._id.toString(),
        name: teacher.user.name,
        image: teacher.user.image,
        about: teacher.about,
        rating: teacher.rating,
        price: teacher.price,
        subjects: teacher.subjects.map(
          (subject: { name: string; category: string }) => ({
            name: subject.name,
            category: subject.category,
          }),
        ),
      })),
      revalidate: 3600,
    },
  };
};

export default Home;
