import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { Toaster } from "sonner";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Toaster closeButton duration={1500} theme="light" position="bottom-center" />
    <App />
  </BrowserRouter>
);
