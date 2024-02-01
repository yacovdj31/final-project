import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";

import { AuthContextProvider } from "./context/AuthContext";
import { MathContextProvider } from "./context/MathContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <AuthContextProvider>
      <MathContextProvider>
        <App />
      </MathContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
);
