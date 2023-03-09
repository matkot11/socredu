import styles from "./mainButton.module.scss";
import classNames from "classnames";

interface MainButtonProps {
  selectedButton: "recent" | "today" | "upcoming";
  setSelectedRange: (range: "recent" | "today" | "upcoming") => void;
}

const MainButton = ({ selectedButton, setSelectedRange }: MainButtonProps) => (
  <div className={styles.wrapper}>
    <button
      onClick={() => setSelectedRange("recent")}
      className={classNames(
        styles.button,
        selectedButton === "recent" && styles.recent,
      )}
    >
      Recent
    </button>
    <button
      onClick={() => setSelectedRange("today")}
      className={classNames(
        styles.button,
        selectedButton === "today" && styles.future,
      )}
    >
      Today
    </button>
    <button
      onClick={() => setSelectedRange("upcoming")}
      className={classNames(
        styles.button,
        selectedButton === "upcoming" && styles.future,
      )}
    >
      Upcoming
    </button>
  </div>
);

export default MainButton;
