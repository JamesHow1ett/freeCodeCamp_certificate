import { configureStore } from "@reduxjs/toolkit";
import timerReducer from "../features/timer";

export const store = configureStore({
  reducer: {
    timer: timerReducer,
  },
});
