import axios from "axios";
import pack from "../../assets/pack23.png";
import React from "react";
import cardData from "../../Data/CardData";
import Container from "../Container/Container";
import Description from "../Description/Description";
import FlexBox from "../FlexBox/FlexBox";
import Title from "../Title/Title";
import ModalOrder from "../ModalOrder/ModalOrder";
import Raiting from "../Raiting/Raiting";
import styles from "./ProductPage.module.scss";
import { useLocation, useParams, useSearchParams } from "react-router-dom";

export default function ProductPage({ addProduct }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const { id } = useParams();
  const location = useLocation();
  const products = location.state;
  const img = products.imageUrl;
  const product = cardData.find((item) => item.id === parseInt(id));

  function test() {
    console.log(product);
    addProduct(id);
  }

  if (!products) return <p>Нет данных</p>;

  return (
    <>
      <section>
        <Container>
          <FlexBox style={{ padding: "50px" }} just="around">
            <img className={styles.image} src={img} alt="asdasd" />
            <FlexBox
              style={{ padding: "30px" }}
              gap="20px"
              direction="flex-column"
            >
              <Title
                style={{ textTransform: "uppercase", maxWidth: "300px" }}
                size="medium-big"
                weight="bold"
              >
                {products.productName}
              </Title>
              <Raiting />
              <div className={styles.line}></div>
              <FlexBox gap="10px">
                <Description size="centerSize">{products.price}</Description>
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

              <button className={styles.transparentBtn} onClick={test}>
                <img className={styles.imageBtn} src={pack} alt="" />В коризну
              </button>
              {/* 
            <Button id={id}>
              <img className={styles.imageBtn} src={pack} alt="" />В коризну
            </Button> */}
              {/* <button className={styles.myBtn}></button> */}
            </FlexBox>
          </FlexBox>
        </Container>
      </section>

      <section>
        <Container>
          {/* <Modall /> */}
          <ModalOrder />
          {/* <button className={styles.transparentBtn}>Смотреть отзывы</button> */}
        </Container>
      </section>
    </>
  );
}
