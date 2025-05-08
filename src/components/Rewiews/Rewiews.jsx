import React from "react";
import Rewiew from "../Rewiew/Rewiew";
import styles from "./Rewiews.module.scss";

export default function Rewiews({ cardId, review, readOnly }) {
  const isDisabled = true;
  return (
    <div className={styles.wrapper}>
      {review && review.length > 0 ? (
        review.map((item, index) => (
          <Rewiew readOnly={readOnly} key={index} review={item} />
        ))
      ) : (
        <p>Нет отзывов</p>
      )}
      {/* <Rewiew review={review} cardId={cardId} />
      <Rewiew review={review} cardId={cardId} />
      <Rewiew review={review} cardId={cardId} />
      <Rewiew review={review} cardId={cardId} />
      <Rewiew review={review} cardId={cardId} />
      <Rewiew review={review} cardId={cardId} /> */}
    </div>
  );
}
