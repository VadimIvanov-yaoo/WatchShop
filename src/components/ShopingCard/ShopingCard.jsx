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

export default function ShopingCard({
  cardId,
  cardImg,
  cardTitle,
  cardPrice,
  addProduct,
  cardClick,
  handleCardClick,
}) {
  const [visible, setVisible] = useState(false);
  // const [averageTotal, setAverageTotal] = useState(0);

  function handleClick() {
    setVisible(true);
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
              addProduct={addProduct}
              id={cardId}
              size="cardbtn"
              name="transparentBtn"
              onClick={(e) => {
                e.stopPropagation();
                // e.stopImmediatePropagation();
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
