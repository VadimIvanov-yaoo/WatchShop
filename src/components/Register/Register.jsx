import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../Button/Button";
import Container from "../Container/Container";
import FlexBox from "../FlexBox/FlexBox";
import Input from "../Input/Input";
import Title from "../Title/Title";
import styles from "./Register.module.scss";
import { Toaster, toast } from "react-hot-toast";

export default function Register() {
  const [user, setUser] = useState("");
  const [password, setPassowrd] = useState("");
  const [repeat, setRepeat] = useState("");
  const navigate = useNavigate();

  function handleUser(e) {
    setUser(e.target.value);
  }

  function handlePassword(e) {
    setPassowrd(e.target.value);
  }

  function handleRepeat(e) {
    setRepeat(e.target.value);
  }
  function logging() {
    window.localStorage.setItem("name", user);
    window.location.href = "/";
  }

  async function registerUser(e) {
    e.preventDefault();
    const registerItem = { user, password, repeat };

    try {
      const response = await fetch("http://localhost:5000/r", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(registerItem),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.message === "Данные получены успешно!") {
            toast.success("Успешная регистрация");
            setTimeout(logging, 2000);
          } else if (data.message === "Пароли не совпадают") {
            toast.error("Пароли не совпадают");
          } else if (data.message === "Пользователь уже существует") {
            toast.error(`Пользователь ${user} уже существует`);
          } else if (data.message === "Поля не заполнены") {
            toast.error("Поля не заполнены");
          } else {
            toast.error("Неверные данные");
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
    <section className={styles.register}>
      <Container>
        <div className={styles.registerFormWrapper}>
          <form className={styles.registerForm} action="" method="post">
            <Title color="blue" size="medium">
              Создайте аккаунт
            </Title>
            <FlexBox
              style={{ width: "470px" }}
              just="between"
              align="align-center"
            >
              <span>Введите имя:</span>
              <Input
                onChange={handleUser}
                placeholder="user"
                type="text"
                className={styles.input}
              />
            </FlexBox>
            <FlexBox
              style={{ width: "470px" }}
              just="between"
              align="align-center"
            >
              <span>Введите пароль:</span>

              <Input
                onChange={handlePassword}
                placeholder="12345"
                type="password"
                className={styles.input}
              />
            </FlexBox>
            <FlexBox
              style={{ width: "470px" }}
              just="between"
              align="align-center"
            >
              <span>Подтвердите пароль:</span>
              <Input
                onChange={handleRepeat}
                style={{ marginLeft: "10px" }}
                placeholder="12345"
                type="password"
                className={styles.input}
              />
            </FlexBox>
            <Button onClick={registerUser} color="blue-big">
              Создать аккаунт
            </Button>
            <Toaster position="top-center" reverseOrder={false} />
          </form>
        </div>
      </Container>
    </section>
  );
}
