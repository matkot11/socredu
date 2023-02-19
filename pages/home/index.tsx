import MainTemplate from "@/templates/mainTemplate/MainTemplate";
import { useState } from "react";
import Categories from "@/views/home/components/Categories/Categories";
import HomeContent from "@/views/home/components/homeContent/HomeContent";

const Home = () => {
  const [search, setSearch] = useState("");
  return (
    <MainTemplate
      content={<HomeContent search={search} setSearch={setSearch} />}
    >
      <Categories />
    </MainTemplate>
  );
};

export default Home;
