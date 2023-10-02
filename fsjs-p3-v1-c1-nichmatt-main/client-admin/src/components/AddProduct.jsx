import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import {
  actionAddProduct,
  actionEditProduct,
  fetchCategories,
  fetchProduct,
} from "../stores/action/actionCreator";

function AddProduct({ props }) {
  //HOOKS
  const { id: paramsId } = useParams();
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { data, isLoading } = useSelector((state) => state.category);

  const [product, setProduct] = useState({
    name: "",
    description: "",
    price: "",
    categoryId: 1,
    imgUrl: "",
  });

  const [page, setPage] = useState("AddProduct");
  const [ingredients, setIngredients] = useState([""]);

  const onChangeForm = (event) => {
    const { value, name } = event.target;

    setProduct({
      ...product,
      [name]: value,
    });
  };

  const onChangeIngredients = (event, index) => {
    const newIngredients = [...ingredients];
    newIngredients[index] = event.target.value;
    setIngredients(newIngredients);
  };

  const addProduct = (event) => {
    // event.preventDefault();
    // console.log("masuk add product di AddProduct.jsx");
    dispatch(
      actionAddProduct({
        ...product,
        ingredients,
      })
    );
    navigate("/dashboard");
  };

  const editProduct = (event) => {
    // event.preventDefault();
    // console.log(paramsId, "masuk edit product di AddProduct.jsx");
    dispatch(
      actionEditProduct(
        {
          ...product,
          ingredients,
        },
        paramsId
      )
    );
    navigate("/dashboard");
  };

  const button = props ? editProduct : addProduct;

  const addInput = (event) => {
    // console.log(event, "ini event nya");
    if (event.key === "Enter" || event.type === "click") {
      event.preventDefault();

      setIngredients([...ingredients, ""]);
    }
  };

  const removeInput = (index) => {
    const newIngredients = [...ingredients];
    newIngredients.splice(index, 1);
    setIngredients(newIngredients);
  };

  useEffect(() => {
    dispatch(fetchCategories());
    if (props) {
      // console.log(props);
      setPage("Edit Page");
      // setbutton(editProduct);
      setProduct({
        name: props[0]?.name,
        description: props[0]?.description,
        imgUrl: props[0]?.imgUrl,
        price: props[0]?.price,
        categoryId: props[0]?.categoryId,
      });
      const newIngredients = [];
      props[0]?.ingredients?.map((el) => {
        newIngredients.push(el.name);
      });
      setIngredients([...newIngredients]);
    }
  }, [props]);

  return (
    <>
      (
      <section id="AddProduct-section">
        <div id="AddProduct-container">
          <h3>{page}</h3>
          <form>
            <input
              type="text"
              name="name"
              placeholder="name"
              value={product.name}
              onChange={onChangeForm}
            />
            <input
              type="text"
              name="description"
              placeholder="description"
              value={product.description}
              onChange={onChangeForm}
            />
            <input
              type="text"
              name="imgUrl"
              placeholder="imgUrl"
              value={product.imgUrl}
              onChange={onChangeForm}
            />
            <input
              type="number"
              name="price"
              placeholder="price"
              value={product.price}
              onChange={onChangeForm}
            />

            <select
              name="categoryId"
              value={product.categoryId}
              onChange={onChangeForm}
            >
              {data.map((el) => (
                <option name="categoryId" key={el.id} value={el.id}>
                  {el.name}
                </option>
              ))}
            </select>

            {ingredients.map((el, index) => (
              <div key={index} id="ingredients-input">
                <input
                  type="text"
                  name="ingredients"
                  placeholder="ingredients"
                  value={el}
                  onChange={(event) => onChangeIngredients(event, index)}
                  onKeyDown={addInput}
                  style={{ width: ingredients.length > 1 ? "80%" : "100%" }}
                />
                {ingredients.length > 1 ? (
                  <p onClick={() => removeInput(index)}> &#10006;</p>
                ) : null}
              </div>
            ))}
            <button onClick={addInput}>+Ingeredients</button>
            <button onClick={button} type="submit">
              Submit
            </button>
          </form>
        </div>
      </section>
      )
    </>
  );
}
export default AddProduct;
