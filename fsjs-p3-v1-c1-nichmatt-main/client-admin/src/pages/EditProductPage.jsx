import { useEffect } from "react";
import AddProduct from "../components/AddProduct";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductId } from "../stores/action/actionCreator";

function EditProductPage() {
  const { id } = useParams();
  const dispatch = useDispatch();

  const { data } = useSelector((state) => state.product);

  useEffect(() => {
    // console.log(product);
    dispatch(fetchProductId(id));
    // console.log(data);
  }, []);

  // useEffect(() => {
  //   console.log(data);
  // }, [data]);
  return <AddProduct props={data} />;
  // props={product}
}

export default EditProductPage;
