require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
const authRoutes = require("./routes/auth");

const PORT = process.env.PORT;
// Cors Configuration
const allowedOrigins = ["http://localhost:5173"];
app.use(
  cors(
    {
      origin: allowedOrigins,
      credentials: true,
      exposedHeaders: ["Authorization"],
    },
    (req, res, next) => {
      res.setHeader("Access-Control-Allow-Origin", allowedOrigins);
      res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
      res.setHeader(
        "Access-Control-Allow-Headers",
        "Content-Type, Authorization"
      );
      next();
    }
  )
);
// Mongodb Connection
app.use(express.json());
mongoose
  .connect(process.env.MONGO_URl)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB Connection Error:", err));
// Routes
app.use("/api/auth", authRoutes);

app.get("/", (req, res) => {
  res.send("Hello Server is Running");
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
