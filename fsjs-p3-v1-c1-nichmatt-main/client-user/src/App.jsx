import { useState } from "react";
import Navbar from "./components/Navbar";
import "./App.css";
import Landing from "./components/Landing";
import ProductComponent from "./components/ProductComponents";
import { Provider } from "react-redux";
import store from "./stores";

import { RouterProvider } from "react-router-dom";
import router from "./routers/router";

function App() {
  return (
    <>
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    </>
  );
}

export default App;
