import { Carousel } from "react-responsive-carousel";
import { useNavigate } from "react-router-dom";
import FooterComponent from "./FooterComponents";

function Landing() {
  const navigate = useNavigate();
  return (
    <>
      <section id="Landing-section">
        <div className="Landing-container">
          <div id="LandingImage">
            <img src="https://api.vold.dev.fleava.com/pictures/5b39cd517169294aba251f43/images/thumbnails/large_b524cba6-78e0-474b-9b11-5b71dac69ae4.jpg" />
            <img src="http://api.vold.dev.fleava.com/pictures/5b39cd517169294aba251f43/donuts/8777fff0-1018-4495-b025-33bd4c2fefcd.jpg" />
            <img src="https://api.vold.dev.fleava.com/pictures/5b39cd517169294aba251f43/images/thumbnails/large_bb7ce01b-af46-4ab3-a30c-5c39bee3272e.jpg" />
          </div>
        </div>
        <div id="text1">
          <h3>
            What’s your mood? We’ve got exceptionally handcrafted donuts,
            premium sourced Arabica coffee, and other crave-inducing treats
            prepared just for you.
          </h3>
          <button
            onClick={() => {
              navigate("/menu");
            }}
          >
            CHECK OUR MENU
          </button>
        </div>
        <FooterComponent />
      </section>
    </>
  );
}

export default Landing;
