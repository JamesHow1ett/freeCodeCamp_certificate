import React from "react";
import { Provider } from "react-redux";
import Calculator from "./components/Calculator";
import { store } from "./store";

export function CalculatorApp() {
  return (
    <Provider store={store}>
      <Calculator />
    </Provider>
  );
}
