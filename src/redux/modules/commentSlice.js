import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  id: 0,
  isEdit: false,
};

const comment = createSlice({
  name: "comment",
  initialState,
  reducers: {
    onEdit: (state, action) => {
      state.id = action.payload;
      state.isEdit = true;
    },
    offEdit: (state) => {
      state.id = 0;
      state.isEdit = false;
    },
  },
});

export const { onEdit, offEdit } = comment.actions;
export default comment.reducer;
