import styles from "./mainTemplate.module.scss";
import { ReactNode } from "react";
import ErrorMessage from "@/components/errorMessage/ErrorMessage";
import { useError } from "@/hooks/useError";
import Logo from "@/components/logo/Logo";
import Navigation from "@/components/navigation/Navigation";
import Footer from "@/components/footer/Footer";

interface MainTemplateProps {
  children: ReactNode;
}

const MainTemplate = ({ children }: MainTemplateProps) => {
  const { error } = useError();

  return (
    <div className={styles.wrapper}>
      <div className={styles.navbar}>
        <Logo color="black" letterColor="purple" />
        <Navigation />
      </div>
      <div>{children}</div>
      <Footer />
      {error && <ErrorMessage text={error} />}
    </div>
  );
};

export default MainTemplate;
