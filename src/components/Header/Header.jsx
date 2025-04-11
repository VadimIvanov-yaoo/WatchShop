import { useState } from "react";
import logo from "../../assets/logo.svg";
import loop from "../../assets/loop.svg";
import pack from "../../assets/pack.svg";
import user from "../../assets/user.svg";
import Container from "../Container/Container";
import FlexBox from "../FlexBox/FlexBox";
import HeaderButton from "../HeaderButton/HeaderButton";
import Nav from "../Nav/Nav";
import styles from "./Header.module.scss";
import { Route, Router, Link } from "react-router-dom";
import ShoppingCart from "../ShoppingCart/ShoppingCart";

export default function Header() {
  const [cartOpen, setCartOpen] = useState(false);
  const navData = [
    { linkTitle: "Мужские" },
    { linkTitle: "Женские" },
    { linkTitle: "Детские" },
    { linkTitle: "Аксессуары" },
  ];

  const btnData = [
    {
      imageBtn: loop,
      to: "/search",
    },

    {
      imageBtn: user,
      children: "ВХОД",
      to: "/login",
    },

    {
      imageBtn: pack,
      children: "12 321",
      onClick: (e) => {
        e.preventDefault();
        setCartOpen(!cartOpen);
      },
    },
  ];

  return (
    <div className={styles.header}>
      <Container>
        <FlexBox
          style={{ padding: "24px 0px" }}
          just="between"
          align="align-center"
        >
          <img src={logo} alt="logo" />
          <Nav navItems={navData} />
          <FlexBox gap="40px">
            {btnData.map((item, index) => (
              <HeaderButton
                key={index}
                children={item.children}
                imageBtn={item.imageBtn}
                to={item.to}
                onClick={item.onClick}
              ></HeaderButton>
            ))}
          </FlexBox>
        </FlexBox>
        {console.log(cartOpen)}
        {cartOpen && <ShoppingCart />}
      </Container>
    </div>
  );
}
