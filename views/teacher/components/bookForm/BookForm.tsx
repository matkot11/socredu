import styles from "./bookForm.module.scss";
import Label from "@/components/label/label";
import Select from "@/components/input/Select";
import {
  addMonths,
  eachDayOfInterval,
  eachHourOfInterval,
  format,
  getDate,
  getDay,
  getHours,
  getMonth,
  getYear,
} from "date-fns";
import Textarea from "@/components/textarea/Textarea";
import { FormikProps } from "formik";

interface BookFormProps {
  formik: FormikProps<any>;
  days: {
    day: string;
    available: boolean;
    from: string;
    to: string;
  }[];
  bookedLessons: Date[];
}

const BookForm = ({ formik, days, bookedLessons = [] }: BookFormProps) => {
  const getTimes = (day: Date) => {
    if (!day || !days) return [];
    const dayObject = days.at(getDay(day) - 1);
    const from = dayObject?.from.split(":")[0];
    const to = dayObject?.to.split(":")[0];

    const times = eachHourOfInterval({
      start: new Date(
        getYear(day),
        getMonth(day),
        getYear(day),
        parseInt(from || "7"),
      ),
      end: new Date(
        getYear(day),
        getMonth(day),
        getYear(day),
        parseInt(to || "7") - 1,
      ),
    });

    const filteredBookedLessonsWithDay = bookedLessons.map((lesson) =>
      getDate(new Date(lesson)),
    );

    let filteredTimesWithBookedLessons = [];

    const getProperBookedLesson = (day: Date) => {
      return bookedLessons[filteredBookedLessonsWithDay.indexOf(getDate(day))];
    };
    if (filteredBookedLessonsWithDay.includes(getDate(day))) {
      filteredTimesWithBookedLessons = times.filter(
        (time) =>
          getHours(time) !== getHours(new Date(getProperBookedLesson(day))) - 1,
      );
    } else {
      filteredTimesWithBookedLessons = times;
    }

    const filteredTimes = new Set();
    for (const time of filteredTimesWithBookedLessons) {
      filteredTimes.add(getHours(time));
    }

    // @ts-ignore
    return [...filteredTimes];
  };

  const getDays = () => {
    const allDates = eachDayOfInterval({
      start: new Date(),
      end: addMonths(new Date(), 1),
    });
    const filteredDays = [];
    for (const date of allDates) {
      if (days.at(getDay(date) - 1)?.available && getTimes(date).length > 0) {
        filteredDays.push(date);
      }
    }

    return filteredDays;
  };

  return (
    <form className={styles.form} onSubmit={formik.handleSubmit}>
      <Label htmlFor="date" label="Date">
        <Select
          defaultValue={getDays().length > 0 ? getDays()[0].toString() : ""}
          name="date"
          onChange={formik.handleChange}
        >
          {getDays().map((day) => (
            <option key={day.toString()} value={day.toString()}>
              {format(day, "PPPP")}
            </option>
          ))}
        </Select>
      </Label>
      <Label htmlFor="time" label="Time">
        <Select
          name="time"
          onChange={formik.handleChange}
          disabled={
            !formik.values.date ||
            getTimes(new Date(formik.values.date)).length === 0
          }
        >
          {formik.values.date &&
            getTimes(new Date(formik.values.date)).map((time) => (
              <option key={time.toString()} value={time.toString()}>
                {time}:00
              </option>
            ))}
        </Select>
      </Label>
      <Label htmlFor="learn" label="Write what you want to learn">
        <Textarea
          name="learn"
          onChange={formik.handleChange}
          value={formik.values.learn}
        />
      </Label>
      <button className={styles.submitButton} type="submit">
        Reserve
      </button>
    </form>
  );
};

export default BookForm;
