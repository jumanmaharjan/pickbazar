import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { AuthProvider } from "./context/AuthContext.jsx";
import { CartProvider } from "./context/CartContext.jsx";
import { SearchProvider } from "./context/SearchContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <CartProvider>
        <SearchProvider>
          <div className=" dark:bg-gray-900 dark:text-gray-50 transition-colors duration-300">
            <App />
          </div>
        </SearchProvider>
      </CartProvider>
    </AuthProvider>
  </StrictMode>,
);
