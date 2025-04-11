import React from "react";
import Button from "../Button/Button";
import Description from "../Description/Description";
import FlexBox from "../FlexBox/FlexBox";
import Title from "../Title/Title";
import styles from "./ShopingCard.module.scss";

export default function ShopingCard({ cardImg, cardTitle, cardPrice }) {
  return (
    <div className={styles.wrapper}>
      <FlexBox direction="flex-column" align="align-center">
        <img className={styles.img} src={cardImg} alt="" />
        <div className={styles.contentWrapper}>
          <Title size="s18" weight="bold">
            {cardTitle}
          </Title>
          <Description size="s24">
            {cardPrice} <span className={styles.currency}>P</span>
          </Description>
          <Button size="cardbtn" name="transparentBtn">
            В корзину
          </Button>
        </div>
      </FlexBox>
    </div>
  );
}
