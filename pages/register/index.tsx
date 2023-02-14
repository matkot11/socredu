import AuthTemplate from "@/templates/AuthTemplate";
import styles from "@/styles/auth.module.scss";
import Label from "@/components/label/label";
import Image from "next/image";
import registerIllustration from "@/assets/illustrations/register-illustration.svg";
import { useFormik } from "formik";
import PrimaryButton from "@/components/primaryLink/PrimaryButton";
import Select from "@/components/input/Select";
import Input from "@/components/input/Input";

const Register = () => {
  const formik = useFormik({
    initialValues: {
      fullName: "",
      age: "",
      email: "",
      password: "",
      repeatPassword: "",
    },
    onSubmit: (values) => {
      console.log(values);
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
          <Label htmlFor="fullName" label="Full name">
            <Input
              name="fullName"
              onChange={formik.handleChange}
              value={formik.values.fullName}
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
              onChange={formik.handleChange}
              value={formik.values.repeatPassword}
            />
          </Label>
          <PrimaryButton className={styles.button} text="Register" />
        </form>
      }
    />
  );
};

export default Register;
