function analyzePerformance(rating) {
  return rating >= 4 ? "Fast" : rating <= 2 ? "Slow" : "Average";
}
module.exports = analyzePerformance;
