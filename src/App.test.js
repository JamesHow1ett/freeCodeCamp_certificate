import React from "react";
import { render, screen } from "@testing-library/react";
import App from "./App";

describe("init test", () => {
  it("should render start app link", async () => {
    render(<App />);
    const linkElement = await screen.findByTestId("start-app-btn");

    expect(linkElement).toBeInTheDocument();
    expect(linkElement.textContent).toBe("Start");
    expect(linkElement.tagName.toLowerCase()).toBe("a");
  });
});
