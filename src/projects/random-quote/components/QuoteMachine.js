import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faQuoteLeft, faDove } from "@fortawesome/free-solid-svg-icons";
import { nextQuote, fetchRandomQuotes, quoteSelector } from "../store/quoteReducer";
import { qouteTopicColors } from "../utils/constants";

const quoteIcon = <FontAwesomeIcon icon={faQuoteLeft} size="2x" />;
const twitterIcon = <FontAwesomeIcon icon={faDove} size="lg" />;

function QuoteMachine() {
  const { loading, currentQuote } = useSelector(quoteSelector);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchQuotes = async () => {
      if (!currentQuote) {
        dispatch(fetchRandomQuotes())
          .unwrap()
          .then(() => {
            dispatch(nextQuote());
          });
      }
    };

    fetchQuotes();
  }, [dispatch, currentQuote]);

  const topicColor = (currentQuote && qouteTopicColors[currentQuote.tag]) || "";

  return (
    <div
      className="h-screen w-full flex justify-center items-center"
      style={{ backgroundColor: topicColor }}
    >
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div
          id="quote-box"
          data-testid="quote-box"
          className="flex flex-col bg-white w-[450px] py-[40px] px-[50px] border rounded-md"
        >
          <div style={{ color: topicColor }}>
            {quoteIcon}
            <span id="text" data-testid="text" className="text-xl text-center font-medium ml-3">
              {currentQuote?.text ?? ""}
            </span>
          </div>
          <div className="self-end pt-5" style={{ color: topicColor }}>
            <span id="author" data-testid="author">
              - {currentQuote?.author ?? ""}
            </span>
          </div>
          <div className="flex items-center justify-between mt-8">
            <a
              id="tweet-quote"
              data-testid="tweet-quote"
              title="Tweet this quote!"
              href={currentQuote?.twitQuoteHref ?? ""}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block border rounded-md p-2"
              style={{ backgroundColor: topicColor, color: "white" }}
            >
              {twitterIcon}
            </a>
            <button
              id="new-quote"
              data-testid="new-quote"
              className="inline-block border rounded-md p-2"
              style={{ backgroundColor: topicColor, color: "white" }}
              type="button"
              onClick={() => dispatch(nextQuote())}
            >
              New Quote
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default QuoteMachine;
