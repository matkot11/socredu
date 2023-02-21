import styles from "./homeContent.module.scss";
import Image from "next/image";
import heroIllustration from "@/assets/illustrations/hero-illustration.svg";
import Search from "@/components/search/Search";

const HomeContent = () => (
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
          Say Goodbye to Boring Learning and Hello to Effortless Education with
          <span className={styles.contentParagraphPurple}> Socredu</span>
        </p>
      </div>
    </div>
    <Search />
  </div>
);

export default HomeContent;
