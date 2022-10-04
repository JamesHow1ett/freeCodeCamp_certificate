import React from "react";
import { render, screen } from "@testing-library/react";
import App from "./App";

describe("init test", () => {
  it("should render 'Hello world' text", async () => {
    render(<App />);
    const linkElement = await screen.findByTestId("test-component");

    expect(linkElement).toBeInTheDocument();
    expect(linkElement.textContent).toBe("Hello world!");
    expect(linkElement.tagName.toLowerCase()).toBe("h1");
  });
});
