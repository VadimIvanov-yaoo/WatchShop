import React from "react";
import styles from "./Select.module.scss";

export default function Select({ name, value = "1", ...props }) {
  return (
    <select
      className={styles.select}
      {...props}
      name={name}
      value={value}
      id=""
    >
      <option disabled value="1">
        Выберите фильтр
      </option>
      <option value="2">По возрастанию цены</option>
      <option value="3">По убыванию цены</option>
    </select>
  );
}
