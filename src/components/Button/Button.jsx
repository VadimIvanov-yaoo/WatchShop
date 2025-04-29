import React from "react";
import styles from "./Button.module.scss";
import clsx from "clsx";
import "tippy.js/dist/tippy.css";

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
    addProduct(id);
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
