import { combineReducers, configureStore } from "@reduxjs/toolkit";
import comment from "../modules/commentSlice";

const rootReducer = combineReducers({
  comment,
});

const store = configureStore({ reducer: rootReducer });

export default store;
