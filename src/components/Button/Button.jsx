import clsx from "clsx";
import React from "react";
import "tippy.js/dist/tippy.css";
import styles from "./Button.module.scss";

export default function Button({
  color = "transparentBtn",
  children,
  size,
  ...props
}) {

  return (
    <button
      {...props}
      className={clsx(styles[name], styles[color], styles[size])}
    >
      {children}
    </button>
  );
}
