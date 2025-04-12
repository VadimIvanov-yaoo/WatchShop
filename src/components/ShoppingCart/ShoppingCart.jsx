import React from "react";
import Title from "../Title/Title";
import TrashBtn from "../TrashBtn/TrashBtn";
import styles from "./ShoppingCart.module.scss";
import Button from "../Button/Button";
import FlexBox from "../FlexBox/FlexBox";

export default function ShoppingCart({ cart = [] }) {
  return (
    <div className={styles.cart}>
      <h1 className={styles.title}>Корзина</h1>

      <div className={styles.cartContent}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th className={styles.pad}>Товары</th>
              <th className={styles.pad}>Цена</th>
              <th className={styles.pad}>Количество</th>
              <th className={styles.pad}>Итого</th>
            </tr>
          </thead>
          <tbody className={styles.tbody}>
            {cart.map((item) => (
              <tr key={item.id}>
                <td>
                  <span className={styles.product}>
                    <TrashBtn />
                    <img className={styles.img} src={item.cardImg} alt="" />
                    <Title>{item.cardTitle}</Title>
                  </span>
                </td>
                <td className={styles.price}>{item.cardPrice} ₽</td>
                <td className={styles.price}>{item.quantity}</td>
                <td className={styles.price}>
                  {parseInt(item.cardPrice.replace(/\s/g, "")) * item.quantity}{" "}
                  ₽
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className={styles.totalWrapper}>
        <FlexBox just="between" gap="20px" align="align-center">
          <div className={styles.total}>
            <strong style={{ fontSize: "20px" }}>Итого:</strong>
            <span className={styles.totalSum}>1000</span>
          </div>
          <Button color="orange" size="cardbtn">
            К оформлению
          </Button>
        </FlexBox>
      </div>
    </div>
  );
}
