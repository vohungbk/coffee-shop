const express = require("express");
const router = express.Router();
const argon2 = require("argon2");
const jwt = require("jsonwebtoken");

const User = require("../models/User");

//@router POST api/auth/register
//@desc Register user
//@access Public
router.post("/register", async (req, res) => {
  const { username, password } = req.body;
  if (!username) return res.status(400).json({ success: false, message: "Missing username and/or password" });
  try {
    const user = await User.findOne({ username });

    if (user) return res.status(400).json({ success: false, message: "Username already taken" });

    const hashPassword = await argon2.hash(password);
    const newUser = new User({
      username,
      password: hashPassword,
    });
    await newUser.save();

    const accessToken = jwt.sign({ userId: newUser._id }, process.env.ACCESS_TOKEN_SECRET);
    res.json({
      success: true,
      message: "User created successfully",
      accessToken,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

//@router POST api/auth/login
//@desc Login
//@access Public
router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) return res.status(400).json({ success: false, message: "Missing username and/or password" });
  try {
    const user = await User.findOne({ username });
    const passwordInvalid = await argon2.verify(user.password, password);
    if (!passwordInvalid) return res.status(400).json({ success: false, message: "Incorrect username or password" });
    const accessToken = jwt.sign({ userId: user._id }, process.env.ACCESS_TOKEN_SECRET);
    res.json({
      success: true,
      message: "Logged successfully",
      accessToken,
    });
  } catch (error) {
    console.log({ error });
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

module.exports = router;
