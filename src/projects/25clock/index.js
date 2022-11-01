import React from "react";
import { Provider } from "react-redux";
import ClockTimer from "./component/ClockTimer";
import { store } from "./store";

export function ClockApp() {
  return (
    <Provider store={store}>
      <ClockTimer />
    </Provider>
  );
}
