import React from "react";
import Button from "../Button/Button";
import Description from "../Description/Description";
import FlexBox from "../FlexBox/FlexBox";
import Title from "../Title/Title";
import Raiting from "../Raiting/Raiting";
import styles from "./ShopingCard.module.scss";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";
import { useState } from "react";
import { useCart } from "../../hooks/useCart.js";
import axios from "axios";

export default function ShopingCard({
  cardId,
  cardImg,
  cardTitle,
  cardPrice,
  addProduct,
  cardClick,
}) {

  async function updateQuantity() {
    const sendingData = {  id: cardId  };

    try {
      const { data } = await axios.post(
          "http://localhost:5000/product/updateItem",
          sendingData
      );

      if (data.message === "Данные получены успешно!") {
      } else if (data.message === "Ошибка") {
        alert("Не успешно");
      }
    } catch (error) {
      console.error("Ошибка:", error);
    }
  }

  const [visible, setVisible] = useState(false);
  // const { submitCartData } = useCart(name);
  async function handleClick() {
    setVisible(true);
    await updateQuantity();
    setTimeout(() => setVisible(false), 900);
  }

  return (
    <div onClick={() => cardClick(cardId)} className={styles.wrapper}>
      <FlexBox direction="flex-column" align="align-center">
        <img className={styles.img} src={cardImg} alt="" />
        <div className={styles.contentWrapper}>
          <Title size="s18" weight="bold">
            {cardTitle}
          </Title>
          <Description size="s24">
            {cardPrice} <span className={styles.currency}>P</span>
          </Description>
          <Tippy
            content="Добавлено в корзину!"
            visible={visible}
            placement="top"
          >
            <Button
                id={cardId}
                size="cardbtn"
                name="transparentBtn"
                onClick={(e) => {
                  e.stopPropagation();
                  addProduct(cardId);
                  handleClick();
                }}
            >
              В корзину
            </Button>

          </Tippy>
        </div>
      </FlexBox>
    </div>
  );
}
