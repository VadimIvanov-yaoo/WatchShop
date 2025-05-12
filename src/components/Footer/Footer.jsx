import styles from "./Footer.module.scss";
import React from "react";
import Container from "../Container/Container";
import FlexBox from "../FlexBox/FlexBox";
import logo from "../../assets/HeaderIcons/logo.svg";
import Description from "../Description/Description";
import Social from "../Social/Social";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <Container>
        <FlexBox just="around" align="align-start">
          <FlexBox direction="flex-column" align="align-center">
            <img src={logo} alt="Logo" className={styles.logo} />
            <Description>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. <br />
              Corrupti aspernatur quaerat deleniti aut accusamus architecto?
            </Description>
            <Social />

            <FlexBox align="align-center" gap="gap-2">
              <FlexBox gap="20px">
                <a href="#" className={styles.policyLink}>
                  Политика конфиденциальности
                </a>
                <p className={styles.copyRight}>
                  &copy; {new Date().getFullYear()} Все права защищены
                </p>
              </FlexBox>
            </FlexBox>
          </FlexBox>

          <FlexBox direction="flex-column" gap="40px">
            <FlexBox just="space-between" gap="20px">
              <FlexBox direction="flex-column">
                <b className={styles.contactInfo}>Email:</b>
                <span>example@mail.com</span>
              </FlexBox>
              <FlexBox direction="flex-column">
                <b className={styles.contactInfo}>Телефон:</b>
                <span>+7 (999) 123-45-67</span>
              </FlexBox>
              <FlexBox direction="flex-column">
                <b className={styles.contactInfo}>Адрес:</b>
                <span>г. Тверь наб. Реки Лазури, 1 корпус.1</span>
              </FlexBox>
            </FlexBox>
            <div className={styles.company}>
              <b className={styles.contactInfo}>О компании:</b>
              <span className={styles.text}>
                Мы предлагаем широкий ассортимент часов для мужчин и женщин,
                включая как классические модели, так и современные смарт-часы. В
                нашем магазине вы найдете часы различных брендов, которые
                сочетают стиль, качество и надежность. Мы предоставляем услуги
                по подбору часов, а также ремонту и обслуживанию, чтобы ваши
                часы служили вам долго.
              </span>
            </div>
          </FlexBox>
        </FlexBox>
      </Container>
    </footer>
  );
}
