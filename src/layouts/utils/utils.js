export const optionsList = [
  {
    text: "None",
    route: "/app",
    testPath: "",
  },
  {
    text: "Random Quotes",
    route: "/app/random-quotes",
    testPath: "src/projects/random-quote",
  },
  {
    text: "Markdowm Previewer",
    route: "/app/markdown-previewer",
    testPath: "src/projects/markdown-previewer/",
  },
  {
    text: "Drum Pad",
    route: "/app/drum-pad",
    testPath: "src/projects/drum",
  },
  {
    text: "JS Calculator",
    route: "/app/js-calculator",
    testPath: "src/projects/js-calculator",
  },
  {
    text: "25 + 5 Clock",
    route: "/app/25-clock",
    testPath: "src/projects/25clock",
  },
];

const PATH_TO_PROJECT_FROM_SERVER = "../freaCodeCamp_certificate";
export const createTestPath = (path) => ({
  dirname: PATH_TO_PROJECT_FROM_SERVER,
  path,
});
