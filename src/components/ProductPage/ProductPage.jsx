import axios from "axios";
import React from "react";
import Container from "../Container/Container";
import Description from "../Description/Description";
import FlexBox from "../FlexBox/FlexBox";
import Title from "../Title/Title";
import styles from "./ProductPage.module.scss";
import qwe from "../../assets/watch2.png";
import { useLocation } from "react-router-dom";

export default function ProductPage() {
  const location = useLocation();
  const product = location.state;
  let img = product.imageUrl;
  console.log(img);
  if (!product) return <p>Нет данных</p>;

  return (
    <section>
      <Container>
        <FlexBox style={{ padding: "50px 0px" }} gap="40px">
          <img className={styles.image} src={img} alt="asdasd" />
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
              {product.name}
            </Title>
            <div className={styles.line}></div>
            <FlexBox gap="10px">
              <Description size="centerSize">{product.price}</Description>
              <Description size="centerSize" color="gray">
                ₽
              </Description>
            </FlexBox>

            <FlexBox grid="gridTwoColumns">
              <div>
                <span className={styles.materials}>Материалы:</span>
                <Description weight="medium-bold" style={{ maxWidth: "160px" }}>
                  Нержавеющая сталь/латунь/кожа
                </Description>
              </div>

              <div>
                <span className={styles.materials}>Опции:</span>
                <Description weight="medium-bold" style={{ maxWidth: "160px" }}>
                  Пылевлагозащита, Противоударные
                </Description>
              </div>

              <div>
                <span className={styles.materials}>Габариты:</span>
                <Description weight="medium-bold" style={{ maxWidth: "160px" }}>
                  D 37 мм <br /> H 11,7 мм
                </Description>
              </div>

              <div>
                <span className={styles.materials}>Стекло:</span>
                <Description weight="medium-bold" style={{ maxWidth: "160px" }}>
                  Сапфировое
                </Description>
              </div>
            </FlexBox>
            <button className={styles.myBtn}>
              {/* <img className={styles.imageBtn} src={pack} alt="" />В корзину */}
            </button>
          </FlexBox>
        </FlexBox>
      </Container>
    </section>
  );
}
