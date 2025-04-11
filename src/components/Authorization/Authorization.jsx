import React from "react";
import Input from "../Input/Input";
import FlexBox from "../FlexBox/FlexBox";
import styles from "./Authorization.module.scss";
import Button from "../Button/Button";
import { Link } from "react-router-dom";

export default function Authorization() {
  return (
    <div className={styles.page}>
      <div className={styles.author}>
        <h1>Авторизация</h1>
        <FlexBox direction="flex-column" gap="20px" align="align-center">
          <form className={styles.form} action="">
            <Input
              className={styles.input}
              type="text"
              placeholder="Введите логин"
            ></Input>
            <Input
              className={styles.input}
              type="password"
              placeholder="Введите пароль"
            ></Input>
            <Link className={styles.link} to="">
              Забыли пароль?
            </Link>
            <Button color="blue">Вход</Button>
          </form>
        </FlexBox>
      </div>
    </div>
  );
}
