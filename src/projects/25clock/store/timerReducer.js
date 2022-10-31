/* eslint-disable no-param-reassign */
import { createSlice } from "@reduxjs/toolkit";
import { timeLeftParser } from "./utils/utils";
import { SESSION_TITLE, BREAK_TITLE, INITIAL_STATE } from "./utils/constants";

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
    },
    incrementBreakLength(state) {
      if (state.isRunning) {
        return;
      }

      if (state.breakLength < 60) {
        state.breakLength += 1;
      }
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

      if (state.isBreakStarted) {
        return;
      }

      state.timeLeft.minutes = state.sessionLength;
      state.timeLeft.seconds = 0;
      state.timeLeftParsed = timeLeftParser(state.timeLeft);
    },
    incrementSessionLength(state) {
      if (state.isRunning) {
        return;
      }

      if (state.sessionLength < 60) {
        state.sessionLength += 1;
      }

      if (state.isBreakStarted) {
        return;
      }

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
      clearInterval(state.intervalId);
      state.isRunning = false;
    },
    tickTimer(state) {
      if (state.isRunning && state.isOver && state.isSessionStarted) {
        state.isBreakStarted = true;
        state.timerTitle = BREAK_TITLE;
        state.timeLeft.minutes = state.breakLength;
        state.timeLeft.seconds = 0;
        state.isSessionStarted = false;
        state.isOver = false;
        state.timeLeftParsed = timeLeftParser(state.timeLeft);

        return;
      }

      if (state.isRunning && state.isOver && state.isBreakStarted) {
        state.isSessionStarted = true;
        state.timerTitle = SESSION_TITLE;
        state.timeLeft.minutes = state.sessionLength;
        state.timeLeft.seconds = 0;
        state.isBreakStarted = false;
        state.isOver = false;
        state.timeLeftParsed = timeLeftParser(state.timeLeft);

        return;
      }

      if (state.timeLeft.minutes >= 0 && state.timeLeft.seconds > 0) {
        state.timeLeft.seconds -= 1;
      } else if (state.timeLeft.minutes > 0 && state.timeLeft.seconds === 0) {
        state.timeLeft.minutes -= 1;
        state.timeLeft.seconds = 59;
      } else {
        state.timeLeft.minutes = 0;
        state.timeLeft.seconds = 0;
        state.isOver = true;
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
