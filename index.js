// Import dotenv to load environment variables
require("dotenv").config();
// Init database config
require("./db");
// import blogPosts controller
const blogPostController = require("./controllers/blogPost");
const oAuth2Controller = require("./controllers/oAuth2");
const userController = require("./controllers/user");
//We import express for use
const express = require("express");
// Allows Cross-origin resource sharing
const cors = require("cors");
//We initialize our express app
const app = express();
app.use(cors());
console.log("process.env.PORT: ", process.env.PORT);
//Looking for a local port to host our web application
const port = process.env.PORT || 4000;
// Create endpoints
app.use("/api", blogPostController);
app.use("/api/auth", oAuth2Controller);
app.use("/api/user", userController);
//Initialize our web-app on the selected port
app.listen(port, () => {});
console.log(`Example app listening at http://localhost:${port}`);
