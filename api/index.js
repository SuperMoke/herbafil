const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Request logging middleware
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

// Import routes
const authRoutes = require("../routes/authRoutes");
const fetchableRoutes = require("../routes/fetchableRoutes");
const insertionRoutes = require("../routes/insertionRoutes");

// Use routes
app.use(authRoutes);
app.use(fetchableRoutes);
app.use(insertionRoutes);

// Health check endpoint
app.get("/health", (req, res) => {
  res.status(200).json({ status: "ok" });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(`[${new Date().toISOString()}] ERROR:`, err);
  res.status(500).json({
    status: "failure",
    message:
      process.env.NODE_ENV === "production"
        ? "Internal server error"
        : err.message,
  });
});

// 404 handler
app.use((req, res) => {
  console.log(`[${new Date().toISOString()}] 404: ${req.method} ${req.url}`);
  res.status(404).json({
    status: "failure",
    message: `Route not found: ${req.method} ${req.url}`,
  });
});

// Start the server if not in production (Vercel)
if (process.env.NODE_ENV !== "production") {
  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server is running on http://localhost:${PORT}`);
    console.log(`For external access use: http://<your-ip-address>:${PORT}`);
  });
}

// Export for Vercel serverless function
module.exports = app;
