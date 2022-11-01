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

export const defaultMd = [
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
