/* eslint-disable react/no-danger */
import React from "react";
import PropTypes from "prop-types";
import { useSelector, useDispatch } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMaximize, faMinimize } from "@fortawesome/free-solid-svg-icons";
import {
  setMarkdownText,
  toogleIsExpandedPreview,
  toogleIsExpandedMarkdown,
} from "../store/markdownReducer";

import "./styles/index.css";

const maximazeIcon = <FontAwesomeIcon icon={faMaximize} />;
const minimizeIcon = <FontAwesomeIcon icon={faMinimize} />;

function TextContainer({ title, isPreview }) {
  const { markdownText, parsedMarkdowm, isExpandedPreview, isExpandedMarkdowm } = useSelector(
    (store) => store.markdown,
  );
  const dispatch = useDispatch();

  const handleToogleExpand = () => {
    if (isPreview) {
      dispatch(toogleIsExpandedPreview());
      return;
    }

    dispatch(toogleIsExpandedMarkdown());
  };

  const handleMarkdowmInput = (event) => dispatch(setMarkdownText(event.target.value));

  const previewExpandIcon = isExpandedPreview ? minimizeIcon : maximazeIcon;
  const markdowmExpandIcon = isExpandedMarkdowm ? minimizeIcon : maximazeIcon;

  const expandIcon = isPreview ? previewExpandIcon : markdowmExpandIcon;

  const textElement = isPreview ? (
    <div
      id="preview"
      style={{ minHeight: "500px" }}
      className="px-2 py-2 bg-teal-100 h-full"
      dangerouslySetInnerHTML={{
        __html: parsedMarkdowm,
      }}
    />
  ) : (
    <textarea
      id="editor"
      className="h-full px-2 py-2 bg-teal-100"
      onChange={handleMarkdowmInput}
      value={markdownText}
    />
  );

  const textContainerStyles = isPreview
    ? {
        height: isExpandedPreview ? "100%" : "",
        width: "700px",
      }
    : {
        height: isExpandedMarkdowm ? "100vh" : "300px",
        width: "500px",
      };

  return (
    <div className="flex flex-col border border-black" style={textContainerStyles}>
      <div className="flex justify-between px-2 py-2 bg-teal-500">
        <span className="font-bold">{title}</span>
        <button type="button" onClick={handleToogleExpand}>
          {expandIcon}
        </button>
      </div>
      {textElement}
    </div>
  );
}

TextContainer.propTypes = {
  isPreview: PropTypes.bool.isRequired,
  title: PropTypes.string,
};

TextContainer.defaultProps = {
  title: "Title",
};

export default TextContainer;
