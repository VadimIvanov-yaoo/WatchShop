import clsx from "clsx";
import FlexBox from "../FlexBox/FlexBox";
import styles from "./InputOrder.module.scss";

export default function InputOrder({
  children,
  childrenText,
  required,
  style,
  width,
  className,
  showErrorText,
  ...props
}) {
  return (
    <FlexBox direction="flex-column" align="align-start" gap="7px">
      <label className={styles.label} htmlFor={props.name}>
        {children}
      </label>
      <input
        style={{ ...style, width }}
        className={clsx(styles.input, className)}
        required={required}
        {...props}
      />
      {showErrorText && <p className={styles.redTextVisible}>{childrenText}</p>}
    </FlexBox>
  );
}
