const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const logger = require("morgan");
require("dotenv").config();

const PostRoutes = require("./routes/PostRoutes");

const app = express();

app.use(logger("dev"));

// Setting Headers
app.use(cors());

// Adding the body-parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use("/api", PostRoutes);

// Connecting to Database
mongoose.set("useCreateIndex", true);
mongoose.connect(
  process.env.DB_URL,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => {
    console.log("Connected to MongoDB");
  }
);

// Setting the port
const port = process.env.PORT || 4000;

app.listen(port, () => {
  console.log(`listening to port ${port}`);
});
