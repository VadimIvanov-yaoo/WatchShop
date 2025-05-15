import React, { useEffect, useState } from "react";
import styles from "../ShoppingCart/ShoppingCart.module.scss";
import TrashBtn from "../TrashBtn/TrashBtn.jsx";
import Title from "../Title/Title.jsx";
import { useCart } from "../../hooks/useCart.js";
import useDeleteItem from "../../hooks/useDeleteItem.js";

const CartItem = ({
  id,
  productId,
  productImage,
  productTitle,
  productPrice,
  productQuantity,
}) => {
  const { deleteItem } = useDeleteItem();
  const { removeProduct } = useCart();

  const handleClick = async (e) => {
    e.preventDefault();

    const success = await deleteItem(productId);
    if (success) {
      if (success) {
        removeProduct(productId);
        await deleteItem(id);
      }
    }
  };

  return (
    <tbody className={styles.tbody}>
      <tr>
        <td>
          <span className={styles.product}>
            <TrashBtn onClick={handleClick} />
            <img className={styles.img} src={productImage} alt="" />
            <Title>{productTitle}</Title>
          </span>
        </td>
        <td className={styles.price}>{productPrice} ₽</td>
        <td className={styles.price}>{productQuantity}</td>
        <td className={styles.price}>
          {parseInt(productPrice) * parseInt(productQuantity)} ₽
        </td>
      </tr>
    </tbody>
  );
};

export default CartItem;
