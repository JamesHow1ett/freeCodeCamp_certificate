/* eslint-disable jsx-a11y/media-has-caption */
import React, { useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowDown,
  faArrowUp,
  faPlay,
  faPause,
  faRefresh,
} from "@fortawesome/free-solid-svg-icons";
import {
  decrementBreakLength,
  incrementBreakLength,
  decrementSessionLength,
  incrementSessionLength,
  startTimer,
  stopTimer,
  tickTimer,
  refreshTimer,
} from "./features/timer";

import beep from "./assets/beep.ogg";
import "./App.css";

const ArrowDownIcon = <FontAwesomeIcon icon={faArrowDown} size="2x" />;
const ArrowUpIcon = <FontAwesomeIcon icon={faArrowUp} size="2x" />;
const StartStopIcon = (
  <>
    <FontAwesomeIcon icon={faPlay} size="2x" />
    <FontAwesomeIcon icon={faPause} size="2x" />
  </>
);
const ResetIcon = <FontAwesomeIcon icon={faRefresh} size="2x" />;

function App() {
  const {
    timerTitle,
    timeLeftParsed,
    timeLeft,
    breakLength,
    sessionLength,
    isRunning,
    isBreakStarted,
    isSessionStarted,
    isOver,
  } = useSelector((state) => state.timer);
  const dispatch = useDispatch();
  const audioRef = useRef();

  const decrementBreak = () => dispatch(decrementBreakLength());
  const incrementBreak = () => dispatch(incrementBreakLength());

  const decrementSession = () => dispatch(decrementSessionLength());
  const incrementSession = () => dispatch(incrementSessionLength());

  const startStop = () => {
    if (isRunning) {
      dispatch(stopTimer());
      return;
    }

    const interval = setInterval(() => {
      dispatch(tickTimer());
    }, 1000);

    dispatch(startTimer(interval));
  };

  const reset = () => {
    dispatch(refreshTimer());
    audioRef.current.pause();
    audioRef.current.currentTime = 0;
  };

  if (isOver) {
    if (audioRef.current.canPlayType("audio/ogg")) {
      audioRef.current.play();

      if (audioRef.current.currentTime > 2) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
    }
  }

  const isLessThanMinute = (isBreakStarted || isSessionStarted) && timeLeft.minutes <= 0;

  return (
    <div className="container">
      <div>
        <div className="main-title">25 + 5 Clock</div>
        <div className="length-controls-wrapper">
          <div className="length-control">
            <div id="break-label">Break Length</div>
            <button
              id="break-decrement"
              className="btn-level"
              type="button"
              onClick={decrementBreak}
            >
              {ArrowDownIcon}
            </button>
            <div className="btn-level" id="break-length">
              {breakLength}
            </div>
            <button
              id="break-increment"
              className="btn-level"
              type="button"
              onClick={incrementBreak}
            >
              {ArrowUpIcon}
            </button>
          </div>
          <div className="length-control">
            <div id="session-label">Session Length</div>
            <button
              id="session-decrement"
              className="btn-level"
              type="button"
              onClick={decrementSession}
            >
              {ArrowDownIcon}
            </button>
            <div className="btn-level" id="session-length">
              {sessionLength}
            </div>
            <button
              id="session-increment"
              className="btn-level"
              type="button"
              onClick={incrementSession}
            >
              {ArrowUpIcon}
            </button>
          </div>
        </div>
        <div className="timer">
          <div className="timer-wrapper" style={{ color: isLessThanMinute ? "#a50d0d" : "#fff" }}>
            <div id="timer-label">{timerTitle}</div>
            <div id="time-left">{timeLeftParsed}</div>
          </div>
        </div>
        <div className="timer-control">
          <button id="start_stop" type="button" onClick={startStop}>
            {StartStopIcon}
          </button>
          <button id="reset" type="button" onClick={reset}>
            {ResetIcon}
          </button>
        </div>
      </div>
      <audio id="beep" ref={audioRef}>
        <source src={beep} type="audio/ogg" />
      </audio>
    </div>
  );
}

export default App;
