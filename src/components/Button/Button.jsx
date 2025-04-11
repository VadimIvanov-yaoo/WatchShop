import React from "react";
import styles from "./Button.module.scss";
import clsx from "clsx";

export default function Button({
  color = "transparentBtn",
  children,
  name = "btn",
  size,
  ...props
}) {
  return (
    <>
      <button
        {...props}
        className={clsx(styles[name], styles[color], styles[size])}
      >
        {children}
      </button>
    </>
  );
}
