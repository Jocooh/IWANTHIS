import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  comments: [],
};

const example = createSlice({
  name: "comment",
  initialState,
  reducers: {
    getComments: (state, action) => {
      state.comments = action.payload;
    },
    addComments: (state, action) => {
      console.log(action.payload);
      state.comments.push(action.payload);
    },
  },
});

export const { getComments, addComments } = example.actions;
export default example.reducer;
