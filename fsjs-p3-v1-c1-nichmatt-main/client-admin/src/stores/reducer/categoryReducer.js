import { CATEGORY_FETCH, LOADING_TAB } from "../action/actionType";

const initialState = {
  data: [],
  isLoading: false,
};

const categoryReducer = (state = initialState, action) => {
  switch (action.type) {
    case CATEGORY_FETCH:
      return {
        ...state,
        data: action.payload,
      };
    case LOADING_TAB:
      return {
        ...state,
        isLoading: action.payload,
      };
  }
  return state;
};

export default categoryReducer;
