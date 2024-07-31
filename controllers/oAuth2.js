const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// Login user
router.post("/", async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(403).json({ message: "User does not exists" });
    }
    const compare = await bcrypt.compare(password, user.password);
    if (!compare) {
      return res.status(403).json({ message: "Invalid credentials" });
    }
    const token = jwt.sign({ id: user._id, username }, process.env.SECRET, {
      expiresIn: "1h",
    });
    return res
      .cookie("token", token, {
        httpOnly: true,
        secure: true,
        // domain: process.env.FRONT_URI,
        sameSite:'none',
        maxAge: 30 * 24 * 60 * 60 * 1000,
      })
      .json({ status: true, message: "Login success" });
    // return res.json();
  } catch (error) {
    console.log("error: ", error);
    res.status(500).json({ error });
  }
});

module.exports = router;
