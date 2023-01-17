import React from "react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { render, screen, fireEvent, within, cleanup } from "@testing-library/react";
import MarkdowmPreviewer from "../MarkdowmPreviewer";
import markdownReducer from "../../store/markdownReducer";

describe("MarkdowmPreviewer", () => {
  let store = null;

  beforeEach(() => {
    store = configureStore({
      reducer: {
        markdown: markdownReducer,
      },
    });
  });

  afterEach(() => {
    cleanup();
    store = null;
  });

  it("should render editor", async () => {
    render(
      <Provider store={store}>
        <MarkdowmPreviewer />
      </Provider>,
    );

    const editor = await screen.findByTestId("editor");
    const [editorTitle] = await screen.findAllByTestId("title");

    expect(editor).toBeInTheDocument();
    expect(editor.tagName.toLowerCase()).toBe("textarea");
    expect(editor.id).toBe("editor");

    expect(editorTitle).toBeInTheDocument();
    expect(editorTitle.tagName.toLowerCase()).toBe("span");
    expect(editorTitle).toHaveTextContent("Editor");
  });

  it("shoudl render previewer", async () => {
    render(
      <Provider store={store}>
        <MarkdowmPreviewer />
      </Provider>,
    );

    const previewer = await screen.findByTestId("preview");
    const [, previewerTitle] = await screen.findAllByTestId("title");

    expect(previewer).toBeInTheDocument();
    expect(previewer.tagName.toLowerCase()).toBe("div");
    expect(previewer.id).toBe("preview");

    expect(previewerTitle).toBeInTheDocument();
    expect(previewerTitle.tagName.toLowerCase()).toBe("span");
    expect(previewerTitle).toHaveTextContent("Preview");
  });

  it("should toogle expand editor on click 'expand' btn", async () => {
    render(
      <Provider store={store}>
        <MarkdowmPreviewer />
      </Provider>,
    );

    const [editorWrapper] = await screen.findAllByTestId("text-container");
    const [editorExpandBtn] = await screen.findAllByTestId("expand-btn");

    expect(editorWrapper.style.height).toBe("300px");

    fireEvent.click(editorExpandBtn);

    expect(editorWrapper.style.height).toBe("100vh");

    fireEvent.click(editorExpandBtn);

    expect(editorWrapper.style.height).toBe("300px");
  });

  it("should toogle expand previewer on click 'expand' btn", async () => {
    render(
      <Provider store={store}>
        <MarkdowmPreviewer />
      </Provider>,
    );

    const [, previewerWrapper] = await screen.findAllByTestId("text-container");
    const [, previewerExpandBtn] = await screen.findAllByTestId("expand-btn");

    expect(previewerWrapper.style.height).toBe("");

    fireEvent.click(previewerExpandBtn);

    expect(previewerWrapper.style.height).toBe("100%");

    fireEvent.click(previewerExpandBtn);

    expect(previewerWrapper.style.height).toBe("");
  });

  it("should hide editor if expanded previewer", async () => {
    render(
      <Provider store={store}>
        <MarkdowmPreviewer />
      </Provider>,
    );

    let [editorWrapper, previewerWrapper] = await screen.findAllByTestId("text-container");
    const [, previewerExpandBtn] = await screen.findAllByTestId("expand-btn");

    expect(editorWrapper).toBeInTheDocument();
    expect(previewerWrapper).toBeInTheDocument();

    fireEvent.click(previewerExpandBtn);

    expect(editorWrapper).not.toBeInTheDocument();
    expect(previewerWrapper).toBeInTheDocument();

    fireEvent.click(previewerExpandBtn);

    [editorWrapper, previewerWrapper] = await screen.findAllByTestId("text-container");

    expect(editorWrapper).toBeInTheDocument();
    expect(previewerWrapper).toBeInTheDocument();
  });

  it("entered text to editor should correct dispalyed in previewer", async () => {
    render(
      <Provider store={store}>
        <MarkdowmPreviewer />
      </Provider>,
    );

    const editor = await screen.findByTestId("editor");
    const previewer = await screen.findByTestId("preview");

    fireEvent.input(editor, { target: { value: "# Test Header One \n## Test Header Two" } });

    const h1 = await within(previewer).findByText("Test Header One");
    const h2 = await within(previewer).findByText("Test Header Two");

    expect(h1).toBeInTheDocument();
    expect(h1.tagName.toLowerCase()).toBe("h1");

    expect(h2).toBeInTheDocument();
    expect(h2.tagName.toLowerCase()).toBe("h2");

    fireEvent.input(editor, { target: { value: "" } });

    expect([...previewer.childNodes]).toHaveLength(0);
  });
});
