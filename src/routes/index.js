import React from "react";
import { useRoutes } from "react-router-dom";

import { publicRoutes } from "./public";

export function AppRoutes() {
  // TODO: add layout for start the application
  const commonRoute = [{ path: "/", element: <div>Start</div> }];
  const element = useRoutes([...publicRoutes, ...commonRoute]);

  return element;
}
