import React from "react";
import Rewiew from "../Rewiew/Rewiew";
import ModalOrder from "../ModalOrder/ModalOrder";
import styles from "./Rewiews.module.scss";

export default function Rewiews({ review, readOnly }) {
  return (
    <>
      <div className={styles.modalWrapper}>
        <ModalOrder />
      </div>
      <div className={styles.wrapper}>
        {review && review.length > 0 ? (
          review.map((item, index) => (
            <Rewiew readOnly={readOnly} key={index} review={item} />
          ))
        ) : (
          <p>Нет отзывов</p>
        )}
      </div>
    </>
  );
}
