import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getQuotes } from "../api";
import { generateTwitQuoteHref } from "./utils/utils";

export const fetchRandomQuotes = createAsyncThunk("quote/fetchRandomQuotes", async () => {
  const { quotes } = await getQuotes();

  return quotes;
});

const quoteSlice = createSlice({
  name: "quote",
  initialState: {
    loading: false,
    currentRequestId: undefined,
    quotes: [],
    currentQuote: null,
  },
  reducers: {
    nextQuote(state) {
      const quote = state.quotes.pop();

      if (!quote) {
        state.currentQuote = null;

        return;
      }

      state.currentQuote = {
        ...quote,
        twitQuoteHref: generateTwitQuoteHref(quote),
      };
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchRandomQuotes.pending, (state, action) => {
        if (!state.loading) {
          state.loading = true;
          state.currentRequestId = action.meta.requestId;
        }
      })
      .addCase(fetchRandomQuotes.fulfilled, (state, action) => {
        const { requestId } = action.meta;
        if (state.loading && state.currentRequestId === requestId) {
          state.loading = false;
          state.quotes = action.payload;
          state.currentRequestId = undefined;
        }
      });
  },
});

export const { nextQuote } = quoteSlice.actions;

export const quoteSelector = (store) => store.quote;

export default quoteSlice.reducer;
