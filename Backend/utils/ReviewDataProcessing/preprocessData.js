const fs = require("fs");
const csv = require("csv-parser");
const { analyzeReview } = require("../ReviewAnalysis/analyzeReview");
const crypto = require("crypto");

const reviews = [];

const processRow = (row) => {
  console.log("Raw Row:", row);

  if (!row["Agent Name"] || !row["Review Text"]) return null;

  const rating = Math.min(Math.max(parseFloat(row["Rating"]) || 3, 1), 5);
  const orderPrice = row["Price Range"] === "High" ? 100 : 50;
  const discountApplied = row["Discount Applied"] === "Yes" ? 10 : 0;

  const agentId = crypto
    .createHash("md5")
    .update(row["Agent Name"])
    .digest("hex")
    .slice(0, 8);

  const { tags, complaints } = analyzeReview(row["Review Text"], rating);

  return {
    agentId,
    agentName: row["Agent Name"].trim(),
    location: row["Location"]?.trim() || "Unknown",
    reviewText: row["Review Text"].trim(),
    rating,
    orderPrice,
    discountApplied,
    customerId: `CUST-${Math.floor(Math.random() * 10000)}`,
    date: new Date(),
    tags,
    complaints,
  };
};

// Read & Process CSV
fs.createReadStream("delivery_reviews.csv")
  .pipe(csv())
  .on("data", (row) => {
    const processed = processRow(row);
    if (processed) reviews.push(processed);
  })
  .on("end", () => {
    fs.writeFileSync(
      "reviews_processed.json",
      JSON.stringify(reviews, null, 2)
    );
    console.log(`Processed ${reviews.length} valid reviews`);
    console.log("Sample review:", reviews[0] || "No valid reviews found");
  });
