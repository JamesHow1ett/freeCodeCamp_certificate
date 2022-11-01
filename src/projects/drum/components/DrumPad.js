/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/media-has-caption */
import React, { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setDisplay, tooglePowerOn, setVolume } from "../store/drumReducer";
import { useEventListener } from "../hooks/useEventListener";
import { availableKeys } from "../utils/utils";

const TIME_TO_REMOVE_ACTIVE_CLASS = 300;
const btnStyles =
  "bg-stone-500 mt-3 relative float-left w-[80px] h-[80px] mr-3 rounded-lg pt-[32px] cursor-pointer shadow-xl";

function DrumPad() {
  const { isPowerOn, display, volume } = useSelector((store) => store.drum);
  const dispatch = useDispatch();

  const handlerDrumKeyUp = useCallback(
    (e) => {
      const audioId = e.key.toUpperCase();

      if (!availableKeys.includes(audioId)) {
        return;
      }

      const audio = document.getElementById(audioId);
      const button = audio.parentNode;

      audio.currentTime = 0;
      audio.volume = volume;
      audio.play();
      button.classList.add("!bg-orange-400");

      dispatch(setDisplay(button.id));

      setTimeout(() => {
        button.classList.remove("!bg-orange-400");
      }, TIME_TO_REMOVE_ACTIVE_CLASS);
    },
    [dispatch, volume],
  );

  useEventListener("keyup", handlerDrumKeyUp);

  const handlerDrumClick = (e) => {
    if (!isPowerOn) {
      return;
    }

    if (e.target.dataset.padWrapper) {
      return;
    }

    const button = e.target;
    const audio = button.firstChild;

    audio.currentTime = 0;
    audio.volume = volume;
    audio.play();
    button.classList.add("!bg-orange-400");

    dispatch(setDisplay(button.id));

    setTimeout(() => {
      button.classList.remove("!bg-orange-400");
    }, TIME_TO_REMOVE_ACTIVE_CLASS);
  };

  const handlerVolumeChange = (e) => dispatch(setVolume(e.target.value));

  return (
    <div
      id="drum-machine"
      className="bg-[#8d8d8d] text-black font-bold text-center flex justify-center items-center h-screen"
    >
      <div className="outline outline-8 outline-orange-600 p-[20px] relative text-center bg-[#b3b3b3] flex justify-between items-center">
        <div
          className="w-[332px] h-[272px] inline-block"
          data-pad-wrapper="true"
          onClick={handlerDrumClick}
        >
          <div className={btnStyles} id="Heater-1">
            <audio
              className="clip"
              id="Q"
              src="https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3"
            />
            Q
          </div>
          <div className={btnStyles} id="Heater-2">
            <audio
              className="clip"
              id="W"
              src="https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3"
            />
            W
          </div>
          <div className={btnStyles} id="Heater-3">
            <audio
              className="clip"
              id="E"
              src="https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3"
            />
            E
          </div>
          <div className={btnStyles} id="Heater-4">
            <audio
              className="clip"
              id="A"
              src="https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3"
            />
            A
          </div>
          <div className={btnStyles} id="Clap">
            <audio
              className="clip"
              id="S"
              src="https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3"
            />
            S
          </div>
          <div className={btnStyles} id="Open-HH">
            <audio
              className="clip"
              id="D"
              src="https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3"
            />
            D
          </div>
          <div className={btnStyles} id="Kick-n'-Hat">
            <audio
              className="clip"
              id="Z"
              src="https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3"
            />
            Z
          </div>
          <div className={btnStyles} id="Kick">
            <audio
              className="clip"
              id="X"
              src="https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3"
            />
            X
          </div>
          <div className={btnStyles} id="Closed-HH">
            <audio
              className="clip"
              id="C"
              src="https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3"
            />
            C
          </div>
        </div>
        <div className="flex flex-col items-center gap-[20px] w-[240px]">
          <div className="flex flex-col items-center w-[100px]">
            <p className="mt-0 mb-0">Power</p>
            <div className="w-[50px] p-1 bg-black">
              <div
                className="bg-blue-600 border border-black w-[23px] h-[19px]"
                role="button"
                tabIndex={0}
                aria-label="power On/Off"
                style={{ float: isPowerOn ? "right" : "left" }}
                onClick={() => dispatch(tooglePowerOn())}
              />
            </div>
          </div>
          <p
            id="display"
            className="w-[200px] bg-gray-500 m-4 mx-auto text-center py-2 min-h-[40px]"
          >
            {display}
          </p>
          <div className="flex gap-2">
            <span className="w-[25px]">{volume}</span>
            <input
              max="1"
              min="0"
              step="0.01"
              type="range"
              value={volume}
              onChange={handlerVolumeChange}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default DrumPad;
