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
  "https://reveify-mern-app.vercel.app",
  "https://reveify-mern-app-frontend.vercel.app",
];
// app.use(
//   cors({
//     origin: allowedOrigins,
//     credentials: true,
//     exposedHeaders: ["Authorization"],
//   })
// );
// app.options("*", cors({ origin: allowedOrigins, credentials: true }));
app.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests with no origin (mobile apps, curl)
      if (!origin) return callback(null, true);
      if (allowedOrigins.indexOf(origin) === -1) {
        const msg = `CORS policy: ${origin} not allowed`;
        return callback(new Error(msg), false);
      }
      return callback(null, true);
    },
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
    exposedHeaders: ["Authorization"],
  })
);

// Handle preflight requests
app.options("*", cors());
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
