// Import dotenv to load environment variables
require("dotenv").config();
// Init database config
require("./db");
var bodyParser = require("body-parser");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const passport = require("passport");
const jwt = require("jsonwebtoken");
// import blogPosts controller
const blogPostController = require("./controllers/blogPost");
const oAuth2Controller = require("./controllers/oAuth2");
//We import express for use
const express = require("express");
// Allows Cross-origin resource sharing
const cors = require("cors");
//We initialize our express app
const app = express();
app.use(cookieParser());
app.use(
  session({
    resave: false,
    saveUninitialized: false,
    secret: process.env.SECRET,
  })
);

app.use(passport.initialize());
app.use(passport.session());

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());
app.use(
  cors({
    origin: [process.env.FRONT_URI],
    credentials: true,
  })
);
//Looking for a local port to host our web application
const port = process.env.PORT || 4000;
// Create endpoints
app.use("/api", blogPostController);
app.use("/api/auth", oAuth2Controller);
app.use("/api/verify", async (req, res) => {  
  const token = req.cookies.token;
  if (!token) {
    return res.json({
      status: false,
      message: "Unauthorized",
    });
  }
  const decoded = await jwt.verify(token, process.env.SECRET);
  return res.json({ status: true, message: "Auth success" });
});
//Initialize our web-app on the selected port
app.listen(port, () => {});
console.log(`Example app listening at http://localhost:${port}`);
