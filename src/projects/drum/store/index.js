import { configureStore } from "@reduxjs/toolkit";
import drumReducer from "./drumReducer";

export const store = configureStore({
  reducer: {
    drum: drumReducer,
  },
});
