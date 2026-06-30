import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./style.css"
import App from "./App.jsx";
import { StateProvider } from "./context/StateContext.jsx";
import { CountryProvider } from "./context/CountryContext.jsx";
import { Provider } from "react-redux";
import { store } from "./app/store.js";

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <StateProvider>
      <CountryProvider>
        <App />
      </CountryProvider>
    </StateProvider>
  </Provider>
);
