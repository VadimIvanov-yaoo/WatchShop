import "./App.css";
import { Routes, Route, useLocation } from "react-router-dom";
import Header from "./components/Header/Header";
import MainPage from "./components/MainPage/MainPage";
import Authorization from "./components/Authorization/Authorization";

function App() {
  const location = useLocation();

  return (
    <>
      {location.pathname !== "/login" && <Header />}
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/login" element={<Authorization />} />
      </Routes>
    </>
  );
}

export default App;
