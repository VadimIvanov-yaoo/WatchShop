import React, { useEffect, useState } from "react";
import Title from "../../components/Title/Title.jsx";
import Container from "../../components/Container/Container.jsx";
import FlexBox from "../../components/FlexBox/FlexBox.jsx";
import styles from "./OrderPage.module.scss";
import { useNavigate } from "react-router-dom";
import OrderItem from "../../components/OrderItem/OrderItem.jsx";
import axios from "axios";

export default function OrderPage() {
  const navigate = useNavigate();
  const [order, setOrder] = useState({ orders: [], items: [] });

  useEffect(() => {
    const authUser = localStorage.getItem("name");
    if (authUser) {
      axios
        .post("http://localhost:5000/order", { userName: authUser })
        .then((res) => {
          setOrder(res.data);
        })
        .catch((err) => {
          console.error("Ошибка загрузки данных:", err);
        });
    }
  }, []);

  const handleDelete = async (e) => {
    e.preventDefault();
    const userName = localStorage.getItem("name");
    const orderData = {
      userName,
      items: order.items.map((item) => ({ id: item.id })),
    };
    try {
      const { data } = await axios.post(
        "http://localhost:5000/orderDelete",
        orderData,
      );

      if (data.message === "Данные получены успешно!") {
        console.log("Удаление успешно");
        setOrder({ orders: [], items: [] });
      } else {
        alert("Не успешно");
      }
    } catch (error) {
      console.error("Ошибка:", error);
    }
  };

  console.log(order.items);

  const goBack = () => {
    navigate("/");
  };

  return (
    <div className={styles.order}>
      <Container>
        <button onClick={goBack} className={styles.back}>
          <span className={styles.arrow}>‹</span>
          Вернуться назад
        </button>
        <form className={styles.form}>
          <FlexBox direction="flex-column" gap="20px">
            <Title size="medium-big" weight="medium-bold" centerd="center">
              Страница заказов
            </Title>

            {order.orders.length > 0 ? (
              <>
                <div className={styles.userInfo}>
                  <span>
                    <b>Получатель:</b> {order.orders[0].nameUser}
                  </span>
                  <br />
                  <span>
                    <b>Адрес получателя:</b> {order.orders[0].address}
                  </span>
                  <br />
                  <span>
                    <b>Email:</b> {order.orders[0].email}
                  </span>
                </div>

                <table className={styles.orderTable}>
                  <thead className={styles.orderTableHead}>
                    <tr className={styles.orderTableHeadRow}>
                      <th className={styles.orderTh}>Изображение</th>
                      <th className={styles.orderTh}>Наименование</th>
                      <th className={styles.orderTh}>Цена</th>
                      <th className={styles.orderTh}>Количество</th>
                      <th className={styles.orderTh}>Сумма</th>
                    </tr>
                  </thead>
                  {order.items.map((product, index) => (
                    <OrderItem
                      key={index}
                      handleDelete={handleDelete}
                      productImage={product.productImage}
                      productName={product.productName}
                      productPrice={product.productPrice}
                      productQuantity={product.productQuantity}
                    />
                  ))}
                </table>
              </>
            ) : (
              <p>Заказы не найдены</p>
            )}
          </FlexBox>
        </form>
      </Container>
    </div>
  );
}
