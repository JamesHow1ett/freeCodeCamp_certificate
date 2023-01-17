import React, { useRef, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { createTerminal } from "..";
import { fetchTerminalSocket } from "../../api";

import "xterm/css/xterm.css";

// FIXME: disable user input to bash, only programatically run

function TerminalXTerm({ testsPath }) {
  const [error, setError] = useState(false);
  const [hasTestsRunned, setHasTestsRunned] = useState(false);
  const socket = useRef();
  const terminal = useRef();
  const terminalContainer = useRef();

  useEffect(() => {
    fetchTerminalSocket()
      .then(({ socketURL }) => {
        socket.current = new WebSocket(socketURL);
        terminal.current = createTerminal(socket.current);
        terminal.current.open(terminalContainer.current);
        terminal.current.write("");
      })
      .catch(() => {
        setError(true);
        terminal.current = createTerminal();
        terminal.current.open(terminalContainer.current);
        terminal.current.write("Server with tests doesn't respond. Please try again leter.");
      });

    return () => {
      if (socket.current) {
        terminal.current.dispose();
        socket.current.close();
        setHasTestsRunned(false);
      }
    };
  }, []);

  function runTests() {
    if (error) {
      return;
    }

    if (hasTestsRunned) {
      socket.current.send(`npm run test ${testsPath.path} \r`);
      return;
    }

    socket.current.send(`cd ${testsPath.dirname}/ && npm run test ${testsPath.path} \r`);
    setHasTestsRunned(true);
  }

  const runTestsBtn = (
    <button
      type="button"
      disabled={error}
      onClick={runTests}
      className="mt-1 p-3 border-2 border-black bg-emerald-700 text-white rounded-md enabled:hover:bg-emerald-900 disabled:opacity-25"
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
  testsPath: PropTypes.exact({
    dirname: PropTypes.string,
    path: PropTypes.string,
  }),
};

TerminalXTerm.defaultProps = {
  testsPath: {
    dirname: "",
    path: "",
  },
};

export default TerminalXTerm;
