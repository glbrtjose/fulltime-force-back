var express = require("express");
var router = express.Router();
const dotenv = require("dotenv");
dotenv.config(); // Load environment variables from .env file
const User = require("../models/User");
const bcrypt = require("bcrypt");

/* GET home page. */
router.get("/", async function (req, res, next) {
  const hash = await bcrypt.hash("admin", 10);
  const user = await User.create({ username:'admin', password:hash });
  console.log("user: ", user);
  res.redirect(200, `${process.env.FRONT_URI}`);
});

module.exports = router;
