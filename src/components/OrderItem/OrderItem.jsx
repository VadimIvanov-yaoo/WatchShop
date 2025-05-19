import React from "react";
import styles from "./OrderItem.module.scss";

export default function OrderItem() {
  return (
    <div className={styles.orderContainer}>
      <table>
        <thead>
          <tr>
            <th>Наименование</th>
            <th>Цена</th>
            <th>Статус</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Наушники Sony WH-1000XM5</td>
            <td>34 990 ₽</td>
            <td>В обработке</td>
            <td>
              <button className={styles.cancelBtn}>Отменить заказ</button>
            </td>
          </tr>
          <tr>
            <td>Клавиатура Keychron K2</td>
            <td>8 490 ₽</td>
            <td>Доставлен</td>
            <td>
              <button className={styles.cancelBtn}>Отменить заказ</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
