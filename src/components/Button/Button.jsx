import React from "react";
import styles from "./Button.module.scss";
import clsx from "clsx";

export default function Button({
  id,
  addProduct,
  color = "transparentBtn",
  children,
  name = "btn",
  size,
  ...props
}) {
  return (
    <>
      <button
        onClick={() => addProduct(id)}
        {...props}
        className={clsx(styles[name], styles[color], styles[size])}
      >
        {children}
      </button>
    </>
  );
}
