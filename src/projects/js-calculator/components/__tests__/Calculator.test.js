import React from "react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { render, screen, fireEvent, cleanup } from "@testing-library/react";
import Calculator, { defaultBtnClasses } from "../Calculator";
import calculatorReducer from "../../store/calculatorReducer";

describe("Calculator", () => {
  let store = null;

  beforeEach(() => {
    store = configureStore({
      reducer: {
        calculator: calculatorReducer,
      },
    });
  });

  afterEach(() => {
    cleanup();
    store = null;
  });

  it("all btn's should have save default class names", async () => {
    render(
      <Provider store={store}>
        <Calculator />
      </Provider>,
    );

    const buttons = await screen.findAllByRole("button");

    const EXPECTED_BUTTONS = 17;
    expect(buttons).toHaveLength(EXPECTED_BUTTONS);

    buttons.forEach((button) => {
      expect(button.className).toContain(defaultBtnClasses);
    });
  });

  it("should show '0' in display by default", async () => {
    render(
      <Provider store={store}>
        <Calculator />
      </Provider>,
    );

    const display = await screen.findByTestId("display");

    expect(display).toHaveTextContent("0");
  });

  it("click on '.' button should add only one decimal point", async () => {
    render(
      <Provider store={store}>
        <Calculator />
      </Provider>,
    );

    const display = await screen.findByTestId("display");
    const buttonOne = await screen.findByTestId("one");
    const decimal = await screen.findByTestId("decimal");

    expect(display).toHaveTextContent("0");

    fireEvent.click(buttonOne);

    expect(display).toHaveTextContent("1");

    fireEvent.click(decimal);

    expect(display).toHaveTextContent("1.");

    fireEvent.click(buttonOne);

    expect(display).toHaveTextContent("1.1");

    fireEvent.click(decimal);

    expect(display).toHaveTextContent("1.1");
  });

  describe("calculator operations", () => {
    const calulatorStore = configureStore({
      reducer: {
        calculator: calculatorReducer,
      },
    });

    it("btn's click should update display and input row value", async () => {
      render(
        <Provider store={calulatorStore}>
          <Calculator />
        </Provider>,
      );

      const inputRow = await screen.findByTestId("input-row");
      const display = await screen.findByTestId("display");
      const buttonOne = await screen.findByTestId("one");
      const buttonTwo = await screen.findByTestId("two");
      const addOperator = await screen.findByTestId("add");
      const divideOperator = await screen.findByTestId("divide");

      expect(inputRow).toHaveTextContent("");
      expect(display).toHaveTextContent("0");

      fireEvent.click(buttonOne);

      expect(inputRow).toHaveTextContent("1");
      expect(display).toHaveTextContent("1");

      fireEvent.click(buttonOne);

      expect(inputRow).toHaveTextContent("11");
      expect(display).toHaveTextContent("11");

      fireEvent.click(buttonTwo);

      expect(inputRow).toHaveTextContent("112");
      expect(display).toHaveTextContent("112");

      fireEvent.click(addOperator);

      expect(inputRow).toHaveTextContent("112+");
      expect(display).toHaveTextContent("+");

      fireEvent.click(buttonTwo);

      expect(inputRow).toHaveTextContent("112+2");
      expect(display).toHaveTextContent("2");

      fireEvent.click(divideOperator);

      expect(inputRow).toHaveTextContent("112+2/");
      expect(display).toHaveTextContent("/");

      fireEvent.click(buttonTwo);

      expect(inputRow).toHaveTextContent("112+2/2");
      expect(display).toHaveTextContent("2");
    });

    it("should calculated input row and show result in input row and display on click 'equals' btn", async () => {
      render(
        <Provider store={calulatorStore}>
          <Calculator />
        </Provider>,
      );

      const inputRow = await screen.findByTestId("input-row");
      const display = await screen.findByTestId("display");
      const equals = await screen.findByTestId("equals");

      fireEvent.click(equals);

      expect(inputRow).toHaveTextContent("112+2/2=113");
      expect(display).toHaveTextContent("113");
    });

    it("should cleared state on click 'clear' btn", async () => {
      render(
        <Provider store={calulatorStore}>
          <Calculator />
        </Provider>,
      );

      const inputRow = await screen.findByTestId("input-row");
      const display = await screen.findByTestId("display");
      const clear = await screen.findByTestId("clear");

      fireEvent.click(clear);

      expect(inputRow).toHaveTextContent("");
      expect(display).toHaveTextContent("0");
    });
  });
});
