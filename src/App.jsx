import "./App.css";
import { Routes, Route, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import card from "./Data/CardData";
import Header from "./components/Header/Header";
import MainPage from "./Pages/MainPage/MainPage";
import AuthorizationPage from "./Pages/AuthorizationPage/AuthorizationPage.jsx";
import RegisterPage from "./Pages/RegisterPage/RegisterPage.jsx";
import { ProductPage } from "./Pages/ProductPage/ProductPage";
import Rewiews from "./components/Rewiews/Rewiews";
import OrderFrom from "./Pages/OrderFrom/OrderFrom";

function App() {
  const location = useLocation();
  const name = window.localStorage.getItem("name");
  const [cart, setCart] = useState(() => {
    const saveCard = window.localStorage.getItem(`cart_${name}`);
    if (saveCard) {
      return JSON.parse(saveCard);
    }
    return [];
  });
  const [count, setCount] = useState(() => {
    const saveCount = window.localStorage.getItem(`quantity_${name}`);
    if (saveCount) {
      return parseInt(saveCount);
    }
    return 0;
  });

  const [user, setUser] = useState(null);
  useEffect(() => {
    if (name) {
      window.localStorage.setItem(`cart_${name}`, JSON.stringify(cart));
      window.localStorage.setItem(`quantity_${name}`, cart.length);
    }
  });

  function addProduct(id) {
    setCart((prevCart) => {
      if (prevCart.some((item) => item.id === id)) {
        return prevCart.map((item) =>
          item.id === id ? { ...item, quantity: item.quantity + 1 } : item,
        );
      }
      const product = card.find((item) => item.id === parseInt(id));
      window.localStorage.setItem("cart", JSON.stringify(cart));
      return [...prevCart, { ...product, quantity: 1 }];
    });

    setCount((prev) => prev + 1);
  }

  // useEffect(() => {
  //   localStorage.setItem("cart", cart);
  // }, [cart]);

  function removeProduct(id) {
    setCart((prevCart) => {
      const product = prevCart.find((item) => item.id === id);

      if (!product) return prevCart;
      if (product.quantity > 1) {
        return prevCart.map((item) =>
          item.id === id ? { ...item, quantity: item.quantity - 1 } : item,
        );
      } else {
        return prevCart.filter((item) => item.id !== id);
      }
    });

    setCount((prev) => (prev > 0 ? prev - 1 : 0));
  }

  return (
    <>
      {location.pathname !== "/login" &&
        location.pathname !== "/register" &&
        location.pathname !== "/order" && (
          <Header
            removeProduct={removeProduct}
            user={user}
            count={count}
            cart={cart}
          />
        )}
      <Routes>
        <Route
          path="/"
          element={<MainPage cart={cart} addProduct={addProduct} />}
        />
        <Route
          path="/login"
          element={<AuthorizationPage onLogin={setUser} />}
        />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/cardPage" element={<ProductPage />} />
        <Route path="/review" element={<Rewiews />} />
        <Route path="/order" element={<OrderFrom />} />
        <Route
          path={`/cardPage/:id`}
          element={<ProductPage addProduct={addProduct} />}
        />
      </Routes>
    </>
  );
}

export default App;

// https://mui.com/base-ui/react-menu/
