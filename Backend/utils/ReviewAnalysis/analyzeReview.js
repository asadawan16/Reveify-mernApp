const checkAccuracy = require("./checkAccuracy");
const detectComplaints = require("./detectComplaints");
const analyzePerformance = require("./analyzePerformance");
const analyzeSentiment = require("./analyzeSentiment");

function analyzeReview(text, rating) {
  return {
    tags: {
      sentiment: analyzeSentiment(text),
      performance: analyzePerformance(rating),
      accuracy: checkAccuracy(text),
    },
    complaints: detectComplaints(text),
  };
}
module.exports = { analyzeReview };
