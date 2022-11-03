import React from "react";
import { Provider } from "react-redux";
import { store } from "./store";
import QuoteMachine from "./components/QuoteMachine";

export function QuoteApp() {
  return (
    <Provider store={store}>
      <QuoteMachine />
    </Provider>
  );
}
