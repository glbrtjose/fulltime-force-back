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
const checkSession = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.status(403).json({
        status: false,
        message: "Unauthorized",
      });
    }
    const decoded = await jwt.verify(
      token,
      process.env.SECRET,
      (err, decoded) => {
        if (err) {
          return res
            .status(403)
            .send({ success: false, message: "Failed to authenticate user." });
        } else {
          req.decoded = decoded;
          next();
        }
      }
    );
  } catch (error) {
    return res
      .status(403)
      .send({ success: false, message: "Failed to authenticate user." });
  }
};
// Create endpoints
app.use("/api/auth", oAuth2Controller);
app.use("/api", checkSession, blogPostController);
//Initialize our web-app on the selected port
app.listen(port, () => {});
console.log(`Example app listening at http://localhost:${port}`);
