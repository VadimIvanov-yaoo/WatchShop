import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import pack from "../../assets/pack23.png";
import AccordionComponent from "../AccordionComponent/AccordionComponent";
import Container from "../Container/Container";
import Description from "../Description/Description";
import FlexBox from "../FlexBox/FlexBox";
import Footer from "../Footer/Footer";
import Raiting from "../Raiting/Raiting";
import Rewiews from "../Rewiews/Rewiews";
import Title from "../Title/Title";
import styles from "./ProductPage.module.scss";

export default function ProductPage({ addProduct }) {
  const { id } = useParams();
  const cardId = id;
  const location = useLocation();
  const [product, setProduct] = useState(location.state || null);
  const [review, setReview] = useState();

  useEffect(() => {
    if (!product) {
      axios
        .post("http://localhost:5000/item", { id })
        .then((res) => {
          setProduct(res.data);
        })
        .catch((err) => {
          console.error("Ошибка загрузки товара:", err);
        });
    }

    axios
      .post("http://localhost:5000/review", { id: cardId })
      .then((res) => {
        console.log("Отзывы:", res.data);
        setReview(res.data);
      })
      .catch((err) => {
        console.error("Ошибка:", err);
      });
  }, [id, cardId, product]);
  if (!product) return <p>404 not found</p>;
  // return <Rewiews review={review} />;

  const accordData = [
    {
      accordionTitle: "Характеристика товара",
      accordionItem: product.productDescription,
    },
    {
      accordionTitle: "Отзывы",
      accordionItem: <Rewiews review={review} cardId={id} />,
    },
  ];

  // axios
  //   .post("http://localhost:5000/review", { id: cardId })
  //   .then((res) => {
  //     // navigate(`/cardPage/${cardId}`, { state: res.data });
  //     // const state = res.data;
  //     console.log("Отзывы:", res.data);
  //   })
  //   .catch((err) => {
  //     console.error("Ошибка:", err);
  //   });

  function test() {
    console.log(product);
    addProduct(id);
  }

  return (
    <>
      <section>
        <Container>
          <FlexBox style={{ padding: "50px" }} just="around">
            <img className={styles.image} src={product.imageUrl} alt="товар" />
            <FlexBox
              style={{ padding: "30px" }}
              gap="20px"
              direction="flex-column"
            >
              <Title
                style={{ textTransform: "uppercase", maxWidth: "350px" }}
                size="medium-big"
                weight="bold"
              >
                {product.productName}
              </Title>
              <Raiting />
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
                <img className={styles.imageBtn} src={pack} alt="" />В корзину
              </button>
            </FlexBox>
          </FlexBox>
        </Container>
      </section>

      <section>
        <Container>
          <div className={styles.accordionWrapper}>
            {accordData.map((el, index) => (
              <AccordionComponent
                key={index}
                accordionTitle={el.accordionTitle}
                accordionDescription={el.accordionItem}
              />
            ))}
          </div>
        </Container>
      </section>

      <Footer />
    </>
  );
}
