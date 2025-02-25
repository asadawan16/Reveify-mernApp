function checkAccuracy(text) {
  if (!text) return "Order Accurate";
  const lowerText = text.toLowerCase();
  return lowerText.includes("wrong") ||
    lowerText.includes("missing") ||
    lowerText.includes("incorrect")
    ? "Order Mistake"
    : "Order Accurate";
}

module.exports = checkAccuracy;
