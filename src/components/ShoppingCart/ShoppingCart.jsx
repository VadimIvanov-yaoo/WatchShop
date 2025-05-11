import { useEffect, useState } from "react";
import { Toaster, toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import close from "../../assets/x.png";
import FlexBox from "../FlexBox/FlexBox";
import Title from "../Title/Title";
import TrashBtn from "../TrashBtn/TrashBtn";
import styles from "./ShoppingCart.module.scss";

export default function ShoppingCart({ removeProduct, cart = [], closeCart }) {
  const [total, setTotal] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    totalSum();
  }, [cart]);

  function totalSum() {
    const sum = cart.reduce((acc, item) => {
      const price = parseInt(item.cardPrice.replace(/\s/g, ""), 10);
      return acc + price * item.quantity;
    }, 0);
    setTotal(sum);
  }

  function handleClick(id) {
    removeProduct(id);
  }

  function addOrder() {
    if (cart.length !== 0) {
      closeCart();
      navigate("/order");
    } else {
      toast.error("Корзина пуста");
    }
  }

  return (
    <div className={styles.cart}>
      <FlexBox
        style={{ padding: "0px 20px" }}
        align="align-center"
        just="between"
      >
        <h1 className={styles.title}>Корзина</h1>
        <button className={styles.closeBtn} onClick={closeCart}>
          <img src={close} alt="" />
        </button>
      </FlexBox>

      <div className={styles.cartContent}>
        <Toaster position="top-center" reverseOrder={false} />
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
                    <TrashBtn onClick={() => handleClick(item.id)} />
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
            <span className={styles.totalSum}> {total} ₽ </span>
          </div>
          <button onClick={addOrder} className={styles.orangeButton}>
            К оформлению
          </button>
        </FlexBox>
      </div>
    </div>
  );
}
