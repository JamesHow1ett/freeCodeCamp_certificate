import React, { useRef, useEffect } from "react";
import PropTypes from "prop-types";
import { createTerminal } from "..";
import { getTerminalPid } from "../../api";

// FIXME: disable user input to bash, only programatically run

function TerminalXTerm({ testsPath }) {
  const socket = useRef();
  const terminal = useRef();
  const terminalContainer = useRef();

  useEffect(() => {
    getTerminalPid().then(({ data }) => {
      const socketURL = `ws://127.0.0.1:3001/terminals/${data.terminalPid}`;
      socket.current = new WebSocket(socketURL);
      terminal.current = createTerminal(socket.current);
      terminal.current.open(terminalContainer.current);
      terminal.current.write("");
    });

    return () => {
      socket.current.close();
    };
  });

  function runTests() {
    socket.current.send(`${testsPath} \r`);
  }

  // FIXME: write better styles
  const runTestsBtn = (
    <button
      type="button"
      onClick={runTests}
      className="p-3 border-2 border-black bg-emerald-700 text-white rounded-md hover:bg-emerald-900"
    >
      Run Tests
    </button>
  );

  return (
    <>
      <div
        id="term-test-id"
        ref={terminalContainer}
        style={{
          width: "100%",
          height: "400px",
          backgroundColor: "black",
          color: "white",
        }}
      />
      {runTestsBtn}
    </>
  );
}

TerminalXTerm.propTypes = {
  testsPath: PropTypes.string,
};

TerminalXTerm.defaultProps = {
  testsPath: "",
};

export default TerminalXTerm;
