import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  examples: "",
};

const example = createSlice({
  name: "test",
  initialState,
  reducers: {
    testtest: (state, action) => {
      state.examples = action.payload;
    },
  },
});

export const { testtest } = example.actions;
export default example.reducer;
