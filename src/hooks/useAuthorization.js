import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

export function useAuthorization(onLogin) {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if(!login && !password){
      toast.error("Поля не заполнены");
      return;
    }

    const sendingItem = { login, password };
    try {
      const response = await fetch("http://localhost:5000/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(sendingItem),
      });

      if (response.status === 200) {
        toast.success("Вход успешен");
        localStorage.setItem("name", login);
        onLogin?.(login);
        setTimeout(() => navigate("/"), 1000);
      } else if (response.status === 401) {
        toast.error("Неверный логин или пароль");
      } else if (response.status === 400) {
        toast.error("Пользователь не найден");
      }
      } catch (error) {
        toast.error("Ошибка соединения");
        console.error("Ошибка:", error);
      }
  };

  return { login, password, setLogin, setPassword, handleSubmit };
}

export default useAuthorization;
