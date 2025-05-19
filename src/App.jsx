import "./App.css";
import { Routes, Route, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import Header from "./components/Header/Header";
import MainPage from "./Pages/MainPage/MainPage.jsx";
import AuthorizationPage from "./Pages/AuthorizationPage/AuthorizationPage.jsx";
import RegisterPage from "./Pages/RegisterPage/RegisterPage.jsx";
import { ProductPage } from "./Pages/ProductPage/ProductPage";
import Rewiews from "./components/Rewiews/Rewiews";
import OrderFrom from "./Pages/OrderFrom/OrderFrom";
import { useCart } from "./hooks/useCart.js";

function App() {
  const location = useLocation();
  const name = localStorage.getItem("name");
  const { cart, count, addProduct, removeProduct } = useCart(name);
  const [user, setUser] = useState(null);

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
