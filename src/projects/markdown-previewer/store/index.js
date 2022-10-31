import { configureStore } from "@reduxjs/toolkit";
import markdownReducer from "./markdownReducer";

export const store = configureStore({
  reducer: {
    markdown: markdownReducer,
  },
});
