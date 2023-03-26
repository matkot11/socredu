import styles from "./rateModal.module.scss";
import { useEffect, useState } from "react";
import ReactModal from "react-modal";
import Label from "@/components/label/label";
import Input from "@/components/input/Input";
import { useFormik } from "formik";
import { useError } from "@/hooks/useError";
import axios from "axios";

interface ModalProps {
  isOpen: boolean;
  handleClose: () => void;
  teacherId: string;
}

const RateModal = ({ isOpen, handleClose, teacherId }: ModalProps) => {
  const [_document, set_document] = useState(null);
  const { dispatchError } = useError();

  useEffect(() => {
    // @ts-ignore
    set_document(document);
  }, []);

  const modalStyles = {
    overlay: {
      zIndex: 1000,
      backgroundColor: "rgba(0, 0, 0, 0.34)",
    },
    content: {
      padding: 0,
      width: 265,
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      transform: "translate(-50%, -50%)",
      border: "none",
      borderRadius: 10,
    },
  };

  const formik = useFormik({
    initialValues: {
      rate: "",
    },
    onSubmit: async (values) => {
      if (+values.rate > 5 || +values.rate < 1) {
        dispatchError("Rate must be between 1 and 5");
        return;
      }
      try {
        const response = await axios.post("/api/bookLesson/rate", {
          rate: +values.rate,
          teacherId,
        });
        handleClose();
        dispatchError(response.data.message);
      } catch (error: any) {
        dispatchError(error.response.data.message);
      }
    },
  });

  if (!_document) return <span>Loading...</span>;

  return (
    <ReactModal
      // @ts-ignore
      appElement={document.getElementById("__next")}
      isOpen={isOpen}
      onRequestClose={handleClose}
      style={modalStyles}
    >
      <div className={styles.wrapper}>
        <h3 className={styles.title}>Rate a lesson</h3>
        <div className={styles.body}>
          <form onSubmit={formik.handleSubmit}>
            <Label htmlFor="rate" label="Rate">
              <Input
                name="rate"
                type="number"
                min={1}
                max={5}
                className={styles.input}
                value={formik.values.rate}
                onChange={formik.handleChange}
              />
            </Label>
          </form>
        </div>
      </div>
      <div className={styles.buttonWrapper}>
        <button onClick={handleClose} className={styles.button}>
          Cancel
        </button>
        <button onClick={formik.submitForm} className={styles.button}>
          Submit
        </button>
      </div>
    </ReactModal>
  );
};

export default RateModal;
