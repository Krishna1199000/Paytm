const express = require("express");
const path = require('path');

const app = express();
const cors = require("cors");
const userRoutes = require("./routes/userRoutes");
const accountRoutes = require("./routes/accountRoutes");

app.use(
  cors({
    origin: "https://paytm-7jpk.onrender.com",
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    credentials: true,
  })
);

app.use(express.json());
require("dotenv").config();

const dbConnect = require("./config/db");
dbConnect();

// Routes
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/account", accountRoutes);
app.use(express.static(path.join(__dirname, 'public')));

// For Single Page Applications
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get("/", (req, res) => {
  res.json({ message: "Your server is up and running..." });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Something went wrong", error: err.message });
});


const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});