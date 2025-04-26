import styles from "./Footer.module.scss";
import React from "react";
import Container from "../Container/Container";
import FlexBox from "../FlexBox/FlexBox";
import logo from "../../assets/logo.svg";
import Description from "../Description/Description";
import Social from "../Social/Social";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <Container>
        <FlexBox just="around" align="align-center" className={styles.flexRow}>
          <FlexBox
            direction="flex-column"
            align="align-center"
            className={styles.flexColumn}
          >
            <img src={logo} alt="Logo" className={styles.logo} />
            <Description className={styles.description}>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. <br />
              Corrupti aspernatur quaerat deleniti aut accusamus architecto?
            </Description>
            <Social className={styles.social} />
          </FlexBox>

          <FlexBox
            direction="flex-column"
            align="align-start"
            gap="10px"
            className={styles.contactColumn}
          >
            <p className={styles.contactInfo}>Email: example@mail.com</p>
            <p className={styles.contactInfo}>Телефон: +7 (999) 123-45-67</p>
            <p className={styles.contactInfo}>
              Адрес: г. Москва, ул. Примерная, 1
            </p>

            <FlexBox
              align="align-center"
              gap="gap-2"
              className={styles.footerBottom}
            >
              <a href="#" className={styles.policyLink}>
                Политика конфиденциальности
              </a>
              <p className={styles.copyRight}>
                &copy; {new Date().getFullYear()} Все права защищены
              </p>
            </FlexBox>
          </FlexBox>

          <FlexBox
            align="align-center"
            gap="10px"
            className={styles.subscription}
          >
            <input
              type="email"
              placeholder="Подпишитесь на новости"
              className={styles.input}
            />
            <button type="submit" className={styles.button}>
              Подписаться
            </button>
          </FlexBox>
        </FlexBox>
      </Container>
    </footer>
  );
}
