import React from "react";
import cardData from "../../Data/CardData";
import ShopingCard from "../ShopingCard/ShopingCard";

export default function ShopCardList() {
  return (
    <>
      {cardData.map((item, index) => (
        <ShopingCard
          key={item.index}
          cardImg={item.cardImg}
          cardTitle={item.cardTitle}
          cardPrice={item.cardPrice}
        />
      ))}
    </>
  );
}
