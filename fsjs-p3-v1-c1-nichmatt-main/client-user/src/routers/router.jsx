import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MenuPages from "../Pages/MenuPages";
import BaseLayout from "../components/BaseLayout";
import Maintain from "../components/Maintain";
import DetailProduct from "../components/DetailProduct";
import Landing from "../components/Landing";
// import "./index.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <BaseLayout />,
    children: [
      {
        path: "/",
        element: <Landing />,
      },
      {
        path: "/menu",
        element: <MenuPages />,
      },
      {
        path: "maintain",
        element: <Maintain />,
      },
      {
        path: "items/:id",
        element: <DetailProduct />,
      },
    ],
  },
]);

export default router;
