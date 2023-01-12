import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLogin: false,
};

const login = createSlice({
  name: "login",
  initialState,
  reducers: {
    isLogin: (state) => {
      state.isLogin = true;
    },
    notLogin: (state) => {
      state.isLogin = false;
    },
  },
});

export const { isLogin, notLogin } = login.actions;
export default login.reducer;
