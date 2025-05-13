import React, { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

export function useAuthorization(onLogin) {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  function logging(e) {
    window.localStorage.setItem("name", login);
    navigate("/");
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    const sendingItem = { login, password };

    try {
      const response = await fetch("http://localhost:5000/l", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(sendingItem),
      });

      const data = await response.json();

      if (data.message === "Данные получены успешно!") {
        toast.success("Вход успешен");
        localStorage.setItem("name", login);
        onLogin?.(login);
        setTimeout(() => navigate("/"), 1000);
      } else {
        toast.error("Неверный логин или пароль");
      }
    } catch (error) {
      toast.error("Ошибка соединения");
      console.error("Ошибка:", error);
    }
  };

  return { login, password, setLogin, setPassword, handleSubmit };
}

export default useAuthorization;
