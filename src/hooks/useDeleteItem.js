import axios from "axios";

export default function useDeleteItem() {
  const userName = localStorage.getItem("name");

  const deleteItem = async (id) => {
    const basketData = {
      userName,
      id,
    };

    try {
      const { data } = await axios.post(
        "http://localhost:5000/deleteBasket",
        basketData,
      );
      if (data.message === "Данные получены успешно!") {
        console.log("Товар удалён");
        return true;
      } else {
        console.warn("Ошибка при удалении");
        return false;
      }
    } catch (error) {
      console.error("Ошибка при удалении товара:", error);
      return false;
    }
  };

  return { deleteItem };
}
