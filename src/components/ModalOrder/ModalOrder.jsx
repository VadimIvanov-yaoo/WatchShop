import { useState } from "react";
import { toast, Toaster } from "react-hot-toast";
import { useLocation, useParams } from "react-router-dom";
import FlexBox from "../FlexBox/FlexBox";
import Input from "../Input/Input";
import RaitingOrder from "../RaitingOrder/RaitingOrder";
import Title from "../Title/Title";
import styles from "./ModalOrder.module.scss";
// import { Toaster } from "react-hot-toast";

// import { RatingOrder } from "@mui/material";
import axios from "axios";

const Modal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;
  const location = useLocation();
  const [description, setDescription] = useState();
  const [value, setValue] = useState(0);
  const name = window.localStorage.getItem("name");
  const { id } = useParams();
  const cardId = id;
  const now = new Date();
  const day = now.getDate();
  const month = now.getMonth() + 1;
  const year = now.getFullYear();

  const reviewDate = `${year}-${month.toString().padStart(2, "0")}-${day
    .toString()
    .padStart(2, "0")}`;

  function changeDescription(e) {
    setDescription(e.target.value);
  }

  async function sendClick() {
    const reviewItem = { cardId, value, name, description, reviewDate };

    try {
      const { data } = await axios.post(
        "http://localhost:5000/reviewWrite",
        reviewItem
      );

      if (data.message === "Данные получены успешно!") {
        toast.success("Отзыв оставлен успешно");
        setTimeout(() => {
          window.location.reload();
        }, 3000);
      } else if (data.message === "Ошибка") {
        toast.error('Поле "Оценка" не заполнено');
      }
    } catch (error) {
      console.error("Ошибка:", error);
    }
    onClose();
  }

  return (
    <div className={styles.wrapper} style={modalBackdropStyle}>
      <div className={styles.container} style={modalStyle}>
        <h2 className={styles.title}>Создание отзыва</h2>
        <form className={styles.form} action="">
          <FlexBox align="align-center" just="between" gap="35px">
            <Title size="medium">Имя</Title>
            <Input
              value={name ? name : "ss"}
              className={styles.input}
              placeholder="Введите ваше имя"
            />
          </FlexBox>

          <FlexBox align="align-center" just="between" gap="23px">
            <Title size="medium">Описание</Title>

            <textarea
              onChange={changeDescription}
              className={styles.textarea}
              placeholder="Введите описание "
              name=""
              id=""
            ></textarea>
          </FlexBox>

          <FlexBox align="align-center" gap="50px">
            <Title size="medium">Оценка</Title>
            <RaitingOrder value={value} setValue={setValue} />
          </FlexBox>
        </form>
        <Toaster position="top-center" reverseOrder={false} />
        <FlexBox just="around" align="align-end">
          <button onClick={sendClick} className={styles.button}>
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
  const name = window.localStorage.getItem("name");

  function openModal(e) {
    e.preventDefault();
    if (name) {
      setIsModalOpen(true);
    } else {
      toast.error("Авторизуйтесь, чтобы оставить отзыв");
    }
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
      <Toaster position="top-center" reverseOrder={false} />
    </div>
  );
};

export default ModalOrder;
