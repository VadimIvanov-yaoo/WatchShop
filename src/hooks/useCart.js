import { useState } from "react";
import card from "../Data/CardData";
import axios from "axios";
import useCartItem from "./useCartItem.js";

const authName = localStorage.getItem("name");

export function useCart() {
  const [count, setCount] = useState(0);
  const [cart, setCart] = useState([]);

  function addProduct(id, quantity = 1) {

    setCart((prevCart) => {
      const existingProduct = prevCart.find((item) => item.id === id);
      let newCart;

      if (existingProduct) {
        newCart = prevCart.map((item) =>
            item.id === id
                ? { ...item, quantity: item.quantity + quantity }
                : item
        );
      } else {
        const rawProduct = card.find((item) => item.id === parseInt(id));
        if (!rawProduct) return prevCart;

        const product = JSON.parse(JSON.stringify(rawProduct));
        newCart = [...prevCart, { ...product, quantity }];
      }

      const productToSend = newCart.find((item) => item.id === id);
      sendToServerAdd(productToSend);

      return newCart;
    });
  }

  function removeProduct(id) {
    setCart((prevCart) => {
      const product = prevCart.find((item) => item.id === id);
      if (!product) return prevCart;

      if (product.quantity > 1) {
        const newCart = prevCart.map((item) =>
            item.id === id ? { ...item, quantity: item.quantity - 1 } : item
        );
        sendToServerRemove(id, 1);
        return newCart;
      } else {
        sendToServerDelete(id);
        return prevCart.filter((item) => item.id !== id);
      }
    });
  }

  function sendToServerAdd(item) {
    const basketData = {
      authName,
      items: [
        {
          productId: item.id,
          productImage: item.cardImg,
          productName: item.cardTitle,
          productPrice: parseFloat(item.cardPrice.replace(/\s+/g, "")),
          productQuantity: 1,
        },
      ],
    };

    axios
        .post("http://localhost:5000/basket/basket", basketData)
        .then((res) => {
          if (res.data.message !== "Данные получены успешно!") {
            alert("Ошибка при добавлении товара");
          }
        })
        .catch((error) => {
          console.error("Ошибка при добавлении товара:", error);
        });
  }

  function sendToServerRemove(productId, quantity) {
    const basketData = {
      authName,
      items: [
        {
          productId,
          productImage: "",
          productName: "",
          productPrice: 0,
          productQuantity: -quantity,
        },
      ],
    };

    axios
        .post("http://localhost:5000/basket/basket", basketData)
        .then((res) => {
          if (res.data.message !== "Данные получены успешно!") {
            alert("Ошибка при удалении товара");
          }
        })
        .catch((error) => {
          console.error("Ошибка при удалении товара:", error);
        });
  }

  function sendToServerDelete(productId) {
    axios
        .post("http://localhost:5000/basket/delete", {
          userName: authName,
          id: productId,
        })
        .then((res) => {
          if (res.data.message !== "Данные получены успешно!") {
            alert("Ошибка при полном удалении товара");
          }
        })
        .catch((error) => {
          console.error("Ошибка при полном удалении товара:", error);
        });
  }

  return {
    cart,
    count,
    addProduct,
    removeProduct,
  };
}
