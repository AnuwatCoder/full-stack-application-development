import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./styles/index.css";

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    const swUrl = "/service-worker.js";

    navigator.serviceWorker
      .register(swUrl)
      .then((registration) => {
        console.log(
          "Service Worker registered with scope: ",
          registration.scope
        );
      })
      .catch((error) => {
        console.log("Service Worker registration failed: ", error);
      });
  });
}

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);
