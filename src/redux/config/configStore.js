import { combineReducers, configureStore } from "@reduxjs/toolkit";
import comment from "../modules/commentSlice";
import login from "../modules/loginSlice";

const rootReducer = combineReducers({
  comment,
  login,
});

const store = configureStore({ reducer: rootReducer });

export default store;
