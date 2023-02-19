import MainTemplate from "@/templates/mainTemplate/MainTemplate";
import Input from "@/components/input/Input";
import { useState } from "react";
import styles from "@/styles/home.module.scss";
import Search from "@/assets/icons/Search";
import Image from "next/image";
import heroIllustration from "@/assets/illustrations/hero-illustration.svg";

const Home = () => {
  const [search, setSearch] = useState("");
  return (
    <MainTemplate
      content={
        <div className={styles.content}>
          <div className={styles.heroWrapper}>
            <Image
              src={heroIllustration}
              alt="Hero illustration"
              className={styles.contentImage}
            />
            <div className={styles.contentTextWrapper}>
              <h2 className={styles.contentHeader}>
                FIND YOUR NEXT
                <br /> EXTRA LESSON
              </h2>
              <p className={styles.contentParagraph}>
                Say Goodbye to Boring Learning and Hello to Effortless Education
                with
                <span className={styles.contentParagraphPurple}> Socredu</span>
              </p>
            </div>
          </div>
          <div className={styles.contentInputWrapper}>
            <Input
              placeholder="Search for lesson"
              name="search"
              onChange={(e) => setSearch(e.target.value)}
              value={search}
              className={styles.contentInput}
            />
            <Search className={styles.contentSearch} />
          </div>
        </div>
      }
      body={<span>Home</span>}
    ></MainTemplate>
  );
};

export default Home;
