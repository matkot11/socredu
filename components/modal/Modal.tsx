import styles from "./modal.module.scss";
import { useEffect, useState } from "react";
import ReactModal from "react-modal";

interface ModalProps {
  title: string;
  body: string;
  isOpen: boolean;
  handleClose: () => void;
  handleDelete?: () => void;
}

const Modal = ({
  title,
  body,
  isOpen,
  handleClose,
  handleDelete,
}: ModalProps) => {
  const [_document, set_document] = useState(null);

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
        <h3 className={styles.title}>{title}</h3>
        <p className={styles.body}>{body}</p>
      </div>
      <div className={styles.buttonWrapper}>
        <button onClick={handleClose} className={styles.button}>
          Cancel
        </button>
        <button onClick={handleDelete} className={styles.button}>
          Delete
        </button>
      </div>
    </ReactModal>
  );
};

export default Modal;
