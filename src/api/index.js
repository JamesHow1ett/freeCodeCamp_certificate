import axios from "axios";

const instance = axios.create({
  baseURL: "http://127.0.0.1:3001",
});

export const getTerminalPid = async () => {
  const response = await instance.post("/terminals");

  return response;
};
