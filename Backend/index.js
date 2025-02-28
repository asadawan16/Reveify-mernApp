require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
const authRoutes = require("./routes/auth");
const ReviewsRoutes = require("./routes/reviews");
const FetchUserRoute = require("./routes/user");
require("./routes/salesData/financialCron"); // The cron job file

const PORT = process.env.PORT || 5000;
const allowedOrigins = [
  "https://reveify-mern-app--mu.vercel.app",
  "http://localhost:5173",
];
const corsOptions = {
  origin: allowedOrigins,
  credentials: true,
  exposedHeaders: ["Authorization"],
};
app.use(express.json());
// Mongodb Connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB Connection Error:", err));
// Routes
app.use("/api/auth", cors(corsOptions), authRoutes);
app.use("/api/reviews", cors(corsOptions), ReviewsRoutes);
app.use("/api/user", cors(corsOptions), FetchUserRoute);
app.get("/", (req, res) => {
  res.send("Hello Server is Running");
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
