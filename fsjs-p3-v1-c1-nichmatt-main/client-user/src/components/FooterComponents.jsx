import { useNavigate } from "react-router-dom";
function FooterComponent() {
  const navigate = useNavigate();
  return (
    <>
      <section id="FooterLanding-section">
        <div id="FooterLanding-container">
          <div>
            <ul>
              <li onClick={() => navigate("/maintain")}>OUR STORY</li>
              <li onClick={() => navigate("/menu")}>OUR PRODUCTS</li>
              <li onClick={() => navigate("/maintain")}>STORES</li>
              <li onClick={() => navigate("/maintain")}>ONLINE ORDER</li>
            </ul>
          </div>
          <div>
            <ul>
              <li onClick={() => navigate("/maintain")}>IN THE PRESS</li>
              <li onClick={() => navigate("/maintain")}>EVENTS</li>
              <li onClick={() => navigate("/maintain")}>FRANCHISE</li>
              <li onClick={() => navigate("/maintain")}>CONTACT US</li>
            </ul>
          </div>
          {/* <div>
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/c/c2/New_jco_logo.png"
              alt=""
            />
          </div> */}
        </div>
      </section>
    </>
  );
}
export default FooterComponent;
