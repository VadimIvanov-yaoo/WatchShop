import FlexBox from "../FlexBox/FlexBox";
import styles from "./Nav.module.scss";

export default function Nav({ navItems }) {
  return (
    <nav>
      <FlexBox gap="115px">
        {navItems.map((item, index) => (
          <li key={index}>
            <a className={styles.navLink} href={item.href}>
              {item.linkTitle}
            </a>
          </li>
        ))}
      </FlexBox>
    </nav>
  );
}
