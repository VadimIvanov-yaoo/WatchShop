import "./App.css";
import { Routes, Route, useLocation } from "react-router-dom";
import { useState } from "react";
import card from "./Data/CardData";
import Header from "./components/Header/Header";
import MainPage from "./components/MainPage/MainPage";
import Authorization from "./components/Authorization/Authorization";

function App() {
  const location = useLocation();
  const [cart, setCart] = useState([]);
  const [count, setCount] = useState(0);

  function addProduct(id) {
    setCart((prevCart) => {
      if (prevCart.some((item) => item.id === id)) {
        return prevCart.map((item) =>
          item.id === id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      const product = card.find((item) => item.id === id);
      return [...prevCart, { ...product, quantity: 1 }];
    });

    setCount((prev) => prev + 1);
  }

  return (
    <>
      {location.pathname !== "/login" && <Header count={count} cart={cart} />}
      <Routes>
        <Route
          path="/"
          element={<MainPage cart={cart} addProduct={addProduct} />}
        />
        <Route path="/login" element={<Authorization />} />
      </Routes>
    </>
  );
}

export default App;
