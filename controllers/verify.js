const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// Login user
router.get("/", async (req, res, next) => {
});

module.exports = router;
