import AuthTemplate from "@/templates/AuthTemplate";
import styles from "@/styles/auth.module.scss";
import Label from "@/components/label/label";
import Image from "next/image";
import registerIllustration from "@/assets/illustrations/register-illustration.svg";
import { useFormik } from "formik";
import PrimaryButton from "@/components/primaryLink/PrimaryButton";
import Select from "@/components/input/Select";
import Input from "@/components/input/Input";
import axios from "axios";
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";
import { useState } from "react";

const Register = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const formik = useFormik({
    initialValues: {
      name: "",
      age: "",
      email: "",
      password: "",
      repeatPassword: "",
    },
    onSubmit: async (values) => {
      setIsLoading(true);
      try {
        await axios.post("/api/auth/register", {
          ...values,
        });

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
      } catch (error: any) {
        console.log(error.response.data.message);
      } finally {
        setIsLoading(false);
      }
    },
  });
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
        <form className={styles.form} onSubmit={formik.handleSubmit}>
          <h2 className={styles.formTitle}>CREATE ACCOUNT</h2>
          <Label htmlFor="name" label="Full name">
            <Input
              name="name"
              onChange={formik.handleChange}
              value={formik.values.name}
            />
          </Label>
          <Label htmlFor="age" label="Age">
            <Select
              name="age"
              onChange={formik.handleChange}
              value={formik.values.age}
            >
              {Array.from(Array(100).keys()).map((_, index) => (
                <option value={index} key={index}>
                  {index}
                </option>
              ))}
            </Select>
          </Label>
          <Label htmlFor="email" label="Email">
            <Input
              name="email"
              type="email"
              onChange={formik.handleChange}
              value={formik.values.email}
            />
          </Label>
          <Label htmlFor="password" label="Password">
            <Input
              name="password"
              type="password"
              onChange={formik.handleChange}
              value={formik.values.password}
            />
          </Label>
          <Label htmlFor="repeatPassword" label="Repeat password">
            <Input
              name="repeatPassword"
              type="password"
              onChange={formik.handleChange}
              value={formik.values.repeatPassword}
            />
          </Label>
          <PrimaryButton
            disabled={isLoading}
            type="submit"
            className={styles.button}
            text="Register"
          />
        </form>
      }
    />
  );
};

export default Register;
