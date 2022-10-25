/* eslint-disable no-param-reassign */
import { createSlice } from "@reduxjs/toolkit";
import { timeLeftParser } from "./utils";
import { SESSION_TITLE, BREAK_TITLE, INITIAL_STATE } from "./constants";

const timerSlice = createSlice({
  name: "timer",
  initialState: INITIAL_STATE,
  reducers: {
    decrementBreakLength(state) {
      if (state.isRunning) {
        return;
      }

      if (state.breakLength === 1) {
        state.breakLength = 1;
        return;
      }

      state.breakLength -= 1;
      state.timeLeft.seconds = 0;
    },
    incrementBreakLength(state) {
      if (state.isRunning) {
        return;
      }

      state.breakLength += 1;
      state.timeLeft.seconds = 0;
    },
    decrementSessionLength(state) {
      if (state.isRunning) {
        return;
      }

      if (state.sessionLength === 1) {
        state.sessionLength = 1;
        return;
      }

      state.sessionLength -= 1;

      state.timeLeft.minutes = state.sessionLength;
      state.timeLeft.seconds = 0;

      state.timeLeftParsed = timeLeftParser(state.timeLeft);
    },
    incrementSessionLength(state) {
      if (state.isRunning) {
        return;
      }

      state.sessionLength += 1;

      state.timeLeft.minutes = state.sessionLength;
      state.timeLeft.seconds = 0;

      state.timeLeftParsed = timeLeftParser(state.timeLeft);
    },
    startTimer(state, action) {
      state.isRunning = true;
      state.intervalId = action.payload;

      if (!state.isBreakStarted && !state.isSessionStarted) {
        state.isSessionStarted = true;
        state.timeLeft.minutes = state.sessionLength;
      }
    },
    stopTimer(state) {
      state.isRunning = false;
      clearInterval(state.intervalId);
    },
    tickTimer(state) {
      if (state.timeLeft.minutes >= 0 && state.timeLeft.seconds > 0) {
        state.timeLeft.seconds -= 1;
      } else if (state.timeLeft.minutes > 0 && state.timeLeft.seconds === 0) {
        state.timeLeft.minutes -= 1;
        state.timeLeft.seconds = 59;
      } else {
        state.timeLeft.minutes = 0;
        state.timeLeft.seconds = 0;
      }

      if (
        state.isRunning &&
        state.isSessionStarted &&
        state.timeLeft.minutes === 0 &&
        state.timeLeft.seconds === 0
      ) {
        state.timeLeft.minutes = state.breakLength;
        state.timeLeft.seconds = 0;
        state.timerTitle = BREAK_TITLE;
        state.isSessionStarted = false;
        state.isBreakStarted = true;
      }

      if (
        state.isRunning &&
        state.isBreakStarted &&
        state.timeLeft.minutes === 0 &&
        state.timeLeft.seconds === 0
      ) {
        state.timeLeft.minutes = state.sessionLength;
        state.timeLeft.seconds = 0;
        state.timerTitle = SESSION_TITLE;
        state.isSessionStarted = true;
        state.isBreakStarted = false;
      }

      state.timeLeftParsed = timeLeftParser(state.timeLeft);
    },
    refreshTimer(state) {
      clearInterval(state.intervalId);
      Object.assign(state, INITIAL_STATE);
    },
  },
});

export const {
  decrementBreakLength,
  incrementBreakLength,
  decrementSessionLength,
  incrementSessionLength,
  startTimer,
  stopTimer,
  tickTimer,
  refreshTimer,
} = timerSlice.actions;

export default timerSlice.reducer;
