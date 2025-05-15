import { useState, useEffect } from "react";
import card from "../Data/CardData";
import axios from "axios";

const authName = localStorage.getItem("name");

export function useCart() {
  const [count, setCount] = useState(0);
  const [cart, setCart] = useState([]);

  function addProduct(id) {
    setCart((prevCart) => {
      const existingProduct = prevCart.find((item) => item.id === id);
      if (existingProduct) {
        return prevCart.map((item) =>
          item.id === id ? { ...item, quantity: item.quantity + 1 } : item,
        );
      }
      const product = card.find((item) => item.id === parseInt(id));
      if (!product) return prevCart;
      return [...prevCart, { ...product, quantity: 1 }];
    });
  }

  function removeProduct(id) {
    setCart((prevCart) => {
      const product = prevCart.find((item) => item.id === id);
      if (!product) return prevCart;

      if (product.quantity > 1) {
        return prevCart.map((item) =>
          item.id === id ? { ...item, quantity: item.quantity - 1 } : item,
        );
      } else {
        return prevCart.filter((item) => item.id !== id);
      }
    });
  }

  useEffect(() => {
    if (cart.length > 0) {
      const basketData = {
        authName,
        items: cart.map((item) => ({
          productId: item.id,
          productImage: item.cardImg,
          productName: item.cardTitle,
          productPrice: parseFloat(item.cardPrice.replace(/\s+/g, "")),
          productQuantity: item.quantity,
        })),
      };

      const submitCartData = async () => {
        try {
          const { data } = await axios.post(
            "http://localhost:5000/basket",
            basketData,
          );
          if (data.message === "Данные получены успешно!") {
          } else if (data.message === "Ошибка") {
            alert("Не успешно");
          }
        } catch (error) {
          console.error("Ошибка:", error);
        }
      };

      submitCartData();
    }
  }, [cart]);

  return {
    cart,
    count,
    addProduct,
    removeProduct,
  };
}
