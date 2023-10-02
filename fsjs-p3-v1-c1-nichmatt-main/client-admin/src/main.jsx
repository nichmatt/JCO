import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import CategoryList from "./components/CategoryList.jsx";
import Navbar from "./components/Navbar.jsx";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  // <React.StrictMode>
  <div>
    <App />
    {/* <CategoryList /> */}
  </div>

  // </React.StrictMode>
);
