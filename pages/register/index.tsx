import AuthTemplate from "@/templates/AuthTemplate";
import styles from "@/styles/auth.module.scss";
import Label from "@/components/label/label";
import Input from "@/components/input/input";
import Image from "next/image";
import registerIllustration from "@/assets/illustrations/register-illustration.svg";
import PrimaryLink from "@/components/primaryLink/PrimaryLink";

const Register = () => {
  return (
    <AuthTemplate
      content={
        <div className={styles.contentWrapper}>
          <h2 className={styles.title}>NICE TO MEET YOU</h2>
          <Image
            className={styles.image}
            src={registerIllustration}
            alt="Login illustration"
            priority
          />
        </div>
      }
      body={
        <form className={styles.form}>
          <h2 className={styles.formTitle}>CREATE ACCOUNT</h2>
          <Label label="Full name">
            <Input />
          </Label>
          <Label label="Age">
            <Input />
          </Label>
          <Label label="Email">
            <Input />
          </Label>
          <Label label="Password">
            <Input />
          </Label>
          <Label label="Repeat password">
            <Input />
          </Label>
          <PrimaryLink href="/" className={styles.button} text="Register" />
        </form>
      }
    />
  );
};

export default Register;
