const natural = require("natural");
const SentimentAnalyzer = natural.SentimentAnalyzer;
const stemmer = natural.PorterStemmer;
const analyzer = new SentimentAnalyzer("English", stemmer, "afinn");

function analyzeSentiment(text) {
  if (!text) return "Neutral";

  const tokenized = text
    .toLowerCase()
    .replace(/[^\w\s]/g, "")
    .split(/\s+/);

  try {
    const score = analyzer.getSentiment(tokenized);
    console.log(`Sentiment Score: ${score} | Text: "${text}"`);

    if (score > 0) return "Positive";
    if (score < 0) return "Negative";

    const positiveWords = [
      "good",
      "great",
      "excellent",
      "love",
      "happy",
      "fast",
    ];
    const negativeWords = ["bad", "terrible", "poor", "hate", "slow", "worst"];

    if (positiveWords.some((word) => text.includes(word))) return "Positive";
    if (negativeWords.some((word) => text.includes(word))) return "Negative";

    return "Neutral";
  } catch (error) {
    console.error("Sentiment Analysis Error:", error);
    return "Neutral";
  }
}

module.exports = analyzeSentiment;
