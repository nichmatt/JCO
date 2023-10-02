import { PRODUCTDETAIL_FETCH, PRODUCT_FETCH } from "../actions/actionType";

const initialeState = {
  data: [],
  isLoading: false,
};

function itemReducer(state = initialeState, action) {
  switch (action.type) {
    case PRODUCT_FETCH:
      return {
        ...state,
        data: action.payload,
      };
  }
  return state;
}

export default itemReducer;
