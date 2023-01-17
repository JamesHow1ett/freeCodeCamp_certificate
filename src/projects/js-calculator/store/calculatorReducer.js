import { createSlice } from "@reduxjs/toolkit";
import { INITIAL_STATE, DIVIDE_TO_ZERO_ERROR_TEXT } from "./utils/constants";
import { calculate, isOperator, isNumber, invertNumber } from "../calculator/calculator";

const calculatorSlice = createSlice({
  name: "calculator",
  initialState: INITIAL_STATE,
  reducers: {
    clearState(state) {
      Object.assign(state, INITIAL_STATE);
    },
    setInput(state, action) {
      const char = action.payload;

      if (state.isCalculated && isOperator(char)) {
        state.expression.push(parseFloat(state.display));
        state.input = state.display.concat(char);
        state.display = char;
        state.isCalculated = false;

        return;
      }

      if (state.isCalculated) {
        state.input = char;
        state.display = char;
        state.isCalculated = false;

        return;
      }

      if (!state.input && isOperator(char)) {
        return;
      }

      if (state.display === "0" && char === "0") {
        return;
      }

      if (char === "." && !state.input) {
        state.input = "0.";
        state.display = state.display.concat(char);

        return;
      }

      if (char === "." && state.display.includes(".")) {
        return;
      }

      if (char === "." && !state.display.includes(".")) {
        state.input = state.input.concat(char);
        state.display = state.display.concat(char);

        return;
      }

      if (isNumber(char) && isOperator(state.display)) {
        if (state.input.at(-1) === "-" && isOperator(state.input.at(-2))) {
          state.expression.push(state.input.at(-2));
        } else {
          state.expression.push(state.display);
        }
        state.input = state.input.concat(char);
        state.display = char;

        return;
      }

      if (isOperator(char) && isOperator(state.display)) {
        state.input = state.input.concat(char);
        state.display = char;

        if (char === "-") {
          state.shouldInvertNextNum = true;
        } else {
          state.shouldInvertNextNum = false;
        }
      }

      if (isNumber(char) && isNumber(state.display)) {
        state.input = state.input.concat(char);

        if (state.display === "0" && char !== "0") {
          state.display = char;
        } else {
          state.display = state.display.concat(char);
        }
      }

      if (isOperator(char) && isNumber(state.display)) {
        if (state.shouldInvertNextNum) {
          state.expression.push(invertNumber(parseFloat(state.display)));
          state.shouldInvertNextNum = false;
        } else {
          state.expression.push(parseFloat(state.display));
        }
        state.input = state.input.concat(char);
        state.display = char;
      }
    },
    calculateExpression(state) {
      if (isNumber(state.display)) {
        if (state.shouldInvertNextNum) {
          state.expression.push(invertNumber(parseFloat(state.display)));
        } else {
          state.expression.push(parseFloat(state.display));
        }
      }

      try {
        const result = calculate(state.expression);

        state.display = result.toString();
        state.input = state.input.concat(`=${result}`);
        state.shouldInvertNextNum = false;
        state.expression = [];
      } catch (error) {
        state.display = error.message;
        state.input = DIVIDE_TO_ZERO_ERROR_TEXT;
      } finally {
        state.isCalculated = true;
      }
    },
  },
});

export const { clearState, setInput, calculateExpression } = calculatorSlice.actions;

export default calculatorSlice.reducer;
