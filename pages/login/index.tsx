import AuthTemplate from "@/templates/AuthTemplate";
import styles from "@/styles/login.module.scss";
import Label from "@/components/label/label";
import Input from "@/components/input/input";
import SecondaryButton from "@/components/secondaryButton/SecondaryButton";
import Image from "next/image";
import loginIllustration from "@/assets/illustrations/login-illustration.svg";

const Login = () => {
  return (
    <AuthTemplate
      content={
        <div className={styles.contentWrapper}>
          <h2 className={styles.title}>WELCOME BACK</h2>
          <Image
            className={styles.image}
            src={loginIllustration}
            alt="Login illustration"
            priority
          />
        </div>
      }
      body={
        <form className={styles.form}>
          <h2 className={styles.formTitle}>LOGIN</h2>
          <Label label="Email">
            <Input />
          </Label>
          <Label label="Password">
            <Input />
          </Label>
          <SecondaryButton className={styles.button} text="Login" />
        </form>
      }
    />
  );
};

export default Login;
