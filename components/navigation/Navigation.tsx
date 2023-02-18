import styles from "./navigation.module.scss";
import Menu from "@/assets/icons/Menu";
import Link from "next/link";
import { signOut } from "next-auth/react";
import { useState } from "react";
import Close from "@/assets/icons/Close";
import { useRouter } from "next/router";
import classNames from "classnames";

const Navigation = () => {
  const router = useRouter();
  const [isOpenNavigation, setIsOpenNavigation] = useState(false);
  const handleSignOut = async () => {
    await signOut();
  };
  return (
    <>
      <button
        onClick={() => setIsOpenNavigation(true)}
        className={styles.menuButton}
      >
        <Menu className={styles.menu} />
      </button>
      <div
        className={classNames(
          styles.navigationOverlap,
          isOpenNavigation && styles.openNavigation,
        )}
      >
        <nav
          className={styles.navigationWrapper}
        >
          <button
            onClick={() => setIsOpenNavigation(false)}
            className={styles.closeButton}
          >
            <Close className={styles.close} />
          </button>
          <ul className={styles.navigation}>
            <li>
              <Link
                className={router.pathname == "/home" ? styles.activeLink : ""}
                href="/home"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                className={router.pathname == "/" ? styles.activeLink : ""}
                href="/"
              >
                Inbox
              </Link>
            </li>
            <li>
              <Link
                className={router.pathname == "/" ? styles.activeLink : ""}
                href="/"
              >
                Profile
              </Link>
            </li>
            <li>
              <a onClick={handleSignOut}>Logout</a>
            </li>
          </ul>
        </nav>
      </div>
    </>
  );
};

export default Navigation;
