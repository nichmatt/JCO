import { useState, useEffect } from "react";
import "./App.css";
import CategoryList from "./components/CategoryList";
import Navbar from "./components/Navbar";
import Login from "./components/Login";
import AddCategory from "./components/AddCategory";
import AddUser from "./components/AddUser";
import ListProduct from "./components/ListProduct";
import { Provider } from "react-redux";
import store from "./stores/index";
import Swal from "sweetalert2";

import {
  createBrowserRouter,
  RouterProvider,
  redirect,
} from "react-router-dom";

import router from "./routers/router.jsx";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <div>
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
      <ToastContainer />
    </div>
  );
}

export default App;
