import Api from "./api";

const instance = new Api("http://127.0.0.1:3001");

export const fetchTerminalSocket = async () => {
  const { data } = await instance.post("terminals");

  const socketURL = new URL(`ws://127.0.0.1:3001/terminals/${data.terminalPid}`);

  return { socketURL };
};
