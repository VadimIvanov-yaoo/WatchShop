import React from "react";
import Title from "../../components/Title/Title.jsx";
import Container from "../../components/Container/Container.jsx";
import FlexBox from "../../components/FlexBox/FlexBox.jsx";
import styles from "./OrderPage.module.scss";
import { useNavigate } from "react-router-dom";
import OrderItem from "../../components/OrderItem/OrderItem.jsx";

export default function OrderPage() {
  const navigate = useNavigate();

  function goBack() {
    navigate("/");
  }

  return (
    <div className={styles.order}>
      <Container>
        <button onClick={goBack} className={styles.back}>
          <span className={styles.arrow}>‹</span>
          Вернуться назад
        </button>
        <form className={styles.form}>
          <FlexBox direction="flex-column" gap="20px">
            <Title size="medium-big" weight="medium-bold" centerd="center">
              Страница заказов
            </Title>
            <FlexBox
              style={{ opacity: "85%" }}
              direction="flex-column"
              gap="20px"
            >
              <span>Получатель:</span>
              <span>Адрес получателя:</span>
              <span>Номер телефона:</span>
            </FlexBox>
            <OrderItem />
          </FlexBox>
        </form>
      </Container>
    </div>
  );
}
