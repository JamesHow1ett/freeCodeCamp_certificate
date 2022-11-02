import { createSlice } from "@reduxjs/toolkit";
import { parserMarkdownText } from "./utils/parserMarkdown";
import { defaultMd } from "./utils/constants";

const markdownPreviewerSlice = createSlice({
  name: "markdown",
  initialState: {
    isExpandedPreview: false,
    isExpandedMarkdowm: false,
    markdownText: defaultMd,
    parsedMarkdowm: parserMarkdownText(defaultMd),
  },
  reducers: {
    setMarkdownText(state, action) {
      state.markdownText = action.payload;
      state.parsedMarkdowm = parserMarkdownText(action.payload);
    },
    toogleIsExpandedPreview(state) {
      state.isExpandedPreview = !state.isExpandedPreview;
      state.isExpandedMarkdowm = false;
    },
    toogleIsExpandedMarkdown(state) {
      state.isExpandedMarkdowm = !state.isExpandedMarkdowm;
      state.isExpandedPreview = false;
    },
  },
});

export const { setMarkdownText, toogleIsExpandedPreview, toogleIsExpandedMarkdown } =
  markdownPreviewerSlice.actions;

export default markdownPreviewerSlice.reducer;
