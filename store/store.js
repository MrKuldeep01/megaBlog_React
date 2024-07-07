import { configureStore } from "@reduxjs/toolkit";
import reducers from "./authSlice"
const store = configureStore({
  reducer: reducers,
});

export default store;
