import React, { useState } from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router";

function MainLayout({ children }) {
  const [selectedProject, setSelectedProject] = useState("/app");
  const navigate = useNavigate();

  const handleSelect = (event) => {
    setSelectedProject(event.target.value);
    navigate(event.target.value);
  };
  // TODO: improove layout
  return (
    <div>
      App
      <h1>Some tests</h1>
      <select onChange={handleSelect} value={selectedProject}>
        <option value="/app">None</option>
        <option value="/app/markdown-previewer">Markdowm Previewer</option>
        <option value="/app/25-clock">25 + 5 Clock</option>
      </select>
      <br />
      <main>{children}</main>
    </div>
  );
}

MainLayout.propTypes = {
  children: PropTypes.element.isRequired,
};

export default MainLayout;
