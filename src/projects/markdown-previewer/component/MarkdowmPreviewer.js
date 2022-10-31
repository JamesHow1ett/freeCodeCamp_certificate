import React from "react";
import "./styles/index.css";

function MarkdowmPreviewer() {
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

export default MarkdowmPreviewer;
