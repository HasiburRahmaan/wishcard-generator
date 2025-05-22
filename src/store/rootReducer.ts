import { combineReducers } from "@reduxjs/toolkit";
import loaderReducer from "./slices/loaderSlice";
import errorReducer from "./slices/errorSlice";
const RootReducer = combineReducers({
  loader: loaderReducer,
  error: errorReducer,
})

export default RootReducer;