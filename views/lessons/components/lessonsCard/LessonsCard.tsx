import styles from "./lessonsCard.module.scss";
import { LessonInterface } from "@/types";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import Image from "next/image";
import Clock from "@/assets/icons/Clock";
import { format, isPast } from "date-fns";
import Ellipsis from "@/assets/icons/Ellipsis";
import Trash from "@/assets/icons/Trash";
import Modal from "@/components/modal/Modal";
import useModal from "@/hooks/useModal";
import { useError } from "@/hooks/useError";
import axios from "axios";
import { useRouter } from "next/router";
import Link from "next/link";
import ChevronRight from "@/assets/icons/ChevronRight";
import classNames from "classnames";
import RateModal from "@/components/rateModal/RateModal";

interface LessonsCardProps {
  lesson: LessonInterface;
}

const LessonsCard = ({ lesson }: LessonsCardProps) => {
  const session = useSession();
  const router = useRouter();
  const {
    isOpen: isOpenDelete,
    handleOpenModal: handleOpenModalDelete,
    handleCloseModal: handleCloseModalDelete,
  } = useModal();
  const {
    isOpen: isOpenRate,
    handleOpenModal: handleOpenModalRate,
    handleCloseModal: handleCloseModalRate,
  } = useModal();
  const { dispatchError } = useError();
  const [isStudent, setIsStudent] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const getDate = () => {
    const date = format(new Date(lesson.when), "PP");
    const time = format(new Date(lesson.when), "p");
    return `${date}, ${time}`;
  };

  const handleDelete = async () => {
    try {
      const response = await axios.post("/api/bookLesson/deleteLesson", {
        id: lesson.id,
      });

      dispatchError(response.data.message);
      router.reload();
    } catch (error: any) {
      dispatchError(error.response.data.message);
    }
  };

  const handleCreateMeetingLink = () => {
    const student = lesson.student.email;
    const teacher = lesson.teacher.email;

    return `https://teams.microsoft.com/l/call/0/0?users=${student},${teacher}`;
  };

  const isDateInPast = () => isPast(new Date(lesson.when));

  useEffect(() => {
    // @ts-ignore
    if (session?.data?.user?.email === lesson.student.email) {
      setIsStudent(true);
    }
  }, [session, lesson.student.email]);

  return (
    <div className={styles.wrapper}>
      <button
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        className={styles.menuButton}
      >
        <Ellipsis className={styles.ellipsis} />
      </button>
      {isMenuOpen && (
        <div className={styles.menuWrapper}>
          <button onClick={handleOpenModalDelete} className={styles.menuItem}>
            <Trash className={styles.trash} />
            <span>Delete</span>
          </button>
        </div>
      )}
      <Modal
        isOpen={isOpenDelete}
        handleClose={handleCloseModalDelete}
        handleDelete={handleDelete}
        title="Are you sure you want to delete this lesson?"
        body="Your money will be return to your bank account within few days."
      />
      <Link
        href={`/home/${isStudent && lesson.teacher.id}`}
        className={classNames(
          styles.headerWrapper,
          !isStudent && styles.inactiveLink,
        )}
      >
        <span className={styles.header}>
          Lesson with{" "}
          <span className={styles.purple}>
            {isStudent ? lesson.teacher.name : lesson.student.name}
          </span>
        </span>
        <div className={styles.imageWrapper}>
          <Image
            src={isStudent ? lesson.teacher.image : lesson.student.image}
            alt="Profile image"
            fill
            className={styles.image}
          />
        </div>
      </Link>
      <p className={styles.about}>{lesson.about}</p>
      <div className={styles.bottomWrapper}>
        <div className={styles.timeWrapper}>
          <Clock className={styles.icon} />
          <span className={styles.time}>{getDate()}</span>
        </div>
        {isStudent && isDateInPast() && (
          <>
            <button onClick={handleOpenModalRate} className={styles.link}>
              <span>Rate</span>
              <ChevronRight className={styles.iconChevron} />
            </button>
            <RateModal
              teacherId={lesson.teacher.id}
              isOpen={isOpenRate}
              handleClose={handleCloseModalRate}
            />
          </>
        )}
        {!isDateInPast() && (
          <Link
            target="_blank"
            className={styles.link}
            href={handleCreateMeetingLink()}
          >
            <span>Lecture</span>
            <ChevronRight className={styles.iconChevron} />
          </Link>
        )}
      </div>
    </div>
  );
};

export default LessonsCard;
