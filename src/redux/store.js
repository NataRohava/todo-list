import { legacy_createStore as createStore, combineReducers } from "redux";
import { composeWithDevTools } from "@redux-devtools/extension";
import inputTextReducer from "./reducers/inputTextReducer";
import listReducer from "./reducers/listReducer";

const rootReducer = combineReducers({
  task: inputTextReducer,
  list: listReducer,
});

const store = createStore(rootReducer, composeWithDevTools());

export default store;
