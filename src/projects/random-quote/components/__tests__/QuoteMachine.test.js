import React from "react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { render, screen, fireEvent, within, act, cleanup } from "@testing-library/react";
import QuoteMachine from "../QuoteMachine";
import quoteReducer from "../../store/quoteReducer";

describe("Random Quote Machine", () => {
  let store = null;

  beforeEach(() => {
    store = configureStore({
      reducer: {
        quote: quoteReducer,
      },
    });
  });

  afterEach(() => {
    cleanup();
    store = null;
  });

  it("should render loading while fetching quotes", async () => {
    render(
      <Provider store={store}>
        <QuoteMachine />
      </Provider>,
    );

    const loading = await screen.findByText("Loading...");

    expect(loading).toBeInTheDocument();
  });

  it("should render quote", async () => {
    render(
      <Provider store={store}>
        <QuoteMachine />
      </Provider>,
    );

    const quote = await screen.findByTestId("quote-box");

    expect(quote).toBeInTheDocument();
  });

  it("should render 'tweet quote' btn with correct href attribute", async () => {
    jest.useFakeTimers();

    render(
      <Provider store={store}>
        <QuoteMachine />
      </Provider>,
    );

    act(() => {
      jest.advanceTimersByTime(1000);
    });

    const tweetBtn = await screen.findByTestId("tweet-quote");

    expect(tweetBtn).toBeInTheDocument();

    const { searchParams } = new URL(tweetBtn.getAttribute("href"));

    expect(searchParams.has("hashtags")).toBe(true);
    expect(searchParams.get("hashtags")).toBe("quotes");

    expect(searchParams.has("related")).toBe(true);
    expect(searchParams.get("related")).toBe("freecodecamp");

    expect(searchParams.has("text")).toBe(true);
    expect(searchParams.get("text")).toBe('"Love is hard" Me');
  });

  it("should render new quote on click 'new quote' btn", async () => {
    jest.useFakeTimers();

    render(
      <Provider store={store}>
        <QuoteMachine />
      </Provider>,
    );

    act(() => {
      jest.advanceTimersByTime(1000);
    });

    const newQuoteBtn = await screen.findByTestId("new-quote");

    expect(newQuoteBtn).toBeInTheDocument();
  });

  it("should fetch new quotes on click 'new quote' btn if list with quotes is empty", async () => {
    jest.useFakeTimers();

    render(
      <Provider store={store}>
        <QuoteMachine />
      </Provider>,
    );

    act(() => {
      jest.advanceTimersByTime(1000);
    });

    let quoteBox = await screen.findByTestId("quote-box");
    const newQuoteBtn = await screen.findByTestId("new-quote");
    const quoteText = await within(quoteBox).findByTestId("text");
    const quoteAuthor = await within(quoteBox).findByTestId("author");

    expect(quoteText).toBeInTheDocument();
    expect(quoteText).toHaveTextContent("Love is hard");
    expect(quoteAuthor).toHaveTextContent(/Me$/);

    fireEvent.click(newQuoteBtn);

    quoteBox = await screen.findByTestId("quote-box");

    expect(quoteText).toBeInTheDocument();
    expect(quoteText).toHaveTextContent("Make money, don't make love");
    expect(quoteAuthor).toHaveTextContent(/Some Author$/);
  });
});
