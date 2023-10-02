import {
  LOADING_TAB,
  PRODUCTID_FETCH,
  PRODUCT_FETCH,
} from "../action/actionType";

const initialState = {
  data: [],
  isLoading: false,
};

const productReducer = (state = initialState, action) => {
  switch (action.type) {
    case PRODUCT_FETCH:
      console.log(action.payload, "payload dari poductReducer");
      return {
        ...state,
        data: action.payload,
      };
    case PRODUCTID_FETCH:
      console.log(action.payload, "payload dari poductReducer");
      return {
        ...state,
        data: [action.payload],
      };
    case LOADING_TAB:
      return {
        ...state,
        isLoading: action.payload,
      };
  }
  return state;
};

export default productReducer;
