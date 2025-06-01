import React from "react";
import card from "../../Data/CardData";
import ShopingCard from "../ShopingCard/ShopingCard";

export default function ShopCardList({
                                       cardClick,
                                       addProduct,
                                       startPrice,
                                       endPrice,
                                       handleCardClick,
                                       sortOrder,
                                     }) {
  function sortirovka(item) {
    const price = parseFloat(item.cardPrice.replace(/\s+/g, ""));
    return price >= startPrice && price <= endPrice;
  }

  let filteredCards = card.filter(sortirovka);

  function sortByPriceAsc(a, b) {
    return parseFloat(a.cardPrice.replace(/\s+/g, "")) - parseFloat(b.cardPrice.replace(/\s+/g, ""));
  }

  function sortByPriceDesc(a, b) {
    return parseFloat(b.cardPrice.replace(/\s+/g, "")) - parseFloat(a.cardPrice.replace(/\s+/g, ""));
  }

  if (sortOrder === "asc") {
    filteredCards = filteredCards.sort(sortByPriceAsc);
  } else if (sortOrder === "desc") {
    filteredCards = filteredCards.sort(sortByPriceDesc);
  }

  return (
      <>
        {filteredCards.length === 0 ? (
            <h1>Нет товаров в этом диапазоне цен</h1>
        ) : (
            filteredCards.map((item) => (
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

