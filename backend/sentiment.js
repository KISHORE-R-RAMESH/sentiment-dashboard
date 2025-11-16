const Sentiment = require("sentiment");
const sentiment = new Sentiment();

function analyzeText(text) {
  const result = sentiment.analyze(text);

  let label = "neutral";
  if (result.score > 0) label = "positive";
  if (result.score < 0) label = "negative";

  return {
    score: result.score,
    label,
    tokens: result.tokens,
    words: result.words
  };
}

module.exports = { analyzeText };
