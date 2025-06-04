import { StrictMode } from "react";
import { MantineProvider } from "@mantine/core";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
// import card from "../../Data/CardData.js";
import card from "../src/Data/CardData.js";
import "./index.css";
import "./main.css";
import React from "react";
import App from "./App.jsx";
import { createContext } from "react";

const Context = createContext("card");

createRoot(document.getElementById("root")).render(
  <Context.Provider value={card}>
    {/*<React.StrictMode>*/}
      <MantineProvider withGlobalStyles withNormalizeCSS>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </MantineProvider>
    {/*</React.StrictMode>*/}
  </Context.Provider>
);
