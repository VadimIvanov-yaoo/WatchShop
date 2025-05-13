import { useEffect, useState } from "react";
import Container from "../../components/Container/Container.jsx";
import FlexBox from "../../components/FlexBox/FlexBox.jsx";
import axios from "axios";
import {toast} from "react-hot-toast";
import InputOrder from "../../components/InputOrder/InputOrder.jsx";
import Title from "../../components/Title/Title.jsx";
import styles from "./OrderFrom.module.scss";
import clsx from "clsx";
import {
  input,
  redInput,
  redTextVisible,
} from "../../components/InputOrder/InputOrder.module.scss";


export default function OrderFrom() {

  const nameUserLocal = localStorage.getItem("name");
  const [status, setStatus] = useState();
  const [color, setColor] = useState({
    name: input,
    email: input,
    address: input,
    cardName: input,
    cardNumber: input,
    cardDate: input,
    cardCVV: input,
  });
  const [inputData, setInputData] = useState({
    name: "",
    surname: "",
    email: "",
    username: "",
    address: "",
    cardName: "",
    cardNumber: "",
    cardDate: "",
    cardCVV: "",
  });

  const isNameInvalid = inputData.name.trim() === "";

  function handleChange(e) {
    e.preventDefault();
    const { name, value } = e.target;
    setInputData((prev) => ({ ...prev, [name]: value }));
  }

  function changeColor(e) {
    const newStyles = {};
    let valid = true;
    console.log(color);
    Object.entries(inputData).forEach(([key, value]) => {
      if (!value.trim()) {
        newStyles[key] = redInput;
        valid = false;
      } else {
        newStyles[key] = input;
      }
    });
    setColor(newStyles);
    setStatus(valid)


    if (status) {
      console.log("все отлично")

    }
    else {
      console.log("Введите данные");

    }



  }


console.log(status)
const user = nameUserLocal;
const nameUser = inputData.name;
const userSurname = inputData.surname;
const email = inputData.email;
const address = inputData.address;
const creditCardNumber = inputData.cardNumber;
const cartItem = null;

  async function sendClick() {
    const reviewItem = {user, nameUser, userSurname, email, address, creditCardNumber, cartItem};
    try {
      const { data } = await axios.post(
          "http://localhost:5000/order",
          reviewItem
      );

      if (data.message === "Данные получены успешно!") {
        alert("Добавлено");
      } else if (data.message === "Ошибка") {
        alert(" Не добавлено");
      }

    } catch (error) {
      console.error("Ошибка:", error);
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    changeColor();
  }



  return (
    <div>
      <Container>
        <form className={styles.form} action="">
          <FlexBox direction="flex-column" gap="20px">
            <Title size="medium-big">Оформление заказа</Title>
            <FlexBox gap="20px">
              <InputOrder
                className={color.name}
                onChange={handleChange}
                showErrorText={color.name === redInput}
                name="name"
                placeholder="Иван"
                childrenText="Введите имя"
              >
                Имя
              </InputOrder>
              <InputOrder
                className={clsx(color.surname, isNameInvalid && "redInput")}
                onChange={handleChange}
                name="surname"
                showErrorText={color.surname === redInput}
                placeholder="Иванов"
                childrenText="Введите фамилию"
              >
                Фамилия
              </InputOrder>
            </FlexBox>
            <InputOrder
              // onChange={handleChange}
              name="username"
              value={nameUserLocal}
              placeholder="your name"
              width="100%"
              type="email"
            >
              Имя пользователя
            </InputOrder>
            <InputOrder
              className={color.email}
              onChange={handleChange}
              name="email"
              showErrorText={color.email === redInput}
              placeholder="exp@example.com"
              width="100%"
              type="email"
              childrenText="Введите email"
            >
              Email
            </InputOrder>
            <InputOrder
              className={color.address}
              onChange={handleChange}
              name="address"
              showErrorText={color.address === redInput}
              placeholder="Тверь, Набережная реки Лазурь, 1/2"
              width="100%"
              type="text"
              childrenText="Введите адрес"
            >
              Адрес
            </InputOrder>
          </FlexBox>
          <hr />
          <FlexBox
            style={{ paddingTop: "20px" }}
            direction="flex-column"
            gap="20px"
          >
            <Title size="medium-big">Оплата</Title>
            <label className={styles.radioLabel} htmlFor="">
              <input
                className={styles.radioBtn}
                name="radio"
                value="credit"
                type="radio"
              />{" "}
              Кредитная карта
            </label>
            <label
              onChange={handleChange}
              className={styles.radioLabel}
              htmlFor=""
            >
              <input
                className={styles.radioBtn}
                name="radio"
                type="radio"
                value="debet"
              />{" "}
              Дебетовая карта
            </label>

            <FlexBox gap="20px">
              <InputOrder
                className={color.cardName}
                onChange={handleChange}
                name="cardName"
                showErrorText={color.cardName === redInput}
                placeholder="IVAN IVANOV"
                childrenText="Введите ФИО владельца карты"
              >
                Имя на карте
              </InputOrder>
              <InputOrder
                className={color.cardNumber}
                onChange={handleChange}
                name="cardNumber"
                showErrorText={color.cardNumber === redInput}
                placeholder="0000 0000 0000 0000"
                childrenText="Введите номер карты"
              >
                Номер карты
              </InputOrder>
            </FlexBox>

            <FlexBox gap="20px">
              <InputOrder
                className={color.cardDate}
                onChange={handleChange}
                name="cardDate"
                showErrorText={color.cardDate === redInput}
                placeholder="01/01"
                childrenText="Введите срок действия карты"
              >
                Срок действия
              </InputOrder>
              <InputOrder
                className={color.cardCVV}
                onChange={handleChange}
                name="cardCVV"
                showErrorText={color.cardCVV === redInput}
                placeholder="123"
                childrenText="Введите CVV карты"
              >
                CVV
              </InputOrder>
            </FlexBox>
          </FlexBox>
          <hr />

          <button type="submit" onClick={handleSubmit} className={styles.btn}>
            Оформить заказ
          </button>
        </form>
      </Container>
    </div>
  );
}
