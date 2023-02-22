import styles from "./mainTemplate.module.scss";
import { ReactNode } from "react";
import ErrorMessage from "@/components/errorMessage/ErrorMessage";
import { useError } from "@/hooks/useError";
import Logo from "@/components/logo/Logo";
import Navigation from "@/components/navigation/Navigation";
import Footer from "@/components/footer/Footer";
import classNames from "classnames";

interface MainTemplateProps {
  content?: ReactNode;
  children: ReactNode;
  color?: "purple" | "";
}

const MainTemplate = ({ content, children, color = "" }: MainTemplateProps) => {
  const { error } = useError();

  return (
    <div className={styles.wrapper}>
      <div className={classNames(styles.navbar, styles[color] || "")}>
        <Logo color="black" letterColor={color ? "light-blue" : "purple"} />
        <Navigation />
      </div>
      <div>{content}</div>
      <div className={styles.body}>{children}</div>
      <Footer />
      {error && <ErrorMessage text={error} />}
    </div>
  );
};

export default MainTemplate;
