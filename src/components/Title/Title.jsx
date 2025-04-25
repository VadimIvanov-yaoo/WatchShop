import styles from "./Title.module.scss";
import clsx from "clsx";

export default function Title({
  style,
  size = "small-medium",
  weight = "normal",
  children,
  indent,
  color,
}) {
  return (
    <h1
      style={style}
      className={clsx(
        styles.title,
        styles[size],
        styles[weight],
        styles[indent],
        styles[color]
      )}
    >
      {children}
    </h1>
  );
}
