import { redirect } from "react-router-dom";
import AddProduct from "../../components/AddProduct";
// import { API_URL } from "../../config/api";
import {
  CATEGORY_FETCH,
  LOADING_TAB,
  PRODUCTID_FETCH,
  PRODUCT_FETCH,
} from "./actionType";
import Swal from "sweetalert2";

// const API_URL = "https://nickmat.rahmath.my.id";
const API_URL = "http://localhost:3000";

//HANDLE LOADING

export const fetchLoading = (payload) => {
  return {
    type: LOADING_TAB,
    payload,
  };
};

//HANDLE READ CATEGORY
export function fetchCategories() {
  return async (dispatch, getState) => {
    try {
      dispatch(fetchLoading(true));
      const response = await fetch(API_URL + "/categories");
      const responseJson = await response.json();
      dispatch({
        type: CATEGORY_FETCH,
        payload: responseJson,
      });
    } catch (error) {
      throw error;
      console.log(error);
    } finally {
      dispatch(fetchLoading(false));
    }
  };
}

//HANDLE ADD CATEGORY
export function addCategory(payload) {
  return async (dispatch, getState) => {
    try {
      const response = await fetch(API_URL + "/categories", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          access_token: localStorage.access_token,
        },
        body: JSON.stringify(payload),
      });
      const responseJson = await response.json();
      console.log(responseJson);
      if (responseJson.statusCode >= 400) {
        throw { message: responseJson.message };
      }
      Swal.fire(responseJson.message, "success");
      dispatch(fetchCategories());
    } catch (error) {
      Swal.fire(error.message);
      throw error;
    }
  };
}

//HANDLE DELETE CATEGORY
export function deleteCategory(id) {
  return async (dispatch, getState) => {
    try {
      const response = await fetch(API_URL + "/categories/" + id, {
        method: "delete",
        headers: {
          "Content-Type": "application/json",
          access_token: localStorage.access_token,
        },
      });
      const responseJson = await response.json();
      console.log(responseJson);
      if (responseJson.statusCode >= 400) {
        throw { message: responseJson.message };
      }
      Swal.fire(responseJson.message, "success");
      dispatch(fetchCategories());
    } catch (error) {
      Swal.fire(error.message);
      throw error;
    }
  };
}

//HANDLE READ PRODUCT
export function fetchProduct() {
  return async (dispatch, getState) => {
    try {
      dispatch(fetchLoading(true));
      const response = await fetch(API_URL + "/Items");
      const responseJson = await response.json();
      dispatch({
        type: PRODUCT_FETCH,
        payload: responseJson,
      });
    } catch (error) {
      throw error;
    } finally {
      dispatch(fetchLoading(false));
    }
  };
}
//HANDLE READ PRODUCT By ID
export function fetchProductId(id) {
  console.log("masuk fetchProduct ID");
  return async (dispatch, getState) => {
    try {
      dispatch(fetchLoading(true));
      const response = await fetch(API_URL + "/items/" + id, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          access_token: localStorage.access_token,
        },
      });
      const responseJson = await response.json();
      dispatch({
        type: PRODUCTID_FETCH,
        payload: responseJson,
      });
    } catch (error) {
      throw error;
    } finally {
      dispatch(fetchLoading(false));
    }
  };
}

// HANDLE ADD PRODUCT
export function actionAddProduct(payload) {
  return async (dispatch, getState) => {
    try {
      const response = await fetch(API_URL + "/items", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          access_token: localStorage.access_token,
        },
        body: JSON.stringify({
          ...payload,
          createdAt: new Date(),
          updatedAt: new Date(),
        }),
      });
      const responseJson = await response.json();
      if (responseJson.statusCode >= 400) {
        throw { message: responseJson.message };
      }
      Swal.fire(responseJson.message, "success");
      dispatch(fetchProduct());
    } catch (error) {
      Swal.fire(error.message, "failed");
      throw error;
    }
  };
}

// HANDLE EDIT PRODUCT
export function actionEditProduct(payload, id) {
  console.log(payload, "masuk editproduct di action creator");
  return async (dispatch, getState) => {
    try {
      const response = await fetch(API_URL + "/items/edit/" + id, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          access_token: localStorage.access_token,
        },
        body: JSON.stringify({
          ...payload,
        }),
      });
      const responseJson = await response.json();
      if (responseJson.statusCode >= 400) {
        throw { message: responseJson.message };
      }
      Swal.fire(responseJson.message, "success");
      dispatch(fetchProduct());
    } catch (error) {
      console.log(error);
      Swal.fire(error, "failed");
      throw error;
    }
  };
}

// HANDLE DELETE PRODUCT
export function actionDeleteProduct(id) {
  console.log("masuk DELETEproduct di action creator");
  return async (dispatch, getState) => {
    try {
      const response = await fetch(API_URL + "/items/" + id, {
        method: "delete",
        headers: {
          "Content-Type": "application/json",
          access_token: localStorage.access_token,
        },
      });
      dispatch(fetchProduct());
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
}

// HANDLE REGISTER ADMIN

export function actionRegisterAdmin(payload) {
  return async (dispatch, getState) => {
    try {
      const response = await fetch(API_URL + "/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          access_token: localStorage.access_token,
        },
        body: JSON.stringify(payload),
      });
      const responseJson = await response.json();
      console.log(responseJson, "<< ini responseJson nya");
      if (responseJson.statusCode >= 400) {
        throw { message: responseJson.message };
      }

      Swal.fire(
        `${responseJson.username} has been registered as a ${responseJson.role}`,
        "success"
      );
    } catch (error) {
      console.log(error);
      Swal.fire(`${error.message}`, "failed");
    }
  };
}

// HANDLE LOGIN ADMIN

export function actionLoginAdmin(payload) {
  return async (dispatch, getState) => {
    try {
      const response = await fetch(API_URL + "/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // access_token: localStorage.access_token,
        },
        body: JSON.stringify(payload),
      });
      const responseJson = await response.json();
      // console.log(responseJson, "<< ini responseJson nya");
      if (responseJson.statusCode >= 400) {
        throw { message: responseJson.message };
      }

      responseJson.access_token
        ? localStorage.setItem("access_token", responseJson.access_token)
        : null;
      responseJson.username
        ? localStorage.setItem("username", responseJson.username)
        : null;
      responseJson.email
        ? localStorage.setItem("email", responseJson.email)
        : null;
      responseJson.role
        ? localStorage.setItem("role", responseJson.role)
        : null;

      Swal.fire(`Hi ${responseJson.username}`, "success");
      return redirect("/");
    } catch (error) {
      console.log(error.message, "ini error message nya");
      Swal.fire(error.message, "failed");
    }
  };
}
