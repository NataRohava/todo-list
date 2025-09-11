import { composeWithDevTools } from "@redux-devtools/extension";
import { combineReducers, legacy_createStore as createStore } from "redux";
import listReducer from "./reducers/listReducer";

const rootReducer = combineReducers({
  list: listReducer,
});

const store = createStore(rootReducer, composeWithDevTools());

export default store;
