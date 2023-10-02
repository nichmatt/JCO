import {
  applyMiddleware,
  combineReducers,
  legacy_createStore as createStore,
} from "redux";
import itemReducer from "./reducer/ItemReducer";
import thunk from "redux-thunk";
import categoryReducer from "./reducer/CategoryReducer";
import itemDetailReducer from "./reducer/ItemDetailReducer";

const rootReducer = combineReducers({
  item: itemReducer,
  category: categoryReducer,
  itemDetail: itemDetailReducer,
});

let store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
