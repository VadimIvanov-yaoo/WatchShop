import React from "react";
import clsx from "clsx";
import styles from "./Input.module.scss";

export default function Input({ ref, id, ...props }) {
  return <input id={id} ref={ref} {...props} />;
}
