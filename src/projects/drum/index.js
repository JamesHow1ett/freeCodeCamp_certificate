import React from "react";
import { Provider } from "react-redux";
import DrumPad from "./components/DrumPad";
import { store } from "./store";

export function DrumApp() {
  return (
    <Provider store={store}>
      <DrumPad />
    </Provider>
  );
}
