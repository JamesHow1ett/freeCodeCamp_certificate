import { Terminal } from "xterm";
import { AttachAddon } from "xterm-addon-attach";
import { FitAddon } from "xterm-addon-fit";

const xtermjsTheme = {
  foreground: "#F8F8F8",
  background: "#2D2E2C",
  selectionBackground: "#5DA5D533",
  black: "#1E1E1D",
  brightBlack: "#262625",
  red: "#CE5C5C",
  brightRed: "#FF7272",
  green: "#5BCC5B",
  brightGreen: "#72FF72",
  yellow: "#CCCC5B",
  brightYellow: "#FFFF72",
  blue: "#5D5DD3",
  brightBlue: "#7279FF",
  magenta: "#BC5ED1",
  brightMagenta: "#E572FF",
  cyan: "#5DA5D5",
  brightCyan: "#72F0FF",
  white: "#F8F8F8",
  brightWhite: "#FFFFFF",
};

/**
 *
 * @param {HTMLElement} container
 * @param {WebSocket?} socket
 */
export const createTerminal = (container, socket) => {
  const addons = {};
  const isWindows = !navigator.userAgent.includes("Linux");

  const terminal = new Terminal({
    allowProposedApi: true,
    windowsMode: isWindows,
    fontFamily: '"Fira Code", courier-new, courier, monospace, "Powerline Extra Symbols"',
    theme: xtermjsTheme,
  });

  const fitAddon = new FitAddon();
  addons.fit.instance = fitAddon;

  if (socket) {
    const attachAddon = new AttachAddon(socket);
    addons.attach.instance = attachAddon;
  }

  Object.keys(addons).forEach((name) => {
    const addon = addons[name];
    terminal.loadAddon(addon.instance);
  });

  // eslint-disable-next-line no-underscore-dangle
  terminal._initialized = true;

  terminal.open(container);
  addons.fit.instance.fit();

  return terminal;
};
