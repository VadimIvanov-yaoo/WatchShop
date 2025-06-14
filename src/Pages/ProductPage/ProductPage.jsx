import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import pack from "../../assets/HeaderIcons/pack.png";
import AccordionComponent from "../../components/AccordionComponent/AccordionComponent.jsx";
import Container from "../../components/Container/Container.jsx";
import star from "../../assets/images/star.png";
import Description from "../../components/Description/Description.jsx";
import FlexBox from "../../components/FlexBox/FlexBox.jsx";
import Footer from "../../components/Footer/Footer.jsx";
import Rewiews from "../../components/Rewiews/Rewiews.jsx";
import Title from "../../components/Title/Title.jsx";
import styles from "./ProductPage.module.scss";

export function ProductPage({ addProduct }) {
  const { id } = useParams();
  const cardId = id;
  const location = useLocation();
  const [product, setProduct] = useState(location.state || null);
  const [review, setReview] = useState([]);
  const [totalGrade, setTotalGrade] = useState(0);

  useEffect(() => {
    window.scrollTo(0, 0);
    if (!product) {
      axios.post("http://localhost:5000/product/item", { id })
          .then((res) => {
          setProduct(res.data);
        })
        .catch((err) => {
          console.error("Ошибка загрузки товара:", err);
        });
    }
  }, [id, product]);

  useEffect(() => {
    if (product) {
      axios
          .post("http://localhost:5000/review/review", { id: cardId })
        .then((res) => {
          const newData = res.data.map((item) => Object.values(item));
          setReview(res.data);
          const total = newData.reduce((sum, item) => sum + item[3], 0);
          setTotalGrade(total);
        })
        .catch((err) => {
          console.error("Ошибка загрузки отзывов:", err);
        });
    }
  }, [id, cardId, product]);

  const sum = review.length ? totalGrade / review.length : 0;
  const average = sum.toFixed(1);

  if (!product) return <p>404 not found</p>;

  const accordData = [
    {
      accordionTitle: "Характеристика товара",
      accordionItem: product.productDescription,
    },
    {
      accordionTitle: (
        <div className={styles.averageRaiting}>
          Отзывы
          <span className={styles.starWrapper}>
            <img className={styles.starImage} src={star} alt="звезда" />{" "}
            {average}
          </span>
        </div>
      ),
      accordionItem: <Rewiews review={review} cardId={id} />,
    },
  ];

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
              <span className={styles.quantity}>Осталось {product.quantity} штук!</span>

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
