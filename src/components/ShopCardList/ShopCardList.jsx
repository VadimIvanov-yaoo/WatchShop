import React, { useState } from "react";
import card from "../../Data/CardData";
import ShopingCard from "../ShopingCard/ShopingCard";

export default function ShopCardList({ addProduct }) {
  return (
    <>
      {card.map((item) => (
        <ShopingCard
          addProduct={addProduct}
          key={item.id}
          cardId={item.id}
          cardImg={item.cardImg}
          cardTitle={item.cardTitle}
          cardPrice={item.cardPrice}
        />
      ))}
    </>
  );
}
