import clsx from "clsx";
import React from "react";
import styles from "./Description.module.scss";

export default function Description({
  style,
  size = "small-medium",
  weight = "normal",
  children,
  color,
}) {
  return (
    <p
      style={style}
      className={clsx(
        styles.description,
        styles[size],
        styles[weight],
        styles[color]
      )}
    >
      {children}
    </p>
  );
}
