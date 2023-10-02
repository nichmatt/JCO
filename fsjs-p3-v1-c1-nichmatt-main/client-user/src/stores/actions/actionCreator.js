import {
  PRODUCT_FETCH,
  CATEGORY_FETCH,
  PRODUCTDETAIL_FETCH,
} from "./actionType";

// const API_URL = "https://nickmat.rahmath.my.id";
const API_URL = "http://localhost:3000";

export function fetchItem() {
  return async (dispatch, getState) => {
    try {
      const response = await fetch(API_URL + "/items");
      const responseJson = await response.json();
      //   console.log(responseJson, "ini responjson nya");

      dispatch({
        type: PRODUCT_FETCH,
        payload: responseJson,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export function fetchItemCategory(id) {
  return async (dispatch, getState) => {
    try {
      const response = await fetch(API_URL + "/items?categoryId=" + id);
      const responseJson = await response.json();
      //   console.log(responseJson, "ini responjson nya");

      dispatch({
        type: PRODUCT_FETCH,
        payload: responseJson,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export function readItemDetail(id) {
  return async (dispatch, getState) => {
    try {
      const response = await fetch(API_URL + "/items/" + id);
      const responseJson = await response.json();
      console.log(responseJson, "ini responjson nya");

      dispatch({
        type: PRODUCTDETAIL_FETCH,
        payload: responseJson,
      });
      //   console.log(id, "dari read item detail");
    } catch (error) {
      console.log(error);
    }
  };
}

export function fetchCategory() {
  return async (dispatch, getState) => {
    try {
      const response = await fetch(API_URL + "/categories");
      const responseJson = await response.json();
      console.log(responseJson, "ini responjson nya");

      dispatch({
        type: CATEGORY_FETCH,
        payload: responseJson,
      });
    } catch (error) {
      console.log(error);
    }
  };
}
