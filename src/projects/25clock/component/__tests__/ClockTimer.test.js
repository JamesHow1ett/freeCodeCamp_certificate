import React from "react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { act, render, screen, fireEvent, cleanup } from "@testing-library/react";
import ClockTimer from "../ClockTimer";
import timerReducer from "../../store/timerReducer";

describe("Clock Timer", () => {
  describe("break and session", () => {
    let store = null;

    beforeAll(() => {
      store = configureStore({
        reducer: {
          timer: timerReducer,
        },
      });
    });

    afterAll(() => {
      cleanup();
      store = null;
    });

    it.each`
      name               | testId
      ${"Label"}         | ${"break-label"}
      ${"Decrement btn"} | ${"break-decrement"}
      ${"Increment btn"} | ${"break-increment"}
      ${"Break Length"}  | ${"break-length"}
    `("should render $name in break block", async ({ testId }) => {
      render(
        <Provider store={store}>
          <ClockTimer />
        </Provider>,
      );

      const element = await screen.findByTestId(testId);

      expect(element).toBeInTheDocument();
    });

    it("click on 'increment' in break block should increment break value by 1", async () => {
      render(
        <Provider store={store}>
          <ClockTimer />
        </Provider>,
      );

      const breakIncrement = await screen.findByTestId("break-increment");
      const brealLength = await screen.findByTestId("break-length");

      // by default
      expect(brealLength).toHaveTextContent("5");

      fireEvent.click(breakIncrement);

      expect(brealLength).toHaveTextContent("6");

      fireEvent.click(breakIncrement);

      expect(brealLength).toHaveTextContent("7");
    });

    it("click on 'increment' in break block shouldn't increment break value more than 60", async () => {
      render(
        <Provider store={store}>
          <ClockTimer />
        </Provider>,
      );

      const breakIncrement = await screen.findByTestId("break-increment");
      const brealLength = await screen.findByTestId("break-length");

      for (let i = 1; i < 70; i += 1) {
        fireEvent.click(breakIncrement);
      }

      expect(brealLength).toHaveTextContent("60");
    });

    it("click on 'decrement' in break block should decrement break value by 1", async () => {
      render(
        <Provider store={store}>
          <ClockTimer />
        </Provider>,
      );

      const breakDecrement = await screen.findByTestId("break-decrement");
      const brealLength = await screen.findByTestId("break-length");

      fireEvent.click(breakDecrement);

      expect(brealLength).toHaveTextContent("59");
    });

    it("click on 'decrement' in break block shouldn't decrement break value less than 1", async () => {
      render(
        <Provider store={store}>
          <ClockTimer />
        </Provider>,
      );

      const breakDecrement = await screen.findByTestId("break-decrement");
      const brealLength = await screen.findByTestId("break-length");

      for (let i = 1; i < 70; i += 1) {
        fireEvent.click(breakDecrement);
      }

      expect(brealLength).toHaveTextContent("1");
    });

    it.each`
      name                | testId
      ${"Label"}          | ${"session-label"}
      ${"Increment btn"}  | ${"session-increment"}
      ${"Decrement btn"}  | ${"session-decrement"}
      ${"Session Length"} | ${"session-length"}
    `("should render $name in session block", async ({ testId }) => {
      render(
        <Provider store={store}>
          <ClockTimer />
        </Provider>,
      );

      const element = await screen.findByTestId(testId);

      expect(element).toBeInTheDocument();
    });

    it("click on 'increment' in session block should increment session value by 1", async () => {
      render(
        <Provider store={store}>
          <ClockTimer />
        </Provider>,
      );

      const sessionIncrement = await screen.findByTestId("session-increment");
      const sessionLength = await screen.findByTestId("session-length");

      // by default
      expect(sessionLength).toHaveTextContent("25");

      fireEvent.click(sessionIncrement);

      expect(sessionLength).toHaveTextContent("26");

      fireEvent.click(sessionIncrement);

      expect(sessionLength).toHaveTextContent("27");
    });

    it("click on 'increment' in break session shouldn't increment session value more than 60", async () => {
      render(
        <Provider store={store}>
          <ClockTimer />
        </Provider>,
      );

      const sessionIncrement = await screen.findByTestId("session-increment");
      const sessionLength = await screen.findByTestId("session-length");

      for (let i = 0; i < 70; i += 1) {
        fireEvent.click(sessionIncrement);
      }

      expect(sessionLength).toHaveTextContent("60");
    });

    it("click on 'decrement' in break session should decrement session value by 1", async () => {
      render(
        <Provider store={store}>
          <ClockTimer />
        </Provider>,
      );

      const sessionDecrement = await screen.findByTestId("session-decrement");
      const sessionLength = await screen.findByTestId("session-length");

      fireEvent.click(sessionDecrement);

      expect(sessionLength).toHaveTextContent("59");
    });

    it("click on 'decrement' in break session shouldn't decrement session value less than 1", async () => {
      render(
        <Provider store={store}>
          <ClockTimer />
        </Provider>,
      );

      const sessionDecrement = await screen.findByTestId("session-decrement");
      const sessionLength = await screen.findByTestId("session-length");

      for (let i = 0; i < 70; i += 1) {
        fireEvent.click(sessionDecrement);
      }

      expect(sessionLength).toHaveTextContent("1");
    });
  });

  describe("timer", () => {
    let store = null;
    let HTMLMediaElementPrototypePause = null;

    beforeAll(() => {
      jest.useFakeTimers();

      store = configureStore({
        reducer: {
          timer: timerReducer,
        },
      });

      HTMLMediaElementPrototypePause = HTMLMediaElement.prototype.pause;
      Object.defineProperty(HTMLMediaElement.prototype, "pause", {
        value: jest.fn(),
      });
    });

    afterAll(() => {
      store = null;
      Object.defineProperty(HTMLMediaElement.prototype, "pause", {
        value: HTMLMediaElementPrototypePause,
      });
      jest.resetAllMocks();
    });

    it("should start/stop timer by click on 'play/pause' btn", async () => {
      render(
        <Provider store={store}>
          <ClockTimer />
        </Provider>,
      );

      const startStopBtn = await screen.findByTestId("start_stop");
      const timeLeft = await screen.findByTestId("time-left");

      // by default
      expect(timeLeft).toHaveTextContent("25:00");

      fireEvent.click(startStopBtn);

      act(() => {
        jest.advanceTimersByTime(1000);
      });

      expect(timeLeft).toHaveTextContent("24:59");

      act(() => {
        jest.advanceTimersByTime(1000);
      });

      expect(timeLeft).toHaveTextContent("24:58");

      fireEvent.click(startStopBtn);

      act(() => {
        jest.advanceTimersByTime(1000);
      });

      expect(timeLeft).toHaveTextContent("24:58");
    });

    it("should refresh timer to initial values by click on 'refresh' btn", async () => {
      render(
        <Provider store={store}>
          <ClockTimer />
        </Provider>,
      );

      const refreshBtn = await screen.findByTestId("reset");
      const timeLeft = await screen.findByTestId("time-left");

      // depends on the previous test
      expect(timeLeft).toHaveTextContent("24:58");

      fireEvent.click(refreshBtn);

      expect(timeLeft).toHaveTextContent("25:00");
    });
  });
});
