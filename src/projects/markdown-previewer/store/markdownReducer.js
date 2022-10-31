import { createSlice } from "@reduxjs/toolkit";

const markdownPreviewerSlice = createSlice({
  name: "markdown",
  initialState: {
    markdownInput: "",
    parsedMarkdowm: "",
  },
  reducers: {},
});
