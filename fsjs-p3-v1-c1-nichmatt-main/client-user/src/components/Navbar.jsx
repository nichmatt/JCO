import { useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  return (
    <>
      <section id="Navbar">
        <div id="logo-jco">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/c/c2/New_jco_logo.png"
            alt="logo jco"
          />
        </div>
        <div id="navbar-menu">
          <ul>
            <li onClick={() => navigate("/")}>Dashboard</li>
            <li onClick={() => navigate("/menu")}>Menu&Categories</li>
            <li onClick={() => navigate("/maintain")}>Stores</li>
            <li onClick={() => navigate("/maintain")}>Contact Us</li>
            {/* <li onClick={() => navigate("/login")}>Sign Out</li> */}
          </ul>
        </div>
      </section>
    </>
  );
}

export default Navbar;
