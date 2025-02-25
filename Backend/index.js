require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
const authRoutes = require("./routes/auth");
const ReviewsRoutes = require("./routes/reviews");
const FetchUserRoute = require("./routes/user/fetchUsers");
const PORT = process.env.PORT || 5000;
// Cors Configuration
const allowedOrigins = [
  "http://localhost:5173",
  "https://reveify-mern-app-frontend.vercel.app",
];
app.use(cors({ origin: allowedOrigins, credentials: true }));

app.options("*", cors());

app.use((req, res, next) => {
  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
    res.setHeader("Access-Control-Allow-Origin", origin);
    res.setHeader(
      "Access-Control-Allow-Methods",
      "GET, POST, PUT, DELETE, OPTIONS"
    );
    res.setHeader(
      "Access-Control-Allow-Headers",
      "Content-Type, Authorization"
    );
    res.setHeader("Access-Control-Allow-Credentials", "true");
  }
  next();
});
// Mongodb Connection
app.use(express.json());
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB Connection Error:", err));
// Routes
app.use("/api/auth", authRoutes);
app.use("/api/reviews", ReviewsRoutes);
app.use("/api/user", FetchUserRoute);
app.get("/", (req, res) => {
  res.send("Hello Server is Running");
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
