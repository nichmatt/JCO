import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchCategory,
  fetchItem,
  fetchItemCategory,
} from "../stores/actions/actionCreator";
import { useNavigate } from "react-router-dom";
import FooterComponent from "./FooterComponents";

function ProductComponent() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { data } = useSelector((state) => state.item);
  const { category } = useSelector((state) => state.category);

  const [activeCategoryId, setActiveCategoryId] = useState(null);

  const filtering = (id) => {
    // console.log(id);
    dispatch(fetchItemCategory(id));
    setActiveCategoryId(id);
  };

  const unFiltering = (id) => {
    // console.log(id);
    dispatch(fetchItem());
    // setActiveCategoryId(id);
  };

  useEffect(() => {
    // console.log(data);
    dispatch(fetchItem());
    dispatch(fetchCategory());
  }, []);
  return (
    <>
      <section id="hero">
        <div className="container">
          <div className="sidebar">
            <h2>Categories</h2>
            <ul>
              <li onClick={() => unFiltering()}>All</li>
              {category.map((el, index) => (
                <li
                  key={index}
                  onClick={() => filtering(el.id)}
                  className={activeCategoryId === el.id ? "active" : ""}
                >
                  {el.name}
                </li>
              ))}
            </ul>
          </div>

          <div className="content">
            <section id="menu-section">
              <h2>Our Menu</h2>
              <div className="menu">
                {data?.map((el, index) => (
                  <div
                    key={index}
                    onClick={() => navigate("/items/" + el.id)}
                    className="menu-item"
                  >
                    <img src={el.imgUrl} alt="Pastry 1" />
                    <div className="menu-item-details">
                      <h3>{el.name}</h3>
                      {/* <p>{el.description}</p> */}
                      {/* <p>Rp. {el.price}</p> */}
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <section id="promo-section">
              <h2>Recomendation</h2>
              <div className="promo">
                <div className="promo-item">
                  <img
                    src="http://api.vold.dev.fleava.com/pictures/5b39cd517169294aba251f43/jcoffee/7c30e9a5-f3d8-4d45-9c08-eb5c683d9e6c.jpg"
                    alt="Special Drink"
                  />
                  <div
                    onClick={() => navigate("/maintain")}
                    className="promo-item-details"
                  >
                    <h3>Summer Special Drink</h3>
                    <p>Refresh yourself with our fruity summer drink.</p>
                    <span>50% off</span>
                  </div>
                </div>
              </div>
              <FooterComponent />
            </section>

            <footer className="footer">
              <p>&copy; 2023 NiCO Cafe. All rights reserved.</p>
            </footer>
          </div>
        </div>
      </section>
    </>
  );
}
export default ProductComponent;
