import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../components/Button/Button.jsx";
import Container from "../../components/Container/Container.jsx";
import FlexBox from "../../components/FlexBox/FlexBox.jsx";
import Input from "../../components/Input/Input.jsx";
import Title from "../../components/Title/Title.jsx";
import styles from "./RegisterPage.module.scss";
import { Toaster, toast } from "react-hot-toast";

export default function RegisterPage() {
  const [user, setUser] = useState("");
  const [password, setPassowrd] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [repeat, setRepeat] = useState("");
  const navigate = useNavigate();

  function logging() {
    window.localStorage.setItem("name", user);
    navigate("/");
  }

  async function registerUser(e) {
    e.preventDefault();
    const registerItem = { user, name, email, password, repeat };

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
          if (data.message === "Регистрация прошла успешно!") {
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
              <span>Введите ник:</span>
              <Input
                onChange={(e) => setUser(e.target.value)}
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
              <span>Введите ФИО:</span>
              <Input
                onChange={(e) => setName(e.target.value)}
                placeholder="Иван Иванов"
                type="email"
                className={styles.input}
              />
            </FlexBox>

            <FlexBox
              style={{ width: "470px" }}
              just="between"
              align="align-center"
            >
              <span>Введите email:</span>
              <Input
                onChange={(e) => setEmail(e.target.value)}
                placeholder="example@test.com"
                type="email"
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
                onChange={(e) => setPassowrd(e.target.value)}
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
                onChange={(e) => setRepeat(e.target.value)}
                style={{ marginLeft: "10px" }}
                placeholder="12345"
                type="password"
                className={styles.input}
              />
            </FlexBox>
            <button className={styles.registerBtn} onClick={registerUser}>
              Создать аккаунт
            </button>
            <Toaster position="top-center" reverseOrder={false} />
          </form>
        </div>
      </Container>
    </section>
  );
}
