import styles from "./HeaderButton.module.scss";
import { Route, Router, Link } from "react-router-dom";

export default function HeaderButton({ onClick, imageBtn, children, to }) {
  return (
    <div>
      <Link to={to} className={styles.btn} onClick={onClick}>
        <img width="24px" height="24px" src={imageBtn} alt="icon" />
        {children}
      </Link>
    </div>
  );
}
