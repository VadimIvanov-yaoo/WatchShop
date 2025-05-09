import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Container from "../Container/Container";
import Description from "../Description/Description";
import FlexBox from "../FlexBox/FlexBox";
import Footer from "../Footer/Footer";
import InfoCard from "../InfoCard/InfoCard";
import Input from "../Input/Input";
import Modall from "../Modall/Modall";
import Select from "../Select/Select";
import ShopCardList from "../ShopCardList/ShopCardList";
import SimpleSlider from "../SimpleSlider/SimpleSlider";
import Title from "../Title/Title";
import styles from "./MainPage.module.scss";
import pack from "../../assets/pack23.png";
import bg from "../../assets/watchBackg.png";
import znak from "../../assets/znak.svg";

export default function MainPage({ cardClick, addProduct, cardId }) {
  const [state, setState] = useState();
  const [priceStart, setPriceStart] = useState("");
  const [priceEnd, setPriceEnd] = useState("");
  const [productData, setProductData] = useState("");
  const navigate = useNavigate();

  function startPrice(e) {
    const value = e.target.value;
    setPriceStart(value ? parseFloat(value) : "");
  }
  function endPrice(e) {
    const value = e.target.value;
    setPriceEnd(value ? parseFloat(value) : "");
  }

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

  function onCatalog() {
    window.location.href = "#catalog";
  }

  function isValue(e) {
    setState(e.target.value);
  }

  function handleCardClick(cardId) {
    axios
      .post("http://localhost:5000/item", { id: cardId })
      .then((res) => {
        navigate(`/cardPage/${cardId}`, { state: res.data });
        console.log("Данные товара:", res.data);
      })
      .catch((err) => {
        console.error("Ошибка:", err);
      });
  }

  function cardClick(cardId) {
    handleCardClick(cardId);
  }

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
              <button onClick={onCatalog} className={styles.myBtn}>
                <img className={styles.imageBtn} src={pack} alt="" />В корзину
              </button>
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
            <div className={styles.burgerWrapper}>
              <div className={styles.burgerMenu}>
                <span className={styles.inputLabel}>Цена</span>
                <FlexBox style={{ marginTop: "10px" }} gap="20px">
                  <Input
                    type="number"
                    onChange={startPrice}
                    className={styles.input}
                  />
                  <span className={styles.inputDash}>-</span>
                  <Input
                    type="number"
                    onChange={endPrice}
                    className={styles.input}
                  />
                </FlexBox>
                <FlexBox gap="10px" align="align-start" direction="flex-column">
                  <span className={styles.inputLabel}>Фильтр</span>
                  <Select />
                </FlexBox>
              </div>
            </div>
            <div className={styles.catalogWrapper}>
              <FlexBox grid="gridThreeColumns">
                <ShopCardList
                  cardId={cardId}
                  handleCardClick={handleCardClick}
                  cardClick={cardClick}
                  startPrice={parseFloat(priceStart) || 0}
                  endPrice={parseFloat(priceEnd) || Infinity}
                  addProduct={addProduct}
                />
              </FlexBox>
            </div>
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
                onChange={isValue}
                type="email"
                placeholder="Email"
                className={styles.inputEmail}
              />
              <Modall state={state} />
            </form>
          </FlexBox>
        </Container>
      </section>

      <Footer />
    </>
  );
}
