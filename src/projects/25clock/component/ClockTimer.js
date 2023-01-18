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
  timerSelector,
} from "../store/timerReducer";

import beep from "../assets/beep.ogg";

const ICON_SIZE = "lg";

const ArrowDownIcon = <FontAwesomeIcon icon={faArrowDown} size={ICON_SIZE} />;
const ArrowUpIcon = <FontAwesomeIcon icon={faArrowUp} size={ICON_SIZE} />;
const StartStopIcon = (
  <>
    <FontAwesomeIcon icon={faPlay} size={ICON_SIZE} />
    <FontAwesomeIcon icon={faPause} size={ICON_SIZE} />
  </>
);
const ResetIcon = <FontAwesomeIcon icon={faRefresh} size={ICON_SIZE} />;

function ClockTimer() {
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
  } = useSelector(timerSelector);
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
    <div className="w-full h-screen flex flex-col items-center bg-[#1e555c] text-[30px] text-white text-center">
      <div className="font-bold text-4xl">25 + 5 Clock</div>
      <div className="flex gap-[50px] mt-10 mb-10">
        <div className="flex flex-col gap-5">
          <div id="break-label">Break Length</div>
          <div className="flex items-center justify-center gap-4">
            <button
              id="break-decrement"
              className="hover:text-teal-400 transition ease-in-out"
              type="button"
              onClick={decrementBreak}
            >
              {ArrowDownIcon}
            </button>
            <div className="min-w-[35px]" id="break-length">
              {breakLength}
            </div>
            <button
              id="break-increment"
              className="hover:text-teal-400 transition ease-in-out"
              type="button"
              onClick={incrementBreak}
            >
              {ArrowUpIcon}
            </button>
          </div>
        </div>
        <div className="flex flex-col gap-5">
          <div id="session-label">Session Length</div>
          <div className="flex items-center justify-center gap-4">
            <button
              id="session-decrement"
              className="hover:text-teal-400 transition ease-in-out"
              type="button"
              onClick={decrementSession}
            >
              {ArrowDownIcon}
            </button>
            <div className="min-w-[35px]" id="session-length">
              {sessionLength}
            </div>
            <button
              id="session-increment"
              className="hover:text-teal-400 transition ease-in-out"
              type="button"
              onClick={incrementSession}
            >
              {ArrowUpIcon}
            </button>
          </div>
        </div>
      </div>
      <div className="pl-10 pr-10 pt-5 pb-5 mt-5 mb-3 border-8 border-emerald-900 rounded-[50px]">
        <div
          className="flex flex-col gap-5"
          style={{ color: isLessThanMinute ? "#a50d0d" : "#fff" }}
        >
          <div id="timer-label">{timerTitle}</div>
          <div id="time-left" className="font-[digital] text-[45px] normal-nums">
            {timeLeftParsed}
          </div>
        </div>
      </div>
      <div className="flex gap-3">
        <button
          id="start_stop"
          className="hover:text-teal-400 transition ease-in-out"
          type="button"
          onClick={startStop}
        >
          {StartStopIcon}
        </button>
        <button
          id="reset"
          className="hover:text-teal-400 transition ease-in-out"
          type="button"
          onClick={reset}
        >
          {ResetIcon}
        </button>
      </div>

      <audio id="beep" ref={audioRef}>
        <source src={beep} type="audio/ogg" />
      </audio>
    </div>
  );
}

export default ClockTimer;
