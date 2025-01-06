const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();
const userRoutes = require("./routes/userRoutes");
const accountRoutes = require("./routes/accountRoutes");

// CORS configuration
app.use(cors({
  origin: "http://localhost:5173",
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,
}));

app.use(express.json());

// Database connection
const dbConnect = require("./config/db");
dbConnect().catch(console.error);  // Handle connection errors

// Routes
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/account", accountRoutes);

// Basic health check route
app.get("/api/health", (req, res) => {
  res.json({ status: "ok" });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ 
    message: "Internal server error",
    error: process.env.NODE_ENV === 'production' ? null : err.message
  });
});

// For local development
if (process.env.NODE_ENV !== 'production') {
  const PORT = process.env.PORT || 3001;
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

// Export for Vercel
module.exports = app;