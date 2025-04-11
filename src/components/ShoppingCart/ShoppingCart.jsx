import React from "react";
import Title from "../Title/Title";
import TrashBtn from "../TrashBtn/TrashBtn";
import styles from "./ShoppingCart.module.scss";

export default function ShoppingCart() {
  return (
    <div className={styles.cart}>
      <h1 className={styles.title}>Корзина</h1>
      <table className={styles.table}>
        <tr>
          <th>Товары</th>
          <th>Цена</th>
          <th>Количество</th>
          <th>Итого</th>
        </tr>
        <tr>
          <td>
            <span className={styles.product}>
              <TrashBtn />
              <Title>sadas</Title>
            </span>
          </td>
          <td className={styles.price}>12000</td>
          <td className={styles.price}>2</td>
          <td className={styles.price}>200</td>
        </tr>
        <tr>
          <td>
            <span className={styles.product}>
              <TrashBtn />
              <Title>sadas</Title>
            </span>
          </td>
          <td className={styles.price}>12000</td>
          <td className={styles.price}>2</td>
          <td className={styles.price}>200</td>
        </tr>
      </table>
    </div>
  );
}
