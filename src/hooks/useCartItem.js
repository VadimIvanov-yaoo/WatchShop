import {useEffect, useState} from "react";
import axios from "axios";

export default function useCartItem() {
  const [product, setProduct] = useState([]);
  useEffect(() => {
    showProduct();
  }, []);

  async function showProduct() {
    const authUser = localStorage.getItem("name");
    if (authUser && authUser.trim() !== "") {
      try {
        const res = await axios.get("http://localhost:5000/basket/basketGet", {
          params: { userName: authUser },
        });
        setProduct(res.data);
      } catch (err) {
        console.error("Ошибка загрузки данных:", err);
      }
    }
  }

  return { showProduct, product };
}
