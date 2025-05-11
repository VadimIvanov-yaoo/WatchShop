import clsx from "clsx";
import FlexBox from "../FlexBox/FlexBox";
import styles from "./InputOrder.module.scss";

export default function InputOrder({ style, width, children, ...props }) {
  return (
    <FlexBox direction="flex-column" align="align-start" gap="7px">
      <label className={styles.label} htmlFor="">
        {children}
      </label>
      <input
        style={{ ...style, width: width }}
        className={clsx(styles.input, styles.width)}
        {...props}
      />
    </FlexBox>
  );
}
