import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import styles from "./Modal.module.scss";

type ModalProps = {
  openModal: boolean;
  onClose: () => void;
  children: React.ReactNode;
};

const Modal = ({ openModal, onClose, children }: ModalProps) => {
  const [isBrowser, setIsBrowser] = useState(false);
  useEffect(() => {
    setIsBrowser(true);
  }, []);
  const handleClose = (e: React.SyntheticEvent) => {
    e.preventDefault();
    onClose();
  };
  const modalContent = openModal ? (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <p className={styles.close} onClick={handleClose}>
          x
        </p>
        <div className={styles.body}>{children}</div>
      </div>
    </div>
  ) : null;

  if (isBrowser) {
    return ReactDOM.createPortal(
      modalContent,
      document.getElementById("portal")!
    );
  } else {
    return null;
  }
};

export default Modal;
