import { configureStore } from "@reduxjs/toolkit";

import { authenticationReducer } from "./authenticationSlice";
import { postReducer } from "./postSlice";
import { displayReducer } from "./displaySlice";

export const store = configureStore({
  reducer: {
    authentication: authenticationReducer,
    post: postReducer,
    display: displayReducer,
  },
});
