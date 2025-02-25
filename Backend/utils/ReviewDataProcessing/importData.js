require("dotenv").config();
const fs = require("fs");
const mongoose = require("mongoose");
const Review = require("../../models/Review");
const { analyzeReview } = require("../ReviewAnalysis/analyzeReview");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(" Database connected successfully");
  } catch (error) {
    console.error(" Database connection error:", error.message);
    process.exit(1);
  }
};

//  Function to Import Reviews
const importReviews = async () => {
  await connectDB();

  try {
    //  Read JSON file
    const rawData = fs.readFileSync("./reviews_processed.json");
    const reviews = JSON.parse(rawData);

    //  Limit to first 600 reviews
    const limitedReviews = reviews.slice(0, 600);

    for (const row of limitedReviews) {
      try {
        //  Extract tags & complaints from review text
        const { tags, complaints } = analyzeReview(
          row.reviewText,
          parseInt(row.rating)
        );

        // Create new review object
        const review = new Review({
          agentId: row.agentId,
          agentName: row.agentName,
          location: row.location,
          reviewText: row.reviewText,
          rating: parseInt(row.rating),
          orderPrice: parseFloat(row.orderPrice),
          discountApplied: parseFloat(row.discountApplied),
          customerId: row.customerId,
          date: new Date(row.date),
          tags,
          complaints,
        });

        await review.save();
        console.log(` Imported review for agent: ${row.agentName}`);
      } catch (err) {
        console.error(` Error importing review: ${err.message}`);
      }
    }

    console.log(` Successfully imported ${limitedReviews.length} reviews`);
  } catch (err) {
    console.error(" Failed to process JSON file:", err.message);
  } finally {
    mongoose.disconnect();
  }
};

importReviews();
