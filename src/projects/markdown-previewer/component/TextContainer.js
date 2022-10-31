/* eslint-disable react/no-danger */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState } from "react";
import PropTypes from "prop-types";
import { marked } from "marked";
import DOMPurify from "dompurify";

marked.setOptions({
  breaks: true,
});

function TextContainer({ title, markdownText, isPreview, onChange }) {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleIconClick = () => {
    setIsExpanded((prevState) => !prevState);
  };

  const expandIcon = isExpanded ? (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="white"
      className="w-6 h-6"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M9 9V4.5M9 9H4.5M9 9L3.75 3.75M9 15v4.5M9 15H4.5M9 15l-5.25 5.25M15 9h4.5M15 9V4.5M15 9l5.25-5.25M15 15h4.5M15 15v4.5m0-4.5l5.25 5.25"
      />
    </svg>
  ) : (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="w-6 h-6"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15"
      />
    </svg>
  );

  const parseMarkdownText = (markdown) => DOMPurify.sanitize(marked.parse(markdown));

  const textElement = () => {
    if (!isPreview) {
      return (
        <textarea
          id="editor"
          className="h-full px-2 py-2 bg-teal-100"
          onChange={onChange}
          value={markdownText}
        />
      );
    }

    return (
      <div
        id="preview"
        style={{ minHeight: "500px" }}
        className="px-2 py-2 bg-teal-100 h-full"
        dangerouslySetInnerHTML={{
          __html: parseMarkdownText(markdownText),
        }}
      />
    );
  };

  const textContainerStyles = () => {
    if (isPreview) {
      return {
        height: isExpanded ? "100%" : "",
        width: isPreview ? "700px" : "500px",
      };
    }

    return {
      height: isExpanded ? "100vh" : "300px",
      width: isPreview ? "700px" : "500px",
    };
  };

  return (
    <div className="flex flex-col border border-black" style={textContainerStyles()}>
      <div className="flex justify-between px-2 py-2 bg-teal-500">
        <span className="font-bold">{title}</span>
        <div onClick={handleIconClick}>{expandIcon}</div>
      </div>
      {textElement()}
    </div>
  );
}

TextContainer.propTypes = {
  isPreview: PropTypes.bool.isRequired,
  title: PropTypes.string,
  markdownText: PropTypes.string,
  onChange: PropTypes.func,
};

TextContainer.defaultProps = {
  title: "Title",
  markdownText: "",
  onChange: () => {},
};

export default TextContainer;
