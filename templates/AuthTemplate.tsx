import Logo from "@/components/logo/Logo";
import { ReactElement } from "react";
import styles from "./authTemplate.module.scss";

interface AuthTemplateProps {
  content: ReactElement;
  body: ReactElement;
}

const AuthTemplate = ({ content, body }: AuthTemplateProps) => (
  <div className={styles.wrapper}>
    <div className={styles.contentWrapper}>
      <Logo color="white" letterColor="light-blue" />
      {content}
    </div>
    <div className={styles.body}>{body}</div>
  </div>
);

export default AuthTemplate;
