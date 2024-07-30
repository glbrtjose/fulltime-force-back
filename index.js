// Import dotenv to load environment variables
require('dotenv').config();
//We import express for use
const express = require("express");
// Allows Cross-origin resource sharing
const cors = require("cors");
//We initialize our express app
const app = express();
app.use(cors());
console.log('process.env.PORT: ', process.env.PORT);
//Looking for a local port to host our web application
const port = process.env.PORT || 4000;
// Create test endpoint
app.get("/", async (req, res) => {
  res.status(200).json({ message: "Endpoint responding" });
});
//Initialize our web-app on the selected port
app.listen(port, () => {});
console.log(`Example app listening at http://localhost: ${port}`);
