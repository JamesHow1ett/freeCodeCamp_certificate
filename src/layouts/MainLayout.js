import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUp } from "@fortawesome/free-solid-svg-icons";
import TerminalXTerm from "../terminal/components/Terminal";
import { optionsList, createTestPath } from "./utils/utils";

const arrowUpIcon = <FontAwesomeIcon icon={faArrowUp} />;

// need this while development

function MainLayout({ children }) {
  const [hasTestsSetuped, setHasTestSetuped] = useState(false);
  const [isRenderedProject, setIsRenderedProject] = useState(false);
  const [selectedProject, setSelectedProject] = useState("/app");
  const [testPath, setTestPath] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (selectedProject === "/app" && !isRenderedProject) {
      navigate("/app");
    }
  }, [selectedProject, isRenderedProject, navigate]);

  useEffect(() => {
    if (hasTestsSetuped) {
      document.body.scrollIntoView({ block: "end", behavior: "smooth" });
    }
  }, [hasTestsSetuped]);

  const handleSelect = (event) => {
    const [selectedOption] = event.target.selectedOptions;
    const path = selectedOption.dataset.testPath;

    if (path) {
      setTestPath(createTestPath(path));
    } else {
      setTestPath("");
    }

    setSelectedProject(event.target.value);
    setHasTestSetuped(false);
    setIsRenderedProject(false);
  };

  const renderProject = () => {
    setIsRenderedProject(true);
    setHasTestSetuped(false);
    navigate(selectedProject);
  };

  const setupTestProject = () => {
    if (!isRenderedProject) {
      return;
    }

    setHasTestSetuped(true);
  };

  const goToTop = () => {
    document.body.scrollIntoView({ position: "start", behavior: "smooth" });
  };

  const optionsItems = optionsList.map((o) => (
    <option key={o.route} value={o.route} data-test-path={o.testPath}>
      {o.text}
    </option>
  ));

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
            {optionsItems}
          </select>
          <div className="flex gap-5 mt-5">
            <button
              onClick={renderProject}
              type="button"
              disabled={isRenderedProject}
              className="p-3 border-2 border-black bg-emerald-700 text-white rounded-md enabled:hover:bg-emerald-900 disabled:opacity-25"
            >
              Render
            </button>
            <button
              onClick={setupTestProject}
              type="button"
              disabled={!isRenderedProject || selectedProject === "/app"}
              className="p-3 border-2 border-black bg-emerald-700 text-white rounded-md enabled:hover:bg-emerald-900 disabled:opacity-25"
            >
              {hasTestsSetuped ? "Unmount Tests" : "Setup Tests"}
            </button>
          </div>
        </div>
      </div>
      <main className="flex flex-col w-full">
        <div id="project" className="flex-1">
          {children}
        </div>
        {hasTestsSetuped && <TerminalXTerm testsPath={testPath} />}
      </main>
      {hasTestsSetuped && (
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
