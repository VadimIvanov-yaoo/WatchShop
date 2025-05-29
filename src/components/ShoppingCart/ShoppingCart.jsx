import { Toaster, toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import close from "../../assets/images/close.png";
import FlexBox from "../FlexBox/FlexBox";
import styles from "./ShoppingCart.module.scss";
import useCartItem from "../../hooks/useCartItem.js";
import CartItem from "../CartItem/CartItem.jsx";

export default function ShoppingCart({ closeCart }) {
  const navigate = useNavigate();
  const { product } = useCartItem();
  console.log(product);

  function addOrder() {
    if (product.length !== 0) {
      closeCart();
      navigate("/OrderPlacement");
    } else {
      toast.error("Корзина пуста");
    }
  }
  const totalSum = product.reduce(
    (acc, item) => acc + item.productTotalPrice,
    0,
  );

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
          {product.map((item, index) => (
            <CartItem
              key={index}
              id={item.id}
              productId={item.productId}
              productImage={item.productImage}
              productTitle={item.productName}
              productQuantity={item.productQuantity}
              productPrice={item.productPrice}
              // productQuantity={item.productQuantity}
            />
          ))}
        </table>
      </div>

      <div className={styles.totalWrapper}>
        <FlexBox just="between" gap="20px" align="align-center">
          <div className={styles.total}>
            <strong style={{ fontSize: "20px" }}>Итого:</strong>
            <span className={styles.totalSum}>{totalSum} ₽</span>
          </div>
          <button onClick={addOrder} className={styles.orangeButton}>
            К оформлению
          </button>
        </FlexBox>
      </div>
    </div>
  );
}
