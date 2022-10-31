import React from "react";
import { Provider } from "react-redux";
import MarkdowmPreviewer from "./component/MarkdowmPreviewer";
import { store } from "./store";

export function MarkdowmPreviewerApp() {
  return (
    <Provider store={store}>
      <MarkdowmPreviewer />
    </Provider>
  );
}
