import { CATEGORY_FETCH, PRODUCTDETAIL_FETCH } from "../actions/actionType";

const initialeState = {
  category: [],
  isLoading: false,
};

function categoryReducer(state = initialeState, action) {
  switch (action.type) {
    case CATEGORY_FETCH:
      return {
        ...state,
        category: action.payload,
      };
  }

  return state;
}

export default categoryReducer;
