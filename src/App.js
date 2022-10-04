import React, { useState } from "react";
import TextContainer from "./components/TextContainer";

const blockCode = `
\`\`\`
// this is multi-line code:

function anotherExample(firstLine, lastLine) {
  if (firstLine == '\`\`\`' && lastLine == '\`\`\`') {
    return multiLineCode;
  }
}
\`\`\`
`;

const listMd = `
- And of course there are lists.
  - Some are bulleted.
     - With different indentation levels.
        - That look like this.
`;

const defaultMd = [
  "# H1",
  "## H2",
  "Heres some code, `<div></div>`, between 2 backticks.",
  blockCode,
  "There's also [links](https://www.freecodecamp.org), and",
  "You can also make text **bold**... whoa!",
  "![freeCodeCamp Logo](https://cdn.freecodecamp.org/testable-projects-fcc/images/fcc_secondary.svg)",
  listMd,
  "> Block Quotes!",
].join("\n");

function App() {
  const [text, setText] = useState(defaultMd);

  const handleSetText = (e) => {
    setText(e.target.value);
  };

  return (
    <div className="flex flex-col items-center py-6 bg-teal-300">
      <TextContainer
        title="Editor"
        markdownText={text}
        isPreview={false}
        onChange={handleSetText}
      />
      <div className="py-6" />
      <TextContainer title="Previewer" markdownText={text} isPreview />
    </div>
  );
}

export default App;
