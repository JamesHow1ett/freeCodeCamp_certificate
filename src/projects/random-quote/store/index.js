import { configureStore } from "@reduxjs/toolkit";
import quoteReducer from "./quoteReducer";

export const store = configureStore({
  reducer: {
    quote: quoteReducer,
  },
});
