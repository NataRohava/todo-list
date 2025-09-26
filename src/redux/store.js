import { configureStore } from "@reduxjs/toolkit";
import listSlice from "./listSlice.js";

const store = configureStore({
  reducer: {
    list: listSlice,
  },
});

export default store;
