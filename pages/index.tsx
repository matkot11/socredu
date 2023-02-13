import styles from "@/styles/welcome.module.scss";
import Image from "next/image";
import welcomeIllustration from "@/assets/illustrations/welcome-illustration.svg";
import AuthTemplate from "@/templates/AuthTemplate";
import PrimaryButton from "@/components/primaryButton/PrimaryButton";
import SecondaryButton from "@/components/secondaryButton/SecondaryButton";

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
        <SecondaryButton text="LOGIN" />
        <PrimaryButton text="CREATE ACCOUNT" />
      </div>
    }
  ></AuthTemplate>
);
export default Welcome;
