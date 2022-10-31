import { configureStore } from "@reduxjs/toolkit";
import timerReducer from "./timerReducer";

export const store = configureStore({
  reducer: {
    timer: timerReducer,
  },
});
