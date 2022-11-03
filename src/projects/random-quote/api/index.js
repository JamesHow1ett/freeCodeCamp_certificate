import axios from "axios";

const instance = axios.create({
  baseURL: "https://goquotes-api.herokuapp.com/api/v1/",
  headers: {
    Accept: "application/json",
  },
});

export const getQuotes = async () => {
  const result = await instance.get("random?count=50");

  return result.data;
};
