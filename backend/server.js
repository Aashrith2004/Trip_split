const express = require("express");
const cors = require("cors");
require("dotenv").config();

const connectDB = require("./config/db");
const tripRoutes = require("./routes/tripRoutes");
const authRoutes = require("./routes/authRoutes");

const app = express();

// Middleware
app.use(cors(
  {
    origin: "https://trip-split-frontend.vercel.app",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"]
  }
));
app.use(express.json());

// Routes
app.get("/health", (req, res) => {
  res.json({ status: "OK", message: "TripSplit API is running" });
});

app.use("/api/trips", tripRoutes);
app.use("/api/auth", authRoutes);

// Connect to database on import
connectDB();

// Export the app for Vercel
module.exports = app;
