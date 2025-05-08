import "./App.css";
import { Routes, Route, useLocation } from "react-router-dom";
import { useState } from "react";
import card from "./Data/CardData";
import Header from "./components/Header/Header";
import MainPage from "./components/MainPage/MainPage";
import Authorization from "./components/Authorization/Authorization";
import Register from "./components/Register/Register";
import ProductPage from "./components/ProductPage/ProductPage";
import Rewiews from "./components/Rewiews/Rewiews";

function App() {
  const location = useLocation();
  const [cart, setCart] = useState([]);
  const [count, setCount] = useState(0);
  const [user, setUser] = useState(null);

  function addProduct(id) {
    setCart((prevCart) => {
      if (prevCart.some((item) => item.id === id)) {
        return prevCart.map((item) =>
          item.id === id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      const product = card.find((item) => item.id === parseInt(id));
      return [...prevCart, { ...product, quantity: 1 }];
    });

    setCount((prev) => prev + 1);
  }

  function removeProduct(id) {
    setCart((prevCart) => {
      const product = prevCart.find((item) => item.id === id);

      if (!product) return prevCart;
      if (product.quantity > 1) {
        return prevCart.map((item) =>
          item.id === id ? { ...item, quantity: item.quantity - 1 } : item
        );
      } else {
        return prevCart.filter((item) => item.id !== id);
      }
    });

    setCount((prev) => (prev > 0 ? prev - 1 : 0));
  }

  return (
    <>
      {location.pathname !== "/login" && location.pathname !== "/register" && (
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
        <Route path="/login" element={<Authorization onLogin={setUser} />} />
        <Route path="/register" element={<Register />} />
        <Route path="/cardPage" element={<ProductPage />} />
        <Route path="/review" element={<Rewiews />} />
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
