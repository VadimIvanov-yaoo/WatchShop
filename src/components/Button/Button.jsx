import clsx from "clsx";
import React from "react";
import "tippy.js/dist/tippy.css";
import styles from "./Button.module.scss";

export default function Button({
  id,
  addProduct,
  color = "transparentBtn",
  children,
  name = "btn",
  size,
  ...props
}) {
  function handleClick() {
    if (typeof addProduct === "function") {
      addProduct(id);
    }
  }

  return (
    <button
      onClick={handleClick}
      {...props}
      className={clsx(styles[name], styles[color], styles[size])}
    >
      {children}
    </button>
  );
}
