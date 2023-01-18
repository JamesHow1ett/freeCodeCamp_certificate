import React from "react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { render, screen, fireEvent, cleanup, within } from "@testing-library/react";
import DrumPad from "../DrumPad";
import drumReducer from "../../store/drumReducer";

describe("Drum Pad", () => {
  let store = null;
  let HTMLMediaElementPrototypePlay = null;
  const mockPlay = jest.fn();

  beforeEach(() => {
    store = configureStore({
      reducer: {
        drum: drumReducer,
      },
    });

    HTMLMediaElementPrototypePlay = HTMLMediaElement.prototype.play;
    Object.defineProperty(HTMLMediaElement.prototype, "play", {
      value: mockPlay,
    });
  });

  afterEach(() => {
    cleanup();
    store = null;
    Object.defineProperty(HTMLMediaElement.prototype, "play", {
      value: HTMLMediaElementPrototypePlay,
    });
    jest.resetAllMocks();
  });

  it("click on 'power on/off' should toggle power on/off title", async () => {
    render(
      <Provider store={store}>
        <DrumPad />
      </Provider>,
    );

    const powerOnOffButton = await screen.findByTestId("power-on");
    const powerOnOffTitle = await screen.findByTestId("power-on-title");

    expect(powerOnOffTitle).toHaveTextContent("Powered On");

    fireEvent.click(powerOnOffButton);

    expect(powerOnOffTitle).toHaveTextContent("Powered Off");

    fireEvent.click(powerOnOffButton);

    expect(powerOnOffTitle).toHaveTextContent("Powered On");
  });

  it("should update volume value by change volume input", async () => {
    render(
      <Provider store={store}>
        <DrumPad />
      </Provider>,
    );

    const volumeValue = await screen.findByTestId("volume-value");
    const volumeRange = await screen.findByTestId("volume");

    expect(volumeValue).toHaveTextContent("0.3");

    fireEvent.change(volumeRange, { target: { value: 0.4 } });

    expect(volumeValue).toHaveTextContent("0.4");
  });

  it("should show on display information which btn was clicked", async () => {
    render(
      <Provider store={store}>
        <DrumPad />
      </Provider>,
    );

    const display = await screen.findByTestId("display");
    const padWrapper = await screen.findByTestId("pad-wrapper");

    expect(display).toHaveTextContent("");

    fireEvent.click(within(padWrapper).getByText("Q"));

    expect(display).toHaveTextContent("Heater 1");

    fireEvent.click(within(padWrapper).getByText("W"));

    expect(display).toHaveTextContent("Heater 2");
  });

  it("should show on display information which btn was clicked by keybord press up", async () => {
    render(
      <Provider store={store}>
        <DrumPad />
      </Provider>,
    );

    const display = await screen.findByTestId("display");

    expect(display).toHaveTextContent("");

    fireEvent.keyUp(window, { key: "Q" });

    expect(display).toHaveTextContent("Heater 1");

    fireEvent.keyUp(window, { key: "W" });

    expect(display).toHaveTextContent("Heater 2");
  });

  it("should play audio on click btn's and keyUp events", async () => {
    render(
      <Provider store={store}>
        <DrumPad />
      </Provider>,
    );

    const padWrapper = await screen.findByTestId("pad-wrapper");

    expect(mockPlay).not.toHaveBeenCalled();

    fireEvent.click(within(padWrapper).getByText("Q"));

    expect(mockPlay).toHaveBeenCalledTimes(1);

    fireEvent.click(within(padWrapper).getByText("W"));

    expect(mockPlay).toHaveBeenCalledTimes(2);

    fireEvent.keyUp(window, { key: "E" });

    expect(mockPlay).toHaveBeenCalledTimes(3);
  });
});
