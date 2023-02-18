import styles from "@/styles/welcome.module.scss";
import Image from "next/image";
import welcomeIllustration from "@/assets/illustrations/welcome-illustration.svg";
import AuthTemplate from "@/templates/authTemplate/AuthTemplate";
import PrimaryLink from "@/components/primaryLink/PrimaryLink";
import SecondaryLink from "@/components/secondaryLink/SecondaryLink";

const Welcome = () => (
  <AuthTemplate
    content={
      <Image
        className={styles.image}
        src={welcomeIllustration}
        alt="Welcome illustration"
        priority
      />
    }
    body={
      <div className={styles.body}>
        <p className={styles.welcomeText}>
          WELCOME TO <span className={styles.purple}>SOCREDU</span> YOUR
          TUTORING APP
        </p>
        <SecondaryLink href="/login" text="LOGIN" />
        <PrimaryLink href="/register" text="CREATE ACCOUNT" />
      </div>
    }
  ></AuthTemplate>
);
export default Welcome;
