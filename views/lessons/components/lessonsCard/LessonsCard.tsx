import styles from "./lessonsCard.module.scss";
import { LessonInterface } from "@/types";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import Image from "next/image";
import Clock from "@/assets/icons/Clock";
import { format } from "date-fns";
import Ellipsis from "@/assets/icons/Ellipsis";
import Trash from "@/assets/icons/Trash";
import Modal from "@/components/modal/Modal";
import useModal from "@/hooks/useModal";
import { useError } from "@/hooks/useError";
import axios from "axios";
import { useRouter } from "next/router";

interface LessonsCardProps {
  lesson: LessonInterface;
}

const LessonsCard = ({ lesson }: LessonsCardProps) => {
  const session = useSession();
  const router = useRouter();
  const { isOpen, handleOpenModal, handleCloseModal } = useModal();
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
          <button onClick={handleOpenModal} className={styles.menuItem}>
            <Trash className={styles.trash} />
            <span>Delete</span>
          </button>
        </div>
      )}
      <Modal
        isOpen={isOpen}
        handleClose={handleCloseModal}
        handleDelete={handleDelete}
        title="Are you sure you want to delete this lesson?"
        body="Your money will be return to your bank account within few days."
      />
      <div className={styles.headerWrapper}>
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
      </div>
      <p className={styles.about}>{lesson.about}</p>
      <div className={styles.timeWrapper}>
        <Clock className={styles.icon} />
        <span className={styles.time}>{getDate()}</span>
      </div>
    </div>
  );
};

export default LessonsCard;
