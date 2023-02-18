import AuthTemplate from "@/templates/AuthTemplate";
import styles from "@/styles/auth.module.scss";
import Label from "@/components/label/label";
import Input from "@/components/input/Input";
import Image from "next/image";
import loginIllustration from "@/assets/illustrations/login-illustration.svg";
import { useFormik } from "formik";
import SecondaryButton from "@/components/secondaryLink/SecondaryButton";
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";
import { useState } from "react";

const Login = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: async (values) => {
      setIsLoading(true);
      const loginResponse = await signIn("credentials", {
        redirect: false,
        email: values.email,
        password: values.password,
      });

      if (loginResponse?.error) {
        console.log(loginResponse.error);
        return;
      }

      await router.replace("/home");
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
            disabled={isLoading}
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
