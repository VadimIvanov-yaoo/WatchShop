import React from "react";
import card from "../../Data/CardData";
import ShopingCard from "../ShopingCard/ShopingCard";

export default function ShopCardList({
  cardClick,
  addProduct,
  startPrice,
  endPrice,
  handleCardClick,
}) {
  function sortirovka(item) {
    const price = parseFloat(item.cardPrice.replace(/\s+/g, ""));
    return price >= startPrice && price <= endPrice;
  }
  return (
    <>
      {card.filter(sortirovka).length === 0 ? (
        <h1>Нет товаров в этом диапазоне цен</h1>
      ) : (
        card
          .filter(sortirovka)
          .map((item) => (
            <ShopingCard
              handleCardClick={handleCardClick}
              cardClick={cardClick}
              addProduct={addProduct}
              key={item.id}
              cardId={item.id}
              cardImg={item.cardImg}
              cardTitle={item.cardTitle}
              cardPrice={item.cardPrice}
            />
          ))
      )}
    </>
  );
}
