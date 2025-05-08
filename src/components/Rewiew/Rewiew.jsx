import React, { useState } from "react";
import Raiting from "../Raiting/Raiting";
import styles from "./Rewiew.module.scss";

export default function Rewiew({ review, readOnly }) {
  const grade = review.raiting;
  return (
    <>
      <div className={styles.reviewWrapper}>
        <div className={styles.reviewContent}>
          <div className={styles.rewiewUser}>
            <img
              className={styles.userIcon}
              src="/src/assets/usericons.png"
              alt=""
            />
            <p className={styles.userName}>Jenny Wilson</p>
          </div>
          <Raiting readOnly={true} grade={grade} />
          <p className={styles.reviewDescription}>
            {review.reviewDescription || " "}
          </p>
        </div>
      </div>
    </>
  );
}
