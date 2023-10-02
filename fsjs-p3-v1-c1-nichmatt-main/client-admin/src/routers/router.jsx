import ListProduct from "../components/ListProduct";
import Navbar from "../components/Navbar";
import Login from "../components/Login";
import Layout from "../layout/layout";

import { createBrowserRouter, redirect } from "react-router-dom";
import CategoryList from "../components/CategoryList";
import RegisterPage from "../pages/RegisterPage";
import HomePage from "../pages/HomePage";
import AddCategory from "../components/AddCategory";
import AddProduct from "../components/AddProduct";
import EditProductPage from "../pages/EditProductPage";
import Ingredients from "../components/Ingredients";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <>
        <Layout />
      </>
    ),
    loader: () => {
      const token = localStorage.getItem("access_token");
      if (!token) throw redirect("/login");

      return null;
    },
    children: [
      {
        path: "dashboard",
        element: <HomePage />,
      },
      {
        path: "",
        element: <HomePage />,
      },
      {
        path: "/ingredients/:id",
        element: <Ingredients />,
      },
      {
        path: "category",
        element: <CategoryList />,
      },
      {
        path: "register",
        element: <RegisterPage />,
      },
      {
        path: "addCategory",
        element: <AddCategory />,
      },
      {
        path: "addProduct",
        element: <AddProduct />,
      },
      {
        path: "editProduct/:id",
        element: <EditProductPage />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
    loader: () => {
      const token = localStorage.getItem("access_token");
      if (token) throw redirect("/");

      return null;
    },
  },
]);
export default router;
