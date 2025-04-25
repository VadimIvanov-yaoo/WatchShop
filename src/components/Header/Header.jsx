import { useState } from "react";
import logo from "../../assets/logo.svg";
import loop from "../../assets/loop.svg";
import pack from "../../assets/shopping-cart2.png";
import userImg from "../../assets/user.svg";
import Container from "../Container/Container";
import FlexBox from "../FlexBox/FlexBox";
import HeaderButton from "../HeaderButton/HeaderButton";
import Nav from "../Nav/Nav";
import styles from "./Header.module.scss";
import ShoppingCart from "../ShoppingCart/ShoppingCart";

export default function Header({ user, cart, count, closeCart }) {
  const [cartOpen, setCartOpen] = useState(false);
  // const [user, setUser] = useState("");
  const body = document.getElementById("body");
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
      imageBtn: userImg,
      children: user ? user : "ВХОД",
      to: user ? "/" : "/login",
    },

    {
      imageBtn: pack,
      children: count,
      onClick: (e) => {
        e.preventDefault();

        setCartOpen(!cartOpen);
        if (cartOpen) {
          restoreBodyStyles();
        } else {
          BodyStyles();
        }
      },
    },
  ];
  const scrollbarWidth =
    window.innerWidth - document.documentElement.clientWidth;
  function BodyStyles() {
    body.style.background = "rgba(5, 10, 30, 0.2)";
    body.style.overflow = "hidden";
    body.style.paddingRight = `${scrollbarWidth}px`;
  }

  function restoreBodyStyles() {
    body.style.background = "none";
    body.style.overflow = "auto";
    body.style.position = "";
    body.style.width = "";
    body.style.paddingRight = "";
  }

  function closeCart(e) {
    e.preventDefault();
    setCartOpen(false);
    restoreBodyStyles();
  }

  return (
    <div className={styles.header}>
      <Container>
        <FlexBox
          style={{ padding: "24px 0px" }}
          just="between"
          align="align-center"
        >
          <a href="/">
            <img src={logo} alt="logo" />
          </a>

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
        {cartOpen && <ShoppingCart closeCart={closeCart} cart={cart} />}
      </Container>
    </div>
  );
}
