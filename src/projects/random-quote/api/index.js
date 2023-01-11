import axios from "axios";

const instance = axios.create({
  baseURL: "https://goquotes-api.herokuapp.com/api/v1/",
  headers: {
    Accept: "application/json",
  },
});

const mockQuotes = [
  {
    id: 1,
    text: "Hello World",
    author: "Me",
    tag: "patience",
  },
  {
    id: 2,
    text: "Alinochka very vrednaya",
    author: "DA",
    tag: "marriage",
  },
  {
    id: 3,
    text: "Make money, don't make love",
    author: "Some Author",
    tag: "money",
  },
  {
    id: 4,
    text: "Love is hard",
    author: "Me",
    tag: "motivational",
  },
];

export const getQuotes = async () => {
  try {
    const result = await instance.get("random?count=50");

    return result.data;
  } catch (error) {
    return { quotes: mockQuotes };
  }
};
