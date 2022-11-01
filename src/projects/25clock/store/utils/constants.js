export const SESSION_TITLE = "Session";

export const BREAK_TITLE = "Break";

export const INITIAL_STATE = {
  isRunning: false,
  isSessionStarted: false,
  isBreakStarted: false,
  isOver: false,
  sessionLength: 25,
  breakLength: 5,
  timerTitle: SESSION_TITLE,
  timeLeft: {
    minutes: 0,
    seconds: 0,
  },
  timeLeftParsed: "25:00",
  intervalId: null,
};
