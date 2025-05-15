import { useState, useEffect } from "react";
import axios from "axios";

export default function useCartItem() {
  const [product, setProduct] = useState([]);

  useEffect(() => {
    const authUser = localStorage.getItem("name"); // получаем имя пользователя
    if (authUser && authUser !== "") {
      axios
        .get("http://localhost:5000/basketGet", {
          params: { userName: authUser },
        })
        .then((res) => {
          setProduct(res.data);
        })
        .catch((err) => {
          console.error("Ошибка загрузки данных:", err);
        });
    }
  }, []);

  return { product };
}
