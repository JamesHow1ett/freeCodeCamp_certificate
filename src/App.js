import React, { useState } from "react";
import TextContainer from "./components/TextContainer";

function App() {
  const [text, setText] = useState("# Test");

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
