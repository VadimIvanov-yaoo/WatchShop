import React, { useState } from "react";
import styles from "./Modall.module.scss";

const Modal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div style={modalBackdropStyle}>
      <div className={styles.container} style={modalStyle}>
        <h2 className={styles.title}>Спасибо за подписку!</h2>
        <button className={styles.button} onClick={onClose}>
          Закрыть
        </button>
      </div>
    </div>
  );
};

const modalBackdropStyle = {
  position: "fixed",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  backgroundColor: "rgba(0, 0, 0, 0.5)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

const modalStyle = {
  backgroundColor: "white",
  padding: "20px",
  borderRadius: "5px",
  boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
};

const domains = [
  "gmail.com",
  "yahoo.com",
  "outlook.com",
  "hotmail.com",
  "icloud.com",
  "aol.com",
  "mail.ru",
  "protonmail.com",
];

const Modall = ({ state }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  function openModal(e) {
    e.preventDefault();
    const isDomainFound = domains.some((item) => state && state.includes(item));
    setIsModalOpen(isDomainFound);
  }

  function closeModal(e) {
    e.preventDefault();
    setIsModalOpen(false);
  }

  return (
    <div>
      <button className={styles.mailBtn} onClick={openModal}>
        Subscribe
      </button>
      <Modal isOpen={isModalOpen} onClose={closeModal} />
    </div>
  );
};

export default Modall;
