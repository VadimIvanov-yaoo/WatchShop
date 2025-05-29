import styles from "./FlexBox.module.scss";
import clsx from "clsx";

export default function FlexBox({
  style,
  gap,
  children,
  just,
  align,
  grid,
  direction,
}) {
  return (
    <div
      style={{ ...style, gap: gap }}
      className={clsx(
        styles.flex,
        styles[grid],
        styles[just],
        styles[align],
        styles[direction]
      )}
    >
      {children}
    </div>
  );
}
