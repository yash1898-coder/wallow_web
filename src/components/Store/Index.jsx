import { configureStore } from "@reduxjs/toolkit";
import UserSlice from "../../components/Store/Slice/UserSlice";

const Store = configureStore({
  reducer: {
    users: UserSlice,
  },
});

export default Store;
