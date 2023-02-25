import styles from "./dayCard.module.scss";
import Switch from "react-switch";
import Label from "@/components/label/label";
import Select from "@/components/input/Select";
import { hours } from "@/data/hours";
import classNames from "classnames";

interface DayCardProps {
  day: any;
  setDay: any;
}

const DayCard = ({ day, setDay }: DayCardProps) => {
  const handleChangeSwitch = (e: boolean) => {
    setDay((prevState: any) =>
      prevState.map((prev: any) => {
        if (prev.day === day.day) {
          return { ...prev, available: e };
        }
        return prev;
      }),
    );
  };

  const handleChangeSelect = (e: string, when: string) => {
    setDay((prevState: any) =>
      prevState.map((prev: any) => {
        if (prev.day === day.day) {
          return { ...prev, [when]: e };
        }
        return prev;
      }),
    );
  };

  return (
    <div
      className={classNames(styles.wrapper, !day.available && styles.inactive)}
    >
      <div className={styles.topWrapper}>
        <h6 className={styles.dayHeader}>{day.day}</h6>
        <Switch
          onChange={(e) => handleChangeSwitch(e)}
          checked={day.available}
          uncheckedIcon={false}
          checkedIcon={false}
          onColor="#ffffff"
          offColor="#ffffff"
          onHandleColor="#6459EB"
          offHandleColor="#CDCDCD"
        />
      </div>
      <div className={styles.bottomWrapper}>
        <Label
          className={styles.label}
          textClassName={styles.textLabel}
          htmlFor="from"
          label="From"
        >
          <Select
            className={styles.select}
            disabled={!day.available}
            onChange={(e) => handleChangeSelect(e.target.value, "from")}
            name="from"
          >
            {hours.map((hour) => (
              <option key={hour} value={hour}>
                {hour}
              </option>
            ))}
          </Select>
        </Label>
        <span className={styles.line} />
        <Label
          className={styles.label}
          textClassName={styles.textLabel}
          htmlFor="to"
          label="To"
        >
          <Select
            className={styles.select}
            disabled={!day.available}
            onChange={(e) => handleChangeSelect(e.target.value, "to")}
            name="to"
          >
            {hours.map((hour) => (
              <option key={hour} value={hour}>
                {hour}
              </option>
            ))}
          </Select>
        </Label>
      </div>
    </div>
  );
};

export default DayCard;
