import { mockQuotes } from "./utils/utils";

function getMockQuotes(path) {
  return new Promise((resolve, reject) => {
    if (!path) {
      reject(new Error("Path is required"));
    }

    setTimeout(() => {
      resolve({ data: { quotes: mockQuotes } });
    }, 500);
  });
}

export const getQuotes = async () => {
  try {
    const result = await getMockQuotes("/random?count=50");

    return result.data;
  } catch (error) {
    return { quotes: mockQuotes };
  }
};
