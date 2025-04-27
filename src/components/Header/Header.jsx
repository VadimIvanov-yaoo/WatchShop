import { useState } from "react";
import logout from "../../assets/log-out.png";
import logo from "../../assets/logo.svg";
import loop from "../../assets/loop.svg";
import pack from "../../assets/shopping-cart2.png";
import userImg from "../../assets/user.svg";
import Container from "../Container/Container";
import FlexBox from "../FlexBox/FlexBox";
import HeaderButton from "../HeaderButton/HeaderButton";
import Nav from "../Nav/Nav";
import ShoppingCart from "../ShoppingCart/ShoppingCart";
import styles from "./Header.module.scss";

export default function Header({
  removeProduct,
  user,
  cart,
  count,
  closeCart,
}) {
  const [cartOpen, setCartOpen] = useState(false);
  const body = document.getElementById("body");
  const name = window.localStorage.getItem("name");

  function isUserLoggedIn() {
    return Boolean(
      name && name !== "undefined" && name !== "null" && name.trim() !== ""
    );
  }

  const isLoggedIn = isUserLoggedIn();

  function disabled(e) {
    e.preventDefault();
  }

  const navData = [
    { linkTitle: "Мужские" },
    { linkTitle: "Женские" },
    { linkTitle: "Детские" },
    { linkTitle: "Аксессуары" },
  ];
  let a;

  const btnData = [
    {
      imageBtn: loop,
      to: "/search",
    },

    {
      imageBtn: userImg,
      children: name ? name : "ВХОД",
      to: user ? "/" : "/login",
      onClick: isLoggedIn ? disabled : " ",
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

    isLoggedIn
      ? {
          imageBtn: logout,
          children: "Выход",
          to: "/",
          onClick: (e) => {
            window.localStorage.removeItem("name");
            location.reload();
          },
        }
      : null,
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
            {btnData.filter(Boolean).map((item, index) => (
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
        {cartOpen && (
          <ShoppingCart
            removeProduct={removeProduct}
            closeCart={closeCart}
            cart={cart}
          />
        )}
      </Container>
    </div>
  );
}
