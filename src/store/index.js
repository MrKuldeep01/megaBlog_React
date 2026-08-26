import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";

// NOTE: the auth reducer is the entire root reducer (state is flat:
// state.status / state.userData), not namespaced under state.auth.
// See hooks/useAuthStatus.js — components should read auth state through
// that hook rather than depending on this shape directly.
const store = configureStore({
  reducer: authReducer,
});

export default store;
