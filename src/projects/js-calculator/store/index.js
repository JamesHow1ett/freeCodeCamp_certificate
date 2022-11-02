import { configureStore } from "@reduxjs/toolkit";
import calculatorReducer from "./calculatorReducer";

export const store = configureStore({
  reducer: {
    calculator: calculatorReducer,
  },
});
