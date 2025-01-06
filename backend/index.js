const express = require("express");
const bodyParser = require('body-parser');
const app = express();
const cors = require("cors");
const userRoutes = require("./routes/userRoutes");
const accountRoutes = require("./routes/accountRoutes");

const corsOptions = {
  origin: 'http://localhost:5173', 
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  
  credentials: true, 
};

app.use(cors(corsOptions));

app.use(bodyParser.json())

require("dotenv").config();

const dbConnect = require("./config/db");
dbConnect();

// Routes
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/account", accountRoutes);
// app.use(express.static(path.join(__dirname, 'public')));

// For Single Page Applications

app.get("/", (req, res) => {
  res.send("Welcome to the API!");
});
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname+'/build/index.html'));
});




const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});