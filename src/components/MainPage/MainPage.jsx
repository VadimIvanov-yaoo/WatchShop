import React from "react";
import { useState } from "react";
import pack from "../../assets/pack23.png";
import bg from "../../assets/watchBackg.png";
import znak from "../../assets/znak.svg";
import Button from "../Button/Button";
import Container from "../Container/Container";
import Description from "../Description/Description";
import FlexBox from "../FlexBox/FlexBox";
import ShopCardList from "../ShopCardList/ShopCardList";
import SimpleSlider from "../SimpleSlider/SimpleSlider";
import Title from "../Title/Title";
import Input from "../Input/Input";
import styles from "./MainPage.module.scss";
import Select from "../Select/Select";
import InfoCard from "../InfoCard/InfoCard";

export default function MainPage({ addProduct, cart }) {
  const infoData = [
    {
      infoTitle: "Более 5000 наименований ",
      infoDescription:
        "Невероятный выбор часов на любой вкус и кошелек, как премиум так и недорогие ",
    },
    {
      infoTitle: "Собственная доставка ",
      infoDescription:
        "Невероятный выбор часов на любой вкус и кошелек, как премиум так и недорогие ",
    },
    {
      infoTitle: "Все способы оплаты ",
      infoDescription:
        "Невероятный выбор часов на любой вкус и кошелек, как премиум так и недорогие ",
    },
    {
      infoTitle: "Шоу-румы в 4х городах ",
      infoDescription:
        "Невероятный выбор часов на любой вкус и кошелек, как премиум так и недорогие ",
    },
  ];

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
                <img className={styles.imageBtn} src={pack} alt="" />
                <a className={styles.cartLink} href="#catalog">
                  В корзину
                </a>
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

      <section style={{ marginBottom: "240px" }} id="catalog">
        <Container>
          <FlexBox just="justify-center" gap="20px">
            <div className={styles.burgerMenu}>
              <span className={styles.inputLabel}>Цена</span>
              <FlexBox style={{ marginTop: "10px" }} gap="20px">
                <Input className={styles.input} />
                <span className={styles.sa}>-</span>
                <Input className={styles.input} />
              </FlexBox>
              <FlexBox gap="10px" align="align-start" direction="flex-column">
                <span className={styles.inputLabel}>Фильтр</span>
                <Select />
              </FlexBox>
            </div>

            <FlexBox grid="gridThreeColumns">
              <ShopCardList addProduct={addProduct} />
            </FlexBox>
          </FlexBox>
        </Container>
      </section>

      <section className={styles.info}>
        <Container>
          <FlexBox just="around">
            {infoData.map((item, index) => {
              return (
                <InfoCard
                  key={index}
                  infoTitle={item.infoTitle}
                  infoDescription={item.infoDescription}
                />
              );
            })}
          </FlexBox>
        </Container>
      </section>

      <section className={styles.emailBlock}>
        <Container>
          <FlexBox
            style={{ padding: "120px 60px" }}
            direction="flex-column"
            gap="20px"
          >
            <Title color="white" size="big" weight="medium-bold">
              Подпишитесь на скидки <br /> и получайте подарки
            </Title>
            <Description color="white" size="s24">
              Обещаем не закидывать спамом, <br /> только полезные письма
            </Description>
            <form className={styles.emailForm} action="">
              <Input
                type="email"
                placeholder="Email"
                className={styles.inputEmail}
              />
              <Button color="blue-small">Subscribe</Button>
            </form>
          </FlexBox>
        </Container>
      </section>
    </>
  );
}
