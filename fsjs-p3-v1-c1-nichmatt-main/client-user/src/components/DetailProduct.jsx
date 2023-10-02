import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { readItemDetail } from "../stores/actions/actionCreator";
import FooterComponent from "./FooterComponents";

function DetailProduct() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { data } = useSelector((state) => state.itemDetail);
  useEffect(() => {
    dispatch(readItemDetail(id));
  }, []);
  return (
    <>
      <section className="product-detail">
        <div className="product-detail-container">
          <div className="product-image">
            <img src={data.imgUrl} alt="Coffee Latte" />
          </div>
          <div className="product-info">
            <h2>{data.name}</h2>
            <p>{data.description}</p>
            <span className="product-price">Rp.{data.price}</span>
            {/* <button className="order-button">Back</button> */}
          </div>
        </div>
      </section>
      <FooterComponent />;
    </>
  );
}
export default DetailProduct;
