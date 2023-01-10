import React from "react";
import { useRoutes, Link } from "react-router-dom";

import { publicRoutes } from "./public";

export function AppRoutes() {
  // TODO: add layout for start the application
  const commonRoutes = [
    {
      path: "/",
      element: (
        <div>
          <Link to="/app" data-testid="start-app-btn">
            Start
          </Link>
        </div>
      ),
    },
  ];
  const element = useRoutes([...publicRoutes, ...commonRoutes]);

  return element;
}
