export const generateTwitQuoteHref = (quote) => {
  const params = new URLSearchParams();

  params.append("hashtags", "quotes");
  params.append("related", "freecodecamp");
  params.append("text", `"${quote?.text ?? ""}" ${quote?.author ?? ""}`);

  return `https://twitter.com/intent/tweet?${params.toString()}`;
};
