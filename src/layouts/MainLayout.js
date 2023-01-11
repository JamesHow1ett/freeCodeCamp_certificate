import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUp } from "@fortawesome/free-solid-svg-icons";
import TerminalXTerm from "../terminal/components/Terminal";
import { optionsList } from "./utils/utils";

const arrowUpIcon = <FontAwesomeIcon icon={faArrowUp} />;

// need this while development
const PATH_TO_PROJECT_FROM_SERVER = "../freaCodeCamp_certificate";
const createTestPath = (path) =>
  `cd ${PATH_TO_PROJECT_FROM_SERVER}/${path} && npm run test ${path}`;

function MainLayout({ children }) {
  const [hasTestsSetupedResults, setHasTestSetupedResults] = useState(false);
  const [isRenderedProject, setIsRenderedProject] = useState(false);
  const [selectedProject, setSelectedProject] = useState("/app");
  const [testPath, setTestPath] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (hasTestsSetupedResults) {
      document.body.scrollIntoView({ block: "end", behavior: "smooth" });
    }
  }, [hasTestsSetupedResults]);

  const handleSelect = (event) => {
    const [selectedOption] = event.target.selectedOptions;
    const path = selectedOption.dataset.testPath;

    if (path) {
      setTestPath(createTestPath(path));
    } else {
      setTestPath("");
    }

    setSelectedProject(event.target.value);
    setHasTestSetupedResults(false);
    setIsRenderedProject(false);
  };

  const renderProject = () => {
    setIsRenderedProject(true);
    setHasTestSetupedResults(false);
    navigate(selectedProject);
  };

  const setupTestProject = () => {
    if (!isRenderedProject) {
      return;
    }

    setHasTestSetupedResults((prevState) => !prevState);
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
              disabled={!isRenderedProject}
              className="p-3 border-2 border-black bg-emerald-700 text-white rounded-md enabled:hover:bg-emerald-900 disabled:opacity-25"
            >
              Setup Tests
            </button>
          </div>
        </div>
      </div>
      <main className="flex flex-col w-full">
        <div id="project" className="flex-1">
          {children}
        </div>
        {hasTestsSetupedResults && <TerminalXTerm testsPath={testPath} />}
      </main>
      {hasTestsSetupedResults && (
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
