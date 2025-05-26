import React from "react";
import styles from "./OrderItem.module.scss";

export default function OrderItem({
  handleDelete,
  productName,
  productPrice,
  productImage,
}) {
  return (
    // <div className={styles.orderContainer}>
    <tbody className={styles.orderTableBody}>
      <tr className={styles.orderTableHeadRow}>
        <td className={styles.orderTd}>
          <img className={styles.orderImage} src={productImage} alt="" />
        </td>
        <td className={styles.orderTd}>{productName}</td>
        <td className={styles.orderTd}>{productPrice}</td>
        <td className={styles.orderTd}>В обработке</td>
        <td className={styles.orderTd}>
          <button onClick={handleDelete} className={styles.cancelBtn}>
            Отменить заказ
          </button>
        </td>
      </tr>
    </tbody>
    // </div>
  );
}
