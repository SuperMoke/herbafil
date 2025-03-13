const express = require("express");
const axios = require("axios");

const app = express();
const PORT = 3000;

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Import routes
const authRoutes = require("./routes/authRoutes");
const fetchableRoutes = require("./routes/fetchableRoutes");

// Use routes
app.use(authRoutes);
app.use(fetchableRoutes);

// Start the server
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server is running on http://localhost:${PORT}`);
  console.log(`For external access use: http://<your-ip-address>:${PORT}`);
});
