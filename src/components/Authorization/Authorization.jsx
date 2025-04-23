import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "../Button/Button";
import FlexBox from "../FlexBox/FlexBox";
import Input from "../Input/Input";
import styles from "./Authorization.module.scss";
import { Toaster, toast } from "react-hot-toast";

const loginInput = document.getElementById("loginInput");
const passwordInput = document.getElementById("passwordInput");

export default function Authorization() {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  function handleLoginChange(e) {
    setLogin(e.target.value);
  }

  function handlePasswordChange(e) {
    setPassword(e.target.value);
  }

  function logging() {
    window.location.href = "/";
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
            setTimeout(logging, 2500);
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
              id="loginInput"
              className={styles.input}
              type="text"
              placeholder="Введите логин"
              onChange={handleLoginChange}
              value={login}
            />
            <Input
              id="passwordInput"
              className={styles.input}
              type="password"
              placeholder="Введите пароль"
              onChange={handlePasswordChange}
              value={password}
            />
            <Link className={styles.link} to="">
              Забыли пароль?
            </Link>
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
