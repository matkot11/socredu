import AuthTemplate from "@/templates/AuthTemplate";
import styles from "@/styles/auth.module.scss";
import Label from "@/components/label/label";
import Input from "@/components/input/Input";
import Image from "next/image";
import loginIllustration from "@/assets/illustrations/login-illustration.svg";
import { useFormik } from "formik";
import SecondaryButton from "@/components/secondaryLink/SecondaryButton";

const Login = () => {
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: (values) => {
      console.log(values);
    },
  });
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
        <form className={styles.form} onSubmit={formik.handleSubmit}>
          <h2 className={styles.formTitle}>LOGIN</h2>
          <Label htmlFor="email" label="Email">
            <Input
              name="email"
              onChange={formik.handleChange}
              value={formik.values.email}
              type="email"
            />
          </Label>
          <Label htmlFor="password" label="Password">
            <Input
              name="password"
              onChange={formik.handleChange}
              value={formik.values.password}
              type="password"
            />
          </Label>
          <SecondaryButton
            type="submit"
            className={styles.button}
            text="Login"
          />
        </form>
      }
    />
  );
};

export default Login;
