import { useEffect, useState } from "react";
import "../App.css";
import { useNavigate, RouterProvider } from "react-router-dom";
import Swal from "sweetalert2";

function App() {
  const navigate = useNavigate();
  const logout = () => {
    localStorage.clear();
    navigate("/login");
    Swal.fire("Safely Log out", "", "success");
  };
  return (
    <div>
      <div id="navbar">
        <div id="logo-jco">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/c/c2/New_jco_logo.png"
            alt="logo jco"
          />
        </div>
        <div id="navbar-menu">
          <ul>
            <li onClick={() => navigate("/dashboard")}>Dashboard</li>
            <li onClick={() => navigate("/category")}>Categories</li>
            <li onClick={() => navigate("/register")}>Register Admin</li>
            <li onClick={logout}>Sign Out</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default App;
