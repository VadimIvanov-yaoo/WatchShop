import React from "react";
import pack from "../../assets/pack23.png";
import bg from "../../assets/watchBg-Photoroom.png";
import znak from "../../assets/znak.svg";
import Button from "../Button/Button";
import Container from "../Container/Container";
import Description from "../Description/Description";
import FlexBox from "../FlexBox/FlexBox";
import ShopCardList from "../ShopCardList/ShopCardList";
import SimpleSlider from "../SimpleSlider/SimpleSlider";
import Title from "../Title/Title";
import Input from "../Input/Input";
import clsx from "clsx";
import styles from "./MainPage.module.scss";

export default function MainPage() {
  return (
    <>
      <section className={styles.home}>
        <Container>
          <FlexBox style={{ padding: "50px 0px" }} gap="40px">
            <img className={styles.image} src={bg} alt="" />
            <FlexBox
              style={{ padding: "30px" }}
              gap="30px"
              direction="flex-column"
            >
              <Title
                style={{ textTransform: "uppercase" }}
                size="medium-big"
                weight="bold"
                maxWidth="302px"
              >
                Часы восток <br /> амфибия 2403
              </Title>
              <div className={styles.line}></div>
              <FlexBox gap="10px">
                <Description size="centerSize">9000</Description>
                <Description size="centerSize" color="gray">
                  ₽
                </Description>
              </FlexBox>

              <FlexBox grid="gridTwoColumns">
                <div>
                  <span className={styles.materials}>Материалы:</span>
                  <Description
                    weight="medium-bold"
                    style={{ maxWidth: "160px" }}
                  >
                    Нержавеющая сталь/латунь/кожа
                  </Description>
                </div>

                <div>
                  <span className={styles.materials}>Опции:</span>
                  <Description
                    weight="medium-bold"
                    style={{ maxWidth: "160px" }}
                  >
                    Пылевлагозащита, Противоударные
                  </Description>
                </div>

                <div>
                  <span className={styles.materials}>Габариты:</span>
                  <Description
                    weight="medium-bold"
                    style={{ maxWidth: "160px" }}
                  >
                    D 37 мм <br /> H 11,7 мм
                  </Description>
                </div>

                <div>
                  <span className={styles.materials}>Стекло:</span>
                  <Description
                    weight="medium-bold"
                    style={{ maxWidth: "160px" }}
                  >
                    Сапфировое
                  </Description>
                </div>
              </FlexBox>

              <Button name="transparentBtn">
                {" "}
                <img className={styles.imageBtn} src={pack} alt="" />В корзину
              </Button>
            </FlexBox>
          </FlexBox>

          <FlexBox just="around" style={{ marginBottom: "12 0px" }}>
            <SimpleSlider />
            <FlexBox gap="30px">
              <div>
                <Title size="big" weight="900">
                  14
                </Title>
                <Description style={{ maxWidth: "195px" }}>
                  Возврат без причины в течение 14 дней
                </Description>
              </div>
              <div>
                <Title size="big" weight="900">
                  15
                </Title>
                <Description style={{ maxWidth: "195px" }}>
                  15 лет гарантии и сервисной поддержки
                </Description>
              </div>
              <div>
                <Title>
                  <img style={{ height: "72px" }} src={znak} alt="" />
                </Title>
                <Description style={{ maxWidth: "195px" }}>
                  Вся часы полностью сертифицированы
                </Description>
              </div>
            </FlexBox>
          </FlexBox>
        </Container>
      </section>

      <section>
        <Container>
          <FlexBox align="align-center" just="justify-center" gap="20px">
            <div className={styles.burgerMenu}>
              <span className={styles.inputLabel}>Цена</span>
              <FlexBox gap="20px">
                <Input className={styles.input} />
                <span className={styles.sa}>-</span>
                <Input className={styles.input} />
              </FlexBox>
            </div>

            <FlexBox grid="gridThreeColumns">
              <ShopCardList />
            </FlexBox>
          </FlexBox>
        </Container>
      </section>
    </>
  );
}
