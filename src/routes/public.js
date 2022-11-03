import React, { Suspense } from "react";
import { Outlet } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import { lazyImport } from "../utils/lazyImport";

const { ClockApp } = lazyImport(() => import("../projects/25clock"), "ClockApp");
const { MarkdowmPreviewerApp } = lazyImport(
  () => import("../projects/markdown-previewer"),
  "MarkdowmPreviewerApp",
);
const { DrumApp } = lazyImport(() => import("../projects/drum"), "DrumApp");
const { CalculatorApp } = lazyImport(() => import("../projects/js-calculator"), "CalculatorApp");
const { QuoteApp } = lazyImport(() => import("../projects/random-quote"), "QuoteApp");

function App() {
  return (
    <MainLayout>
      <Suspense fallback={<div>Loading...</div>}>
        <Outlet />
      </Suspense>
    </MainLayout>
  );
}

export const publicRoutes = [
  {
    path: "/app",
    element: <App />,
    children: [
      { path: "/app/25-clock", element: <ClockApp /> },
      { path: "/app/markdown-previewer", element: <MarkdowmPreviewerApp /> },
      { path: "/app/drum-pad", element: <DrumApp /> },
      { path: "/app/js-calculator", element: <CalculatorApp /> },
      { path: "/app/random-quotes", element: <QuoteApp /> },
    ],
  },
];
