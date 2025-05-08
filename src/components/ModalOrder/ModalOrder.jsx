import React, { useState } from "react";
import FlexBox from "../FlexBox/FlexBox";
import Input from "../Input/Input";
import Title from "../Title/Title";
import styles from "./ModalOrder.module.scss";

const Modal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className={styles.wrapper} style={modalBackdropStyle}>
      <div className={styles.container} style={modalStyle}>
        <h2 className={styles.title}>Создание отзыва</h2>
        <form className={styles.form} action="">
          <FlexBox align="align-center" just="between" gap="35px">
            <Title size="medium">Имя</Title>
            <Input className={styles.input} placeholder="Введите ваше имя" />
          </FlexBox>

          <FlexBox align="align-center" just="between" gap="23px">
            <Title size="medium">Описание</Title>

            <textarea
              className={styles.textarea}
              placeholder="Введите описание "
              name=""
              id=""
            ></textarea>
          </FlexBox>

          <FlexBox align="align-center" just="between" gap="35px">
            <Title size="medium">Приложение</Title>
            <Input type="file" className={styles.inputFile} />
          </FlexBox>
        </form>
        <FlexBox just="around" align="align-end">
          <button className={styles.button} onClick={onClose}>
            Отправить
          </button>
        </FlexBox>
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
  zIndex: 1000,
};

const modalStyle = {
  backgroundColor: "white",
  padding: "20px",
  borderRadius: "5px",
  boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
};

const ModalOrder = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  function openModal(e) {
    e.preventDefault();
    setIsModalOpen(true);
  }

  function closeModal() {
    setIsModalOpen(false);
  }

  return (
    <div>
      <button className={styles.mailBtn} onClick={openModal}>
        Оставить отзыв
      </button>
      <Modal isOpen={isModalOpen} onClose={closeModal} />
    </div>
  );
};

export default ModalOrder;
