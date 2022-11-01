/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/media-has-caption */
import React, { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setDisplay, tooglePowerOn, setVolume } from "../store/drumReducer";
import { useEventListener } from "../hooks/useEventListener";
import { availableKeys } from "../utils/utils";

// import "./App.css";

const btnStyles = { backgroundColor: "grey", marginTop: "10px", boxShadow: "black 3px 3px 5px" };

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
      const displayName = audio.parentNode.id;
      dispatch(setDisplay(displayName));

      audio.currentTime = 0;
      audio.volume = volume;
      audio.play();
    },
    [dispatch, setDisplay, volume],
  );

  useEventListener("keyup", handlerDrumKeyUp);

  const handlerDrumClick = (e) => {
    if (!isPowerOn) {
      return;
    }

    if (e.target.classList.contains("pad-bank")) {
      return;
    }

    const audio = e.target.firstChild;
    audio.currentTime = 0;
    audio.volume = volume;
    audio.play();

    dispatch(setDisplay(e.target.id));
  };

  const handlerVolumeChange = (e) => {
    dispatch(setVolume(e.target.value));
  };

  return (
    <div id="drum-machine" className="container">
      <div className="inner-container">
        <div className="pad-bank" onClick={handlerDrumClick}>
          <div className="drum-pad" id="Heater-1" style={btnStyles}>
            <audio
              className="clip"
              id="Q"
              src="https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3"
            />
            Q
          </div>
          <div className="drum-pad" id="Heater-2" style={btnStyles}>
            <audio
              className="clip"
              id="W"
              src="https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3"
            />
            W
          </div>
          <div className="drum-pad" id="Heater-3" style={btnStyles}>
            <audio
              className="clip"
              id="E"
              src="https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3"
            />
            E
          </div>
          <div className="drum-pad" id="Heater-4" style={btnStyles}>
            <audio
              className="clip"
              id="A"
              src="https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3"
            />
            A
          </div>
          <div className="drum-pad" id="Clap" style={btnStyles}>
            <audio
              className="clip"
              id="S"
              src="https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3"
            />
            S
          </div>
          <div className="drum-pad" id="Open-HH" style={btnStyles}>
            <audio
              className="clip"
              id="D"
              src="https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3"
            />
            D
          </div>
          <div className="drum-pad" id="Kick-n'-Hat" style={btnStyles}>
            <audio
              className="clip"
              id="Z"
              src="https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3"
            />
            Z
          </div>
          <div className="drum-pad" id="Kick" style={btnStyles}>
            <audio
              className="clip"
              id="X"
              src="https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3"
            />
            X
          </div>
          <div className="drum-pad" id="Closed-HH" style={btnStyles}>
            <audio
              className="clip"
              id="C"
              src="https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3"
            />
            C
          </div>
        </div>
        <div className="controls-container">
          <div className="control">
            <p htmlFor="powerOn">Power</p>
            <div className="select">
              <div
                className="inner"
                role="button"
                tabIndex={0}
                aria-label="power On/Off"
                style={{ float: isPowerOn ? "right" : "left" }}
                onClick={() => dispatch(tooglePowerOn())}
              />
            </div>
          </div>
          <p id="display">{display}</p>
          <div className="volume-slider">
            {typeof volume && volume}
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
