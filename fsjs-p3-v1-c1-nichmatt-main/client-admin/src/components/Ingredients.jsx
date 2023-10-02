import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { fetchProduct, fetchProductId } from "../stores/action/actionCreator";

function Ingredients() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  const { data } = useSelector((state) => state.product);

  const back = (event) => {
    event.preventDefault();
    fetchProduct();
    navigate("/dashboard");
  };

  useEffect(() => {
    // console.log(id);
    dispatch(fetchProductId(id));
    // console.log(data);
  }, []);
  return (
    <section id="SectionIngredients">
      <div id="IngredientsContainer">
        <img src={data[0]?.imgUrl} alt="" />
        <h3>{data[0]?.name}</h3>
        {data[0]?.ingredients?.map((el) => {
          return (
            <ul>
              <li>{el?.name}</li>
            </ul>
          );
        })}
        <button onClick={back}>Back</button>
      </div>
    </section>
  );
}
export default Ingredients;
