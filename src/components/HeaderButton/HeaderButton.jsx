import { Link } from "react-router-dom";
import styles from "./HeaderButton.module.scss";

export default function HeaderButton({
  disabled,
  onClick,
  imageBtn,
  children,
  to,
}) {
  return (
    <div>
      <Link
        disabled={disabled}
        to={to}
        className={styles.btn}
        onClick={onClick}
      >
        <img width="24px" height="24px" src={imageBtn} alt="icon" />
        {children}
      </Link>
    </div>
  );
}
