import React from "react";
import Rewiew from "../Rewiew/Rewiew";
import ModalReview from "../ModalReview/ModalReview";
import styles from "./Rewiews.module.scss";

export default function Rewiews({ review, readOnly }) {
  return (
    <>
      <div className={styles.modalWrapper}>
        <ModalReview />
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
