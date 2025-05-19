import { useEffect, useState } from "react";
import { Toaster, toast } from "react-hot-toast";
import card from "../Data/CardData";

export function useCart(name) {
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem(`cart_${name}`);
    return savedCart ? JSON.parse(savedCart) : [];
  });

  const [count, setCount] = useState(() => {
    const savedCount = localStorage.getItem(`quantity_${name}`);
    return savedCount ? parseInt(savedCount) : 0;
  });

  useEffect(() => {
    if (name) {
      localStorage.setItem(`cart_${name}`, JSON.stringify(cart));
      localStorage.setItem(`quantity_${name}`, cart.length);
    }
  }, [cart, name]);

  function addProduct(id) {
    setCart((prevCart) => {
      if (prevCart.some((item) => item.id === id)) {
        return prevCart.map((item) =>
          item.id === id ? { ...item, quantity: item.quantity + 1 } : item,
        );
      }
      const product = card.find((item) => item.id === parseInt(id));
      return [...prevCart, { ...product, quantity: 1 }];
    });

    setCount((prev) => prev + 1);
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

    setCount((prev) => (prev > 0 ? prev - 1 : 0));
  }

  return { cart, count, addProduct, removeProduct };
}
