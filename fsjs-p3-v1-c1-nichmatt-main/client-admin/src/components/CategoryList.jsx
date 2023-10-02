import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import "../App.css";
import { useNavigate } from "react-router-dom";
import {
  deleteCategory,
  fetchCategories,
} from "../stores/action/actionCreator";
import Loading from "./Loading";
import Swal from "sweetalert2";

function CategoryList() {
  // const [categories, setCategories] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { data, isLoading } = useSelector((state) => state.category);
  // console.log(data);

  const deleteClick = (id) => {
    // console.log(id, "<<masuk deleted id");
    Swal.fire({
      title: "Do you want to delete category with id" + id,
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: "Delete",
      denyButtonText: `Don't`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        dispatch(deleteCategory(id));
        Swal.fire("Deleted!", "", "success");
      } else if (result.isDenied) {
        Swal.fire("Changes are not saved", "", "info");
      }
    });
  };

  // FETCH DATA REDUX //
  useEffect(() => {
    dispatch(fetchCategories());
  }, []);
  // END OF FETCH DATA REDUX //

  // console.log(categories);
  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <div id="category-list">
          <div id="category-list-headers">
            <h1>Category List</h1>
            <button onClick={() => navigate("/addCategory")}>
              Create Category
            </button>
          </div>
          <div id="categorylist">
            <table>
              <thead>
                <tr>
                  <th>NO</th>
                  <th>NAME</th>
                  <th>CREATED AT</th>
                  <th>UPDATED AT</th>
                  <th>ACTION</th>
                </tr>
              </thead>
              <tbody>
                {data.map((el, number) => (
                  <tr key={el.id}>
                    <td>{number + 1}</td>
                    <td>{el.name}</td>
                    <td>{el.createdAt}</td>
                    <td>{el.updatedAt}</td>
                    <td>
                      <button onClick={() => deleteClick(el.id)}>delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </>
  );
}

export default CategoryList;
