/* eslint-disable no-param-reassign */
import { createSlice } from "@reduxjs/toolkit";
import { parseIdToDisplayName } from "../utils/utils";

const appSlice = createSlice({
  name: "app",
  initialState: {
    isPowerOn: true,
    volume: 0.3,
    display: "",
  },
  reducers: {
    setDisplay(state, action) {
      state.display = parseIdToDisplayName(action.payload);
    },
    setVolume(state, action) {
      state.volume = parseFloat(action.payload);
    },
    tooglePowerOn(state) {
      state.isPowerOn = !state.isPowerOn;
      state.display = "";
    },
  },
});

export const { setDisplay, tooglePowerOn, setVolume } = appSlice.actions;

export default appSlice.reducer;
