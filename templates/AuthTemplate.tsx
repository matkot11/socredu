import Logo from "@/components/logo/Logo";
import { ReactElement } from "react";
import styles from "./authTemplate.module.scss";
import { useError } from "@/hooks/useError";
import ErrorMessage from "@/components/errorMessage/ErrorMessage";

interface AuthTemplateProps {
  content: ReactElement;
  body: ReactElement;
}

const AuthTemplate = ({ content, body }: AuthTemplateProps) => {
  const { error } = useError();

  return (
    <div className={styles.wrapper}>
      <div className={styles.contentWrapper}>
        <Logo color="white" letterColor="light-blue" />
        {content}
      </div>
      <div className={styles.body}>
        {body}
        {error && <ErrorMessage text={error} />}
      </div>
    </div>
  );
};

export default AuthTemplate;
