import { useState } from "react";
import Container from "../../components/Container/Container.jsx";
import FlexBox from "../../components/FlexBox/FlexBox.jsx";
import InputOrder from "../../components/InputOrder/InputOrder.jsx";
import Title from "../../components/Title/Title.jsx";
import styles from "./OrderFrom.module.scss";

export default function OrderFrom() {
  const [inputData, setInputData] = useState({
    name: "",
    surname: "",
    email: "",
    address: "",
    postIndex: "",
    radioOne: "",
    radioTwo: "",
    radioThree: "",
    cardName: "",
    cardNumber: "",
    cardDate: "",
    cardCVV: "",
  });

  function handleChange(e) {
    e.preventDefault();
    const { name, value } = e.target;
    setInputData((prev) => ({ ...prev, [name]: value }));
  }

  function submitClick(e) {
    e.preventDefault();
  }

  return (
    <div>
      <Container>
        <form className={styles.form} action="">
          <FlexBox direction="flex-column" gap="20px">
            <Title size="medium-big">Оформление заказа</Title>
            <FlexBox gap="20px">
              <InputOrder
                onChange={handleChange}
                name="name"
                placeholder="Иван"
              >
                Имя
              </InputOrder>
              <InputOrder
                onChange={handleChange}
                name="surname"
                placeholder="Иванов"
              >
                Фамилия
              </InputOrder>
            </FlexBox>
            <InputOrder
              onChange={handleChange}
              name="username"
              placeholder="your name"
              width="100%"
              type="email"
            >
              Имя пользователя
            </InputOrder>
            <InputOrder
              onChange={handleChange}
              name="email"
              placeholder="exp@example.com"
              width="100%"
              type="email"
            >
              Email
            </InputOrder>
            <InputOrder
              onChange={handleChange}
              name="address"
              placeholder="Тверь, Набережная реки Лазурь, 1/2"
              width="100%"
              type="text"
            >
              Адрес
            </InputOrder>

            <InputOrder
              onChange={handleChange}
              name="postIndex"
              placeholder="123456"
              width="100%"
              type="number"
            >
              Почтовый индекс
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
                onChange={handleChange}
                className={styles.radioBtn}
                name="radio"
                value="1"
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
                onChange={handleChange}
                className={styles.radioBtn}
                name="radio"
                type="radio"
              />{" "}
              Дебетовая карта
            </label>
            <label
              onChange={handleChange}
              className={styles.radioLabel}
              htmlFor=""
            >
              <input
                onChange={handleChange}
                className={styles.radioBtn}
                name="radio"
                type="radio"
              />{" "}
              PayPal
            </label>

            <FlexBox gap="20px">
              <InputOrder
                onChange={handleChange}
                name="cardName"
                placeholder="IVAN IVANOV"
              >
                Имя на карте
              </InputOrder>
              <InputOrder
                onChange={handleChange}
                name="cardNumber"
                placeholder="0000 0000 0000 0000"
              >
                Номер карты
              </InputOrder>
            </FlexBox>

            <FlexBox gap="20px">
              <InputOrder
                onChange={handleChange}
                name="cardDate"
                placeholder="01/01"
              >
                Срок действия
              </InputOrder>
              <InputOrder
                onChange={handleChange}
                name="cardCVV"
                placeholder="123"
              >
                CVV
              </InputOrder>
            </FlexBox>
          </FlexBox>
          <hr />

          <button type="submit" onClick={submitClick} className={styles.btn}>
            Оформить заказ
          </button>
        </form>
      </Container>
    </div>
  );
}
