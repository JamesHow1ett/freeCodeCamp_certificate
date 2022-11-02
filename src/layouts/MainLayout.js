import React, { useState, useRef, useEffect } from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUp } from "@fortawesome/free-solid-svg-icons";

const arrowUpIcon = <FontAwesomeIcon icon={faArrowUp} />;

function MainLayout({ children }) {
  const [hasTestsResults, setHasTestResults] = useState(false);
  const [selectedProject, setSelectedProject] = useState("/app");
  const navigate = useNavigate();
  const testsResultsRef = useRef();

  useEffect(() => {
    if (selectedProject === "/app") {
      setHasTestResults(false);
      navigate(selectedProject);
    }
  }, [navigate, selectedProject]);

  useEffect(() => {
    if (testsResultsRef.current && hasTestsResults) {
      testsResultsRef.current.scrollIntoView({ position: "start", behavior: "smooth" });
    }
  }, [hasTestsResults]);

  const handleSelect = (event) => setSelectedProject(event.target.value);

  const renderProject = () => navigate(selectedProject);

  const testProject = () => {
    setHasTestResults((prevState) => !prevState);
  };

  const goToTop = () => {
    document.body.scrollIntoView({ position: "start", behavior: "smooth" });
  };

  return (
    <div className="flex">
      <div className="flex flex-col gap-5 p-4">
        <h2>Select Project</h2>
        <div className="flex flex-col">
          <select
            className="p-2 border border-black rounded-md hover:cursor-pointer"
            value={selectedProject}
            onChange={handleSelect}
          >
            <option value="/app">None</option>
            <option value="/app/markdown-previewer">Markdowm Previewer</option>
            <option value="/app/drum-pad">Drum Pad</option>
            <option value="/app/js-calculator">JS Calculator</option>
            <option value="/app/25-clock">25 + 5 Clock</option>
          </select>
          <div className="flex gap-5 mt-5">
            <button
              onClick={renderProject}
              type="button"
              className="p-3 border-2 border-black bg-emerald-700 text-white rounded-md hover:bg-emerald-900"
            >
              Render
            </button>
            <button
              onClick={testProject}
              type="button"
              className="p-3 border-2 border-black bg-emerald-700 text-white rounded-md hover:bg-emerald-900"
            >
              Run Tests
            </button>
          </div>
        </div>
      </div>
      <main className="flex flex-col w-full">
        <div id="project" className="flex-1">
          {children}
        </div>
        {hasTestsResults && (
          <div
            id="project-tests"
            ref={testsResultsRef}
            className="p-4 h-[300px] bg-black text-white font-mono"
          >
            Tests results will be here
          </div>
        )}
      </main>
      {hasTestsResults && (
        <button
          onClick={goToTop}
          type="button"
          className="fixed bottom-8 left-8 p-3 border-2 border-black bg-emerald-700 text-white rounded-lg hover:bg-emerald-900"
        >
          {arrowUpIcon}
        </button>
      )}
    </div>
  );
}

MainLayout.propTypes = {
  children: PropTypes.element.isRequired,
};

export default MainLayout;
