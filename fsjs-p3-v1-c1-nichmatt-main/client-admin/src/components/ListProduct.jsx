import { useEffect, useState } from "react";
import useFetch from "../hooks/useFetch";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Loading from "./Loading";
import {
  actionDeleteProduct,
  actionEditProduct,
  fetchProduct,
} from "../stores/action/actionCreator";
import Swal from "sweetalert2";

function ListProduct() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const namapath = pathname;

  const { data, isLoading } = useSelector((state) => {
    return state.product;
  });

  const editProduct = (id) => {
    // console.log(id, "<<<< id dari edit product");
    event.preventDefault();
    navigate("/editProduct/" + id);
  };
  const deleteProduct = (id) => {
    // console.log(id, "<<<< id dari edit product");
    event.preventDefault();
    Swal.fire({
      title: "Do you want to delete product with id" + id,
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: "Delete",
      denyButtonText: `Don't`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        dispatch(actionDeleteProduct(id));

        Swal.fire("Deleted!", "", "success");
      } else if (result.isDenied) {
        Swal.fire("Changes are not saved", "", "info");
      }
      navigate("/");
    });
  };

  useEffect(() => {
    dispatch(fetchProduct());
    // console.log(location.pathname);
  }, [namapath]);

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <section id="ListProduct-section">
          <div id="ListProduct-container">
            <div id="ListProduct-heading">
              <h3>List Product</h3>
              <button
                onClick={() => {
                  navigate("/addProduct");
                }}
              >
                Add Product
              </button>
            </div>
            <div id="List-product-table">
              <table>
                <thead>
                  <tr>
                    <th>NO</th>
                    <th>NAME</th>
                    <th>CATEGORY</th>
                    <th>PRICE</th>
                    <th>CREATED BY</th>
                    <th>INGREDIENTS</th>
                    <th>IMAGES</th>
                    <th>ACTION</th>
                  </tr>
                </thead>
                <tbody>
                  {data?.map((el, no) => {
                    return (
                      <tr key={el.id}>
                        <td>{no + 1}</td>
                        <td>{el?.name}</td>
                        <td>{el.Category?.name}</td>
                        <td>{el.price}</td>
                        <td>{el.User?.username}</td>
                        <td>
                          <button
                            onClick={() => {
                              navigate("/ingredients/" + el.id);
                            }}
                          >
                            show
                          </button>
                        </td>
                        <td>
                          <img src={el.imgUrl} alt="" />
                        </td>
                        <td>
                          <button onClick={(event) => editProduct(el.id)}>
                            edit
                          </button>
                          <button onClick={(event) => deleteProduct(el.id)}>
                            deleted
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      )}
    </>
  );
}

export default ListProduct;
