import React from "react";
import styles from "./OrderItem.module.scss";

export default function OrderItem({
  productName,
  productPrice,
  productImage, productQuantity,productTotalPrice,
}) {
  return (
    <tbody className={styles.orderTableBody}>
      <tr className={styles.orderTableHeadRow}>
        <td className={styles.orderTd}>
          <img className={styles.orderImage} src={productImage} alt="" />
        </td>
        <td className={styles.orderTd}>{productName}</td>
        <td className={styles.orderTd}>{productPrice}</td>
        <td className={styles.orderTd}>{productQuantity}</td>
        <td className={styles.orderTd}>{productTotalPrice}</td>
        <td className={styles.orderTd}>В обработке</td>
        <td className={styles.orderTd}>
        </td>
      </tr>
    </tbody>
  );
}
