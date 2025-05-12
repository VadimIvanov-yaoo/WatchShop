import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "../../components/Button/Button.jsx";
import FlexBox from "../../components/FlexBox/FlexBox.jsx";
import Input from "../../components/Input/Input.jsx";
import styles from "./AuthorizationPage.module.scss";
import { Toaster, toast } from "react-hot-toast";

export default function AuthorizationPage({ onLogin }) {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  function logging(e) {
    window.localStorage.setItem("name", login);
    navigate("/");
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const sendingItem = { login, password };

    try {
      const response = await fetch("http://localhost:5000/l", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(sendingItem),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.message === "Данные получены успешно!") {
            toast.success("Вход успешен");
            setTimeout(logging, 2000);
            onLogin(login);
          } else {
            toast.error("Неверный логин или пароль");
          }
        });

      if (response.ok) {
        const result = await response.json();
        console.log("Успешно отправлено:", result);
      } else {
        console.error("Ошибка при отправке:", response.statusText);
      }
    } catch (error) {
      console.error("Ошибка:", error);
    }
  }

  return (
    <div className={styles.page}>
      <div className={styles.author}>
        <h1>Авторизация</h1>
        <FlexBox direction="flex-column" gap="20px" align="align-center">
          <form
            method="post"
            action="/d"
            className={styles.form}
            onSubmit={handleSubmit}
          >
            <Input
              className={styles.input}
              type="text"
              placeholder="Введите логин"
              onChange={(e) => setLogin(e.target.value)}
              value={login}
            />
            <Input
              className={styles.input}
              type="password"
              placeholder="Введите пароль"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
            <FlexBox just="between">
              <Link className={styles.link} to="/register">
                Создать аккаунт
              </Link>{" "}
              <Link className={styles.link} to="">
                Забыли пароль?
              </Link>
            </FlexBox>
            <Button type="submit" color="blue">
              Вход
            </Button>
            <Toaster position="top-center" reverseOrder={false} />
          </form>
        </FlexBox>
      </div>
    </div>
  );
}
