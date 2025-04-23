import React from "react";
import styles from "./Button.module.scss";
import clsx from "clsx";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";
import { useState } from "react";

export default function Button({
  id,
  addProduct,
  color = "transparentBtn",
  children,
  name = "btn",
  size,
  ...props
}) {
  const [visible, setVisible] = useState(false);
  function handleClick() {
    addProduct(id);
    setVisible(true);
    setTimeout(() => setVisible(false), 900);
  }

  return (
    <Tippy content="Добавлено в корзину!" visible={visible} placement="top">
      <button
        onClick={handleClick}
        {...props}
        className={clsx(styles[name], styles[color], styles[size])}
      >
        {children}
      </button>
    </Tippy>
  );
}
