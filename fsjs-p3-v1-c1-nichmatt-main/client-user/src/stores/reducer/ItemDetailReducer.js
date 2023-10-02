import { PRODUCTDETAIL_FETCH } from "../actions/actionType";

const initialeState = {
  data: {},
  isLoading: false,
};

function itemDetailReducer(state = initialeState, action) {
  switch (action.type) {
    case PRODUCTDETAIL_FETCH:
      return {
        ...state,
        data: action.payload,
      };
  }
  return state;
}

export default itemDetailReducer;
