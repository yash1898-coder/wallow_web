import { createSlice } from "@reduxjs/toolkit";

const UsersSlice = createSlice({
  name: "user",
  initialState: [],
  reducers: {
    ChatMeassge(state, action) {
      state.push(action.payload);
    },
  },
});
export default UsersSlice.reducer;
export const { ChatMeassge } = UsersSlice.actions;
